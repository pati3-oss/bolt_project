import React, { useState } from 'react';
import { Compass, Heart, Trophy, Home, MessageCircle } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useCheckIns } from './hooks/useCheckIns';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import RelaxationHub from './components/RelaxationHub';
import CheckInSystem from './components/CheckInSystem';
import Achievements from './components/Achievements';
import WelcomeScreen from './components/WelcomeScreen';
import GroupChat from './components/GroupChat';

export interface User {
  name: string;
  streak: number;
  totalCheckIns: number;
  level: number;
  experience: number;
  badges: string[];
  lastCheckIn: string | null;
}

export interface CheckInData {
  mood: number;
  energy: number;
  stress: number;
  note?: string;
  date: string;
}

function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'dashboard' | 'relaxation' | 'checkin' | 'achievements' | 'chat'>('dashboard');
  const { user, userProfile, loading, updateUserProfile } = useAuth();
  const { checkInHistory, addCheckIn } = useCheckIns(user?.id);

  const handleCheckIn = async (data: Omit<CheckInData, 'date'>) => {
    if (!user || !userProfile) return;

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    try {
      await addCheckIn(data);

      // Update user stats
      const updatedUser = { ...userProfile };
      updatedUser.totalCheckIns += 1;
      updatedUser.experience += 10;

      // Handle streaks
      if (!userProfile.lastCheckIn || userProfile.lastCheckIn === yesterdayStr) {
        updatedUser.streak += 1;
      } else if (userProfile.lastCheckIn !== today) {
        updatedUser.streak = 1;
      }

      updatedUser.lastCheckIn = today;

      // Level up logic
      const expForNextLevel = updatedUser.level * 100;
      if (updatedUser.experience >= expForNextLevel) {
        updatedUser.level += 1;
        updatedUser.experience -= expForNextLevel;
      }

      // Award badges
      if (updatedUser.streak === 3 && !updatedUser.badges.includes('first-streak')) {
        updatedUser.badges.push('first-streak');
      }
      if (updatedUser.streak === 7 && !updatedUser.badges.includes('week-warrior')) {
        updatedUser.badges.push('week-warrior');
      }
      if (updatedUser.totalCheckIns === 10 && !updatedUser.badges.includes('dedication')) {
        updatedUser.badges.push('dedication');
      }

      await updateUserProfile(updatedUser);
      setCurrentView('dashboard');
    } catch (error) {
      console.error('Error submitting check-in:', error);
    }
  };

  if (!user) {
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-rose-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading anchor...</p>
          </div>
        </div>
      );
    }
    return <AuthScreen onAuthSuccess={() => {}} />;
  }

  if (loading || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading anchor...</p>
        </div>
      </div>
    );
  }

  // If user is signed in but hasn't completed the welcome flow (no name), show WelcomeScreen
  if (userProfile && !userProfile.name) {
    return (
      <WelcomeScreen
        onComplete={async (name: string) => {
          await updateUserProfile({ name });
          setCurrentView('dashboard');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-rose-50">
      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-white/20 z-50">
        <div className="flex justify-around items-center py-2 max-w-md mx-auto">
          {[
            { id: 'dashboard', icon: Home, label: 'Home' },
            { id: 'relaxation', icon: Compass, label: 'Relax' },
            { id: 'checkin', icon: Heart, label: 'Check-in' },
            { id: 'chat', icon: MessageCircle, label: 'Support' },
            { id: 'achievements', icon: Trophy, label: 'Rewards' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setCurrentView(id as any)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all ${
                currentView === id
                  ? 'bg-gradient-to-r from-orange-600 to-rose-500 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-20">
        {currentView === 'dashboard' && (
          <Dashboard 
            user={userProfile} 
            checkInHistory={checkInHistory} 
            onNavigate={setCurrentView}
          />
        )}
        {currentView === 'relaxation' && <RelaxationHub />}
  {currentView === 'checkin' && <CheckInSystem onSubmit={handleCheckIn} />}
  {currentView === 'chat' && <GroupChat />}
  {currentView === 'achievements' && userProfile && <Achievements user={userProfile} />}
      </main>
    </div>
  );
}

export default App;