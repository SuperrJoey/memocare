import { useState, useEffect } from 'react';
import { Brain, Plus, Search, MessageSquare, Settings as SettingsIcon, List, Sparkles } from 'lucide-react';
import { LandingPage } from './components/LandingPage';
import { MemoryInput } from './components/MemoryInput';
import { QueryInterface } from './components/QueryInterface';
import { QuickPrompts } from './components/QuickPrompts';
import { MemoryList } from './components/MemoryList';
import { Settings } from './components/Settings';
import { useMemoryStorage } from './hooks/useMemoryStorage';
import { AppSettings } from './types';

type Tab = 'add' | 'search' | 'prompts' | 'memories' | 'settings';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('prompts');
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

  const handleEnterApp = () => {
    setShowLanding(false);
  };

  const handleQuickQuery = (query: string) => {
    setActiveTab('search');
    // The QueryInterface will handle the actual query
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

  // Show landing page first
  if (showLanding) {
    return <LandingPage onEnterApp={handleEnterApp} />;
  }

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="relative cursor-pointer group" onClick={() => setShowLanding(true)}>
              <div className={`p-2 sm:p-3 ${settings.highContrast ? 'bg-blue-600' : 'bg-gradient-to-br from-blue-500 to-indigo-600'} rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl group-hover:scale-105 transition-transform duration-300`}>
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              {!settings.highContrast && (
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-pulse" />
                </div>
              )}
            </div>
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${settings.highContrast ? 'text-white' : 'bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'}`}>
                MemoCare
              </h1>
              <p className={`text-sm sm:text-base mt-1 ${settings.highContrast ? 'text-gray-300' : 'text-gray-600'}`}>
                {settings.caregiverMode ? '👩‍⚕️ Caregiver Mode Active' : '🧠 Your personal memory assistant'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                group relative flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 font-medium text-sm sm:text-base
                transform hover:scale-105 hover:-translate-y-1 focus:ring-2 focus:ring-blue-300/50 focus:outline-none
                ${activeTab === tab.id
                  ? settings.highContrast
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : `bg-gradient-to-r ${tab.color} text-white shadow-lg shadow-${tab.color.split('-')[1]}-500/25`
                  : settings.highContrast
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 shadow-md border border-gray-600'
                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-lg backdrop-blur-sm border border-white/50'
                }
              `}
            >
              <tab.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === tab.id ? 'text-white' : settings.highContrast ? 'text-gray-300' : tab.textColor} transition-colors duration-300`} />
              <span className="relative z-10 hidden sm:inline">{tab.label}</span>
              <span className="relative z-10 sm:hidden">{tab.label.split(' ')[0]}</span>
              {!settings.highContrast && activeTab !== tab.id && (
                <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-transparent via-gray-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 sm:pb-16">
        <div className="space-y-4 sm:space-y-8">
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