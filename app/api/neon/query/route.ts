import { auth } from '@/lib/neon/auth'
import { executeQuery,executeRpc } from '@/lib/neon/database'
export const runtime='nodejs'
export async function POST(request:Request){
 const origin=request.headers.get('origin')
 if(origin&&origin!==new URL(request.url).origin)return Response.json({error:{message:'Invalid origin'}},{status:403})
 const session=await auth.api.getSession({headers:request.headers})
 if(!session)return Response.json({data:null,error:{message:'ログインが必要です'}},{status:401})
 const body=await request.json()
 const result=body.rpc?await executeRpc(body.rpc,body.args,session.user.id):await executeQuery(body,session.user.id)
 return Response.json(result)
}
