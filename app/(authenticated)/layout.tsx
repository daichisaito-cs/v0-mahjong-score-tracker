import type React from "react"
import { AppShell } from "@/components/app-shell"
import { QueryProvider } from "@/components/query-provider"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryProvider>
      <AppShell>{children}</AppShell>
    </QueryProvider>
  )
}
