import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProfileForm } from "@/components/profile-form"
import { FriendSection } from "@/components/friend-section"

export default async function MyPage() {
  const supabase = await createClient()

  const { data: userData, error } = await supabase.auth.getUser()
  if (error || !userData?.user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", userData.user.id).single()

  // 承認済みフレンド
  const { data: friendships } = await supabase
    .from("friendships")
    .select(`
      id,
      requester_id,
      addressee_id,
      status,
      requester:profiles!friendships_requester_id_fkey(id, display_name, friend_code),
      addressee:profiles!friendships_addressee_id_fkey(id, display_name, friend_code)
    `)
    .eq("status", "accepted")
    .or(`requester_id.eq.${userData.user.id},addressee_id.eq.${userData.user.id}`)

  // 受信した申請（pending）
  const { data: pendingRequests } = await supabase
    .from("friendships")
    .select(`
      id,
      requester_id,
      requester:profiles!friendships_requester_id_fkey(id, display_name, friend_code)
    `)
    .eq("addressee_id", userData.user.id)
    .eq("status", "pending")

  // 送信した申請（pending）
  const { data: sentRequests } = await supabase
    .from("friendships")
    .select(`
      id,
      addressee_id,
      addressee:profiles!friendships_addressee_id_fkey(id, display_name, friend_code)
    `)
    .eq("requester_id", userData.user.id)
    .eq("status", "pending")

  // フレンドリストを整形
  const friends =
    friendships?.map((f) => {
      const friend = f.requester_id === userData.user.id ? f.addressee : f.requester
      return {
        id: friend.id,
        display_name: friend.display_name,
        friend_code: friend.friend_code,
      }
    }) || []

  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">マイページ</h1>
        <p className="text-muted-foreground">プロフィールとフレンド</p>
      </div>

      {/* プロフィール編集 */}
      <ProfileForm
        initialData={{
          displayName: profile?.display_name || "",
          email: profile?.email || userData.user.email || "",
        }}
      />

      {/* フレンドセクション */}
      <FriendSection
        currentUserId={userData.user.id}
        friendCode={profile?.friend_code || ""}
        friends={friends}
        pendingRequests={pendingRequests || []}
        sentRequests={sentRequests || []}
      />
    </div>
  )
}
