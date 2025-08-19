'use client';

import '../i18n/config';

import i18n from 'i18next';
import { useEffect } from 'react';

interface I18nProviderProps {
  children: React.ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  useEffect(() => {
    // Detect language from domain on client side
    const hostname = window.location.hostname;
    if (hostname.startsWith('en.')) {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('tr');
    }
  }, []);

  return <>{children}</>;
};
