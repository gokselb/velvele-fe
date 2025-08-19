import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n, t } = useTranslation();

  const currentLanguage = i18n.language;
  const isEnglish = currentLanguage === 'en';
  const isTurkish = currentLanguage === 'tr';

  const switchLanguage = (language: 'en' | 'tr') => {
    if (language === currentLanguage) return;

    if (typeof window !== 'undefined') {
      const currentHostname = window.location.hostname;
      let newHostname: string;

      if (language === 'en') {
        // Switch to English subdomain
        if (currentHostname.startsWith('en.')) {
          newHostname = currentHostname;
        } else {
          newHostname = `en.${currentHostname.replace(/^en\./, '')}`;
        }
      } else {
        // Switch to Turkish (main domain)
        newHostname = currentHostname.replace(/^en\./, '');
      }

      // Construct new URL with language change
      const newUrl = new URL(window.location.href);

      newUrl.hostname = newHostname;

      // Redirect to new domain
      window.location.href = newUrl.toString();
    }
  };

  const getLanguageUrl = (language: 'en' | 'tr', path?: string) => {
    if (typeof window !== 'undefined') {
      const currentHostname = window.location.hostname;
      let newHostname: string;

      if (language === 'en') {
        newHostname = `en.${currentHostname.replace(/^en\./, '')}`;
      } else {
        newHostname = currentHostname.replace(/^en\./, '');
      }

      const targetPath = path || window.location.pathname;
      return `${window.location.protocol}//${newHostname}${targetPath}`;
    }
    return '#';
  };

  return {
    currentLanguage,
    isEnglish,
    isTurkish,
    switchLanguage,
    getLanguageUrl,
    t,
  };
};
