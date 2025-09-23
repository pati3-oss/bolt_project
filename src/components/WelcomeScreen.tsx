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
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <AnchorLogo size={64} className="text-white" />
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
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Headphones size={16} />
              <span>AR/VR Ready</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
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
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center relative">
            <Headphones className="text-white" size={48} />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
              <Sparkles className="text-white" size={12} />
            </div>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Experience immersive 3D environments designed for stress relief. From serene forests 
            to calming oceans, escape into your perfect relaxation space with AR/VR technology.
          </p>
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-4 border border-green-100">
            <p className="text-sm text-green-700 font-medium">
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
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center relative">
            <Flame className="text-white" size={48} />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <Trophy className="text-white" size={16} />
            </div>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Build streaks, earn badges, and level up your wellness journey just like DuoLingo! 
            Daily check-ins that feel like a fun game, not clinical therapy.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
              <div className="flex items-center space-x-2">
                <Flame className="text-orange-500" size={16} />
                <span className="text-sm font-medium text-orange-700">Streak System</span>
              </div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-100">
              <div className="flex items-center space-x-2">
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
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <AnchorLogo size={40} className="text-white" />
            </div>
            <p className="text-blue-600 font-medium mb-4">Small steps, Stronger you</p>
          </div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
            autoFocus
          />
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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