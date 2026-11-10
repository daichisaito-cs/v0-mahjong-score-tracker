import { sendAuthEmail } from "./mail"
import { betterAuth } from "better-auth"
import { pool } from "./database"
import { hash, compare } from "bcryptjs"

// This authentication service uses Neon Postgres and preserves the bcrypt
// password format used by existing accounts.
export const auth = betterAuth({
  database: pool,
  databaseHooks: { user: { create: { after: async (user) => {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      await client.query('INSERT INTO auth.users(id,email,raw_user_meta_data,email_confirmed_at) VALUES($1,$2,$3,now()) ON CONFLICT(id) DO NOTHING', [user.id,user.email,JSON.stringify({display_name:user.name})])
      await client.query('INSERT INTO profiles(id,display_name,email) VALUES($1,$2,$3) ON CONFLICT(id) DO NOTHING',[user.id,user.name,user.email])
      const inviter = (user as any).inviterId
      if (typeof inviter === 'string' && /^[0-9a-f-]{36}$/i.test(inviter) && inviter !== user.id) {
        await client.query("INSERT INTO friendships(requester_id,addressee_id,status) SELECT $1,$2,'accepted' WHERE EXISTS(SELECT 1 FROM profiles WHERE id=$1) ON CONFLICT DO NOTHING",[inviter,user.id])
      }
      await client.query('COMMIT')
    } catch(e) { await client.query('ROLLBACK'); throw e } finally { client.release() }
  } }, update: { after: async(user) => {
    await pool.query('UPDATE auth.users SET email=$1 WHERE id=$2',[user.email,user.id])
    await pool.query('UPDATE profiles SET email=$1 WHERE id=$2',[user.email,user.id])
  } } } },
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [process.env.BETTER_AUTH_URL, process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined].filter((value): value is string => Boolean(value)),
  baseURL: process.env.BETTER_AUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    onPasswordReset: async ({ user }) => {
      // Possession of the emailed reset token also verifies an invited address.
      await pool.query('UPDATE "user" SET "emailVerified"=true WHERE id=$1',[user.id])
      await pool.query('UPDATE auth.users SET email_confirmed_at=coalesce(email_confirmed_at,now()) WHERE id=$1',[user.id])
    },
    sendResetPassword: async ({ user, url }) => { await sendAuthEmail(user.email, "Janki パスワードの再設定", url) },
    minPasswordLength: 6,
    password: {
      hash: (password) => hash(password, 12),
      verify: ({ hash: digest, password }) => compare(password, digest),
    },
  },
  user: { additionalFields: { inviterId: { type: "string", required: false, input: true } }, changeEmail: { enabled: true, sendChangeEmailConfirmation: async ({user,newEmail,url}) => { await sendAuthEmail(user.email,"Janki メールアドレスの変更確認",url) } } },
  emailVerification: { sendOnSignUp: true, autoSignInAfterVerification: true, sendVerificationEmail: async ({ user, url }) => { await sendAuthEmail(user.email,"Janki メールアドレスの確認",url) } },
  advanced: { database: { generateId: () => crypto.randomUUID() } },
})
