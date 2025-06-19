import React from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceButtonProps {
  isListening: boolean;
  isSupported: boolean;
  onStartListening: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({
  isListening,
  isSupported,
  onStartListening,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg'
  };

  if (!isSupported) {
    return (
      <button
        disabled
        className={`${sizeClasses[size]} bg-gray-300 text-gray-500 rounded-xl cursor-not-allowed shadow-sm ${className}`}
        title="Voice not supported in this browser"
      >
        <MicOff className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={onStartListening}
      disabled={isListening}
      className={`
        ${sizeClasses[size]} 
        ${isListening 
          ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white animate-pulse shadow-lg shadow-red-500/30' 
          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105'
        } 
        rounded-xl transition-all duration-300 focus:ring-4 focus:ring-blue-300 focus:outline-none transform-gpu
        ${className}
      `}
      title={isListening ? "Listening..." : "Click to speak"}
    >
      <Mic className="w-5 h-5" />
    </button>
  );
};