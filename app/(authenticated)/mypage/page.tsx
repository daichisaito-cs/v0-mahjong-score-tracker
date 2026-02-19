import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { MyPageClient } from "./mypage-client"

export default async function MyPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab } = await searchParams
  const initialTab = tab === "friends" ? "friends" : "profile"

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  const userId = user.id

  const [profileRes, friendshipsRes, pendingRes, sentRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).single(),
    supabase
      .from("friendships")
      .select(
        `
        id,
        requester_id,
        addressee_id,
        status,
        requester:profiles!friendships_requester_id_fkey(id, display_name, friend_code, avatar_url),
        addressee:profiles!friendships_addressee_id_fkey(id, display_name, friend_code, avatar_url)
      `,
      )
      .eq("status", "accepted")
      .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`),
    supabase
      .from("friendships")
      .select(
        `
        id,
        requester_id,
        requester:profiles!friendships_requester_id_fkey(id, display_name, friend_code, avatar_url)
      `,
      )
      .eq("addressee_id", userId)
      .eq("status", "pending"),
    supabase
      .from("friendships")
      .select(
        `
        id,
        addressee_id,
        addressee:profiles!friendships_addressee_id_fkey(id, display_name, friend_code, avatar_url)
      `,
      )
      .eq("requester_id", userId)
      .eq("status", "pending"),
  ])

  if (profileRes.error) throw profileRes.error

  const profile = profileRes.data
  const friendships = (friendshipsRes.data || []) as any[]
  const friends = friendships.map((f: any) => {
    const friend = f.requester_id === userId ? f.addressee : f.requester
    return {
      id: friend.id,
      display_name: friend.display_name,
      friend_code: friend.friend_code,
      avatar_url: friend.avatar_url || null,
    }
  })

  return (
    <MyPageClient
      userId={userId}
      userEmail={user.email || ""}
      initialTab={initialTab}
      profile={profile}
      friends={friends}
      pendingRequests={(pendingRes.data || []) as any[]}
      sentRequests={(sentRes.data || []) as any[]}
    />
  )
}
