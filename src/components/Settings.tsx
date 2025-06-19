import React from 'react';
import { Settings as SettingsIcon, Type, Eye, Mic, UserCheck } from 'lucide-react';
import { AppSettings } from '../types';

interface SettingsProps {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
}

export const Settings: React.FC<SettingsProps> = ({ settings, onSettingsChange }) => {
  const handleSettingChange = (key: keyof AppSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const containerClass = `
    bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-gray-500/10 p-10 border border-white/50 transition-all duration-300
    ${settings.highContrast 
      ? 'bg-gray-900/80 border-gray-700' 
      : ''
    }
  `;

  const textClass = settings.highContrast ? 'text-white' : 'text-gray-800';
  const subtextClass = settings.highContrast ? 'text-gray-300' : 'text-gray-600';

  const sectionClass = `
    p-6 rounded-2xl border transition-all duration-300 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md
    ${settings.highContrast 
      ? 'bg-gray-800/60 border-gray-600 hover:border-gray-500' 
      : 'border-gray-200 hover:border-gray-300'
    }
  `;

  const buttonClass = (isActive: boolean) => `
    p-4 rounded-xl border transition-all duration-300 text-center font-medium
    ${isActive 
      ? 'border-purple-400 bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-lg' 
      : settings.highContrast
        ? 'border-gray-600 bg-gray-700/80 text-gray-300 hover:border-gray-500 hover:bg-gray-600/80'
        : 'border-gray-200 bg-white/80 text-gray-600 hover:border-gray-300 hover:bg-white hover:shadow-md backdrop-blur-sm'
    }
  `;

  const checkboxLabelClass = `
    flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm hover:shadow-md
    ${settings.highContrast 
      ? 'border-gray-600 bg-gray-800/80 hover:border-gray-500 hover:bg-gray-700/80' 
      : 'border-gray-200 hover:border-gray-300'
    }
  `;

  return (
    <div className={containerClass}>
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="p-4 bg-gradient-to-br from-gray-500 to-slate-600 rounded-2xl shadow-lg">
            <SettingsIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className={`text-3xl font-bold ${settings.highContrast ? 'text-white' : 'bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'}`}>
            Settings
          </h2>
        </div>
        <p className={`text-xl ${subtextClass} max-w-2xl mx-auto leading-relaxed`}>
          Customize your experience for comfort and accessibility ⚙️✨
        </p>
      </div>

      <div className="space-y-6">
        {/* Font Size Section */}
        <div className={sectionClass}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Type className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className={`text-xl font-semibold ${textClass}`}>Font Size</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {(['normal', 'large', 'extra-large'] as const).map((size) => (
              <button
                key={size}
                onClick={() => handleSettingChange('fontSize', size)}
                className={buttonClass(settings.fontSize === size)}
              >
                <span className={`${size === 'large' ? 'text-lg' : size === 'extra-large' ? 'text-xl' : 'text-base'}`}>
                  {size === 'normal' ? 'Normal' : size === 'large' ? 'Large' : 'Extra Large'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Voice Features Section */}
        <div className={sectionClass}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Mic className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className={`text-xl font-semibold ${textClass}`}>Voice Features</h3>
          </div>
          <label className={checkboxLabelClass}>
            <input
              type="checkbox"
              checked={settings.voiceEnabled}
              onChange={(e) => handleSettingChange('voiceEnabled', e.target.checked)}
              className="w-6 h-6 text-purple-600 border-2 border-gray-300 rounded-lg focus:ring-purple-500 focus:ring-2"
            />
            <div className="flex-1">
              <span className={`text-lg font-medium ${textClass}`}>Enable Voice Input/Output</span>
              <p className={`text-sm ${subtextClass} mt-1`}>Use voice commands to add memories and hear responses</p>
            </div>
          </label>
        </div>

        {/* Caregiver Mode Section */}
        <div className={sectionClass}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <UserCheck className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className={`text-xl font-semibold ${textClass}`}>Caregiver Mode</h3>
          </div>
          <label className={checkboxLabelClass}>
            <input
              type="checkbox"
              checked={settings.caregiverMode}
              onChange={(e) => handleSettingChange('caregiverMode', e.target.checked)}
              className="w-6 h-6 text-purple-600 border-2 border-gray-300 rounded-lg focus:ring-purple-500 focus:ring-2"
            />
            <div className="flex-1">
              <span className={`text-lg font-medium ${textClass}`}>Caregiver Mode</span>
              <p className={`text-sm ${subtextClass} mt-1`}>Allow caregivers to add memories on behalf of care recipient</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};