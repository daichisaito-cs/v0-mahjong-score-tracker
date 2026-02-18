import { Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MyPageClient } from "./mypage-client"

function MyPageFallback() {
  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">マイページ</h1>
        <p className="text-muted-foreground">プロフィールとフレンド管理</p>
      </div>
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">読み込み中...</CardContent>
      </Card>
    </div>
  )
}

export default function MyPage() {
  return (
    <Suspense fallback={<MyPageFallback />}>
      <MyPageClient />
    </Suspense>
  )
}
