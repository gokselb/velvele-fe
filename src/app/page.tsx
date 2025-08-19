'use client';

import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useLanguage } from '../hooks/useLanguage';

export default function Home() {
  const { t, currentLanguage } = useLanguage();

  return (
    <div className="font-sans min-h-screen p-8 pb-20">
      {/* Header with language switcher */}
      <header className="flex justify-between items-center mb-16">
        <h1 className="text-2xl font-bold">Velvele</h1>
        <LanguageSwitcher />
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-5xl font-bold mb-6">{t('homepage.title')}</h2>
          <p className="text-xl text-gray-600 mb-8">{t('homepage.subtitle')}</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
            {t('homepage.cta')}
          </button>
        </div>

        {/* Language info */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <p className="text-gray-700">
            Current language: <strong>{currentLanguage.toUpperCase()}</strong>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {currentLanguage === 'tr'
              ? 'velvele.net - Türkçe (varsayılan)'
              : 'en.velvele.net - English'}
          </p>
        </div>

        {/* Navigation example */}
        <nav className="mt-12 flex justify-center space-x-8">
          <a href="#" className="text-blue-600 hover:underline">
            {t('common.home')}
          </a>
          <a href="#" className="text-blue-600 hover:underline">
            {t('common.about')}
          </a>
          <a href="#" className="text-blue-600 hover:underline">
            {t('common.contact')}
          </a>
        </nav>
      </main>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-600">
        <p className="mb-4">{t('footer.copyright')}</p>
        <div className="flex justify-center space-x-6 text-sm">
          <a href="#" className="hover:underline">
            {t('footer.privacy')}
          </a>
          <a href="#" className="hover:underline">
            {t('footer.terms')}
          </a>
        </div>
      </footer>
    </div>
  );
}
