import React from 'react';
import { Trophy, Star, Flame, Heart, Calendar, Zap, Crown, Target } from 'lucide-react';
import { User } from '../App';

interface AchievementsProps {
  user: User;
}

const badgeDefinitions = {
  'first-streak': {
    name: 'First Steps',
    description: 'Complete your first 3-day streak',
    icon: Flame,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  'week-warrior': {
    name: 'Week Warrior',
    description: 'Maintain a 7-day check-in streak',
    icon: Crown,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  'dedication': {
    name: 'Dedicated Soul',
    description: 'Complete 10 total check-ins',
    icon: Heart,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100'
  },
  'month-master': {
    name: 'Month Master',
    description: 'Maintain a 30-day streak',
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  'energy-boost': {
    name: 'Energy Boost',
    description: 'Report high energy 5 days in a row',
    icon: Zap,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  'zen-master': {
    name: 'Zen Master',
    description: 'Report low stress for a whole week',
    icon: Target,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  }
};

export default function Achievements({ user }: AchievementsProps) {
  const earnedBadges = user.badges.map(badgeId => ({
    id: badgeId,
    ...badgeDefinitions[badgeId as keyof typeof badgeDefinitions]
  }));

  const upcomingBadges = Object.entries(badgeDefinitions)
    .filter(([id]) => !user.badges.includes(id))
    .map(([id, badge]) => ({
      id,
      ...badge
    }));

  const getProgressText = (badgeId: string) => {
    switch (badgeId) {
      case 'first-streak':
        return `${Math.min(user.streak, 3)}/3 days`;
      case 'week-warrior':
        return `${Math.min(user.streak, 7)}/7 days`;
      case 'dedication':
        return `${Math.min(user.totalCheckIns, 10)}/10 check-ins`;
      case 'month-master':
        return `${Math.min(user.streak, 30)}/30 days`;
      default:
        return 'In progress...';
    }
  };

  const getProgress = (badgeId: string) => {
    switch (badgeId) {
      case 'first-streak':
        return Math.min((user.streak / 3) * 100, 100);
      case 'week-warrior':
        return Math.min((user.streak / 7) * 100, 100);
      case 'dedication':
        return Math.min((user.totalCheckIns / 10) * 100, 100);
      case 'month-master':
        return Math.min((user.streak / 30) * 100, 100);
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen p-4 pt-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-6 w-18 h-18 bg-yellow-200/20 rounded-full animate-pulse" />
      <div className="absolute top-32 right-8 w-14 h-14 bg-orange-200/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-8 w-20 h-20 bg-pink-200/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-6 w-16 h-16 bg-purple-200/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/6 w-24 h-24 border border-yellow-300 rounded-full" />
        <div className="absolute top-2/3 right-1/6 w-20 h-20 border border-orange-300 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-pink-300 rounded-full" />
      </div>

      <div className="max-w-md mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden">
            <Trophy className="text-yellow-600 relative z-10" size={32} />
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-yellow-200 opacity-50 animate-pulse" />
            {/* Floating sparkles */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center space-x-2">
            <span>Achievements</span>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          </h1>
          <p className="text-gray-600 mt-1 flex items-center justify-center space-x-2">
            <span>{earnedBadges.length} of {Object.keys(badgeDefinitions).length} badges earned</span>
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-200/30 rounded-full -mr-8 -mt-8" />
          <div className="flex items-center justify-between mb-2 relative z-10">
            <span className="text-sm font-medium text-gray-700 flex items-center space-x-2">
              <span>Overall Progress</span>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((earnedBadges.length / Object.keys(badgeDefinitions).length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 relative">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-500 relative"
              style={{ width: `${(earnedBadges.length / Object.keys(badgeDefinitions).length) * 100}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Star className="text-yellow-500" size={20} />
              <span>Earned Badges</span>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            </h2>
            
            {earnedBadges.map((badge, index) => (
              <div key={badge.id} className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/20 relative overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-100 rounded-full -mr-8 -mt-8 opacity-50" />
                <div className="flex items-center space-x-4 relative z-10">
                  <div className={`w-12 h-12 ${badge.bgColor} rounded-full flex items-center justify-center relative`}>
                    <badge.icon className={badge.color} size={24} />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 flex items-center space-x-2">
                      <span>{badge.name}</span>
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                    </h3>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </div>
                  <div className="text-yellow-500 relative">
                    <Crown size={20} />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upcoming Badges */}
        {upcomingBadges.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <span>Next Goals</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            </h2>
            
            {upcomingBadges.slice(0, 3).map((badge, index) => {
              const progress = getProgress(badge.id);
              return (
                <div key={badge.id} className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/20 relative overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200/30 rounded-full -mr-8 -mt-8" />
                  <div className="flex items-center space-x-4 mb-3 relative z-10">
                    <div className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center opacity-60 relative`}>
                      <badge.icon className="text-gray-400" size={24} />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-400 rounded-full animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 flex items-center space-x-2">
                        <span>{badge.name}</span>
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                      </h3>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 relative z-10">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{getProgressText(badge.id)}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 relative">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-1.5 rounded-full transition-all duration-500 relative"
                        style={{ width: `${progress}%` }}
                      >
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -mr-8 -mt-8" />
          <h3 className="font-semibold text-gray-900 mb-3 relative z-10 flex items-center space-x-2">
            <span>Your Stats</span>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          </h3>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600 flex items-center justify-center space-x-1">
                <span>{user.streak}</span>
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              </p>
              <p className="text-sm text-gray-600">Current Streak</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600 flex items-center justify-center space-x-1">
                <span>{user.totalCheckIns}</span>
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              </p>
              <p className="text-sm text-gray-600">Total Check-ins</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600 flex items-center justify-center space-x-1">
                <span>Lv.{user.level}</span>
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
              </p>
              <p className="text-sm text-gray-600">Current Level</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600 flex items-center justify-center space-x-1">
                <span>{earnedBadges.length}</span>
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
              </p>
              <p className="text-sm text-gray-600">Badges Earned</p>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-200/30 rounded-full -mr-6 -mt-6" />
          <p className="text-gray-700 font-medium relative z-10 flex items-center justify-center space-x-2">
            <span>🌟 Keep up the amazing work! Every check-in brings you closer to your next achievement.</span>
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
          </p>
        </div>
      </div>
    </div>
  );
}