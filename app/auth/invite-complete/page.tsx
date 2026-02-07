import { Suspense } from "react"
import InviteCompleteClient from "./invite-complete-client"

export default function InviteCompletePage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-muted-foreground">読み込み中...</div>}>
      <InviteCompleteClient />
    </Suspense>
  )
}
