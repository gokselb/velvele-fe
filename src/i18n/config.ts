import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en/translation.json';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import tr from './locales/tr/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      tr: {
        translation: tr,
      },
    },
    lng: 'tr', // Default to Turkish, will be updated on client
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
