/*
  # Optimize RLS Performance and Security

  ## Changes
  1. Optimize all RLS policies by wrapping auth.uid() in SELECT subquery
     - Prevents re-evaluation for each row, significantly improves performance at scale
  2. Fix function search path security for handle_new_user function
     - Set explicit search_path to prevent search path injection attacks

  ## Performance Notes
  - Using (select auth.uid()) evaluates the function once per query instead of per row
  - This is critical for performance when queries return many rows
  
  ## Security Notes
  - Setting search_path on functions prevents malicious schema injection
  - All policies maintain same security guarantees with better performance
*/

-- Drop and recreate all policies with optimized auth.uid() calls

-- User Profiles Policies
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can delete own profile" ON user_profiles;
CREATE POLICY "Users can delete own profile"
  ON user_profiles
  FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = id);

-- Check-ins Policies
DROP POLICY IF EXISTS "Users can read own check-ins" ON check_ins;
CREATE POLICY "Users can read own check-ins"
  ON check_ins
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert own check-ins" ON check_ins;
CREATE POLICY "Users can insert own check-ins"
  ON check_ins
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update own check-ins" ON check_ins;
CREATE POLICY "Users can update own check-ins"
  ON check_ins
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete own check-ins" ON check_ins;
CREATE POLICY "Users can delete own check-ins"
  ON check_ins
  FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- Fix function search path security
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger 
SECURITY INVOKER
SET search_path = public, auth
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'name', 'User'));
  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail auth
    RAISE WARNING 'Failed to create user profile: %', SQLERRM;
    RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION handle_new_user();