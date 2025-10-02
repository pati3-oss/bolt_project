import React, { useState } from 'react';
import { Heart, Sparkles, ChevronRight, Flame, Trophy, Headphones } from 'lucide-react';
import AnchorLogo from './AnchorLogo';

interface WelcomeScreenProps {
  onComplete: (name: string) => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');

  const steps = [
    {
      title: 'anchor',
      subtitle: 'Small steps, Stronger you',
      content: (
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden">
              <AnchorLogo size={64} className="text-white relative z-10" />
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-50 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full animate-bounce" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-pink-300 rounded-full animate-pulse" />
            </div>
            {/* Floating sparkles around logo */}
            <div className="absolute -top-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
            <div className="absolute -top-1 -right-3 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -bottom-2 -right-1 w-2.5 h-2.5 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-gray-900 tracking-wide">anchor</h2>
            <p className="text-xl text-blue-600 font-medium">Small steps, Stronger you</p>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Find your calm in the storm of student life. Every small step builds resilience. Anchor combines immersive AR/VR relaxation 
            environments with gamified daily check-ins to help you stay balanced and motivated.
          </p>
          <div className="flex justify-center space-x-6 pt-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full">
              <Headphones size={16} />
              <span>AR/VR Ready</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full">
              <Flame size={16} />
              <span>Streak System</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'AR/VR Relaxation Environments',
      subtitle: 'Immersive spaces for stress relief (long-term vision)',
      content: (
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center relative overflow-hidden">
              <Headphones className="text-white relative z-10" size={48} />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="text-white" size={12} />
              </div>
              {/* Animated rings */}
              <div className="absolute inset-0 border-2 border-green-300 rounded-full animate-ping" />
              <div className="absolute inset-2 border border-teal-300 rounded-full animate-pulse" />
            </div>
            {/* Floating elements around VR icon */}
            <div className="absolute -top-3 -left-3 w-4 h-4 bg-green-300 rounded-full animate-bounce" />
            <div className="absolute -bottom-2 -right-4 w-3 h-3 bg-teal-300 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }} />
            <div className="absolute top-1/2 -left-6 w-2 h-2 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '1.2s' }} />
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Experience immersive 3D environments designed for stress relief. From serene forests 
            to calming oceans, escape into your perfect relaxation space with AR/VR technology.
          </p>
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-4 border border-green-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-green-200/30 rounded-full -mr-8 -mt-8" />
            <p className="text-sm text-green-700 font-medium relative z-10">
              🌟 Future Vision: Full AR/VR integration for complete immersion
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Gamified Progress / DuoLingo-Style Streaks',
      subtitle: 'Encourage daily check-ins without making it clinical',
      content: (
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center relative overflow-hidden">
              <Flame className="text-white relative z-10" size={48} />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <Trophy className="text-white" size={16} />
              </div>
              {/* Animated fire effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-400 to-red-500 opacity-30 animate-pulse" />
            </div>
            {/* Floating achievement elements */}
            <div className="absolute -top-4 -left-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce" />
            <div className="absolute -top-2 -right-4 w-4 h-4 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -bottom-3 -left-4 w-5 h-5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 -right-6 w-3 h-3 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Build streaks, earn badges, and level up your wellness journey just like DuoLingo! 
            Daily check-ins that feel like a fun game, not clinical therapy.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-orange-50 rounded-lg p-3 border border-orange-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-8 bg-orange-200/50 rounded-full -mr-4 -mt-4" />
              <div className="flex items-center space-x-2 relative z-10">
                <Flame className="text-orange-500" size={16} />
                <span className="text-sm font-medium text-orange-700">Streak System</span>
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-200/50 rounded-full -mr-4 -mt-4" />
              <div className="flex items-center space-x-2 relative z-10">
                <Trophy className="text-yellow-600" size={16} />
                <span className="text-sm font-medium text-yellow-700">Achievements</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'What should we call you?',
      subtitle: 'Let\'s personalize your experience',
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg relative overflow-hidden">
                <AnchorLogo size={40} className="text-white relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-50 animate-pulse" />
              </div>
              {/* Floating elements around logo */}
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-400 rounded-full animate-ping" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
              <div className="absolute -bottom-1 -left-2 w-2.5 h-2.5 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
            </div>
            <p className="text-blue-600 font-medium mb-4">Small steps, Stronger you</p>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg transition-all duration-200"
              autoFocus
            />
            {/* Decorative elements around input */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-200/50 rounded-full animate-pulse" />
            <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-purple-200/50 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }} />
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else if (name.trim()) {
      onComplete(name.trim());
    }
  };

  const isLastStep = step === steps.length - 1;
  const canProceed = !isLastStep || name.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full animate-pulse" />
      <div className="absolute top-20 right-16 w-16 h-16 bg-purple-200/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-16 w-12 h-12 bg-indigo-200/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-32 right-10 w-24 h-24 bg-pink-200/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-300 rounded-full" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-purple-300 rounded-full" />
        <div className="absolute top-1/2 left-1/6 w-16 h-16 border border-indigo-300 rounded-full" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
          {/* Progress indicator */}
          <div className="flex space-x-2 mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  index <= step ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="space-y-6 mb-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {steps[step].title}
              </h1>
              <p className="text-gray-600">
                {steps[step].subtitle}
              </p>
            </div>
            {steps[step].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                canProceed
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>{isLastStep ? 'Get Started' : 'Next'}</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}