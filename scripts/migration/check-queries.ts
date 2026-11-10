import {loadEnvFile} from 'node:process'
async function main(){
loadEnvFile('.env.local')
const {pool,executeQuery}=await import('../../lib/neon/database')
const id=(await pool.query('SELECT id FROM auth.users LIMIT 1')).rows[0].id
for(const [table,select] of [['profiles','id,display_name'],['game_results','id,rank,games(game_type,played_at)'],['league_members','user_id,profiles(id,display_name)'],['games','*,game_results(*)']]){
 const r=await executeQuery({table,action:'select',select,filters:[],orders:[],limit:3},id)
 if(r.error)throw Error(table+': '+r.error.message)
 console.log('PASS',table,r.data.length)
}
const denied=await executeQuery({table:'profiles',action:'select',filters:[],orders:[]},null)
if(!denied.error)throw Error('Anonymous query permitted')
console.log('PASS anonymous rejection')
await pool.end();process.exit(0)
}
main().catch(e=>{console.error(e.message);process.exit(1)})
