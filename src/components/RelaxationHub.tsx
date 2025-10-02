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
                  <div className="absolute inset-4 rounded-full bg-white/20" />
                </div>
                <p className="text-white/80 text-sm mt-2">Breathe in... and out...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 pt-8">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Relaxation Hub</h1>
          <p className="text-gray-600 mt-1">Choose your perfect escape</p>
        </div>

        <div className="space-y-4">
          {environments.map((env) => (
            <button
              key={env.id}
              onClick={() => setSelectedEnvironment(env.id)}
              className="w-full p-6 rounded-3xl bg-white/80 backdrop-blur-lg border border-white/20 hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl group"
            >
              <div 
                className="h-32 rounded-2xl mb-4 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${env.bgImage})` }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className={`absolute inset-0 bg-gradient-to-br ${env.color} opacity-60 group-hover:opacity-40 transition-opacity`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <env.icon className="text-gray-700" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="text-left">
                <h3 className="font-bold text-gray-900 mb-1">{env.name}</h3>
                <p className="text-sm text-gray-600">{env.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
          <h3 className="font-semibold text-gray-900 mb-2">💡 Pro Tips</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Use headphones for the best experience</li>
            <li>• Find a quiet, comfortable space</li>
            <li>• Close your eyes and focus on your breathing</li>
            <li>• Start with 5-10 minute sessions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}