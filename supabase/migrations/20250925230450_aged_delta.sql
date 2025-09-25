/*
  # Create check-ins table

  1. New Tables
    - `check_ins`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `mood` (integer, 1-5 scale)
      - `energy` (integer, 1-5 scale)
      - `stress` (integer, 1-5 scale)
      - `note` (text, optional)
      - `date` (date)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `check_ins` table
    - Add policies for users to manage their own check-ins
*/

CREATE TABLE IF NOT EXISTS check_ins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  mood integer NOT NULL CHECK (mood >= 1 AND mood <= 5),
  energy integer NOT NULL CHECK (energy >= 1 AND energy <= 5),
  stress integer NOT NULL CHECK (stress >= 1 AND stress <= 5),
  note text,
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE check_ins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own check-ins"
  ON check_ins
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own check-ins"
  ON check_ins
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own check-ins"
  ON check_ins
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Index for better performance
CREATE INDEX IF NOT EXISTS check_ins_user_date_idx ON check_ins(user_id, date DESC);