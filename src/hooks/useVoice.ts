import { useState, useEffect, useCallback } from 'react';
import { VoiceState } from '../types';

export const useVoice = () => {
  const [voiceState, setVoiceState] = useState<VoiceState>({
    isListening: false,
    isSupported: false,
    transcript: ''
  });

  useEffect(() => {
    const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setVoiceState(prev => ({ ...prev, isSupported }));
  }, []);

  const startListening = useCallback((onResult: (transcript: string) => void) => {
    if (!voiceState.isSupported) return;

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setVoiceState(prev => ({ ...prev, isListening: true }));
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceState(prev => ({ ...prev, transcript }));
      onResult(transcript);
    };

    recognition.onend = () => {
      setVoiceState(prev => ({ ...prev, isListening: false }));
    };

    recognition.onerror = () => {
      setVoiceState(prev => ({ ...prev, isListening: false }));
    };

    recognition.start();
  }, [voiceState.isSupported]);

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  }, []);

  return {
    ...voiceState,
    startListening,
    speak
  };
};