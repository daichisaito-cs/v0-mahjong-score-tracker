import { createAuthClient } from 'better-auth/client'
import { Query } from './query'
const authClient=createAuthClient()
const mapUser=(u:any)=>u?{...u,user_metadata:{display_name:u.name,needs_password:false}}:null
export function createNeonClient(){
 const send=async(path:string,body:any)=>{const r=await fetch(path,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});return r.json()}
 const current=async()=>{const r=await authClient.getSession();return {data:{session:r.data?{...r.data.session,user:mapUser(r.data.user)}:null,user:mapUser(r.data?.user)},error:r.error}}
 const auth={
 getSession:current,getUser:current,
 signInWithPassword:async({email,password}:any)=>{const r=await authClient.signIn.email({email,password});window.dispatchEvent(new Event('neon-auth'));return {data:r.data,error:r.error}},
 signUp:async({email,password,options}:any)=>{const r=await authClient.signUp.email({email,password,name:options?.data?.display_name||email.split('@')[0],callbackURL:'/dashboard',inviterId:options?.data?.inviter_id} as any);return {data:{...r.data,user:mapUser(r.data?.user)},error:r.error}},
 signOut:async()=>{const r=await authClient.signOut();window.dispatchEvent(new Event('neon-auth'));return r},
 resetPasswordForEmail:async(email:string,{redirectTo}:any)=>authClient.requestPasswordReset({email,redirectTo}),
 updateUser:async(values:any)=>values.email?authClient.changeEmail({newEmail:values.email,callbackURL:'/mypage'}):send('/api/neon/account',values),
 setSession:async(_:any)=>({error:{message:'旧認証リンクは再発行してください'}}),
 onAuthStateChange:(callback:(event:string,session:any)=>void)=>{const handler=()=>{void current().then(r=>callback('SIGNED_IN',r.data.session))};window.addEventListener('neon-auth',handler);return {data:{subscription:{unsubscribe:()=>window.removeEventListener('neon-auth',handler)}}}},
 }
 return {auth,from:(table:string)=>new Query(table,plan=>send('/api/neon/query',plan)),rpc:(name:string,args:any)=>send('/api/neon/query',{rpc:name,args}),
 storage:{from:(_:string)=>({upload:async(path:string,file:File)=>{const body=new FormData();body.set('path',path);body.set('file',file);const r=await fetch('/api/neon/avatar',{method:'POST',body});return r.json()},getPublicUrl:(path:string)=>({data:{publicUrl:'/api/neon/avatar?path='+encodeURIComponent(path)}})})},
 channel:(_:string)=>{let callback=()=>{};const channel:any={on:(_event:any,_filter:any,fn:()=>void)=>{callback=fn;return channel},subscribe:()=>{channel.timer=setInterval(()=>{if(document.visibilityState==='visible')callback()},360000);return channel}};return channel},removeChannel:(channel:any)=>{clearInterval(channel.timer)},
 }
}

export async function resetNeonPassword(token:string,newPassword:string){return authClient.resetPassword({token,newPassword})}
