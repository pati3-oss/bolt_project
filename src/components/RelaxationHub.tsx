import React, { useState } from 'react';
import { Mountain, Waves, TreePine, Cloud, Play, Volume2, VolumeX, ArrowLeft } from 'lucide-react';

const environments = [
  {
    id: 'forest',
    name: 'Peaceful Forest',
    description: 'Immerse yourself in a tranquil woodland with gentle bird songs',
    icon: TreePine,
    color: 'from-green-400 to-emerald-600',
    bgImage: 'https://images.pexels.com/photos/518489/pexels-photo-518489.jpeg?auto=compress&cs=tinysrgb&w=800',
    ambientSound: 'Forest birds and rustling leaves'
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    description: 'Relax by the endless ocean with soothing wave sounds',
    icon: Waves,
    color: 'from-blue-400 to-cyan-600',
    bgImage: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=800',
    ambientSound: 'Gentle ocean waves'
  },
  {
    id: 'mountain',
    name: 'Mountain Vista',
    description: 'Find peace in the majestic silence of mountain peaks',
    icon: Mountain,
    color: 'from-purple-400 to-indigo-600',
    bgImage: 'https://images.pexels.com/photos/147411/italy-mountains-pragser-wildsee-lake-147411.jpeg?auto=compress&cs=tinysrgb&w=800',
    ambientSound: 'Mountain wind and distant echoes'
  },
  {
    id: 'clouds',
    name: 'Above the Clouds',
    description: 'Float peacefully above a sea of fluffy white clouds',
    icon: Cloud,
    color: 'from-gray-300 to-blue-400',
    bgImage: 'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=800',
    ambientSound: 'Soft wind and distant thunder'
  }
];

export default function RelaxationHub() {
  const [selectedEnvironment, setSelectedEnvironment] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const environment = environments.find(env => env.id === selectedEnvironment);

  if (selectedEnvironment && environment) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${environment.bgImage})` }}
        >
          <div className="absolute inset-0 bg-black/30" />
          {/* Floating particles overlay */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping" />
            <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white/25 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-2.5 h-2.5 bg-white/15 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Controls */}
        <div className="relative z-10 p-4">
          <button
            onClick={() => setSelectedEnvironment(null)}
            className="mb-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="text-center text-white mb-8">
            <h1 className="text-3xl font-bold mb-2">{environment.name}</h1>
            <p className="text-white/80">{environment.description}</p>
          </div>
        </div>

        {/* Relaxation Interface */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
            {/* Audio Controls */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-4 bg-white rounded-full text-gray-800 hover:bg-white/90 transition-all shadow-lg hover:scale-105"
                >
                  <Play size={24} fill="currentColor" />
                </button>

                <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                  <span className="text-sm font-medium">5:00</span>
                </button>
              </div>

              <p className="text-white/80 text-sm">
                {environment.ambientSound}
              </p>

              {/* Breathing Guide */}
              <div className="mt-6">
                <div className="w-20 h-20 mx-auto relative">
                  <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-pulse" />
                  <div className="absolute inset-2 rounded-full border border-white/60 animate-ping" />
                  <div className="absolute inset-4 rounded-full bg-white/20 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/30 to-transparent animate-pulse" />
                  </div>
                  {/* Floating elements around breathing guide */}
                  <div className="absolute -top-2 -left-2 w-3 h-3 bg-white/40 rounded-full animate-ping" />
                  <div className="absolute -top-2 -right-2 w-2 h-2 bg-white/50 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute -bottom-2 -left-2 w-2.5 h-2.5 bg-white/30 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                  <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
                </div>
                <p className="text-white/80 text-sm mt-2 flex items-center justify-center space-x-2">
                  <span>Breathe in... and out...</span>
                  <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pt-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-16 left-6 w-20 h-20 bg-blue-200/20 rounded-full animate-pulse" />
      <div className="absolute top-24 right-8 w-16 h-16 bg-purple-200/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-8 w-24 h-24 bg-green-200/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-16 right-6 w-18 h-18 bg-pink-200/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-1/4 w-32 h-32 border border-blue-300 rounded-full" />
        <div className="absolute top-2/3 right-1/4 w-24 h-24 border border-purple-300 rounded-full" />
        <div className="absolute top-1/2 left-1/6 w-20 h-20 border border-green-300 rounded-full" />
      </div>

      <div className="max-w-md mx-auto space-y-6 relative z-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center space-x-2">
            <span>Relaxation Hub</span>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          </h1>
          <p className="text-gray-600 mt-1">Choose your perfect escape 🌿</p>
        </div>

        <div className="space-y-4">
          {environments.map((env, index) => (
            <button
              key={env.id}
              onClick={() => setSelectedEnvironment(env.id)}
              className="w-full p-6 rounded-3xl bg-white/80 backdrop-blur-lg border border-white/20 hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl group relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Floating decorative element */}
              <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${env.color} opacity-20 rounded-full -mr-8 -mt-8`} />
              
              <div 
                className="h-32 rounded-2xl mb-4 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${env.bgImage})` }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className={`absolute inset-0 bg-gradient-to-br ${env.color} opacity-60 group-hover:opacity-40 transition-opacity`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center relative">
                    <env.icon className="text-gray-700" size={24} />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-white/80 rounded-full animate-pulse" />
                  </div>
                </div>
                {/* Floating particles effect */}
                <div className="absolute top-2 left-2 w-2 h-2 bg-white/60 rounded-full animate-ping" />
                <div className="absolute top-4 right-3 w-1.5 h-1.5 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-3 left-4 w-1 h-1 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
              </div>
              
              <div className="text-left relative z-10">
                <h3 className="font-bold text-gray-900 mb-1 flex items-center space-x-2">
                  <span>{env.name}</span>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                </h3>
                <p className="text-sm text-gray-600">{env.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-200/30 rounded-full -mr-8 -mt-8" />
          <h3 className="font-semibold text-gray-900 mb-2 relative z-10 flex items-center space-x-2">
            <span>💡 Pro Tips</span>
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          </h3>
          <ul className="text-sm text-gray-600 space-y-1 relative z-10">
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              <span>Use headphones for the best experience</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span>Find a quiet, comfortable space</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              <span>Close your eyes and focus on your breathing</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
              <span>Start with 5-10 minute sessions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}