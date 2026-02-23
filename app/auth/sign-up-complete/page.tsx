import { Suspense } from "react"
import SignUpCompleteClient from "./sign-up-complete-client"

export default function SignUpCompletePage() {
  return (
    <Suspense fallback={null}>
      <SignUpCompleteClient />
    </Suspense>
  )
}
