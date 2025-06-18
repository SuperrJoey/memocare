import React, { useState } from 'react';
import { Search, MessageCircle } from 'lucide-react';
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
    <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-green-100 rounded-full">
          <Search className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Ask About Your Memories</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="query-input" className="block text-lg font-semibold text-gray-700 mb-3">
            What would you like to remember?
          </label>
          <div className="relative">
            <input
              id="query-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask me anything... (e.g., 'Did I take my medicine?' or 'Where did I park my car?')"
              className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none pr-16 text-black placeholder-gray-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <VoiceButton
                isListening={isListening}
                isSupported={isSupported}
                onStartListening={() => startListening(handleVoiceInput)}
                size="sm"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white text-xl font-semibold py-4 px-6 rounded-xl transition-colors duration-200 focus:ring-4 focus:ring-green-300 focus:outline-none"
        >
          {isLoading ? 'Searching...' : 'Search Memories'}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
          <div className="flex items-start gap-3 mb-4">
            <MessageCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Memory Result</h3>
              <p className="text-lg text-gray-700 leading-relaxed">{result.answer}</p>
              
              {result.confidence > 0.5 && (
                <div className="mt-2">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    High Confidence
                  </span>
                </div>
              )}
            </div>
          </div>

          {result.relatedMemories.length > 0 && (
            <div className="mt-6">
              <h4 className="text-md font-semibold text-gray-700 mb-3">Related Memories:</h4>
              <div className="space-y-3">
                {result.relatedMemories.slice(0, 3).map((memory) => (
                  <div key={memory.id} className="p-3 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-700">{memory.content}</p>
                    <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                      <span className="capitalize">{memory.type} memory</span>
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