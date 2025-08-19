/**
 * Header component with logo, navigation, and search
 * Responsive design with mobile menu
 */

'use client';

import { useEffect, useState } from 'react';

import { Container } from './ui';
import { LanguageSwitcher } from './LanguageSwitcher';
import Link from 'next/link';
import { useLanguage } from '@velvele/hooks/useLanguage';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [icons, setIcons] = useState<{
    MagnifyingGlassIcon?: React.ComponentType<{
      className?: string;
      weight?: string;
    }>;
    XIcon?: React.ComponentType<{ className?: string; weight?: string }>;
    ListIcon?: React.ComponentType<{ className?: string; weight?: string }>;
  }>({});
  const { t } = useLanguage();

  useEffect(() => {
    // Dynamically import icons to avoid SSR issues
    const loadIcons = async () => {
      const { MagnifyingGlassIcon, XIcon, ListIcon } = await import(
        '@phosphor-icons/react'
      );
      setIcons({ MagnifyingGlassIcon, XIcon, ListIcon });
    };
    loadIcons();
  }, []);

  const navigation = [
    { name: t('common.home'), href: '/' },
    { name: t('common.tags'), href: '/etiket' },
    { name: t('common.archive'), href: '/arsiv' },
  ];

  return (
    <header className="border-b border-gray-200 bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gray-900 flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Velvele</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="hidden md:flex items-center">
            <LanguageSwitcher />
          </div>

          {/* Search Placeholder */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                {icons.MagnifyingGlassIcon && (
                  <icons.MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    weight="regular"
                  />
                )}
              </div>
              <input
                type="text"
                placeholder={t('common.search')}
                className="block w-64 rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                disabled
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen
                ? icons.XIcon && (
                    <icons.XIcon className="h-6 w-6" weight="regular" />
                  )
                : icons.ListIcon && (
                    <icons.ListIcon className="h-6 w-6" weight="regular" />
                  )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {/* Mobile Language Switcher */}
            <div className="border-t border-gray-200 px-3 py-3">
              <LanguageSwitcher />
            </div>
            {/* Mobile Search */}
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="px-3">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {icons.MagnifyingGlassIcon && (
                      <icons.MagnifyingGlassIcon
                        className="h-5 w-5 text-gray-400"
                        weight="regular"
                      />
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder={t('common.search')}
                    className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
