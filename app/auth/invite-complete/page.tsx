import { Suspense } from "react"
import InviteCompleteClient from "./invite-complete-client"

export default function InviteCompletePage() {
  return (
    <Suspense fallback={null}>
      <InviteCompleteClient />
    </Suspense>
  )
}
