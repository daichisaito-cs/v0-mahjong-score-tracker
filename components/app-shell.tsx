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
import { Home, List, Trophy, User, Menu, LogOut, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "ホーム", href: "/dashboard", icon: Home },
  { name: "対局一覧", href: "/games", icon: List },
  { name: "リーグ", href: "/leagues", icon: Trophy },
  { name: "マイページ", href: "/mypage", icon: User },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

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
          <Link href="/dashboard" className="text-lg font-bold text-primary">
            雀績
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={cn("gap-2", isActive && "bg-secondary text-secondary-foreground")}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/games/new">
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">対局を記録</span>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {navigation.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  ログアウト
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Desktop Logout */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="hidden md:flex gap-2 text-muted-foreground"
            >
              <LogOut className="h-4 w-4" />
              ログアウト
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card">
        <div className="flex items-center justify-around h-16">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 text-xs",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
