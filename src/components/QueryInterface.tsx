import React, { useState } from 'react';
import { Search, MessageCircle, Brain, Sparkles, Clock, CheckCircle } from 'lucide-react';
import { VoiceButton } from './VoiceButton';
import { useVoice } from '../hooks/useVoice';
import { QueryResult } from '../types';

interface QueryInterfaceProps {
  onQuery: (query: string) => QueryResult;
}

export const QueryInterface: React.FC<QueryInterfaceProps> = ({ onQuery }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isListening, isSupported, startListening, speak } = useVoice();

  const handleVoiceInput = (transcript: string) => {
    setQuery(transcript);
    handleQuery(transcript);
  };

  const handleQuery = async (queryText: string = query) => {
    if (!queryText.trim()) return;

    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const queryResult = onQuery(queryText.trim());
      setResult(queryResult);
      speak(queryResult.answer);
      setIsLoading(false);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleQuery();
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/10 p-10 border border-white/50">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Ask About Your Memories
          </h2>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Your personal memory assistant is here to help. Ask anything! 🧠✨
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <label htmlFor="query-input" className="block text-xl font-semibold text-gray-800">
            What would you like to remember?
          </label>
          <div className="relative">
            <input
              id="query-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask me anything... (e.g., 'Did I take my medicine?' or 'Where did I park my car?')"
              className="w-full p-6 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-200/50 focus:outline-none pr-20 text-black placeholder-gray-400 bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <VoiceButton
                isListening={isListening}
                isSupported={isSupported}
                onStartListening={() => startListening(handleVoiceInput)}
                size="md"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white text-xl font-semibold py-6 px-8 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-blue-300/50 focus:outline-none transform hover:scale-[1.02] hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:transform-none disabled:shadow-none"
        >
          <div className="flex items-center justify-center gap-3">
            {isLoading ? (
              <>
                <Brain className="w-6 h-6 animate-pulse" />
                <span>Searching your memories...</span>
              </>
            ) : (
              <>
                <Search className="w-6 h-6" />
                <span>Search Memories</span>
              </>
            )}
          </div>
        </button>
      </form>

      {result && (
        <div className="mt-10 animate-slideUp">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">Memory Assistant Response</h3>
                  {result.confidence > 0.5 && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-200">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">High Confidence</span>
                    </div>
                  )}
                </div>
                <p className="text-lg text-gray-700 leading-relaxed bg-white/60 p-4 rounded-xl border border-white/50 backdrop-blur-sm">
                  {result.answer}
                </p>
              </div>
            </div>

            {result.relatedMemories.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h4 className="text-lg font-semibold text-gray-800">Related Memories</h4>
                </div>
                <div className="grid gap-4">
                  {result.relatedMemories.slice(0, 3).map((memory, index) => (
                    <div 
                      key={memory.id} 
                      className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 group"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <p className="text-gray-700 leading-relaxed mb-3">{memory.content}</p>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-4">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="capitalize font-medium">{memory.type} memory</span>
                          </span>
                          <span className="flex items-center gap-1 text-gray-500">
                            <Clock className="w-4 h-4" />
                            {new Date(memory.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick suggestions */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Try asking about:</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            "medication schedule",
            "parking location", 
            "appointments",
            "daily activities",
            "important reminders"
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setQuery(`Tell me about my ${suggestion}`)}
              className="px-4 py-2 bg-gradient-to-r from-gray-50 to-blue-50 text-gray-700 rounded-full border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 text-sm font-medium hover:scale-105"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-100">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600 font-medium">Your memories are safe with me</span>
        </div>
      </div>
    </div>
  );
};