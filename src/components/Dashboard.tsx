import React from 'react';
import { Calendar, Flame, Star, TrendingUp, Heart, Compass, MessageCircle } from 'lucide-react';
import { User, CheckInData } from '../App';
import AnchorLogo from './AnchorLogo';

interface DashboardProps {
  user: User;
  checkInHistory: CheckInData[];
  onNavigate: (view: 'relaxation' | 'checkin' | 'chat') => void;
}

export default function Dashboard({ user, checkInHistory, onNavigate }: DashboardProps) {
  const today = new Date().toISOString().split('T')[0];
  const hasCheckedInToday = checkInHistory.some(entry => entry.date === today);
  
  const recentMoods = checkInHistory.slice(-7).map(entry => entry.mood);
  const avgMood = recentMoods.length > 0 
    ? recentMoods.reduce((a, b) => a + b, 0) / recentMoods.length 
    : 0;

  const expForNextLevel = user.level * 100;
  const expProgress = (user.experience / expForNextLevel) * 100;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getMoodEmoji = (mood: number) => {
    if (mood >= 4) return '😊';
    if (mood >= 3) return '😐';
    return '😔';
  };

  return (
    <div className="min-h-screen p-4 pt-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-4 w-16 h-16 bg-blue-200/20 rounded-full animate-pulse" />
      <div className="absolute top-32 right-8 w-12 h-12 bg-purple-200/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-8 w-20 h-20 bg-pink-200/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-4 w-14 h-14 bg-indigo-200/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/6 w-24 h-24 border border-blue-300 rounded-full" />
        <div className="absolute top-2/3 right-1/6 w-20 h-20 border border-purple-300 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-pink-300 rounded-full" />
      </div>

      <div className="max-w-md mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 relative">
          <div className="flex items-center justify-center space-x-3 relative">
            <div className="relative">
              <AnchorLogo size={32} className="text-blue-600 relative z-10" />
              {/* Floating sparkles around logo */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">anchor</h2>
              <p className="text-xs text-blue-600 font-medium">Small steps, Stronger you</p>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {getGreeting()}, {user.name}! 👋
          </h1>
          <p className="text-gray-600 mt-1">How are you feeling today?</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-orange-200/30 rounded-full -mr-6 -mt-6" />
            <div className="flex items-center space-x-3 relative z-10">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center relative">
                <Flame className="text-orange-600" size={20} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{user.streak}</p>
                <p className="text-sm text-gray-600">Day Streak</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-blue-200/30 rounded-full -mr-6 -mt-6" />
            <div className="flex items-center space-x-3 relative z-10">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center relative">
                <Star className="text-blue-600" size={20} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-ping" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">Lv.{user.level}</p>
                <p className="text-sm text-gray-600">Level</p>
              </div>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -mr-8 -mt-8" />
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-sm font-medium text-gray-700">
              Level {user.level} Progress
            </span>
            <span className="text-sm text-gray-500">
              {user.experience}/{expForNextLevel} XP
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 relative">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 relative"
              style={{ width: `${expProgress}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <span>Quick Actions</span>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          </h2>
          
          <button
            onClick={() => onNavigate('checkin')}
            disabled={hasCheckedInToday}
            className={`w-full p-4 rounded-2xl border transition-all relative overflow-hidden ${
              hasCheckedInToday
                ? 'bg-green-50 border-green-200 cursor-not-allowed'
                : 'bg-white/80 backdrop-blur-lg border-white/20 hover:scale-[1.02] shadow-lg hover:shadow-xl'
            }`}
          >
            <div className={`absolute top-0 right-0 w-16 h-16 rounded-full -mr-8 -mt-8 ${
              hasCheckedInToday ? 'bg-green-200/30' : 'bg-pink-200/30'
            }`} />
            <div className="flex items-center space-x-4 relative z-10">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center relative ${
                hasCheckedInToday ? 'bg-green-100' : 'bg-pink-100'
              }`}>
                <Heart className={hasCheckedInToday ? 'text-green-600' : 'text-pink-600'} size={24} />
                {!hasCheckedInToday && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-400 rounded-full animate-ping" />
                )}
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">
                  {hasCheckedInToday ? 'Checked in today! ✅' : 'Daily Check-in'}
                </h3>
                <p className="text-sm text-gray-600">
                  {hasCheckedInToday 
                    ? 'Come back tomorrow for your next check-in' 
                    : 'Share how you\'re feeling today'
                  }
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('relaxation')}
            className="w-full p-4 rounded-2xl bg-white/80 backdrop-blur-lg border border-white/20 hover:scale-[1.02] shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200/30 rounded-full -mr-8 -mt-8" />
            <div className="flex items-center space-x-4 relative z-10">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center relative">
                <Compass className="text-blue-600" size={24} />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Relaxation Hub</h3>
                <p className="text-sm text-gray-600">
                  Explore immersive environments for stress relief
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('chat')}
            className="w-full p-4 rounded-2xl bg-white/80 backdrop-blur-lg border border-white/20 hover:scale-[1.02] shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-green-200/30 rounded-full -mr-8 -mt-8" />
            <div className="flex items-center space-x-4 relative z-10">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center relative">
                <MessageCircle className="text-green-600" size={24} />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900">Peer Support</h3>
                <p className="text-sm text-gray-600">
                  Connect with others in anonymous support groups
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Recent Mood Trend */}
        {checkInHistory.length > 0 && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -mr-10 -mt-10" />
            <div className="flex items-center justify-between mb-3 relative z-10">
              <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                <span>This Week's Mood</span>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              </h3>
              <div className="flex items-center space-x-1">
                <TrendingUp className="text-green-500" size={16} />
                <span className="text-sm text-gray-600">
                  {avgMood.toFixed(1)}/5 {getMoodEmoji(avgMood)}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-1 relative z-10">
              {Array.from({ length: 7 }, (_, i) => {
                const dayMood = recentMoods[i];
                return (
                  <div key={i} className="flex-1 bg-gray-200 rounded h-8 relative overflow-hidden">
                    {dayMood && (
                      <div 
                        className="bg-gradient-to-t from-blue-400 to-blue-500 rounded absolute bottom-0 left-0 right-0 transition-all relative"
                        style={{ height: `${(dayMood / 5) * 100}%` }}
                      >
                        {/* Shine effect on mood bars */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 mt-2 relative z-10">
              <span>7 days ago</span>
              <span>Today</span>
            </div>
          </div>
        )}

        {/* Recent Badges */}
        {user.badges.length > 0 && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-200/30 rounded-full -mr-8 -mt-8" />
            <h3 className="font-semibold text-gray-900 mb-3 relative z-10 flex items-center space-x-2">
              <span>Recent Achievements</span>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            </h3>
            <div className="flex space-x-2 relative z-10">
              {user.badges.slice(-3).map((badge, index) => (
                <div key={index} className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center relative">
                  <Star className="text-yellow-600" size={20} />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
                </div>
              ))}
              {user.badges.length > 3 && (
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center relative">
                  <span className="text-gray-600 text-sm font-medium">+{user.badges.length - 3}</span>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-400 rounded-full animate-pulse" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}