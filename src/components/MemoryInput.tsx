import React, { useState } from 'react';
import { Plus, Users, MapPin, Pill, Calendar } from 'lucide-react';
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
    { value: 'arbitrary', label: 'General Memory', icon: Plus },
    { value: 'relationship', label: 'Relationship', icon: Users },
    { value: 'location', label: 'Location', icon: MapPin },
    { value: 'medication', label: 'Medication', icon: Pill },
    { value: 'appointment', label: 'Appointment', icon: Calendar }
  ] as const;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-full">
          <Plus className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Add {caregiverMode ? 'Memory for Care Recipient' : 'New Memory'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="memory-type" className="block text-lg font-semibold text-gray-700 mb-3">
            Memory Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {typeOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setType(value)}
                className={`
                  p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2
                  ${type === value 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="memory-content" className="block text-lg font-semibold text-gray-700 mb-3">
            Memory Content
          </label>
          <div className="relative">
            <textarea
              id="memory-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your memory... (e.g., 'I parked my car in Lot B' or 'I took my medicine at 8 AM')"
              className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none resize-none text-black placeholder-gray-500"
              rows={4}
            />
            <div className="absolute bottom-3 right-3">
              <VoiceButton
                isListening={isListening}
                isSupported={isSupported}
                onStartListening={() => startListening(handleVoiceInput)}
                size="sm"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="priority" className="block text-lg font-semibold text-gray-700 mb-3">
            Priority Level
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Memory['priority'])}
            className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-black"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!content.trim()}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-xl font-semibold py-4 px-6 rounded-xl transition-colors duration-200 focus:ring-4 focus:ring-blue-300 focus:outline-none"
        >
          Add Memory
        </button>
      </form>
    </div>
  );
};