import React from 'react';
import { Pill, Clock, Car, Home, Phone, Calendar, Sparkles } from 'lucide-react';

interface QuickPromptsProps {
  onPromptClick: (query: string) => void;
}

export const QuickPrompts: React.FC<QuickPromptsProps> = ({ onPromptClick }) => {
  const prompts = [
    {
      icon: Pill,
      text: "Did I take my medicine today?",
      query: "Did I take my medicine today?",
      gradient: "from-red-500 to-pink-600",
      bgGradient: "from-red-50 to-pink-50",
      shadowColor: "shadow-red-500/20"
    },
    {
      icon: Car,
      text: "Where did I park my car?",
      query: "Where did I park my car?",
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
      shadowColor: "shadow-blue-500/20"
    },
    {
      icon: Clock,
      text: "What time is my appointment?",
      query: "What time is my appointment?",
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50",
      shadowColor: "shadow-purple-500/20"
    },
    {
      icon: Home,
      text: "Did I lock the door?",
      query: "Did I lock the door?",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      shadowColor: "shadow-green-500/20"
    },
    {
      icon: Phone,
      text: "Who called me today?",
      query: "Who called me today?",
      gradient: "from-yellow-500 to-orange-600",
      bgGradient: "from-yellow-50 to-orange-50",
      shadowColor: "shadow-yellow-500/20"
    },
    {
      icon: Calendar,
      text: "What's my schedule today?",
      query: "What's my schedule today?",
      gradient: "from-indigo-500 to-blue-600",
      bgGradient: "from-indigo-50 to-blue-50",
      shadowColor: "shadow-indigo-500/20"
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl blur opacity-75"></div>
          <div className="relative p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Quick Questions
          </h2>
          <p className="text-gray-600 text-lg">Tap any button to quickly check common things you might forget</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(prompt.query)}
            className={`
              group relative p-6 rounded-2xl transition-all duration-300 text-left border-2 border-transparent
              bg-gradient-to-br ${prompt.bgGradient} hover:shadow-xl ${prompt.shadowColor}
              hover:scale-105 hover:border-white/50 focus:ring-4 focus:ring-blue-300 focus:outline-none
              transform-gpu
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`
                relative p-3 rounded-xl bg-gradient-to-r ${prompt.gradient} 
                group-hover:scale-110 transition-transform duration-300
                shadow-lg
              `}>
                <prompt.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                  {prompt.text}
                </span>
                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent transition-all duration-300 mt-2"></div>
              </div>
            </div>
            
            {/* Subtle glow effect */}
            <div className={`
              absolute inset-0 rounded-2xl bg-gradient-to-r ${prompt.gradient} opacity-0 
              group-hover:opacity-10 transition-opacity duration-300 pointer-events-none
            `}></div>
          </button>
        ))}
      </div>
    </div>
  );
};