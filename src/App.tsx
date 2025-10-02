import React, { useState, useEffect } from 'react';
import { Compass, Heart, Trophy, Calendar, Settings, Home } from 'lucide-react';
import Dashboard from './components/Dashboard';
import RelaxationHub from './components/RelaxationHub';
import CheckInSystem from './components/CheckInSystem';
import Achievements from './components/Achievements';
import WelcomeScreen from './components/WelcomeScreen';

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
  const [currentView, setCurrentView] = useState<'welcome' | 'dashboard' | 'relaxation' | 'checkin' | 'achievements'>('welcome');
  const [user, setUser] = useState<User | null>(null);
  const [checkInHistory, setCheckInHistory] = useState<CheckInData[]>([]);

  useEffect(() => {
    // Simulate loading user data
    const savedUser = localStorage.getItem('anchor-user');
    const savedHistory = localStorage.getItem('anchor-checkin-history');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentView('dashboard');
    }
    
    if (savedHistory) {
      setCheckInHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveUserData = (userData: User) => {
    localStorage.setItem('anchor-user', JSON.stringify(userData));
    setUser(userData);
  };

  const saveCheckInData = (checkInData: CheckInData[]) => {
    localStorage.setItem('anchor-checkin-history', JSON.stringify(checkInData));
    setCheckInHistory(checkInData);
  };

  const handleWelcomeComplete = (name: string) => {
    const newUser: User = {
      name,
      streak: 0,
      totalCheckIns: 0,
      level: 1,
      experience: 0,
      badges: [],
      lastCheckIn: null
    };
    saveUserData(newUser);
    setCurrentView('dashboard');
  };

  const handleCheckIn = (data: Omit<CheckInData, 'date'>) => {
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const newCheckIn: CheckInData = {
      ...data,
      date: today
    };

    const updatedHistory = [...checkInHistory, newCheckIn];
    saveCheckInData(updatedHistory);

    // Update user stats
    const updatedUser = { ...user };
    updatedUser.totalCheckIns += 1;
    updatedUser.experience += 10;

    // Handle streaks
    if (!user.lastCheckIn || user.lastCheckIn === yesterdayStr) {
      updatedUser.streak += 1;
    } else if (user.lastCheckIn !== today) {
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

    saveUserData(updatedUser);
    setCurrentView('dashboard');
  };

  if (currentView === 'welcome') {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-white/20 z-50">
        <div className="flex justify-around items-center py-2 max-w-md mx-auto">
          {[
            { id: 'dashboard', icon: Home, label: 'Home' },
            { id: 'relaxation', icon: Compass, label: 'Relax' },
            { id: 'checkin', icon: Heart, label: 'Check-in' },
            { id: 'achievements', icon: Trophy, label: 'Rewards' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setCurrentView(id as any)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all ${
                currentView === id
                  ? 'text-blue-600 bg-blue-100/50'
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
        {currentView === 'dashboard' && user && (
          <Dashboard 
            user={user} 
            checkInHistory={checkInHistory} 
            onNavigate={setCurrentView}
          />
        )}
        {currentView === 'relaxation' && <RelaxationHub />}
        {currentView === 'checkin' && <CheckInSystem onSubmit={handleCheckIn} />}
        {currentView === 'achievements' && user && <Achievements user={user} />}
      </main>
    </div>
  );
}

export default App;