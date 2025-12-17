-- game_resultsにprofilesへの外部キーを追加
-- user_idはauth.usersを参照しているが、profilesも参照する必要がある

-- 既存の外部キー制約を削除（存在する場合）
ALTER TABLE game_results DROP CONSTRAINT IF EXISTS game_results_user_id_fkey;

-- profilesへの外部キーを追加（profilesはauth.usersと同じIDを持つ）
ALTER TABLE game_results 
ADD CONSTRAINT game_results_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- league_membersも同様に修正
ALTER TABLE league_members DROP CONSTRAINT IF EXISTS league_members_user_id_fkey;
ALTER TABLE league_members 
ADD CONSTRAINT league_members_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- gamesのcreated_byも修正
ALTER TABLE games DROP CONSTRAINT IF EXISTS games_created_by_fkey;
ALTER TABLE games 
ADD CONSTRAINT games_created_by_fkey 
FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE CASCADE;

-- leaguesのowner_idも修正
ALTER TABLE leagues DROP CONSTRAINT IF EXISTS leagues_owner_id_fkey;
ALTER TABLE leagues 
ADD CONSTRAINT leagues_owner_id_fkey 
FOREIGN KEY (owner_id) REFERENCES profiles(id) ON DELETE CASCADE;
