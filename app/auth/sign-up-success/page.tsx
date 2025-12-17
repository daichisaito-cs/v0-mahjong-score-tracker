import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Link href="/" className="text-center">
            <h1 className="text-2xl font-bold text-primary">雀績</h1>
          </Link>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">登録ありがとうございます</CardTitle>
              <CardDescription>メールを確認してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                ご登録いただいたメールアドレスに確認メールを送信しました。
                メール内のリンクをクリックして、アカウントを有効化してください。
              </p>
              <Link href="/auth/login" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  ログイン画面へ
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
