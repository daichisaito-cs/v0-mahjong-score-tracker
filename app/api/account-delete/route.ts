import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { createClient as createServerClient } from "@/lib/supabase/server"

function uniqueIds(ids: Array<string | null | undefined>) {
  return Array.from(new Set(ids.filter((id): id is string => Boolean(id))))
}

export async function POST() {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      return NextResponse.json({ error: "ログインが必要です" }, { status: 401 })
    }

    const admin = createAdminClient()

    const { data: ownedLeagues, error: ownedLeaguesError } = await admin
      .from("leagues")
      .select("id")
      .eq("owner_id", user.id)

    if (ownedLeaguesError) {
      return NextResponse.json({ error: "リーグ情報の取得に失敗しました" }, { status: 500 })
    }

    const leagueIds = uniqueIds(ownedLeagues?.map((l) => l.id) ?? [])

    const { data: gamesByOwner, error: gamesByOwnerError } = await admin
      .from("games")
      .select("id")
      .eq("created_by", user.id)

    if (gamesByOwnerError) {
      return NextResponse.json({ error: "対局情報の取得に失敗しました" }, { status: 500 })
    }

    let gamesByLeague: Array<{ id: string }> = []
    if (leagueIds.length > 0) {
      const { data, error: gamesByLeagueError } = await admin
        .from("games")
        .select("id")
        .in("league_id", leagueIds)
      if (gamesByLeagueError) {
        return NextResponse.json({ error: "対局情報の取得に失敗しました" }, { status: 500 })
      }
      gamesByLeague = data || []
    }

    const gameIds = uniqueIds([
      ...(gamesByOwner?.map((g) => g.id) ?? []),
      ...(gamesByLeague?.map((g) => g.id) ?? []),
    ])

    if (gameIds.length > 0) {
      const { error: deleteGameResultsError } = await admin.from("game_results").delete().in("game_id", gameIds)
      if (deleteGameResultsError) {
        return NextResponse.json({ error: "対局結果の削除に失敗しました" }, { status: 500 })
      }
    }

    const { error: anonymizeError } = await admin
      .from("game_results")
      .update({ user_id: null, player_name: "退会ユーザー" })
      .eq("user_id", user.id)

    if (anonymizeError) {
      return NextResponse.json({ error: "対局結果の更新に失敗しました" }, { status: 500 })
    }

    if (gameIds.length > 0) {
      const { error: deleteGamesError } = await admin.from("games").delete().in("id", gameIds)
      if (deleteGamesError) {
        return NextResponse.json({ error: "対局の削除に失敗しました" }, { status: 500 })
      }
    }

    if (leagueIds.length > 0) {
      const { error: deleteLeagueMembersError } = await admin.from("league_members").delete().in("league_id", leagueIds)
      if (deleteLeagueMembersError) {
        return NextResponse.json({ error: "リーグ参加情報の削除に失敗しました" }, { status: 500 })
      }
    }

    const { error: deleteMyMembershipsError } = await admin
      .from("league_members")
      .delete()
      .eq("user_id", user.id)
    if (deleteMyMembershipsError) {
      return NextResponse.json({ error: "リーグ参加情報の削除に失敗しました" }, { status: 500 })
    }

    if (leagueIds.length > 0) {
      const { error: deleteLeaguesError } = await admin.from("leagues").delete().in("id", leagueIds)
      if (deleteLeaguesError) {
        return NextResponse.json({ error: "リーグの削除に失敗しました" }, { status: 500 })
      }
    }

    const { error: deleteFriendshipsError } = await admin
      .from("friendships")
      .delete()
      .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`)
    if (deleteFriendshipsError) {
      return NextResponse.json({ error: "フレンド情報の削除に失敗しました" }, { status: 500 })
    }

    const { error: deleteRulesError } = await admin.from("rules").delete().eq("created_by", user.id)
    if (deleteRulesError) {
      return NextResponse.json({ error: "ルールの削除に失敗しました" }, { status: 500 })
    }

    // ロールアップがある場合は先に削除（環境によってはテーブルが未作成でもOK）
    const { error: deleteUserRollupsError } = await admin.from("user_game_rollups").delete().eq("user_id", user.id)
    if (deleteUserRollupsError) {
      // eslint-disable-next-line no-console
      console.warn("[v0] failed to delete user_game_rollups (ignored):", deleteUserRollupsError)
    }
    const { error: deleteLeagueUserRollupsError } = await admin
      .from("league_user_game_rollups")
      .delete()
      .eq("user_id", user.id)
    if (deleteLeagueUserRollupsError) {
      // eslint-disable-next-line no-console
      console.warn("[v0] failed to delete league_user_game_rollups (ignored):", deleteLeagueUserRollupsError)
    }

    const { error: deleteProfileError } = await admin.from("profiles").delete().eq("id", user.id)
    if (deleteProfileError) {
      return NextResponse.json({ error: "プロフィールの削除に失敗しました" }, { status: 500 })
    }

    const { error: deleteUserError } = await admin.auth.admin.deleteUser(user.id)
    if (deleteUserError) {
      return NextResponse.json({ error: "アカウントの削除に失敗しました" }, { status: 500 })
    }

    return NextResponse.json({ message: "アカウントを削除しました" })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "アカウントの削除に失敗しました" },
      { status: 500 },
    )
  }
}
