import { createNeonAdmin } from "@/lib/neon/admin"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let adminClient: SupabaseClient<any> | null = null

export function createAdminClient(): SupabaseClient<any> {
  if (process.env.NEXT_PUBLIC_BACKEND === "neon") return createNeonAdmin() as unknown as SupabaseClient<any>
  if (adminClient) {
    return adminClient
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set")
  }

  adminClient = createClient<any>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  return adminClient
}
