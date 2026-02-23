import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const logs = Array.isArray(body) ? body : [body]

    const rows = logs.map((log: any) => ({
      event: log.event ?? "unknown",
      data: log.data ?? {},
    }))

    await supabase.from("debug_logs").insert(rows)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
