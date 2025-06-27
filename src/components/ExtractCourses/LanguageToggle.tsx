import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  language: 'ar' | 'en';
  onLanguageChange: (lang: 'ar' | 'en') => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, onLanguageChange }) => {
  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="bg-white rounded-full shadow-lg p-2 flex items-center gap-2">
        <Globe className="w-5 h-5 text-gray-600" />
        <button
          onClick={() => onLanguageChange('ar')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            language === 'ar'
              ? 'bg-teal-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          العربية
        </button>
        <button
          onClick={() => onLanguageChange('en')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            language === 'en'
              ? 'bg-teal-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          English
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;