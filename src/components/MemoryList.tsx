import React from 'react';
import { Clock, User, UserCheck, AlertCircle, Check, Sparkles } from 'lucide-react';
import { Memory } from '../types';

interface MemoryListProps {
  memories: Memory[];
  title: string;
  limit?: number;
}

export const MemoryList: React.FC<MemoryListProps> = ({ memories, title, limit = 10 }) => {
  const displayMemories = limit ? memories.slice(0, limit) : memories;

  const getPriorityColor = (priority: Memory['priority']) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-pink-600';
      case 'medium': return 'from-yellow-500 to-orange-600';
      case 'low': return 'from-green-500 to-emerald-600';
    }
  };

  const getPriorityBg = (priority: Memory['priority']) => {
    switch (priority) {
      case 'high': return 'from-red-50 to-pink-50';
      case 'medium': return 'from-yellow-50 to-orange-50';
      case 'low': return 'from-green-50 to-emerald-50';
    }
  };

  const getTypeIcon = (type: Memory['type']) => {
    switch (type) {
      case 'medication': return <AlertCircle className="w-5 h-5" />;
      case 'appointment': return <Clock className="w-5 h-5" />;
      default: return <Check className="w-5 h-5" />;
    }
  };

  const getTypeGradient = (type: Memory['type']) => {
    switch (type) {
      case 'medication': return 'from-red-500 to-pink-600';
      case 'appointment': return 'from-blue-500 to-indigo-600';
      case 'location': return 'from-green-500 to-emerald-600';
      case 'relationship': return 'from-pink-500 to-rose-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  if (displayMemories.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl blur opacity-75"></div>
            <div className="relative p-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">{title}</h2>
        </div>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🧠</div>
          <p className="text-xl text-gray-500 font-medium">No memories to display yet.</p>
          <p className="text-gray-400 mt-2">Start by adding your first memory!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl blur opacity-75"></div>
            <div className="relative p-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">{title}</h2>
            <p className="text-gray-600">Your stored memories and experiences</p>
          </div>
        </div>
        {memories.length > limit && (
          <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-full text-sm font-semibold">
            Showing {limit} of {memories.length} memories
          </span>
        )}
      </div>

      <div className="space-y-6">
        {displayMemories.map((memory) => (
          <div
            key={memory.id}
            className="group p-6 border-2 border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-sm hover:scale-102 transform-gpu"
          >
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-r ${getTypeGradient(memory.type)} shadow-lg`}>
                {getTypeIcon(memory.type)}
              </div>
              
              <div className="flex-1">
                <p className="text-lg text-gray-800 mb-4 leading-relaxed font-medium">{memory.content}</p>
                
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    {new Date(memory.timestamp).toLocaleString()}
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                    {memory.addedBy === 'caregiver' ? <UserCheck className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    {memory.addedBy === 'caregiver' ? 'Added by caregiver' : 'Self-added'}
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getPriorityColor(memory.priority)} shadow-sm`}>
                    {memory.priority.toUpperCase()} PRIORITY
                  </span>
                  
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-xs font-semibold capitalize border border-blue-200">
                    {memory.type.replace('_', ' ')}
                  </span>
                </div>
                
                {memory.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {memory.tags.slice(0, 5).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-purple-50 to-violet-50 text-purple-600 rounded-full text-xs font-medium border border-purple-200"
                      >
                        #{tag}
                      </span>
                    ))}
                    {memory.tags.length > 5 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                        +{memory.tags.length - 5} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};