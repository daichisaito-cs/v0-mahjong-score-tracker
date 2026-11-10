import { headers } from 'next/headers'
import { auth } from './auth'
import { Query } from './query'
import { executeQuery,executeRpc } from './database'
export async function createNeonServer(){
 const session=await auth.api.getSession({headers:await headers()})
 const user=session?.user?{...session.user,user_metadata:{display_name:session.user.name,needs_password:false}}:null
 return {auth:{getUser:async()=>({data:{user},error:null}),getSession:async()=>({data:{session:user?{user}:null},error:null})},from:(table:string)=>new Query(table,plan=>executeQuery(plan,user?.id??null)),rpc:(name:string,args:any)=>executeRpc(name,args,user?.id??null)}
}
