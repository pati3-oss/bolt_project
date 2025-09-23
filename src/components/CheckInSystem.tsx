import React, { useState } from 'react';
import { Heart, Battery, Shield, MessageSquare, Send, Sparkles } from 'lucide-react';

interface CheckInSystemProps {
  onSubmit: (data: {
    mood: number;
    energy: number;
    stress: number;
    note?: string;
  }) => void;
}

const moodEmojis = ['😢', '😔', '😐', '😊', '😄'];
const energyLabels = ['Exhausted', 'Tired', 'Okay', 'Energized', 'Pumped'];
const stressLabels = ['Zen', 'Calm', 'Mild', 'Stressed', 'Overwhelmed'];

export default function CheckInSystem({ onSubmit }: CheckInSystemProps) {
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [stress, setStress] = useState(3);
  const [note, setNote] = useState('');
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'How are you feeling?',
      subtitle: 'Rate your overall mood today',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      value: mood,
      setValue: setMood,
      labels: moodEmojis,
      showEmojis: true
    },
    {
      title: 'What\'s your energy like?',
      subtitle: 'How energized do you feel right now?',
      icon: Battery,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      value: energy,
      setValue: setEnergy,
      labels: energyLabels
    },
    {
      title: 'How stressed are you?',
      subtitle: 'Rate your current stress level',
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      value: stress,
      setValue: setStress,
      labels: stressLabels
    },
    {
      title: 'Anything on your mind?',
      subtitle: 'Share what\'s happening today (optional)',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      isNote: true
    }
  ];

  const handleSubmit = () => {
    onSubmit({
      mood: mood + 1, // Convert to 1-5 scale
      energy: energy + 1,
      stress: stress + 1,
      note: note.trim() || undefined
    });
  };

  const currentStep = steps[step];

  return (
    <div className="min-h-screen p-4 pt-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-6 w-16 h-16 bg-pink-200/20 rounded-full animate-pulse" />
      <div className="absolute top-32 right-8 w-12 h-12 bg-blue-200/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-8 w-20 h-20 bg-purple-200/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-6 w-14 h-14 bg-yellow-200/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/6 w-24 h-24 border border-pink-300 rounded-full" />
        <div className="absolute top-2/3 right-1/6 w-20 h-20 border border-blue-300 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-purple-300 rounded-full" />
      </div>

      <div className="max-w-md mx-auto relative z-10">
        {/* Progress */}
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

        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-16 h-16 ${currentStep.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden`}>
            <currentStep.icon className={currentStep.color} size={32} />
            {/* Animated background effect */}
            <div className={`absolute inset-0 ${currentStep.bgColor} opacity-50 animate-pulse`} />
            {/* Floating sparkles */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-white/60 rounded-full animate-ping" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center space-x-2">
            <span>{currentStep.title}</span>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          </h1>
          <p className="text-gray-600">
            {currentStep.subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 border border-white/20 mb-6 relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-16 h-16 ${currentStep.bgColor} opacity-20 rounded-full -mr-8 -mt-8`} />
          
          {currentStep.isNote ? (
            <div className="space-y-4 relative z-10">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind today? How was your day? Any wins or challenges?"
                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition-all duration-200"
                rows={4}
              />
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4 flex items-center justify-center space-x-2">
                  <span>This helps us understand your patterns better</span>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 relative z-10">
              {/* Rating Scale */}
              <div className="flex justify-between items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => currentStep.setValue!(i)}
                    className={`w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center relative ${
                      currentStep.value === i
                        ? 'border-blue-500 bg-blue-500 text-white scale-110'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {currentStep.showEmojis ? (
                      <span className="text-xl">{currentStep.labels![i]}</span>
                    ) : (
                      <span className="font-semibold">{i + 1}</span>
                    )}
                    {/* Animated indicator for selected option */}
                    {currentStep.value === i && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
                    )}
                  </button>
                ))}
              </div>

              {/* Current Selection */}
              <div className="text-center">
                <p className="text-lg font-medium text-gray-900 flex items-center justify-center space-x-2">
                  {currentStep.showEmojis ? (
                    <span className="text-2xl">{currentStep.labels![currentStep.value!]}</span>
                  ) : (
                    <span>{currentStep.labels![currentStep.value!]}</span>
                  )}
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                </p>
              </div>

              {/* Scale Labels */}
              <div className="flex justify-between text-xs text-gray-500">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          )}
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
            onClick={() => {
              if (step < steps.length - 1) {
                setStep(step + 1);
              } else {
                handleSubmit();
              }
            }}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            {step === steps.length - 1 ? (
              <>
                <Send size={20} />
                <span>Complete Check-in</span>
              </>
            ) : (
              <>
                <span>Next</span>
                <Sparkles size={20} />
              </>
            )}
          </button>
        </div>

        {/* Encouragement */}
        <div className="mt-8 text-center relative">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 border border-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-blue-200/30 rounded-full -mr-6 -mt-6" />
            <p className="text-sm text-gray-700 font-medium relative z-10 flex items-center justify-center space-x-2">
              <span>You're doing great! Every check-in helps build better habits 💪</span>
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}