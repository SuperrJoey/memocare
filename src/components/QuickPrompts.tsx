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
      bgColor: "bg-red-50",
      iconBg: "bg-red-100"
    },
    {
      icon: Car,
      text: "Where did I park my car?",
      query: "Where did I park my car?",
      gradient: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100"
    },
    {
      icon: Clock,
      text: "What time is my appointment?",
      query: "What time is my appointment?",
      gradient: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100"
    },
    {
      icon: Home,
      text: "Did I lock the door?",
      query: "Did I lock the door?",
      gradient: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50",
      iconBg: "bg-emerald-100"
    },
    {
      icon: Phone,
      text: "Who called me today?",
      query: "Who called me today?",
      gradient: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      iconBg: "bg-amber-100"
    },
    {
      icon: Calendar,
      text: "What's my schedule today?",
      query: "What's my schedule today?",
      gradient: "from-indigo-500 to-blue-600",
      bgColor: "bg-indigo-50",
      iconBg: "bg-indigo-100"
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-blue-500/10 p-4 sm:p-6 border border-white/50">
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="p-2 sm:p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Quick Questions
          </h2>
        </div>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Tap any button to quickly check common things you might forget. Your memories are just a click away! ✨
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(prompt.query)}
            className={`
              group relative p-3 sm:p-4 rounded-xl transition-all duration-300 text-left
              transform hover:scale-105 hover:-translate-y-1 
              focus:ring-2 focus:ring-blue-300/50 focus:outline-none
              bg-white shadow-md hover:shadow-lg border border-gray-100
              overflow-hidden
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-start gap-3 mb-3">
                <div className={`p-2 ${prompt.iconBg} rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <prompt.icon className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:text-white transition-colors duration-300`} />
                </div>
                <div className="flex-1">
                  <span className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 leading-relaxed">
                    {prompt.text}
                  </span>
                </div>
              </div>
              
              {/* Hover indicator */}
              <div className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover:bg-blue-500 transition-colors duration-300"></div>
                <span>Click to search</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="mt-6 sm:mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm text-gray-600 font-medium">Ready to help you remember</span>
        </div>
      </div>
    </div>
  );
};