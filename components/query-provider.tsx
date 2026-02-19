"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

let sharedClient: QueryClient | null = null

const getQueryClient = () => {
  if (!sharedClient) {
    sharedClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 3 * 60_000,
          gcTime: 10 * 60_000,
          refetchOnWindowFocus: false,
          retry: 1,
        },
      },
    })
  }
  return sharedClient
}

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => getQueryClient())

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
