import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/brand-logo"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <BrandLogo className="h-8 w-auto" priority />
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                ログイン
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button size="sm">新規登録</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="max-w-2xl text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            麻雀の成績を
            <br />
            <span className="text-primary">もっと楽しく</span>管理
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            友達との麻雀の記録を簡単につけて、成績をグラフやランキングで可視化。
            <br />
            リーグ戦で本格的な勝負も楽しめます。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link href="/auth/sign-up">
              <Button size="lg" className="w-full sm:w-auto">
                無料で始める
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                ログイン
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <FeatureCard title="簡単記録" description="対局結果をサクッと入力。ポイント計算も自動で行います。" />
          <FeatureCard
            title="成績分析"
            description="グラフやランキングで成績を可視化。自分の強み・弱みが分かります。"
          />
          <FeatureCard title="リーグ戦" description="仲間内でリーグ戦を開催。順位を競い合って盛り上がりましょう。" />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        <p>&copy; 2025 Janki. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="p-6 rounded-lg bg-card border border-border">
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
