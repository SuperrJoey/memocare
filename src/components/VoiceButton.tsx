import React from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

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
    sm: 'p-3 text-sm',
    md: 'p-4 text-base',
    lg: 'p-5 text-lg'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  if (!isSupported) {
    return (
      <button
        disabled
        className={`
          ${sizeClasses[size]} 
          bg-gradient-to-br from-gray-300 to-gray-400 text-gray-500 
          rounded-2xl cursor-not-allowed opacity-60 shadow-sm
          ${className}
        `}
        title="Voice not supported in this browser"
      >
        <MicOff className={iconSizes[size]} />
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
          ? 'bg-gradient-to-br from-red-500 to-pink-600 text-white animate-pulse shadow-lg shadow-red-500/25' 
          : 'bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white hover:shadow-lg hover:shadow-blue-500/25'
        } 
        rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-blue-300/50 focus:outline-none
        transform hover:scale-110 active:scale-95 disabled:transform-none
        relative overflow-hidden group
        ${className}
      `}
      title={isListening ? "Listening... Speak now!" : "Click to speak"}
    >
      {/* Background pulse animation for listening state */}
      {isListening && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl animate-pulse"></div>
      )}
      
      {/* Icon */}
      <div className="relative z-10 flex items-center justify-center">
        {isListening ? (
          <Volume2 className={`${iconSizes[size]} animate-bounce`} />
        ) : (
          <Mic className={iconSizes[size]} />
        )}
      </div>
      
      {/* Ripple effect */}
      {!isListening && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
      )}
    </button>
  );
};