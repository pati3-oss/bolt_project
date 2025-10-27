import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AnchorLogo from './AnchorLogo';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            },
          },
        });
        if (error) throw error;
      }
      onAuthSuccess();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-rose-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200/30 rounded-full animate-pulse" />
      <div className="absolute top-20 right-16 w-16 h-16 bg-pink-200/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-16 w-12 h-12 bg-amber-200/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 right-10 w-24 h-24 bg-pink-200/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-orange-300 rounded-full" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-pink-300 rounded-full" />
        <div className="absolute top-1/2 left-1/6 w-16 h-16 border border-amber-300 rounded-full" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-600 to-rose-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg relative overflow-hidden">
                <AnchorLogo size={40} className="text-white relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-rose-500 opacity-50 animate-pulse" />
              </div>
              {/* Floating elements around logo */}
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-orange-400 rounded-full animate-ping" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              <div className="absolute -bottom-1 -left-2 w-2.5 h-2.5 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">anchor</h1>
            <p className="text-orange-700 font-medium mb-4">Small steps, Stronger you</p>
            <p className="text-gray-600">
              {isLogin ? 'Welcome back! Sign in to continue your wellness journey.' : 'Join anchor and start building healthier habits today.'}
            </p>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-rose-500 text-white rounded-xl font-medium hover:from-orange-700 hover:to-rose-600 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>

          {/* Features Preview */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Sparkles size={16} className="text-orange-500" />
                <span>Daily Streaks</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-4 h-4 bg-green-500 rounded-full" />
                <span>AR/VR Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}