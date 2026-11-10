import {auth} from '@/lib/neon/auth'
import {pool} from '@/lib/neon/database'
export const runtime='nodejs'
export async function GET(request:Request){const path=new URL(request.url).searchParams.get('path');const r=await pool.query('SELECT data FROM app_assets WHERE path=$1',[path]);if(!r.rows[0])return new Response(null,{status:404});return new Response(r.rows[0].data,{headers:{'content-type':'image/jpeg','cache-control':'public, max-age=3600','x-content-type-options':'nosniff'}})}
export async function POST(request:Request){
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return Response.json({error:{message:'Invalid origin'}},{status:403})
 const session=await auth.api.getSession({headers:request.headers});if(!session)return Response.json({error:{message:'ログインが必要です'}},{status:401})
 const body=await request.formData();const file=body.get('file');const path=body.get('path')
 if(!(file instanceof File)||typeof path!=='string'||!path.startsWith(session.user.id+'/')||file.size>220000||file.type!=='image/jpeg')return Response.json({error:{message:'不正な画像です'}},{status:400})
 const bytes=Buffer.from(await file.arrayBuffer());if(bytes[0]!==255||bytes[1]!==216)return Response.json({error:{message:'JPEG画像を指定してください'}},{status:400})
 await pool.query('INSERT INTO app_assets(path,owner_id,data) VALUES($1,$2,$3) ON CONFLICT(path) DO UPDATE SET data=excluded.data WHERE app_assets.owner_id=excluded.owner_id',[path,session.user.id,bytes]);return Response.json({data:{path},error:null})
}
