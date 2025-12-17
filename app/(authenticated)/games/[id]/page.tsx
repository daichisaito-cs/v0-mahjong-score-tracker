import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { GameRecordForm } from "@/components/game-record-form"

function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: userData, error } = await supabase.auth.getUser()
  if (error || !userData?.user) {
    redirect("/auth/login")
  }

  if (id === "new") {
    const { data: myProfile } = await supabase.from("profiles").select("*").eq("id", userData.user.id).single()

    const friends: { id: string; display_name: string }[] = []

    try {
      const { data: friendships, error: friendshipsError } = await supabase
        .from("friendships")
        .select("requester_id, addressee_id")
        .eq("status", "accepted")
        .or(`requester_id.eq.${userData.user.id},addressee_id.eq.${userData.user.id}`)

      if (friendshipsError) {
        console.error("[v0] Failed to fetch friendships:", friendshipsError)
      } else if (friendships && friendships.length > 0) {
        const friendIds = friendships.map((fs) => {
          return fs.requester_id === userData.user.id ? fs.addressee_id : fs.requester_id
        })

        const { data: profiles, error: profilesError } = await supabase
          .from("profiles")
          .select("id, display_name")
          .in("id", friendIds)

        if (profilesError) {
          console.error("[v0] Failed to fetch friend profiles:", profilesError)
        } else if (profiles) {
          friends.push(...profiles)
        }
      }
    } catch (err) {
      console.error("[v0] Error fetching friends:", err)
    }

    const { data: ownedLeagues } = await supabase.from("leagues").select("*").eq("owner_id", userData.user.id)

    const { data: memberships } = await supabase
      .from("league_members")
      .select("leagues(*)")
      .eq("user_id", userData.user.id)

    const memberLeagues = memberships?.map((m) => m.leagues).filter(Boolean) || []
    const allLeagues = [...(ownedLeagues || []), ...memberLeagues]
    const uniqueLeagues = allLeagues.filter(
      (league, index, self) => league && index === self.findIndex((l) => l?.id === league?.id),
    )

    return (
      <div className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-foreground">対局を記録</h1>
          <p className="text-muted-foreground">対局結果を入力してください</p>
        </div>

        <GameRecordForm
          currentUserId={userData.user.id}
          currentUserName={myProfile?.display_name || "自分"}
          leagues={(uniqueLeagues as any[]) || []}
          friends={friends}
        />
      </div>
    )
  }

  if (!isValidUUID(id)) {
    notFound()
  }

  const { data: game } = await supabase
    .from("games")
    .select(`
      *,
      leagues (name),
      game_results (
        id,
        game_id,
        user_id,
        player_name,
        rank,
        raw_score,
        point,
        created_at
      )
    `)
    .eq("id", id)
    .single()

  if (!game) {
    notFound()
  }

  const sortedResults = [...(game.game_results || [])].sort((a, b) => a.rank - b.rank)

  const isOwner = game.created_by === userData.user.id

  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/games">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">対局詳細</h1>
            <p className="text-muted-foreground">
              {new Date(game.played_at).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        {isOwner && (
          <Link href={`/games/${id}/edit`}>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Edit className="h-4 w-4" />
              編集
            </Button>
          </Link>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">対局情報</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
                {game.game_type === "four_player" ? "四人麻雀" : "三人麻雀"}
              </span>
              {game.leagues && (
                <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">{game.leagues.name}</span>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedResults.map((result, index) => (
              <div
                key={result.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg",
                  index === 0 ? "bg-accent/20" : "bg-muted/50",
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold",
                      result.rank === 1 && "bg-accent text-accent-foreground",
                      result.rank === 2 && "bg-secondary text-secondary-foreground",
                      result.rank === 3 && "bg-muted text-muted-foreground",
                      result.rank === 4 && "bg-destructive/10 text-destructive",
                    )}
                  >
                    {result.rank === 1 ? <Trophy className="h-5 w-5" /> : `${result.rank}位`}
                  </div>
                  <div>
                    <p className="font-semibold">{result.player_name || "Unknown"}</p>
                    <p className="text-sm text-muted-foreground">{result.raw_score.toLocaleString()}点</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={cn("text-xl font-bold", Number(result.point) >= 0 ? "text-chart-1" : "text-destructive")}
                  >
                    {Number(result.point) >= 0 ? "+" : ""}
                    {Number(result.point).toFixed(1)}
                  </p>
                  <p className="text-xs text-muted-foreground">ポイント</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">合計</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">合計点</p>
              <p className="text-xl font-bold">
                {sortedResults.reduce((sum, r) => sum + r.raw_score, 0).toLocaleString()}点
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">合計pt</p>
              <p className="text-xl font-bold">
                {sortedResults.reduce((sum, r) => sum + Number(r.point), 0).toFixed(1)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
