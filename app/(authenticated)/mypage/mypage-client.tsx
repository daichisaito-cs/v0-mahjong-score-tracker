"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { ProfileForm } from "@/components/profile-form"
import { FriendSection } from "@/components/friend-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MyPageClientProps {
  userId: string
  userEmail: string
  initialTab: "profile" | "friends"
  profile: any
  friends: any[]
  pendingRequests: any[]
  sentRequests: any[]
}

export function MyPageClient({
  userId,
  userEmail,
  initialTab,
  profile,
  friends,
  pendingRequests,
  sentRequests,
}: MyPageClientProps) {
  const searchParams = useSearchParams()
  const tabFromUrl = searchParams.get("tab") === "friends" ? "friends" : initialTab
  const [activeTab, setActiveTab] = useState<"profile" | "friends">(tabFromUrl)

  return (
    <div className="space-y-6 pb-20 md:pb-0 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">マイページ</h1>
        <p className="text-muted-foreground">プロフィールとフレンド管理</p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "profile" | "friends")} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">プロフィール</TabsTrigger>
          <TabsTrigger value="friends">フレンド</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <ProfileForm
            initialData={{
              displayName: profile?.display_name || "",
              email: profile?.email || userEmail,
              avatarUrl: profile?.avatar_url || null,
            }}
            currentEmail={userEmail}
          />
        </TabsContent>

        <TabsContent value="friends" className="space-y-6">
          <FriendSection
            currentUserId={userId}
            friendCode={profile?.friend_code || ""}
            friends={friends}
            pendingRequests={pendingRequests}
            sentRequests={sentRequests}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
