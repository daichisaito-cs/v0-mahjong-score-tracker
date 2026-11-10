from pathlib import Path
from urllib.parse import urlparse,unquote
import os,subprocess,json
root=Path(__file__).resolve().parents[2]
def env(url):
 u=urlparse(url);return dict(os.environ,PGHOST=u.hostname,PGPORT=str(u.port or 5432),PGDATABASE=u.path.lstrip('/'),PGUSER=unquote(u.username),PGPASSWORD=unquote(u.password),PGSSLMODE='require',PGCONNECT_TIMEOUT='15')
d={k:v.strip().strip('"').strip("'") for l in (root/'.env.prod').read_text().splitlines() if '=' in l and not l.lstrip().startswith('#') for k,v in [l.split('=',1)]}
tables=['profiles','leagues','rules','league_members','games','game_results','friendships','user_game_rollups','league_user_game_rollups']
q='SELECT json_agg(s) FROM ('+' UNION ALL '.join("SELECT '"+t+"' AS name,count(*) AS count,md5(coalesce(string_agg((to_jsonb(t)-'avatar_url')::text,',' ORDER BY (to_jsonb(t)-'avatar_url')::text),'')) AS checksum FROM public."+t+" t" for t in tables)+') s'
def read(url):
 r=subprocess.run(['/opt/homebrew/opt/libpq/bin/psql','-X','-At','-v','ON_ERROR_STOP=1','-c',q],env=env(url),text=True,capture_output=True,timeout=60)
 if r.returncode:raise RuntimeError('Comparison query failed')
 return json.loads(r.stdout)
a=read(d['POSTGRES_URL_NON_POOLING']);b=read((root/'.git/neon-connection').read_text().strip())
ok=True
for x,y in zip(a,b):
 same=x==y;ok &= same;print(x['name'],x['count'],'MATCH' if same else 'DIFFERENT')
raise SystemExit(0 if ok else 1)
