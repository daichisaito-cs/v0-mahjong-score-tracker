import { loadEnvFile } from 'node:process'
async function main() {
loadEnvFile('.env.local')
const { auth } = await import('../../lib/neon/auth')
const context = await auth.$context
await context.runMigrations()
const { Pool } = await import('pg')
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const client = await pool.connect()
try {
  await client.query('BEGIN')
  await client.query(`INSERT INTO "user" (id,name,email,"emailVerified","createdAt","updatedAt")
    SELECT id::text, coalesce(raw_user_meta_data->>'display_name',split_part(email,'@',1)),email,
      email_confirmed_at IS NOT NULL,coalesce(created_at,now()),now() FROM auth.users
    ON CONFLICT(id) DO NOTHING`)
  await client.query(`INSERT INTO account (id,"accountId","providerId","userId",password,"createdAt","updatedAt")
    SELECT gen_random_uuid()::text,id::text,'credential',id::text,encrypted_password,now(),now()
    FROM auth.users u WHERE coalesce(encrypted_password,'') <> ''
    AND NOT EXISTS (SELECT 1 FROM account a WHERE a."userId"=u.id::text AND a."providerId"='credential')`)
  await client.query('COMMIT')
  const counts=await client.query('SELECT (SELECT count(*) FROM "user") AS users,(SELECT count(*) FROM account) AS accounts')
  console.log('Authentication migration:',counts.rows[0])
} catch(e) { await client.query('ROLLBACK'); throw e } finally { client.release();await pool.end() }
process.exit(0)

}
main().catch(() => { console.error("Authentication migration failed"); process.exit(1) })
