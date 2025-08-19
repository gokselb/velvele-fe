import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Domain-based language detection
const getLanguageFromDomain = (): string => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.startsWith('en.')) {
      return 'en';
    }
    // Default to Turkish for velvele.net and other domains
    return 'tr';
  }
  return 'tr'; // Default fallback
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // English translations will be loaded from public/locales/en/translation.json
        },
      },
      tr: {
        translation: {
          // Turkish translations will be loaded from public/locales/tr/translation.json
        },
      },
    },
    lng: getLanguageFromDomain(), // Set language based on domain
    fallbackLng: 'tr', // Turkish as fallback
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n;
