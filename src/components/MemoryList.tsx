import React from 'react';
import { Clock, User, UserCheck, AlertCircle, Check, Calendar, MapPin, Pill, Users, Plus, Archive } from 'lucide-react';
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
      case 'high': return 'from-red-500 to-pink-600 text-white';
      case 'medium': return 'from-yellow-500 to-orange-600 text-white';
      case 'low': return 'from-green-500 to-emerald-600 text-white';
    }
  };

  const getTypeIcon = (type: Memory['type']) => {
    switch (type) {
      case 'medication': return <Pill className="w-5 h-5" />;
      case 'appointment': return <Calendar className="w-5 h-5" />;
      case 'location': return <MapPin className="w-5 h-5" />;
      case 'relationship': return <Users className="w-5 h-5" />;
      default: return <Plus className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: Memory['type']) => {
    switch (type) {
      case 'medication': return 'from-red-500 to-pink-600';
      case 'appointment': return 'from-purple-500 to-violet-600';
      case 'location': return 'from-blue-500 to-indigo-600';
      case 'relationship': return 'from-pink-500 to-rose-600';
      default: return 'from-gray-500 to-slate-600';
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
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-orange-500/10 p-10 border border-white/50">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-lg">
              <Archive className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              {title}
            </h2>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600 mb-2">No memories to display yet</p>
            <p className="text-gray-500">Start adding memories to see them here!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-orange-500/10 p-10 border border-white/50">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="p-4 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-lg">
            <Archive className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        {memories.length > limit && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-full border border-orange-100">
            <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
            <span className="text-sm text-gray-600 font-medium">
              Showing {limit} of {memories.length} memories
            </span>
          </div>
        )}
      </div>

      <div className="grid gap-6">
        {displayMemories.map((memory, index) => (
          <div
            key={memory.id}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-5">
              {/* Type Icon */}
              <div className={`flex-shrink-0 p-3 bg-gradient-to-br ${getTypeColor(memory.type)} rounded-xl shadow-md transition-transform duration-300`}>
                {getTypeIcon(memory.type)}
                <div className="text-white"></div>
              </div>
              
              <div className="flex-1 space-y-4">
                {/* Content */}
                <p className="text-lg text-gray-800 leading-relaxed font-medium">{memory.content}</p>
                
                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Timestamp */}
                  <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(memory.timestamp).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}</span>
                  </div>
                  
                  {/* Added by */}
                  <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full text-sm text-blue-700">
                    {memory.addedBy === 'caregiver' ? <UserCheck className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    <span className="font-medium">
                      {memory.addedBy === 'caregiver' ? 'Caregiver' : 'Self-added'}
                    </span>
                  </div>
                  
                  {/* Priority */}
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getPriorityColor(memory.priority)}`}>
                    <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                    <span>{memory.priority.toUpperCase()}</span>
                  </div>
                  
                  {/* Type */}
                  <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="capitalize">{memory.type.replace('_', ' ')}</span>
                  </div>
                </div>
                
                {/* Tags */}
                {memory.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {memory.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 rounded-full text-xs font-medium border border-indigo-100 hover:bg-indigo-100 transition-colors duration-200"
                      >
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
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

      {/* Summary Stats */}
      <div className="mt-10 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-800">{memories.length}</div>
            <div className="text-sm text-gray-600">Total Memories</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-red-600">
              {memories.filter(m => m.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-blue-600">
              {memories.filter(m => m.type === 'medication').length}
            </div>
            <div className="text-sm text-gray-600">Medication</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-purple-600">
              {memories.filter(m => m.addedBy === 'caregiver').length}
            </div>
            <div className="text-sm text-gray-600">By Caregiver</div>
          </div>
        </div>
      </div>
    </div>
  );
};