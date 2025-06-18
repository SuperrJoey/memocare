import React from 'react';
import { Pill, Clock, Car, Home, Phone, Calendar } from 'lucide-react';

interface QuickPromptsProps {
  onPromptClick: (query: string) => void;
}

export const QuickPrompts: React.FC<QuickPromptsProps> = ({ onPromptClick }) => {
  const prompts = [
    {
      icon: Pill,
      text: "Did I take my medicine today?",
      query: "Did I take my medicine today?",
      color: "bg-red-100 text-red-700 hover:bg-red-200"
    },
    {
      icon: Car,
      text: "Where did I park my car?",
      query: "Where did I park my car?",
      color: "bg-blue-100 text-blue-700 hover:bg-blue-200"
    },
    {
      icon: Clock,
      text: "What time is my appointment?",
      query: "What time is my appointment?",
      color: "bg-purple-100 text-purple-700 hover:bg-purple-200"
    },
    {
      icon: Home,
      text: "Did I lock the door?",
      query: "Did I lock the door?",
      color: "bg-green-100 text-green-700 hover:bg-green-200"
    },
    {
      icon: Phone,
      text: "Who called me today?",
      query: "Who called me today?",
      color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
    },
    {
      icon: Calendar,
      text: "What's my schedule today?",
      query: "What's my schedule today?",
      color: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Questions</h2>
      <p className="text-lg text-gray-600 mb-8">Tap any button to quickly check common things you might forget:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(prompt.query)}
            className={`
              p-6 rounded-xl transition-all duration-200 text-left border-2 border-transparent
              hover:border-gray-300 focus:ring-4 focus:ring-blue-300 focus:outline-none
              ${prompt.color}
            `}
          >
            <div className="flex items-center gap-4">
              <prompt.icon className="w-8 h-8 flex-shrink-0" />
              <span className="text-lg font-semibold">{prompt.text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};