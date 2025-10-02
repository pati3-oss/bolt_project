export async function setupDatabase(): Promise<boolean> {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/setup-database`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('Database setup completed successfully');
      return true;
    } else {
      console.error('Database setup failed:', result.error);
      return false;
    }
  } catch (error) {
    console.error('Error setting up database:', error);
    return false;
  }
}