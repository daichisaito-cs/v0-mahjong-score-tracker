import type { SupabaseClient } from "@supabase/supabase-js"
import { createNeonClient } from "@/lib/neon/client"
import { createBrowserClient } from "@supabase/ssr"

let client: SupabaseClient<any> | null = null

export function createClient(): SupabaseClient<any> {
  if (process.env.NEXT_PUBLIC_BACKEND === "neon") return createNeonClient() as unknown as SupabaseClient<any>
  if (typeof window !== "undefined" && client) {
    return client
  }

  const newClient = createBrowserClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    },
  )

  if (typeof window !== "undefined") {
    client = newClient
  }

  return newClient
}

export { createClient as createBrowserClient }
