import {Query} from './query'
import {executeQuery,pool} from './database'
export function createNeonAdmin(){return {from:(table:string)=>new Query(table,plan=>executeQuery(plan,null,true)),auth:{admin:{
 listUsers:async({page=1,perPage=200}:any)=>{const r=await pool.query('SELECT id,email,email_confirmed_at FROM auth.users ORDER BY id LIMIT $1 OFFSET $2',[perPage,(page-1)*perPage]);return {data:{users:r.rows},error:null}},
 deleteUser:async(id:string)=>{const c=await pool.connect();try{await c.query('BEGIN');await c.query('DELETE FROM session WHERE "userId"=$1',[id]);await c.query('DELETE FROM account WHERE "userId"=$1',[id]);await c.query('DELETE FROM "user" WHERE id=$1',[id]);await c.query('DELETE FROM app_assets WHERE owner_id=$1',[id]);await c.query('DELETE FROM auth.users WHERE id=$1',[id]);await c.query('COMMIT');return {error:null}}catch{await c.query('ROLLBACK');return {error:{message:'アカウント削除に失敗しました'}}}finally{c.release()}},
 inviteUserByEmail:async(..._:any[])=>({error:{message:'招待メール送信の設定が必要です'}}),
}}}}
