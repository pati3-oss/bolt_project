/*
  # Fix Security Issues

  ## Changes
  1. Add WITH CHECK clause to UPDATE policies for both tables
  2. Add DELETE policies for user_profiles and check_ins tables
  3. Remove SECURITY DEFINER from trigger function (use SECURITY INVOKER instead)
  4. Recreate trigger with proper security context

  ## Security Notes
  - UPDATE policies now verify ownership on both USING and WITH CHECK
  - DELETE policies ensure users can only delete their own data
  - Trigger function no longer bypasses RLS
*/

-- Drop existing UPDATE policies and recreate with WITH CHECK
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own check-ins" ON check_ins;
CREATE POLICY "Users can update own check-ins"
  ON check_ins
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add DELETE policies
CREATE POLICY "Users can delete own profile"
  ON user_profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can delete own check-ins"
  ON check_ins
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Fix trigger function security
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger 
SECURITY INVOKER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO user_profiles (id, name)
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