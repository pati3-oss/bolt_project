import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CheckInData } from '../App';

export function useCheckIns(userId: string | undefined) {
  const [checkInHistory, setCheckInHistory] = useState<CheckInData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchCheckIns();
    }
  }, [userId]);

  const fetchCheckIns = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('check_ins')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false });

      if (error) throw error;

      const formattedData: CheckInData[] = data.map(item => ({
        mood: item.mood,
        energy: item.energy,
        stress: item.stress,
        note: item.note || undefined,
        date: item.date,
      }));

      setCheckInHistory(formattedData);
    } catch (error) {
      console.error('Error fetching check-ins:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCheckIn = async (checkInData: Omit<CheckInData, 'date'>) => {
    if (!userId) return;

    const today = new Date().toISOString().split('T')[0];

    try {
      const { error } = await supabase
        .from('check_ins')
        .insert({
          user_id: userId,
          mood: checkInData.mood,
          energy: checkInData.energy,
          stress: checkInData.stress,
          note: checkInData.note || null,
          date: today,
        });

      if (error) throw error;

      // Refresh check-ins
      await fetchCheckIns();
    } catch (error) {
      console.error('Error adding check-in:', error);
      throw error;
    }
  };

  return {
    checkInHistory,
    loading,
    addCheckIn,
  };
}