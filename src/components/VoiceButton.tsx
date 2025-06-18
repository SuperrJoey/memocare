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
        className={`${sizeClasses[size]} bg-gray-300 text-gray-500 rounded-full cursor-not-allowed ${className}`}
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
          ? 'bg-red-500 text-white animate-pulse' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'
        } 
        rounded-full transition-all duration-200 focus:ring-4 focus:ring-blue-300 focus:outline-none
        ${className}
      `}
      title={isListening ? "Listening..." : "Click to speak"}
    >
      <Mic className="w-5 h-5" />
    </button>
  );
};