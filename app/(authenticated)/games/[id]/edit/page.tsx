import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { GameEditForm } from "@/components/game-edit-form"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

  const seatCount = game.game_type === "four_player" ? 4 : 3
  const seatIndexes = (game.game_results || []).map((r: any) => Number(r.seat_index)).filter((n: number) => Number.isFinite(n))
  const hasDuplicateSeatIndex = new Set(seatIndexes).size !== seatIndexes.length
  const hasPairPlay = hasDuplicateSeatIndex || (game.game_results || []).length > seatCount

  const sortedResults = [...(game.game_results || [])].sort((a, b) => {
    if (a.rank !== b.rank) return a.rank - b.rank
    const seatA = Number(a.seat_index ?? 999)
    const seatB = Number(b.seat_index ?? 999)
    if (seatA !== seatB) return seatA - seatB
    return 0
  })

  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">対局を編集</h1>
        <p className="text-muted-foreground">{new Date(game.played_at).toLocaleDateString("ja-JP")}の対局</p>
      </div>

      {hasPairPlay ? (
        <Card>
          <CardContent className="py-8 text-center space-y-4">
            <p className="text-sm text-muted-foreground">この対局はペア打ちのため編集には対応していません。</p>
            <div className="flex justify-center gap-2">
              <Button asChild variant="outline">
                <Link href={`/games/${id}`}>対局詳細へ戻る</Link>
              </Button>
              <Button asChild>
                <Link href="/games">対局一覧へ</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <GameEditForm
          gameId={game.id}
          gameType={game.game_type}
          results={sortedResults.map((r) => ({
            id: r.id,
            name: r.player_name || r.profiles?.display_name || "",
            score: r.raw_score.toString(),
            userId: r.user_id,
            bonusPoints: Number(r.bonus_points || 0),
          }))}
        />
      )}
    </div>
  )
}
