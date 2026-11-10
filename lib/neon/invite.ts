import {randomUUID} from 'node:crypto'
import {hash} from 'bcryptjs'
import {pool} from './database'
import {auth} from './auth'
export async function inviteUser(email:string,inviterId:string,baseUrl:string){
 const existing=await pool.query('SELECT u.id,u."emailVerified",a.raw_user_meta_data FROM "user" u LEFT JOIN auth.users a ON a.id::text=u.id WHERE lower(u.email)=lower($1)',[email])
 if(existing.rowCount){const user=existing.rows[0];if(user.emailVerified||user.raw_user_meta_data?.inviter_id!==inviterId)throw Error('このメールアドレスは既に登録済みです');await auth.api.requestPasswordReset({body:{email,redirectTo:baseUrl+'/auth/reset-password'}});return}
 const id=randomUUID();const c=await pool.connect()
 try{await c.query('BEGIN');const exists=await c.query('SELECT id FROM "user" WHERE lower(email)=lower($1)',[email]);if(exists.rowCount)throw Error('このメールアドレスは既に登録済みです');const name=email.split('@')[0]
 await c.query('INSERT INTO "user"(id,name,email,"emailVerified","createdAt","updatedAt") VALUES($1,$2,$3,false,now(),now())',[id,name,email]);await c.query('INSERT INTO account(id,"accountId","providerId","userId",password,"createdAt","updatedAt") VALUES($1,$2,\'credential\',$2,$3,now(),now())',[randomUUID(),id,await hash(randomUUID(),12)])
 await c.query('INSERT INTO auth.users(id,email,raw_user_meta_data) VALUES($1,$2,$3)',[id,email,JSON.stringify({display_name:name,inviter_id:inviterId})]);await c.query('INSERT INTO profiles(id,display_name,email) VALUES($1,$2,$3)',[id,name,email]);await c.query('INSERT INTO friendships(requester_id,addressee_id,status) VALUES($1,$2,\'accepted\')',[inviterId,id]);await c.query('COMMIT')
 }catch(e){await c.query('ROLLBACK');throw e}finally{c.release()}
 await auth.api.requestPasswordReset({body:{email,redirectTo:baseUrl+'/auth/reset-password'}})
}
