import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/brand-logo"
import Link from "next/link"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex justify-center" aria-label="Janki">
            <BrandLogo className="h-10 w-auto" priority />
          </Link>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">エラーが発生しました</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {params?.error ? (
                <p className="text-sm text-muted-foreground">エラーコード: {params.error}</p>
              ) : (
                <p className="text-sm text-muted-foreground">予期しないエラーが発生しました。</p>
              )}
              <Link href="/auth/login" className="block">
                <Button className="w-full">ログイン画面へ戻る</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
