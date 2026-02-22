import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Server Component context - ignore
        }
      },
    },
  })
}

/**
 * cookieからセッションを読み取り、Supabaseクライアントとuser_idを返す。
 * getUser()と違いネットワーク通信なし（middlewareで認証済み前提）。
 */
export async function createClientWithUser() {
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return { supabase, user: session?.user ?? null }
}
