import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { createClient as createServerClient } from "@/lib/supabase/server"

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function resolveBaseUrl(req: Request) {
  return (
    req.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
    "http://localhost:3000"
  )
}

type AdminUser = {
  id: string
  email: string | null
  email_confirmed_at: string | null
  deleted_at?: string | null
}

async function findAuthUserByEmail(adminClient: ReturnType<typeof createAdminClient>, email: string) {
  const normalizedEmail = email.toLowerCase()
  const perPage = 200
  let page = 1

  while (page <= 20) {
    const { data, error } = await adminClient.auth.admin.listUsers({ page, perPage })
    if (error) {
      throw new Error("ユーザー情報の取得に失敗しました")
    }

    const match = data?.users?.find((user: AdminUser) => user.email?.toLowerCase() === normalizedEmail)
    if (match) {
      return match
    }

    if (!data?.users || data.users.length < perPage) {
      break
    }

    page += 1
  }

  return null
}

export async function POST(req: Request) {
  try {
    const { email, inviterId } = await req.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "メールアドレスを入力してください" }, { status: 400 })
    }

    if (!inviterId || typeof inviterId !== "string" || !uuidRegex.test(inviterId)) {
      return NextResponse.json({ error: "不正な招待情報です" }, { status: 400 })
    }

    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.id !== inviterId) {
      return NextResponse.json({ error: "認証情報が無効です" }, { status: 403 })
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "サーバー設定が不足しています" }, { status: 500 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const adminClient = createAdminClient()
    const fetchedUser = await findAuthUserByEmail(adminClient, normalizedEmail)
    const existingUser = fetchedUser && fetchedUser.deleted_at ? null : fetchedUser

    if (existingUser) {
      if (!existingUser.email_confirmed_at) {
        const { error: deleteError } = await adminClient.auth.admin.deleteUser(existingUser.id)
        if (deleteError) {
          return NextResponse.json(
            { error: "未完了のアカウントをリセットできませんでした。時間を置いて再度お試しください。" },
            { status: 500 },
          )
        }
      } else {
        return NextResponse.json({ error: "このメールアドレスは既に登録済みです" }, { status: 400 })
      }
    }

    const baseUrl = resolveBaseUrl(req).replace(/\/$/, "")
    const redirectTo = `${baseUrl}/auth/invite-complete`

    const { error } = await adminClient.auth.admin.inviteUserByEmail(normalizedEmail, {
      redirectTo,
      data: {
        inviter_id: inviterId,
        needs_password: true,
      },
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ message: "招待メールを送信しました" })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "招待メールの送信に失敗しました" },
      { status: 500 },
    )
  }
}
