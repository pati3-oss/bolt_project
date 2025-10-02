const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // Get Supabase service role key from environment
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    
    if (!serviceRoleKey || !supabaseUrl) {
      throw new Error('Missing Supabase credentials');
    }

    // SQL to create the user_profiles table and related functions
    const migrationSQL = `
      -- Create user_profiles table if it doesn't exist
      CREATE TABLE IF NOT EXISTS user_profiles (
        id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        name text NOT NULL,
        streak integer DEFAULT 0,
        total_check_ins integer DEFAULT 0,
        level integer DEFAULT 1,
        experience integer DEFAULT 0,
        badges text[] DEFAULT '{}',
        last_check_in date,
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now()
      );

      -- Enable RLS
      ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

      -- Drop existing policies if they exist
      DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
      DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
      DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;

      -- Create RLS policies
      CREATE POLICY "Users can read own profile"
        ON user_profiles
        FOR SELECT
        TO authenticated
        USING (auth.uid() = id);

      CREATE POLICY "Users can update own profile"
        ON user_profiles
        FOR UPDATE
        TO authenticated
        USING (auth.uid() = id);

      CREATE POLICY "Users can insert own profile"
        ON user_profiles
        FOR INSERT
        TO authenticated
        WITH CHECK (auth.uid() = id);

      -- Function to automatically create profile on signup
      CREATE OR REPLACE FUNCTION handle_new_user()
      RETURNS trigger AS $$
      BEGIN
        INSERT INTO user_profiles (id, name)
        VALUES (new.id, COALESCE(new.raw_user_meta_data->>'name', 'User'));
        RETURN new;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      -- Drop existing trigger if it exists
      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

      -- Create trigger to create profile on signup
      CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION handle_new_user();
    `;

    // Execute the SQL using Supabase REST API
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        'apikey': serviceRoleKey,
      },
      body: JSON.stringify({ sql: migrationSQL })
    });

    if (!response.ok) {
      // Try alternative approach using direct SQL execution
      const sqlResponse = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Content-Type': 'application/sql',
          'apikey': serviceRoleKey,
        },
        body: migrationSQL
      });

      if (!sqlResponse.ok) {
        throw new Error(`Failed to execute migration: ${sqlResponse.statusText}`);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Database migration completed successfully' 
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error) {
    console.error('Migration error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});