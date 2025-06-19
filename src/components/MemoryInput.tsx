import React, { useState } from 'react';
import { Plus, Users, MapPin, Pill, Calendar, Sparkles } from 'lucide-react';
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
    { 
      value: 'arbitrary', 
      label: 'General Memory', 
      icon: Plus, 
      gradient: 'from-gray-500 to-slate-600',
      bgGradient: 'from-gray-50 to-slate-50'
    },
    { 
      value: 'relationship', 
      label: 'Relationship', 
      icon: Users, 
      gradient: 'from-pink-500 to-rose-600',
      bgGradient: 'from-pink-50 to-rose-50'
    },
    { 
      value: 'location', 
      label: 'Location', 
      icon: MapPin, 
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    { 
      value: 'medication', 
      label: 'Medication', 
      icon: Pill, 
      gradient: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-50 to-pink-50'
    },
    { 
      value: 'appointment', 
      label: 'Appointment', 
      icon: Calendar, 
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50'
    }
  ] as const;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl blur opacity-75"></div>
          <div className="relative p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            {caregiverMode ? 'Add Memory for Care Recipient' : 'Add New Memory'}
          </h2>
          <p className="text-gray-600 text-lg">Store important information for easy recall later</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="memory-type" className="block text-xl font-bold text-gray-800 mb-4">
            Memory Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {typeOptions.map(({ value, label, icon: Icon, gradient, bgGradient }) => (
              <button
                key={value}
                type="button"
                onClick={() => setType(value)}
                className={`
                  group relative p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3
                  ${type === value 
                    ? `border-transparent bg-gradient-to-br ${bgGradient} shadow-xl scale-105` 
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg hover:scale-102'
                  }
                  focus:ring-4 focus:ring-purple-300 focus:outline-none
                `}
              >
                <div className={`
                  p-3 rounded-xl transition-all duration-300
                  ${type === value 
                    ? `bg-gradient-to-r ${gradient} shadow-lg` 
                    : 'bg-gray-100 group-hover:bg-gray-200'
                  }
                `}>
                  <Icon className={`w-6 h-6 ${type === value ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <span className={`font-semibold transition-colors ${type === value ? 'text-gray-800' : 'text-gray-600'}`}>
                  {label}
                </span>
                
                {type === value && (
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-10`}></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="memory-content" className="block text-xl font-bold text-gray-800 mb-4">
            Memory Content
          </label>
          <div className="relative">
            <textarea
              id="memory-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your memory... (e.g., 'I parked my car in Lot B' or 'I took my medicine at 8 AM')"
              className="w-full p-6 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 focus:outline-none resize-none text-black placeholder-gray-500 bg-white/80 backdrop-blur-sm transition-all duration-300"
              rows={4}
            />
            <div className="absolute bottom-4 right-4">
              <VoiceButton
                isListening={isListening}
                isSupported={isSupported}
                onStartListening={() => startListening(handleVoiceInput)}
                size="md"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="priority" className="block text-xl font-bold text-gray-800 mb-4">
            Priority Level
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Memory['priority'])}
            className="w-full p-6 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200 focus:outline-none text-black bg-white/80 backdrop-blur-sm transition-all duration-300"
          >
            <option value="low">🟢 Low Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="high">🔴 High Priority</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!content.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 disabled:from-gray-300 disabled:to-gray-400 text-white text-xl font-bold py-6 px-8 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-purple-300 focus:outline-none shadow-xl hover:shadow-2xl hover:scale-105 transform-gpu"
        >
          ✨ Add Memory
        </button>
      </form>
    </div>
  );
};