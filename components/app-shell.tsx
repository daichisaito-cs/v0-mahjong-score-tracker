"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, List, Trophy, User, LogOut, Plus, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BrandLogo } from "@/components/brand-logo"

const navigation = [
  { name: "ホーム", href: "/dashboard", icon: Home },
  { name: "対局一覧", href: "/games", icon: List },
  { name: "リーグ", href: "/leagues", icon: Trophy },
  { name: "ルール", href: "/rules", icon: Settings },
  { name: "マイページ", href: "/mypage", icon: User },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [pendingCount, setPendingCount] = useState(0)
  const [profile, setProfile] = useState<{ display_name: string; avatar_url: string | null } | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const supabase = createClient()
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) return

      const { data } = await supabase
        .from("profiles")
        .select("display_name, avatar_url")
        .eq("id", userData.user.id)
        .single()
      if (data) setProfile(data)
    }

    fetchProfile()

    const handleProfileUpdate = (event: CustomEvent) => {
      setProfile(event.detail)
    }

    window.addEventListener("profile-updated", handleProfileUpdate as EventListener)

    const fetchPendingRequests = async () => {
      const supabase = createClient()
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) return

      const { data, error } = await supabase
        .from("friendships")
        .select("id")
        .eq("addressee_id", userData.user.id)
        .eq("status", "pending")

      if (!error && data) {
        setPendingCount(data.length)
      }
    }

    fetchPendingRequests()

    const handleFriendRequestsUpdated = () => {
      fetchPendingRequests()
    }

    window.addEventListener("friend-requests-updated", handleFriendRequestsUpdated as EventListener)

    const supabase = createClient()
    const channel = supabase
      .channel("friend-requests")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "friendships",
        },
        () => {
          fetchPendingRequests()
        },
      )
      .subscribe()

    return () => {
      window.removeEventListener("profile-updated", handleProfileUpdate as EventListener)
      window.removeEventListener("friend-requests-updated", handleFriendRequestsUpdated as EventListener)
      supabase.removeChannel(channel)
    }
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center" aria-label="Janki">
            <BrandLogo className="h-7 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-2">
            <Link href="/games/new">
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                対局を記録
              </Button>
            </Link>

            {/* Desktop Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url || undefined} />
                    <AvatarFallback>{profile?.display_name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                  {pendingCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-white text-[10px] flex items-center justify-center">
                      {pendingCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {navigation.map((item) => {
                  const showBadge = item.href === "/mypage" && pendingCount > 0
                  return (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link href={item.href} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        {item.name}
                        {showBadge && (
                          <span className="ml-auto h-5 w-5 rounded-full bg-destructive text-white text-xs flex items-center justify-center">
                            {pendingCount}
                          </span>
                        )}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  ログアウト
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 pt-6 pb-24 md:pb-6">{children}</main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card">
        <div className="flex items-center justify-around h-16">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const showBadge = item.href === "/mypage" && pendingCount > 0
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 text-xs relative",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
                {showBadge && (
                  <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-destructive text-white text-[10px] flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
