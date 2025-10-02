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
    <div className="min-h-screen p-4 pt-8">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="text-yellow-600" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
          <p className="text-gray-600 mt-1">
            {earnedBadges.length} of {Object.keys(badgeDefinitions).length} badges earned
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm text-gray-500">
              {Math.round((earnedBadges.length / Object.keys(badgeDefinitions).length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(earnedBadges.length / Object.keys(badgeDefinitions).length) * 100}%` }}
            />
          </div>
        </div>

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Star className="text-yellow-500" size={20} />
              <span>Earned Badges</span>
            </h2>
            
            {earnedBadges.map((badge) => (
              <div key={badge.id} className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-100 rounded-full -mr-8 -mt-8 opacity-50" />
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${badge.bgColor} rounded-full flex items-center justify-center`}>
                    <badge.icon className={badge.color} size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{badge.name}</h3>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </div>
                  <div className="text-yellow-500">
                    <Crown size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upcoming Badges */}
        {upcomingBadges.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Next Goals</h2>
            
            {upcomingBadges.slice(0, 3).map((badge) => {
              const progress = getProgress(badge.id);
              return (
                <div key={badge.id} className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center opacity-60`}>
                      <badge.icon className="text-gray-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{badge.name}</h3>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{getProgressText(badge.id)}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
          <h3 className="font-semibold text-gray-900 mb-3">Your Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{user.streak}</p>
              <p className="text-sm text-gray-600">Current Streak</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{user.totalCheckIns}</p>
              <p className="text-sm text-gray-600">Total Check-ins</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">Lv.{user.level}</p>
              <p className="text-sm text-gray-600">Current Level</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{earnedBadges.length}</p>
              <p className="text-sm text-gray-600">Badges Earned</p>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-white/20">
          <p className="text-gray-700 font-medium">
            🌟 Keep up the amazing work! Every check-in brings you closer to your next achievement.
          </p>
        </div>
      </div>
    </div>
  );
}