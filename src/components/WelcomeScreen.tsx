import React, { useState } from 'react';
import { Compass, Heart, Sparkles, ChevronRight } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: (name: string) => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');

  const steps = [
    {
      title: 'Welcome to Anchor',
      subtitle: 'Your personal wellness companion',
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Compass className="text-white" size={48} />
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Find your calm in the storm of student life. Anchor combines immersive relaxation 
            with fun daily check-ins to help you stay balanced.
          </p>
        </div>
      )
    },
    {
      title: 'Immersive Relaxation',
      subtitle: 'Escape into peaceful environments',
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
            <Sparkles className="text-white" size={48} />
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Experience 3D environments designed for stress relief. From serene forests 
            to calming oceans, find your perfect relaxation space.
          </p>
        </div>
      )
    },
    {
      title: 'Gamified Wellness',
      subtitle: 'Make self-care fun and engaging',
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center">
            <Heart className="text-white" size={48} />
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Build streaks, earn badges, and level up your wellness journey. 
            Daily check-ins that feel like a game, not therapy.
          </p>
        </div>
      )
    },
    {
      title: 'What should we call you?',
      subtitle: 'Let\'s personalize your experience',
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Heart className="text-white" size={32} />
            </div>
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