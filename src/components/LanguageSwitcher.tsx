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
    <div className="flex items-center space-x-1">
      <button
        onClick={() => switchLanguage('tr')}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
          isTurkish
            ? 'bg-gray-900 text-white hover:bg-gray-800'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        aria-label="Türkçe'ye geç"
      >
        TR
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
          isEnglish
            ? 'bg-gray-900 text-white hover:bg-gray-800'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
};
