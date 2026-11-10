import {loadEnvFile} from 'node:process'
import {parseEnv} from 'node:util'
import {readFileSync} from 'node:fs'
import {Pool} from 'pg'
async function main(){loadEnvFile('.env.local');const source=parseEnv(readFileSync('.env.prod','utf8')) as Record<string,string>;const target=new Pool({connectionString:process.env.DATABASE_URL});try{
await target.query('CREATE TABLE IF NOT EXISTS app_assets(path text PRIMARY KEY,owner_id uuid NOT NULL,data bytea NOT NULL)');await target.query('REVOKE ALL ON app_assets FROM PUBLIC,authenticated')
const rows:{name:string}[]=[]
async function list(prefix:string){const response=await fetch(source.NEXT_PUBLIC_SUPABASE_URL+'/storage/v1/object/list/avatars',{method:'POST',headers:{'content-type':'application/json',apikey:source.SUPABASE_SERVICE_ROLE_KEY,Authorization:'Bearer '+source.SUPABASE_SERVICE_ROLE_KEY},body:JSON.stringify({prefix,limit:1000})});if(!response.ok)throw Error('Cannot list existing avatars');for(const object of await response.json()){const name=prefix?prefix+'/'+object.name:object.name;if(object.id)rows.push({name});else await list(name)}}
await list('')
for(const {name} of rows){const url=source.NEXT_PUBLIC_SUPABASE_URL+'/storage/v1/object/public/avatars/'+name;const r=await fetch(url);if(!r.ok)throw Error('Avatar download failed');const data=Buffer.from(await r.arrayBuffer());await target.query('INSERT INTO app_assets(path,owner_id,data) VALUES($1,$2,$3) ON CONFLICT(path) DO UPDATE SET data=excluded.data',[name,name.split('/')[0],data]);await target.query('UPDATE profiles SET avatar_url=$1 WHERE avatar_url=$2',['/api/neon/avatar?path='+encodeURIComponent(name),url])}
console.log('Migrated avatar objects:',rows.length)
}finally{await target.end()}}
main().catch(e=>{console.error('Avatar migration failed:', e.message);process.exit(1)})
