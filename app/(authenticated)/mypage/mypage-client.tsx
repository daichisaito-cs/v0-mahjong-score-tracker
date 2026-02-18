"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { useAuthUser } from "@/lib/hooks/use-auth-user"
import { ProfileForm } from "@/components/profile-form"
import { FriendSection } from "@/components/friend-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export function MyPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const userQuery = useAuthUser()

  const user = userQuery.data
  const initialTab = useMemo(() => (searchParams.get("tab") === "friends" ? "friends" : "profile"), [searchParams])
  const [activeTab, setActiveTab] = useState<"profile" | "friends">(initialTab)

  useEffect(() => {
    if (userQuery.isFetched && !user) router.replace("/auth/login")
  }, [router, user, userQuery.isFetched])

  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  const dataQuery = useQuery({
    queryKey: ["mypage", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const userId = user!.id
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
      if (friendshipsRes.error) throw friendshipsRes.error
      if (pendingRes.error) throw pendingRes.error
      if (sentRes.error) throw sentRes.error

      return {
        profile: profileRes.data,
        friendships: friendshipsRes.data || [],
        pendingRequests: pendingRes.data || [],
        sentRequests: sentRes.data || [],
      }
    },
  })

  if (userQuery.isLoading || (userQuery.isFetched && !user)) {
    return (
      <div className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-foreground">マイページ</h1>
          <p className="text-muted-foreground">プロフィールとフレンド管理</p>
        </div>
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">読み込み中...</CardContent>
        </Card>
      </div>
    )
  }

  const profile = (dataQuery.data as any)?.profile
  const friendships = ((dataQuery.data as any)?.friendships || []) as any[]
  const pendingRequests = ((dataQuery.data as any)?.pendingRequests || []) as any[]
  const sentRequests = ((dataQuery.data as any)?.sentRequests || []) as any[]

  const friends =
    friendships?.map((f: any) => {
      const friend = f.requester_id === user!.id ? f.addressee : f.requester
      return {
        id: friend.id,
        display_name: friend.display_name,
        friend_code: friend.friend_code,
        avatar_url: friend.avatar_url,
      }
    }) || []

  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">マイページ</h1>
        <p className="text-muted-foreground">プロフィールとフレンド管理</p>
      </div>

      {dataQuery.isLoading ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">読み込み中...</CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "profile" | "friends")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">プロフィール</TabsTrigger>
            <TabsTrigger value="friends">フレンド</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <ProfileForm
              initialData={{
                displayName: profile?.display_name || "",
                email: profile?.email || user?.email || "",
                avatarUrl: profile?.avatar_url || null,
              }}
              currentEmail={user?.email || ""}
            />
          </TabsContent>

          <TabsContent value="friends" className="space-y-6">
            <FriendSection
              currentUserId={user!.id}
              friendCode={profile?.friend_code || ""}
              friends={friends}
              pendingRequests={pendingRequests}
              sentRequests={sentRequests}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
