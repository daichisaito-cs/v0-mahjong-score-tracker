import {execFile} from 'node:child_process'
import {promisify} from 'node:util'
import {writeFile,readFile,rm} from 'node:fs/promises'
import {randomUUID} from 'node:crypto'
const exec=promisify(execFile)
export function useVercelFetch(base:string){
 const original=globalThis.fetch
 globalThis.fetch=async(input:any,init?:RequestInit)=>{
 const request=new Request(input,init)
 if(!request.url.startsWith(base+'/'))return original(input,init)
 const id='.git/http-'+randomUUID();const files=[id+'.request',id+'.headers',id+'.response']
 try{
 const args=['--yes','vercel@latest','curl',new URL(request.url).pathname+new URL(request.url).search,'--deployment',base,'--scope','daichi-saitos-projects-113d7b60','--','--silent','--show-error','--max-time','60','--request',request.method,'--dump-header',files[1],'--output',files[2]]
 request.headers.forEach((value,key)=>args.push('--header',key+': '+value))
 if(request.body){await writeFile(files[0],new Uint8Array(await request.arrayBuffer()),{mode:0o600});args.push('--data-binary','@'+files[0])}
 await writeFile(files[1],'',{mode:0o600});await writeFile(files[2],'',{mode:0o600});await exec('npx',args,{maxBuffer:1024*1024,timeout:90000})
 const raw=await readFile(files[1],'utf8');const sections=raw.trim().split(/\r?\n\r?\n/);const lines=sections[sections.length-1].split(/\r?\n/);const status=Number(lines[0].split(' ')[1]);const headers=new Headers()
 for(const line of lines.slice(1)){const i=line.indexOf(':');if(i>0)headers.append(line.slice(0,i),line.slice(i+1).trim())}
 return new Response(status===204?null:new Uint8Array(await readFile(files[2])),{status,headers})
 }finally{await Promise.all(files.map(file=>rm(file,{force:true})))}
 }
}
