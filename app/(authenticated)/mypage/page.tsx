import { redirect } from "next/navigation"
import { createClientWithUser } from "@/lib/supabase/server"
import { MyPageClient } from "./mypage-client"

export default async function MyPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams
  const initialTab = tab === "friends" ? "friends" : "profile"

  const { supabase, user } = await createClientWithUser()

  if (!user) redirect("/auth/login")

  const userId = user.id

  const [profileRes, friendshipsRes, pendingRes, sentRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).single(),
    supabase
      .from("friendships")
      .select(
        `
        id,
        requester_id,
        addressee_id,
        status,
        requester:profiles!friendships_requester_id_fkey(id, display_name, friend_code, avatar_url),
        addressee:profiles!friendships_addressee_id_fkey(id, display_name, friend_code, avatar_url)
      `,
      )
      .eq("status", "accepted")
      .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`),
    supabase
      .from("friendships")
      .select(
        `
        id,
        requester_id,
        requester:profiles!friendships_requester_id_fkey(id, display_name, friend_code, avatar_url)
      `,
      )
      .eq("addressee_id", userId)
      .eq("status", "pending"),
    supabase
      .from("friendships")
      .select(
        `
        id,
        addressee_id,
        addressee:profiles!friendships_addressee_id_fkey(id, display_name, friend_code, avatar_url)
      `,
      )
      .eq("requester_id", userId)
      .eq("status", "pending"),
  ])

  if (profileRes.error) throw profileRes.error

  const profile = profileRes.data
  const friendships = (friendshipsRes.data || []) as any[]
  const friends = friendships.map((f: any) => {
    const friend = f.requester_id === userId ? f.addressee : f.requester
    return {
      id: friend.id,
      display_name: friend.display_name,
      friend_code: friend.friend_code,
      avatar_url: friend.avatar_url || null,
    }
  })

  // フレンド＋自分のポイントランキング用データ
  const rankingIds = [userId, ...friends.map((f) => f.id)]

  // PostgRESTは1リクエスト最大1000行なので、全件取れるまでページングする
  const fetchAllResults = async () => {
    const pageSize = 1000
    const rows: any[] = []
    for (let from = 0; ; from += pageSize) {
      const { data, error } = await supabase
        .from("game_results")
        .select("user_id, point, games!inner(game_type)")
        .in("user_id", rankingIds)
        .order("id", { ascending: true })
        .range(from, from + pageSize - 1)
      if (error) throw error
      const page = data || []
      rows.push(...page)
      if (page.length < pageSize) break
    }
    return rows
  }

  const [results, rollupsRes] = await Promise.all([
    fetchAllResults(),
    supabase
      .from("user_game_rollups")
      .select("user_id, game_type, rolled_game_count, rolled_total_points")
      .in("user_id", rankingIds),
  ])

  const emptyStats = () => ({
    four_player: { games: 0, points: 0 },
    three_player: { games: 0, points: 0 },
  })
  const statsByUser: Record<string, ReturnType<typeof emptyStats>> = {}
  for (const id of rankingIds) statsByUser[id] = emptyStats()

  for (const row of results as any[]) {
    const gameType = row.games?.game_type as "four_player" | "three_player" | undefined
    const entry = gameType ? statsByUser[row.user_id]?.[gameType] : undefined
    if (!entry) continue
    entry.games += 1
    entry.points += Number(row.point ?? 0)
  }

  for (const row of (rollupsRes.data || []) as any[]) {
    const entry = statsByUser[row.user_id]?.[row.game_type as "four_player" | "three_player"]
    if (!entry) continue
    entry.games += Number(row.rolled_game_count ?? 0)
    entry.points += Number(row.rolled_total_points ?? 0)
  }

  return (
    <MyPageClient
      userId={userId}
      userEmail={user.email || ""}
      initialTab={initialTab}
      profile={profile}
      friends={friends}
      friendStats={statsByUser}
      pendingRequests={(pendingRes.data || []) as any[]}
      sentRequests={(sentRes.data || []) as any[]}
    />
  )
}
