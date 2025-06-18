import React from 'react';
import { Clock, User, UserCheck, AlertCircle, Check } from 'lucide-react';
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
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
    }
  };

  const getTypeIcon = (type: Memory['type']) => {
    switch (type) {
      case 'medication': return <AlertCircle className="w-5 h-5" />;
      case 'appointment': return <Clock className="w-5 h-5" />;
      default: return <Check className="w-5 h-5" />;
    }
  };

  if (displayMemories.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-lg text-gray-500">No memories to display yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {memories.length > limit && (
          <span className="text-sm text-gray-500">
            Showing {limit} of {memories.length} memories
          </span>
        )}
      </div>

      <div className="space-y-4">
        {displayMemories.map((memory) => (
          <div
            key={memory.id}
            className="p-6 border-2 border-gray-100 rounded-xl hover:border-gray-200 transition-colors duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-2 bg-gray-100 rounded-lg">
                {getTypeIcon(memory.type)}
              </div>
              
              <div className="flex-1">
                <p className="text-lg text-gray-800 mb-3 leading-relaxed">{memory.content}</p>
                
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    {new Date(memory.timestamp).toLocaleString()}
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-500">
                    {memory.addedBy === 'caregiver' ? <UserCheck className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    {memory.addedBy === 'caregiver' ? 'Added by caregiver' : 'Self-added'}
                  </div>
                  
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(memory.priority)}`}>
                    {memory.priority.toUpperCase()} PRIORITY
                  </span>
                  
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium capitalize">
                    {memory.type.replace('_', ' ')}
                  </span>
                </div>
                
                {memory.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {memory.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
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