"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Upload } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"

interface ProfileFormProps {
  initialData: {
    displayName: string
    email: string
    avatarUrl: string | null
  }
  currentEmail: string
}

export function ProfileForm({ initialData, currentEmail }: ProfileFormProps) {
  const [displayName, setDisplayName] = useState(initialData.displayName)
  const [avatarUrl, setAvatarUrl] = useState(initialData.avatarUrl)
  const [tempAvatarUrl, setTempAvatarUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const [email, setEmail] = useState(currentEmail)
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const [emailMessage, setEmailMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [deleteConfirm, setDeleteConfirm] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const router = useRouter()
  const queryClient = useQueryClient()
  const deleteKeyword = "DELETE"

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setTempAvatarUrl(reader.result as string)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const supabase = createClient()

    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) {
      setMessage({ type: "error", text: "ログインが必要です" })
      setIsLoading(false)
      return
    }

    const updates: any = {
      display_name: displayName,
      updated_at: new Date().toISOString(),
    }

    if (tempAvatarUrl) {
      updates.avatar_url = tempAvatarUrl
    }

    const { error } = await supabase.from("profiles").update(updates).eq("id", userData.user.id)

    if (error) {
      setMessage({ type: "error", text: "更新に失敗しました" })
    } else {
      setMessage({ type: "success", text: "プロフィールを更新しました" })
      setAvatarUrl(tempAvatarUrl || avatarUrl)
      setTempAvatarUrl(null)

      window.dispatchEvent(
        new CustomEvent("profile-updated", {
          detail: {
            display_name: displayName,
            avatar_url: tempAvatarUrl || avatarUrl,
          },
        }),
      )

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["mypage"] }),
        queryClient.invalidateQueries({ queryKey: ["games"] }),
        queryClient.invalidateQueries({ queryKey: ["game"] }),
        queryClient.invalidateQueries({ queryKey: ["dashboard"] }),
        queryClient.invalidateQueries({ queryKey: ["league-detail"] }),
      ])
      router.refresh()
    }

    setIsLoading(false)
  }

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsEmailLoading(true)
    setEmailMessage(null)

    try {
      const { error } = await supabase.auth.updateUser({ email })
      if (error) throw error
      setEmailMessage({
        type: "success",
        text: "確認メールを送信しました。メール内のリンクをクリックして変更を完了してください。",
      })
    } catch (error) {
      setEmailMessage({
        type: "error",
        text: error instanceof Error ? error.message : "メールアドレスの変更に失敗しました",
      })
    } finally {
      setIsEmailLoading(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsPasswordLoading(true)
    setPasswordMessage(null)

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: "error", text: "新しいパスワードが一致しません" })
      setIsPasswordLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ type: "error", text: "パスワードは6文字以上で入力してください" })
      setIsPasswordLoading(false)
      return
    }

    try {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user?.email) throw new Error("ユーザー情報が取得できません")

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userData.user.email,
        password: currentPassword,
      })
      if (signInError) throw new Error("現在のパスワードが正しくありません")

      const { error } = await supabase.auth.updateUser({ password: newPassword })
      if (error) throw error

      setPasswordMessage({ type: "success", text: "パスワードを変更しました" })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      setPasswordMessage({
        type: "error",
        text: error instanceof Error ? error.message : "パスワードの変更に失敗しました",
      })
    } finally {
      setIsPasswordLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    setDeleteMessage(null)
    try {
      const response = await fetch("/api/account-delete", { method: "POST" })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(payload.error || "アカウントの削除に失敗しました")
      }
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      setDeleteMessage({
        type: "error",
        text: error instanceof Error ? error.message : "アカウントの削除に失敗しました",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>プロフィール情報</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* プロフィール画像 */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={tempAvatarUrl || avatarUrl || undefined} />
                <AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Label htmlFor="avatar" className="cursor-pointer">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    <Upload className="h-4 w-4" />
                    画像を変更
                  </div>
                  <Input id="avatar" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </Label>
                {tempAvatarUrl && (
                  <p className="text-xs text-muted-foreground mt-1">「更新する」ボタンを押して保存してください</p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="displayName">表示名</Label>
              <Input id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
            </div>

            {message && (
              <p className={`text-sm ${message.type === "success" ? "text-green-600" : "text-destructive"}`}>
                {message.text}
              </p>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "更新中..." : "更新する"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>メールアドレス変更</CardTitle>
          <CardDescription>新しいメールアドレスを入力してください</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">新しいメールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                required
              />
            </div>
            {emailMessage && (
              <p className={`text-sm ${emailMessage.type === "success" ? "text-green-600" : "text-destructive"}`}>
                {emailMessage.text}
              </p>
            )}
            <Button type="submit" disabled={isEmailLoading || email === currentEmail}>
              {isEmailLoading ? "変更中..." : "メールアドレスを変更"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>パスワード変更</CardTitle>
          <CardDescription>現在のパスワードと新しいパスワードを入力してください</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">現在のパスワード</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  aria-label={showCurrentPassword ? "パスワードを隠す" : "パスワードを表示"}
                >
                  {showCurrentPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">新しいパスワード</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  aria-label={showNewPassword ? "パスワードを隠す" : "パスワードを表示"}
                >
                  {showNewPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">新しいパスワード（確認）</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={showConfirmPassword ? "パスワードを隠す" : "パスワードを表示"}
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </div>
            {passwordMessage && (
              <p className={`text-sm ${passwordMessage.type === "success" ? "text-green-600" : "text-destructive"}`}>
                {passwordMessage.text}
              </p>
            )}
            <Button type="submit" disabled={isPasswordLoading}>
              {isPasswordLoading ? "変更中..." : "パスワードを変更"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive">アカウント削除</CardTitle>
          <CardDescription>
            すべてのデータが削除されます。続行するには「{deleteKeyword}」と入力してください。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="deleteConfirm">確認入力</Label>
            <Input
              id="deleteConfirm"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder={deleteKeyword}
            />
          </div>
          {deleteMessage && (
            <p className={`text-sm ${deleteMessage.type === "success" ? "text-green-600" : "text-destructive"}`}>
              {deleteMessage.text}
            </p>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={deleteConfirm !== deleteKeyword || isDeleting}>
                アカウントを削除
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>アカウントを削除しますか？</AlertDialogTitle>
                <AlertDialogDescription>
                  この操作は取り消せません。対局やフレンド、リーグ情報などが削除されます。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAccount} disabled={isDeleting}>
                  {isDeleting ? "削除中..." : "削除する"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}
