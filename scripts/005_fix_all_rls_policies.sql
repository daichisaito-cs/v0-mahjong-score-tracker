-- すべてのRLSポリシーを無限再帰が発生しない形に修正
-- 方針: 各テーブルのSELECTポリシーは他のテーブルを参照せず、直接的な条件のみを使用

-- ============================================
-- 1. まず既存のSELECTポリシーをすべて削除
-- ============================================

DROP POLICY IF EXISTS "leagues_select_member" ON leagues;
DROP POLICY IF EXISTS "league_members_select_member" ON league_members;
DROP POLICY IF EXISTS "games_select_participant" ON games;
DROP POLICY IF EXISTS "game_results_select_participant" ON game_results;

-- 既存のヘルパー関数も削除
DROP FUNCTION IF EXISTS check_game_participant(uuid);

-- ============================================
-- 2. シンプルなSELECTポリシーを作成
-- ============================================

-- profiles: 認証済みユーザーは全員閲覧可能（友達の名前を見るため）
-- 既に profiles_select_all があるのでスキップ

-- leagues: 認証済みユーザーは全リーグを閲覧可能
-- （友達のリーグを見つけて参加するため）
CREATE POLICY "leagues_select_authenticated" ON leagues
  FOR SELECT
  TO authenticated
  USING (true);

-- league_members: 認証済みユーザーは全メンバーを閲覧可能
-- （リーグの参加者一覧を表示するため）
CREATE POLICY "league_members_select_authenticated" ON league_members
  FOR SELECT
  TO authenticated
  USING (true);

-- games: 認証済みユーザーは全ゲームを閲覧可能
-- （友達の対局履歴を見るため）
CREATE POLICY "games_select_authenticated" ON games
  FOR SELECT
  TO authenticated
  USING (true);

-- game_results: 認証済みユーザーは全結果を閲覧可能
-- （対局結果の詳細を見るため）
CREATE POLICY "game_results_select_authenticated" ON game_results
  FOR SELECT
  TO authenticated
  USING (true);
