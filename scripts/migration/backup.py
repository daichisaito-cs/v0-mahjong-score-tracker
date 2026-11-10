from pathlib import Path
from urllib.parse import urlparse,unquote
import os,subprocess
root=Path(__file__).resolve().parents[2];os.umask(0o077)
settings={k:v.strip().strip('"').strip("'") for l in (root/'.env.prod').read_text().splitlines() if '=' in l and not l.lstrip().startswith('#') for k,v in [l.split('=',1)]}
for label,url in [('source-precutover',settings['POSTGRES_URL_NON_POOLING']),('neon-precutover',(root/'.git/neon-connection').read_text().strip())]:
 u=urlparse(url);e=dict(os.environ,PGHOST=u.hostname,PGPORT=str(u.port or 5432),PGDATABASE=u.path.lstrip('/'),PGUSER=unquote(u.username),PGPASSWORD=unquote(u.password),PGSSLMODE='require',PGCONNECT_TIMEOUT='15')
 path=root/'.git'/(label+'.dump')
 command=['/opt/homebrew/opt/libpq/bin/pg_dump','--format=custom','--no-owner','--no-privileges','-f',str(path)]
 if label.startswith('source'):command+=['--schema=public','--schema=auth','--schema=storage']
 r=subprocess.run(command,env=e,capture_output=True,text=True,timeout=120)
 if r.returncode:raise RuntimeError('Backup failed: '+label)
 verify=subprocess.run(['/opt/homebrew/opt/libpq/bin/pg_restore','--list',str(path)],capture_output=True,text=True,timeout=15)
 if verify.returncode:raise RuntimeError('Backup verification failed')
 print(label,'backup verified',path.stat().st_size,'bytes',flush=True)
