import {auth} from '@/lib/neon/auth'
import {pool} from '@/lib/neon/database'
import {hash} from 'bcryptjs'
export async function POST(request:Request){
 if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:{message:'Invalid origin'}},{status:403})
 const session=await auth.api.getSession({headers:request.headers});if(!session)return Response.json({error:{message:'ログインが必要です'}},{status:401})
 const values=await request.json()
 if(values.email)return Response.json({error:{message:'メールアドレス変更には確認メールの設定が必要です'}},{status:400})
 if(values.password){if(typeof values.password!=='string'||values.password.length<6)return Response.json({error:{message:'パスワードは6文字以上で入力してください'}},{status:400});if(Date.now()-new Date(session.session.createdAt).getTime()>600000)return Response.json({error:{message:'パスワード変更の前にもう一度ログインしてください'}},{status:401});await pool.query('UPDATE account SET password=$1,"updatedAt"=now() WHERE "userId"=$2 AND "providerId"=$3',[await hash(values.password,12),session.user.id,'credential']);await pool.query('DELETE FROM session WHERE "userId"=$1 AND id<>$2',[session.user.id,session.session.id])}
 return Response.json({data:{user:session.user},error:null})
}
