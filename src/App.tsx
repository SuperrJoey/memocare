import React, { useState, useEffect } from 'react';

import { Brain, Plus, Search, MessageSquare, Settings as SettingsIcon, List, Sparkles } from 'lucide-react';

import { MemoryInput } from './components/MemoryInput';
import { QueryInterface } from './components/QueryInterface';
import { QuickPrompts } from './components/QuickPrompts';
import { MemoryList } from './components/MemoryList';
import { Settings } from './components/Settings';
import { useMemoryStorage } from './hooks/useMemoryStorage';
import { AppSettings } from './types';

type Tab = 'add' | 'search' | 'prompts' | 'memories' | 'settings';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('prompts');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [settings, setSettings] = useState<AppSettings>({
    fontSize: 'large',
    highContrast: false,
    voiceEnabled: true,
    caregiverMode: false
  });

  const {
    memories,
    addMemory,
    queryMemories
  } = useMemoryStorage();

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('memory-tracker-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('memory-tracker-settings', JSON.stringify(settings));
  }, [settings]);

  const handleQuickQuery = (query: string) => {
    setActiveTab('search');
    setIsNavOpen(false);
  };

  const tabs = [

    { id: 'prompts' as Tab, label: 'Quick Help', icon: MessageSquare, color: 'from-emerald-500 to-green-600', textColor: 'text-emerald-600' },
    { id: 'search' as Tab, label: 'Search', icon: Search, color: 'from-blue-500 to-indigo-600', textColor: 'text-blue-600' },
    { id: 'add' as Tab, label: 'Add Memory', icon: Plus, color: 'from-purple-500 to-violet-600', textColor: 'text-purple-600' },
    { id: 'memories' as Tab, label: 'All Memories', icon: List, color: 'from-orange-500 to-amber-600', textColor: 'text-orange-600' },
    { id: 'settings' as Tab, label: 'Settings', icon: SettingsIcon, color: 'from-gray-500 to-slate-600', textColor: 'text-gray-600' }

  ];

  const fontSizeClass = {
    normal: 'text-base',
    large: 'text-lg',
    'extra-large': 'text-xl'
  }[settings.fontSize];

  const containerClass = `
    min-h-screen transition-all duration-500 ease-in-out
    ${settings.highContrast 
      ? 'bg-gray-900 text-white' 
      : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }
    ${fontSizeClass}
  `;

  const headerClass = `
    ${settings.highContrast 
      ? 'bg-gray-800 border-gray-600' 
      : 'bg-white/70 border-white/20 backdrop-blur-xl'
    } 
    border-b sticky top-0 z-20 shadow-lg
  `;

  const activeTabConfig = tabs.find(tab => tab.id === activeTab);

  return (
    <div className={containerClass}>
      {/* Decorative Background Elements */}
      {!settings.highContrast && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        </div>
      )}

      {/* Header */}
      <header className={headerClass}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className={`p-4 ${settings.highContrast ? 'bg-blue-600' : 'bg-gradient-to-br from-blue-500 to-indigo-600'} rounded-2xl shadow-xl`}>
                <Brain className="w-10 h-10 text-white" />
              </div>
              {!settings.highContrast && (
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                </div>
              )}
            </div>
            <div>
              <h1 className={`text-4xl font-bold ${settings.highContrast ? 'text-white' : 'bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'}`}>
                MemoCare
              </h1>
              <p className={`text-xl mt-1 ${settings.highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                {settings.caregiverMode ? '👩‍⚕️ Caregiver Mode Active' : '🧠 Your personal memory assistant'}
              </p>

            </div>
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          {tabs.map((tab) => (
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className={`

                group relative flex items-center gap-3 px-8 py-5 rounded-2xl transition-all duration-300 font-semibold text-lg
                transform hover:scale-105 hover:-translate-y-1 focus:ring-4 focus:ring-blue-300/50 focus:outline-none
                ${activeTab === tab.id
                  ? settings.highContrast
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/25'
                    : `bg-gradient-to-r ${tab.color} text-white shadow-xl shadow-${tab.color.split('-')[1]}-500/25`
                  : settings.highContrast
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 shadow-lg border border-gray-600'
                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-xl backdrop-blur-sm border border-white/50'

                }
                focus:ring-4 focus:ring-blue-300 focus:outline-none
              `}
            >
              <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'text-white' : settings.highContrast ? 'text-gray-300' : tab.textColor} transition-colors duration-300`} />
              <span className="relative z-10">{tab.label}</span>
              {!settings.highContrast && activeTab !== tab.id && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Sliding Navigation Panel */}
      <div className={`
        fixed top-0 right-0 h-full w-80 z-40 transform transition-transform duration-300 ease-in-out
        ${isNavOpen ? 'translate-x-0' : 'translate-x-full'}
        ${settings.highContrast 
          ? 'bg-gray-900/95 border-gray-700' 
          : 'bg-white/95 border-gray-200'
        }
        backdrop-blur-xl border-l shadow-2xl
      `}>
        <div className="p-6 pt-20">
          <h3 className={`text-xl font-bold mb-6 ${settings.highContrast ? 'text-white' : 'text-gray-800'}`}>
            Navigation
          </h3>
          
          <div className="space-y-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsNavOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left
                  ${activeTab === tab.id
                    ? settings.highContrast
                      ? 'bg-blue-600 text-white shadow-lg'
                      : `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-105`
                    : settings.highContrast
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : `${tab.bgColor} ${tab.textColor} hover:shadow-md hover:scale-102`
                  }
                  focus:ring-4 focus:ring-blue-300 focus:outline-none
                `}
              >
                <div className={`p-2 rounded-lg ${activeTab === tab.id ? 'bg-white/20' : 'bg-white/50'}`}>
                  <tab.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold">{tab.label}</span>
                  <p className={`text-xs mt-1 opacity-75 ${activeTab === tab.id ? 'text-white' : ''}`}>
                    {tab.id === 'prompts' && 'Quick memory questions'}
                    {tab.id === 'search' && 'Find your memories'}
                    {tab.id === 'add' && 'Store new memories'}
                    {tab.id === 'memories' && 'Browse all memories'}
                    {tab.id === 'settings' && 'Customize your experience'}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Memory Stats */}
          <div className={`
            mt-8 p-4 rounded-xl border-2 
            ${settings.highContrast 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
            }
          `}>
            <h4 className={`font-semibold mb-2 ${settings.highContrast ? 'text-white' : 'text-gray-800'}`}>
              Memory Stats
            </h4>
            <div className="space-y-2 text-sm">
              <div className={`flex justify-between ${settings.highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                <span>Total Memories:</span>
                <span className="font-bold">{memories.length}</span>
              </div>
              <div className={`flex justify-between ${settings.highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                <span>This Week:</span>
                <span className="font-bold">
                  {memories.filter(m => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(m.timestamp) > weekAgo;
                  }).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isNavOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsNavOpen(false)}
        />
      )}

      {/* Main Content */}

      <main className="max-w-7xl mx-auto px-6 pb-16">
        <div className="space-y-8">
          {/* Welcome Section */}
          {activeTab === 'prompts' && (
            <div className={`
              p-6 rounded-2xl border-2 mb-8
              ${settings.highContrast 
                ? 'bg-gray-900/50 border-gray-700' 
                : 'bg-gradient-to-r from-blue-50 via-white to-purple-50 border-blue-200'
              }
            `}>
              <div className="text-center">
                <h2 className={`text-2xl font-bold mb-2 ${settings.highContrast ? 'text-white' : 'text-gray-800'}`}>
                  Welcome to MemoCare
                </h2>
                <p className={`text-lg ${settings.highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                  Your intelligent memory assistant is ready to help you remember what matters most.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'prompts' && (
            <div className="animate-fadeIn">
              <QuickPrompts onPromptClick={handleQuickQuery} />
            </div>
          )}
          
          {activeTab === 'search' && (
            <div className="animate-fadeIn">
              <QueryInterface onQuery={queryMemories} />
            </div>
          )}
          
          {activeTab === 'add' && (
            <div className="animate-fadeIn">
              <MemoryInput 
                onAddMemory={addMemory}
                caregiverMode={settings.caregiverMode}
              />
            </div>
          )}
          
          {activeTab === 'memories' && (
            <div className="animate-fadeIn">
              <MemoryList 
                memories={memories}
                title="All Memories"
                limit={20}
              />
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="animate-fadeIn">
              <Settings 
                settings={settings}
                onSettingsChange={setSettings}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;