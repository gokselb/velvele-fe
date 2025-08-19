'use client';

import { useLanguage } from '../hooks/useLanguage';

export const LanguageSwitcher = () => {
  const {
    currentLanguage,
    isEnglish,
    isTurkish,
    switchLanguage,
    getLanguageUrl,
  } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => switchLanguage('tr')}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isTurkish
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        aria-label="Türkçe'ye geç"
      >
        TR
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isEnglish
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
};
