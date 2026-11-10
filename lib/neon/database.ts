import { Pool, type PoolClient } from 'pg'
import type { QueryPlan } from './query'
export const pool=new Pool({connectionString:process.env.DATABASE_URL,max:5})
const tables=new Set(['profiles','games','game_results','friendships','leagues','league_members','rules','user_game_rollups','league_user_game_rollups'])
const ident=(v:string)=>{if(!/^[a-z_][a-z_0-9]*$/i.test(v))throw Error('Invalid identifier');return '"'+v+'"'}
function split(s:string):string[]{let depth=0,start=0,out:string[]=[];for(let i=0;i<s.length;i++){if(s[i]==='(')depth++;if(s[i]===')')depth--;if(s[i]===','&&depth===0){out.push(s.slice(start,i).trim());start=i+1}}out.push(s.slice(start).trim());return out.filter(Boolean)}
type FK={source:string;target:string;column:string;foreign_column:string;name:string}
let foreignKeys:FK[]|undefined
async function fks(client:PoolClient){if(!foreignKeys){foreignKeys=(await client.query(`SELECT c.conrelid::regclass::text AS source,c.confrelid::regclass::text AS target,a.attname AS column,b.attname AS foreign_column,c.conname AS name FROM pg_constraint c JOIN pg_attribute a ON a.attrelid=c.conrelid AND a.attnum=c.conkey[1] JOIN pg_attribute b ON b.attrelid=c.confrelid AND b.attnum=c.confkey[1] WHERE c.contype='f' AND c.connamespace='public'::regnamespace`)).rows}return foreignKeys}
export async function executeQuery(plan:QueryPlan,userId:string|null,admin=false):Promise<any>{
 if(!tables.has(plan.table))return {data:null,error:{message:'Unknown table'}}
 if(!admin&&!userId)return {data:null,error:{message:'ログインが必要です'}}
 const client=await pool.connect();const params:any[]=[];const bind=(value:any)=>{params.push(value);return '$'+params.length}
 try{
 await client.query('BEGIN');await client.query("SET LOCAL statement_timeout='15000'")
 if(!admin){await client.query('SET LOCAL ROLE authenticated');await client.query("SELECT set_config('request.jwt.claim.sub',$1,true)",[userId])}
 const keys=await fks(client)
 let serial=0
 const relation=(table:string,target:string,hint?:string)=>{const matches=keys.filter(f=>(f.source===table&&f.target===target)||(f.target===table&&f.source===target));return matches.find(f=>!hint||f.name===hint||f.column===hint)||matches[0]}
 function projection(table:string,alias:string,selection:string):string{
 let base='\'{}\'::jsonb';const parts:string[]=[]
 for(const field of split(selection)){
  if(field==='*'){base=`to_jsonb(${alias})`;continue}
  const nested=field.match(/^([a-z_0-9:!]+)\s*\(([\s\S]*)\)$/i)
  if(!nested){const [label,col]=field.includes(':')?field.split(':'):[field,field];parts.push(`${bind(label)}::text,to_jsonb(${alias}.${ident(col)})`);continue}
  const [name,hint]=nested[1].split('!');const [label,target]=name.includes(':')?name.split(':'):[name,name]
  if(!tables.has(target))throw Error('Unknown relationship')
  const fk=relation(table,target,hint);if(!fk)throw Error('Missing relationship')
  const child='r'+(++serial);const direct=fk.source===table
  const join=direct?`${child}.${ident(fk.foreign_column)}=${alias}.${ident(fk.column)}`:`${child}.${ident(fk.column)}=${alias}.${ident(fk.foreign_column)}`
  const sub=nested[2].trim()==='count'?"'{}'::jsonb":projection(target,child,nested[2]);const filter=plan.filters.filter(f=>f.key?.startsWith(target+'.')).map(f=>condition({...f,key:f.key.slice(target.length+1)},child)).join(' AND ')
  const where=join+(filter?' AND '+filter:'')
  const expr=nested[2].trim()==='count'?`(SELECT jsonb_build_array(jsonb_build_object('count',count(*))) FROM public.${ident(target)} ${child} WHERE ${where})`:direct?`(SELECT ${sub} FROM public.${ident(target)} ${child} WHERE ${where} LIMIT 1)`:`COALESCE((SELECT jsonb_agg(${sub}) FROM public.${ident(target)} ${child} WHERE ${where}),'[]'::jsonb)`
  parts.push(`${bind(label)}::text,${expr}`)
 }
 return base+(parts.length?' || jsonb_build_object('+parts.join(',')+')':'')
 }
 function condition(f:any,alias:string):string{
  if(f.op==='or'){
   const clause=(value:string):string=>{const group=value.match(/^(and|or)\(([\s\S]*)\)$/);if(group)return '('+split(group[2]).map(clause).join(group[1]==='and'?' AND ':' OR ')+')';const m=value.match(/^([a-z_]+)\.(eq|in)\.([\s\S]*)$/);if(!m)throw Error('Invalid filter');return condition({key:m[1],op:m[2],value:m[2]==='in'?split(m[3].replace(/^\(|\)$/g,'')):m[3]},alias)}
   return '('+split(f.value).map(clause).join(' OR ')+')'
  }
  const col=alias+'.'+ident(f.key)
  if(f.op==='eq')return f.value===null?col+' IS NULL':col+'='+bind(f.value)
  if(f.op==='in')return f.value.length?col+' IN ('+f.value.map(bind).join(',')+')':'FALSE'
  if(f.op==='not.is'&&f.value===null)return col+' IS NOT NULL'
  throw Error('Unsupported filter')
 }
 const where=plan.filters.filter(f=>!f.key?.includes('.')).map(f=>condition(f,'t')).join(' AND ')
 let statement:string
 if(plan.action==='select'){
 const select=projection(plan.table,'t',plan.select||'*')
 const order=plan.orders.map(o=>'t.'+ident(o.key)+(o.ascending?' ASC':' DESC')).join(',')
 statement=`SELECT ${select} AS row FROM public.${ident(plan.table)} t${where?' WHERE '+where:''}${order?' ORDER BY '+order:''} LIMIT ${bind(Math.min(plan.limit??10000,10000))} OFFSET ${bind(plan.offset??0)}`
 }else{
 const values=Array.isArray(plan.values)?plan.values:[plan.values]
 if(plan.action==='insert'){
 if(!values.length){await client.query('ROLLBACK');return {data:[],error:null}}
 const columns=Object.keys(values[0]);statement=`INSERT INTO public.${ident(plan.table)} (${columns.map(ident)}) VALUES ${values.map(v=>'('+columns.map(c=>bind(v[c]??null)).join(',')+')').join(',')} RETURNING to_jsonb(${ident(plan.table)}.*) AS row`
 }else if(plan.action==='update'){
 if(!where)throw Error('Update filter required')
 statement=`UPDATE public.${ident(plan.table)} t SET ${Object.keys(plan.values).map(k=>ident(k)+'='+bind(plan.values[k])).join(',')} WHERE ${where} RETURNING to_jsonb(t.*) AS row`
 }else if(plan.action==='delete'){
 if(!where)throw Error('Delete filter required')
 statement=`DELETE FROM public.${ident(plan.table)} t WHERE ${where} RETURNING to_jsonb(t.*) AS row`
 }else throw Error('Unknown action')
 }
 const result=await client.query(statement,params);await client.query('COMMIT');const rows=result.rows.map(r=>r.row)
 if(plan.single){if(rows.length>1||(plan.single==='required'&&rows.length!==1))return {data:null,error:{message:'Expected one row'}};return {data:rows[0]??null,error:null}}
 return {data:rows,error:null}
 }catch(e){await client.query('ROLLBACK');console.error('Neon query failed',e instanceof Error?e.message:'unknown');return {data:null,error:{message:'データ処理に失敗しました'}}}finally{client.release()}
}
export async function executeRpc(name:string,args:any,userId:string|null){if(!userId)return {data:null,error:{message:'ログインが必要です'}};const allowed:Record<string,string[]>= {ensure_league_friendships:['p_league_id'],rollup_and_prune_games_for_user:['p_keep']};if(!allowed[name])return {data:null,error:{message:'Unknown function'}};const c=await pool.connect();try{await c.query('BEGIN');await c.query('SET LOCAL ROLE authenticated');await c.query("SELECT set_config('request.jwt.claim.sub',$1,true)",[userId]);const keys=allowed[name];const r=await c.query(`SELECT public.${ident(name)}(${keys.map((k,i)=>ident(k)+' => $'+(i+1)).join(',')}) AS value`,keys.map(k=>args[k]));await c.query('COMMIT');return {data:r.rows[0].value,error:null}}catch{await c.query('ROLLBACK');return {data:null,error:{message:'処理に失敗しました'}}}finally{c.release()}}
