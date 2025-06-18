import React, { useState, useEffect } from 'react';
import { Brain, Plus, Search, MessageSquare, Settings as SettingsIcon, List } from 'lucide-react';
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
    // The QueryInterface will handle the actual query
  };

  const tabs = [
    { id: 'prompts' as Tab, label: 'Quick Help', icon: MessageSquare, color: 'text-green-600' },
    { id: 'search' as Tab, label: 'Search', icon: Search, color: 'text-blue-600' },
    { id: 'add' as Tab, label: 'Add Memory', icon: Plus, color: 'text-purple-600' },
    { id: 'memories' as Tab, label: 'All Memories', icon: List, color: 'text-orange-600' },
    { id: 'settings' as Tab, label: 'Settings', icon: SettingsIcon, color: 'text-gray-600' }
  ];

  const fontSizeClass = {
    normal: 'text-base',
    large: 'text-lg',
    'extra-large': 'text-xl'
  }[settings.fontSize];

  const containerClass = `
    min-h-screen transition-all duration-300
    ${settings.highContrast 
      ? 'bg-black text-white' 
      : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }
    ${fontSizeClass}
  `;

  const headerClass = `
    ${settings.highContrast ? 'bg-gray-900 border-gray-700' : 'bg-white/80 border-gray-200'}
    backdrop-blur-sm border-b-2 sticky top-0 z-10
  `;

  return (
    <div className={containerClass}>
      {/* Header */}
      <header className={headerClass}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Memory Tracker</h1>
              <p className="text-lg text-gray-600">
                {settings.caregiverMode ? 'Caregiver Mode Active' : 'Your personal memory assistant'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-200 font-semibold
                border-2 focus:ring-4 focus:ring-blue-300 focus:outline-none
                ${activeTab === tab.id
                  ? settings.highContrast
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-800 border-blue-500 shadow-lg'
                  : settings.highContrast
                    ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700'
                    : 'bg-white/70 text-gray-600 border-gray-200 hover:bg-white hover:border-gray-300'
                }
              `}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? '' : tab.color}`} />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="space-y-8">
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