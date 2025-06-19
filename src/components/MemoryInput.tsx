import React, { useState } from 'react';
import { Plus, Users, MapPin, Pill, Calendar, Star } from 'lucide-react';
import { VoiceButton } from './VoiceButton';
import { useVoice } from '../hooks/useVoice';
import { Memory } from '../types';

interface MemoryInputProps {
  onAddMemory: (content: string, type: Memory['type'], addedBy: Memory['addedBy'], priority: Memory['priority']) => void;
  caregiverMode: boolean;
}

export const MemoryInput: React.FC<MemoryInputProps> = ({ onAddMemory, caregiverMode }) => {
  const [content, setContent] = useState('');
  const [type, setType] = useState<Memory['type']>('arbitrary');
  const [priority, setPriority] = useState<Memory['priority']>('medium');
  const { isListening, isSupported, startListening, speak } = useVoice();

  const handleVoiceInput = (transcript: string) => {
    setContent(transcript);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAddMemory(content.trim(), type, caregiverMode ? 'caregiver' : 'user', priority);
      setContent('');
      speak(`Memory added: ${content.trim()}`);
    }
  };

  const typeOptions = [
    { value: 'arbitrary', label: 'General Memory', icon: Plus, gradient: 'from-gray-500 to-slate-600', bgColor: 'bg-gray-50' },
    { value: 'relationship', label: 'Relationship', icon: Users, gradient: 'from-pink-500 to-rose-600', bgColor: 'bg-pink-50' },
    { value: 'location', label: 'Location', icon: MapPin, gradient: 'from-blue-500 to-indigo-600', bgColor: 'bg-blue-50' },
    { value: 'medication', label: 'Medication', icon: Pill, gradient: 'from-red-500 to-pink-600', bgColor: 'bg-red-50' },
    { value: 'appointment', label: 'Appointment', icon: Calendar, gradient: 'from-purple-500 to-violet-600', bgColor: 'bg-purple-50' }
  ] as const;

  const priorityOptions = [
    { value: 'low', label: 'Low Priority', color: 'from-green-500 to-emerald-600', icon: '🌱' },
    { value: 'medium', label: 'Medium Priority', color: 'from-yellow-500 to-orange-600', icon: '⭐' },
    { value: 'high', label: 'High Priority', color: 'from-red-500 to-pink-600', icon: '🔥' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/10 p-10 border border-white/50">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="p-4 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl shadow-lg">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {caregiverMode ? 'Add Memory for Care Recipient' : 'Add New Memory'}
          </h2>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Capture important moments and information. Every memory matters! ✨
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <label htmlFor="memory-type" className="block text-xl font-semibold text-gray-800 mb-4">
            Memory Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {typeOptions.map(({ value, label, icon: Icon, gradient, bgColor }) => (
              <button
                key={value}
                type="button"
                onClick={() => setType(value)}
                className={`
                  group relative p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3
                  transform hover:scale-105 hover:-translate-y-1
                  ${type === value 
                    ? `border-purple-400 bg-gradient-to-br ${gradient} text-white shadow-lg` 
                    : `border-gray-200 ${bgColor} hover:border-gray-300 text-gray-700 hover:shadow-lg`
                  }
                  focus:ring-4 focus:ring-purple-300 focus:outline-none
                `}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium text-center leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <label htmlFor="memory-content" className="block text-xl font-semibold text-gray-800 mb-4">
            Memory Content
          </label>
          <div className="relative">
            <textarea
              id="memory-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your memory... (e.g., 'I parked my car in Lot B' or 'I took my medicine at 8 AM')"
              className="w-full p-6 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-400 focus:ring-4 focus:ring-purple-200/50 focus:outline-none resize-none text-black placeholder-gray-400 bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md"
              rows={5}
            />
            <div className="absolute bottom-4 right-4">
              <VoiceButton
                isListening={isListening}
                isSupported={isSupported}
                onStartListening={() => startListening(handleVoiceInput)}
                size="md"
              />
            </div>
            {/* Character count */}
            <div className="absolute bottom-4 left-4 text-sm text-gray-400">
              {content.length} characters
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <label htmlFor="priority" className="block text-xl font-semibold text-gray-800 mb-4">
            Priority Level
          </label>
          <div className="grid grid-cols-3 gap-4">
            {priorityOptions.map(({ value, label, color, icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setPriority(value as Memory['priority'])}
                className={`
                  group relative p-5 rounded-2xl border-2 transition-all duration-300 text-center
                  transform hover:scale-105 hover:-translate-y-1
                  ${priority === value 
                    ? `border-transparent bg-gradient-to-br ${color} text-white shadow-lg` 
                    : 'border-gray-200 bg-white/80 hover:border-gray-300 text-gray-700 hover:shadow-lg'
                  }
                `}
              >
                <div className="text-2xl mb-2">{icon}</div>
                <span className="font-medium">{label}</span>
                {priority === value && (
                  <Star className="absolute top-2 right-2 w-5 h-5 text-white/80" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={!content.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white text-xl font-semibold py-6 px-8 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-purple-300/50 focus:outline-none transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:transform-none disabled:shadow-none"
          >
            <div className="flex items-center justify-center gap-3">
              <Plus className="w-6 h-6" />
              <span>Add Memory</span>
            </div>
          </button>
        </div>
      </form>

      {/* Bottom decoration */}
      <div className="mt-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-violet-50 rounded-full border border-purple-100">
          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600 font-medium">
            {caregiverMode ? 'Helping preserve precious memories' : 'Building your memory collection'}
          </span>
        </div>
      </div>
    </div>
  );
};