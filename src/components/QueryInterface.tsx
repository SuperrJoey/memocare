import React, { useState } from 'react';
import { Search, MessageCircle, Sparkles } from 'lucide-react';
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
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur opacity-75"></div>
          <div className="relative p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Ask About Your Memories
          </h2>
          <p className="text-gray-600 text-lg">Search through your stored memories with natural language</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="query-input" className="block text-xl font-bold text-gray-800 mb-4">
            What would you like to remember?
          </label>
          <div className="relative">
            <input
              id="query-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask me anything... (e.g., 'Did I take my medicine?' or 'Where did I park my car?')"
              className="w-full p-6 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none pr-20 text-black placeholder-gray-500 bg-white/80 backdrop-blur-sm transition-all duration-300"
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
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white text-xl font-bold py-6 px-8 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-blue-300 focus:outline-none shadow-xl hover:shadow-2xl hover:scale-105 transform-gpu"
        >
          {isLoading ? '🔍 Searching...' : '🔍 Search Memories'}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 shadow-lg">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Memory Result</h3>
              <p className="text-lg text-gray-700 leading-relaxed">{result.answer}</p>
              
              {result.confidence > 0.5 && (
                <div className="mt-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                    ✅ High Confidence
                  </span>
                </div>
              )}
            </div>
          </div>

          {result.relatedMemories.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-bold text-gray-700 mb-4">Related Memories:</h4>
              <div className="space-y-3">
                {result.relatedMemories.slice(0, 3).map((memory) => (
                  <div key={memory.id} className="p-4 bg-white rounded-xl border border-blue-200 shadow-sm">
                    <p className="text-gray-700 font-medium">{memory.content}</p>
                    <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                      <span className="capitalize font-semibold">{memory.type} memory</span>
                      <span>{new Date(memory.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};