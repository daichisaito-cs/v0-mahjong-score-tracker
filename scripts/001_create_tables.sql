-- ユーザープロフィールテーブル
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- リーグテーブル
CREATE TABLE IF NOT EXISTS leagues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  game_type TEXT NOT NULL CHECK (game_type IN ('four_player', 'three_player')),
  -- ルール設定
  uma_first INTEGER DEFAULT 30,
  uma_second INTEGER DEFAULT 10,
  uma_third INTEGER DEFAULT -10,
  uma_fourth INTEGER DEFAULT -30,
  oka INTEGER DEFAULT 0,
  starting_points INTEGER DEFAULT 25000,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- リーグメンバーテーブル
CREATE TABLE IF NOT EXISTS league_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  league_id UUID NOT NULL REFERENCES leagues(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(league_id, user_id)
);

-- 対局テーブル
CREATE TABLE IF NOT EXISTS games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_type TEXT NOT NULL CHECK (game_type IN ('four_player', 'three_player')),
  league_id UUID REFERENCES leagues(id) ON DELETE SET NULL,
  played_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 対局結果テーブル（各プレイヤーのスコア）
CREATE TABLE IF NOT EXISTS game_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  seat_index INTEGER NOT NULL CHECK (seat_index >= 1),
  rank INTEGER NOT NULL CHECK (rank >= 1 AND rank <= 4),
  raw_score INTEGER NOT NULL, -- 素点（例: 45000）
  point DECIMAL(10, 2) NOT NULL, -- 計算後のポイント（例: +50.00）
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(game_id, user_id)
);

-- RLS有効化
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leagues ENABLE ROW LEVEL SECURITY;
ALTER TABLE league_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_results ENABLE ROW LEVEL SECURITY;

-- profiles ポリシー
CREATE POLICY "profiles_select_all" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON profiles FOR DELETE USING (auth.uid() = id);

-- leagues ポリシー
CREATE POLICY "leagues_select_member" ON leagues FOR SELECT USING (
  owner_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM league_members WHERE league_id = id AND user_id = auth.uid())
);
CREATE POLICY "leagues_insert_auth" ON leagues FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "leagues_update_owner" ON leagues FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "leagues_delete_owner" ON leagues FOR DELETE USING (auth.uid() = owner_id);

-- league_members ポリシー
CREATE POLICY "league_members_select_member" ON league_members FOR SELECT USING (
  user_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM leagues WHERE id = league_id AND owner_id = auth.uid())
);
CREATE POLICY "league_members_insert_owner" ON league_members FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM leagues WHERE id = league_id AND owner_id = auth.uid())
);
CREATE POLICY "league_members_delete_owner" ON league_members FOR DELETE USING (
  EXISTS (SELECT 1 FROM leagues WHERE id = league_id AND owner_id = auth.uid())
);

-- games ポリシー
CREATE POLICY "games_select_participant" ON games FOR SELECT USING (
  created_by = auth.uid() OR
  EXISTS (SELECT 1 FROM game_results WHERE game_id = id AND user_id = auth.uid())
);
CREATE POLICY "games_insert_auth" ON games FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "games_update_creator" ON games FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "games_delete_creator" ON games FOR DELETE USING (auth.uid() = created_by);

-- game_results ポリシー
CREATE POLICY "game_results_select_participant" ON game_results FOR SELECT USING (
  user_id = auth.uid() OR
  EXISTS (SELECT 1 FROM games WHERE id = game_id AND created_by = auth.uid())
);
CREATE POLICY "game_results_insert_game_creator" ON game_results FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM games WHERE id = game_id AND created_by = auth.uid())
);
CREATE POLICY "game_results_update_game_creator" ON game_results FOR UPDATE USING (
  EXISTS (SELECT 1 FROM games WHERE id = game_id AND created_by = auth.uid())
);
CREATE POLICY "game_results_delete_game_creator" ON game_results FOR DELETE USING (
  EXISTS (SELECT 1 FROM games WHERE id = game_id AND created_by = auth.uid())
);
