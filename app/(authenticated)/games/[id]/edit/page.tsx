import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { GameEditForm } from "@/components/game-edit-form"

function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

export default async function GameEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (id === "new") {
    redirect("/games/new")
  }

  if (!isValidUUID(id)) {
    notFound()
  }

  const supabase = await createClient()

  const { data: userData, error } = await supabase.auth.getUser()
  if (error || !userData?.user) {
    redirect("/auth/login")
  }

  // 対局データ取得
  const { data: game } = await supabase
    .from("games")
    .select(`
      *,
      game_results (
        *,
        profiles (display_name)
      )
    `)
    .eq("id", id)
    .single()

  if (!game) {
    notFound()
  }

  // オーナーのみ編集可能
  if (game.created_by !== userData.user.id) {
    redirect(`/games/${id}`)
  }

  const sortedResults = [...(game.game_results || [])].sort((a, b) => a.rank - b.rank)

  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">対局を編集</h1>
        <p className="text-muted-foreground">{new Date(game.played_at).toLocaleDateString("ja-JP")}の対局</p>
      </div>

      <GameEditForm
        gameId={game.id}
        gameType={game.game_type}
        results={sortedResults.map((r) => ({
          id: r.id,
          name: r.profiles?.display_name || "",
          score: r.raw_score.toString(),
          userId: r.user_id,
          bonusPoints: Number(r.bonus_points || 0),
        }))}
      />
    </div>
  )
}
