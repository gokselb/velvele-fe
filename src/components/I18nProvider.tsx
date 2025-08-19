'use client';

import '../i18n/config';

import { useEffect } from 'react';

interface I18nProviderProps {
  children: React.ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  useEffect(() => {
    // i18next is now initialized on the client side
  }, []);

  return <>{children}</>;
};
