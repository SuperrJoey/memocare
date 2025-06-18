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

  return (
    <div className="bg-black rounded-2xl shadow-lg p-8 border-2 border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-100 rounded-full">
          <SettingsIcon className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Type className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-700">Font Size</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {(['normal', 'large', 'extra-large'] as const).map((size) => (
              <button
                key={size}
                onClick={() => handleSettingChange('fontSize', size)}
                className={`
                  p-4 rounded-xl border-2 transition-all duration-200 text-center
                  ${settings.fontSize === size 
                    ? 'border-purple-500 bg-purple-50 text-purple-700' 
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }
                `}
              >
                <span className={`font-medium ${size === 'large' ? 'text-lg' : size === 'extra-large' ? 'text-xl' : 'text-base'}`}>
                  {size === 'normal' ? 'Normal' : size === 'large' ? 'Large' : 'Extra Large'}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-700">Display</h3>
          </div>
          <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) => handleSettingChange('highContrast', e.target.checked)}
              className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
            />
            <span className="text-lg">High Contrast Mode</span>
          </label>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <Mic className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-700">Voice Features</h3>
          </div>
          <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.voiceEnabled}
              onChange={(e) => handleSettingChange('voiceEnabled', e.target.checked)}
              className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
            />
            <span className="text-lg">Enable Voice Input/Output</span>
          </label>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <UserCheck className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-700">Caregiver Mode</h3>
          </div>
          <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.caregiverMode}
              onChange={(e) => handleSettingChange('caregiverMode', e.target.checked)}
              className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
            />
            <div className="flex-1">
              <span className="text-lg block">Caregiver Mode</span>
              <span className="text-sm text-gray-500">Allow caregivers to add memories on behalf of care recipient</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};