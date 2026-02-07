import { Suspense } from "react"
import SignUpCompleteClient from "./sign-up-complete-client"

export default function SignUpCompletePage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-muted-foreground">読み込み中...</div>}>
      <SignUpCompleteClient />
    </Suspense>
  )
}
