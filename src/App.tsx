import React, { useState, useEffect } from 'react';
import { Brain, Plus, Search, MessageSquare, Settings as SettingsIcon, List, Menu, X, Sparkles } from 'lucide-react';
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
    highContrast: true,
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
    { id: 'prompts' as Tab, label: 'Quick Help', icon: MessageSquare, color: 'from-emerald-500 to-teal-600', bgColor: 'bg-emerald-50', textColor: 'text-emerald-700' },
    { id: 'search' as Tab, label: 'Search', icon: Search, color: 'from-blue-500 to-indigo-600', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
    { id: 'add' as Tab, label: 'Add Memory', icon: Plus, color: 'from-purple-500 to-violet-600', bgColor: 'bg-purple-50', textColor: 'text-purple-700' },
    { id: 'memories' as Tab, label: 'All Memories', icon: List, color: 'from-orange-500 to-amber-600', bgColor: 'bg-orange-50', textColor: 'text-orange-700' },
    { id: 'settings' as Tab, label: 'Settings', icon: SettingsIcon, color: 'from-gray-500 to-slate-600', bgColor: 'bg-gray-50', textColor: 'text-gray-700' }
  ];

  const fontSizeClass = {
    normal: 'text-base',
    large: 'text-lg',
    'extra-large': 'text-xl'
  }[settings.fontSize];

  const containerClass = `
    min-h-screen transition-all duration-500 ease-in-out
    ${settings.highContrast 
      ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white' 
      : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
    }
    ${fontSizeClass}
  `;

  const headerClass = `
    ${settings.highContrast 
      ? 'bg-gray-900/95 border-gray-700/50 shadow-2xl shadow-black/20' 
      : 'bg-white/80 border-white/20 shadow-xl shadow-blue-500/10'
    } 
    backdrop-blur-xl border-b sticky top-0 z-50 transition-all duration-300
  `;

  const activeTabConfig = tabs.find(tab => tab.id === activeTab);

  return (
    <div className={containerClass}>
      {/* Modern Header */}
      <header className={headerClass}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75"></div>
                <div className="relative p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className={`text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${settings.highContrast ? 'text-white' : ''}`}>
                  MemoCare
                </h1>
                <p className={`text-sm ${settings.highContrast ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
                  {settings.caregiverMode ? '👥 Caregiver Mode Active' : '🧠 Your AI Memory Assistant'}
                </p>
              </div>
            </div>

            {/* Current Tab Indicator */}
            <div className="hidden md:flex items-center gap-3">
              <div className={`p-2 rounded-xl ${activeTabConfig?.bgColor} ${settings.highContrast ? 'bg-gray-800' : ''}`}>
                <activeTabConfig.icon className={`w-5 h-5 ${settings.highContrast ? 'text-white' : activeTabConfig?.textColor}`} />
              </div>
              <span className={`font-semibold ${settings.highContrast ? 'text-white' : 'text-gray-700'}`}>
                {activeTabConfig?.label}
              </span>
            </div>

            {/* Navigation Toggle */}
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className={`
                p-3 rounded-xl transition-all duration-200 
                ${settings.highContrast 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-white hover:bg-gray-50 text-gray-700 shadow-lg'
                }
                focus:ring-4 focus:ring-blue-300 focus:outline-none
              `}
            >
              {isNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
      <main className="max-w-6xl mx-auto px-6 py-8">
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
            <QuickPrompts onPromptClick={handleQuickQuery} />
          )}
          
          {activeTab === 'search' && (
            <QueryInterface onQuery={queryMemories} />
          )}
          
          {activeTab === 'add' && (
            <MemoryInput 
              onAddMemory={addMemory}
              caregiverMode={settings.caregiverMode}
            />
          )}
          
          {activeTab === 'memories' && (
            <MemoryList 
              memories={memories}
              title="All Memories"
              limit={20}
            />
          )}
          
          {activeTab === 'settings' && (
            <Settings 
              settings={settings}
              onSettingsChange={setSettings}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;