"""Restore the saved Supabase snapshot to the private Neon migration database.
Credentials and password hashes never appear in output. Production is not modified.
"""
import json
import os
from pathlib import Path
import subprocess
from urllib.parse import urlparse, unquote

ROOT = Path(__file__).resolve().parents[2]
BIN = Path('/opt/homebrew/opt/libpq/bin')

def connection(url):
    u = urlparse(url)
    return dict(os.environ, PGHOST=u.hostname, PGPORT=str(u.port or 5432),
                PGDATABASE=u.path.lstrip('/'), PGUSER=unquote(u.username),
                PGPASSWORD=unquote(u.password), PGSSLMODE='require', PGCONNECT_TIMEOUT='15')

def sql(env, query):
    result = subprocess.run([str(BIN/'psql'), '-X', '-v', 'ON_ERROR_STOP=1', '-At', '-c', query],
                            env=env, capture_output=True, text=True, timeout=60)
    if result.returncode:
        raise RuntimeError('Database operation failed: ' + result.stderr[:1000])
    return result.stdout.strip()

def main():
    if os.environ.get("ALLOW_INITIAL_STAGING_RESTORE") != "1":
        raise RuntimeError("Initial staging restore is disabled; it must never run against the live database")
    os.umask(0o077)
    settings = {}
    for line in (ROOT/'.env.prod').read_text().splitlines():
        if '=' in line and not line.lstrip().startswith('#'):
            key,value=line.split('=',1)
            settings[key]=value.strip().strip('"').strip("'")
    source=connection(settings['POSTGRES_URL_NON_POOLING'])
    target=connection((ROOT/'.git/neon-connection').read_text().strip())
    # Only the dedicated migration project may be overwritten.
    if target['PGHOST'] != 'ep-delicate-brook-aoyojxv5.c-2.ap-southeast-1.aws.neon.tech':
        raise RuntimeError('Unexpected migration destination')
    users=sql(source, "SELECT coalesce(json_agg(json_build_object('id',id,'email',email,'encrypted_password',encrypted_password,'raw_user_meta_data',raw_user_meta_data,'email_confirmed_at',email_confirmed_at,'created_at',created_at)), '[]') FROM auth.users")
    # Use a transaction so a failed restore leaves the existing staging copy intact.
    schema=subprocess.run([str(BIN/'pg_restore'),'--no-owner','--no-privileges','-f','-',str(ROOT/'.git/supabase-backup.dump')],capture_output=True,text=True,check=True).stdout
    # pg_restore's transaction control is supplied here instead.
    schema='\n'.join(line for line in schema.splitlines() if not line.startswith('\\restrict') and not line.startswith('\\unrestrict'))
    prefix="""BEGIN;
CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;
CREATE SCHEMA IF NOT EXISTS auth;
CREATE TABLE IF NOT EXISTS auth.users (
 id uuid PRIMARY KEY, email text, encrypted_password text,
 raw_user_meta_data jsonb DEFAULT '{}', email_confirmed_at timestamptz, created_at timestamptz DEFAULT now()
);
CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$
 SELECT nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
$$;
DO $$ BEGIN
 IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname='authenticated') THEN CREATE ROLE authenticated NOLOGIN; END IF;
END $$;
DROP SCHEMA public CASCADE;
"""
    # Dollar quote with a random delimiter to prevent data from becoming SQL.
    import secrets
    tag='$migration_'+secrets.token_hex(16)+'$'
    user_sql=f"""INSERT INTO auth.users SELECT * FROM json_populate_recordset(NULL::auth.users, {tag}{users}{tag}::json)
ON CONFLICT(id) DO UPDATE SET email=excluded.email, encrypted_password=excluded.encrypted_password,
raw_user_meta_data=excluded.raw_user_meta_data,email_confirmed_at=excluded.email_confirmed_at;\n"""
    suffix="""
GRANT USAGE ON SCHEMA public,auth TO authenticated;
GRANT SELECT,INSERT,UPDATE,DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON FUNCTION auth.uid() TO authenticated;
COMMIT;
"""
    script=prefix+user_sql+schema+suffix
    result=subprocess.run([str(BIN/'psql'),'-X','-v','ON_ERROR_STOP=1'],input=script,env=target,capture_output=True,text=True,timeout=120)
    if result.returncode:
        raise RuntimeError('Restore failed (transaction rolled back): '+result.stderr[-1500:])
    checks=sql(target,"SELECT json_build_object('games',(SELECT count(*) FROM public.games),'results',(SELECT count(*) FROM public.game_results),'profiles',(SELECT count(*) FROM public.profiles),'users',(SELECT count(*) FROM auth.users),'policies',(SELECT count(*) FROM pg_policies WHERE schemaname='public'),'constraints',(SELECT count(*) FROM pg_constraint WHERE connamespace='public'::regnamespace))")
    print(checks)

if __name__=='__main__':
    main()
