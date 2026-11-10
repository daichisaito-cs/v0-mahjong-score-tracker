import { loadEnvFile } from 'node:process'
import { randomUUID } from 'node:crypto'
async function main() {
 loadEnvFile('.env.local')
 const {auth}=await import('../../lib/neon/auth')
 const {Pool}=await import('pg')
 const pool=new Pool({connectionString:process.env.DATABASE_URL})
 const email='delivered@resend.dev'
 const password=randomUUID()+randomUUID()
 let id:string|undefined
 try {
  const signup=await auth.api.signUpEmail({body:{email,password,name:'Migration test'}})
  id=signup.user.id
  await pool.query('UPDATE "user" SET "emailVerified"=true WHERE id=$1',[id])
  const login=await auth.api.signInEmail({body:{email,password}})
  if(login.user.id!==id) throw Error('Identity mismatch')
  let denied=false
  try {await auth.api.signInEmail({body:{email,password:'invalid-password'}})} catch {denied=true}
  if(!denied) throw Error('Invalid password accepted')
  const migrated=await pool.query(`SELECT count(*) AS count FROM auth.users u JOIN "user" b ON b.id=u.id::text JOIN account a ON a."userId"=b.id WHERE a.password=u.encrypted_password`)
  if(Number(migrated.rows[0].count)!==11) throw Error('Migrated accounts mismatch')
  console.log('PASS: login, password rejection, 11 preserved identities and password hashes')
 } finally {
  if(id) {
   await pool.query('DELETE FROM auth.users WHERE id=$1',[id])
   await pool.query('DELETE FROM session WHERE "userId"=$1',[id])
   await pool.query('DELETE FROM account WHERE "userId"=$1',[id])
   await pool.query('DELETE FROM "user" WHERE id=$1 AND email=$2',[id,email])
  }
  await pool.end()
 }
 process.exit(0)
}
main().catch(()=>{console.error('Authentication verification failed');process.exit(1)})
