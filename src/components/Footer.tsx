/**
 * Footer component with basic information and links
 */

import { Container } from './ui';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gray-900 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Velvele</span>
              </div>
              <p className="text-gray-600">
                Modern blog platform built with Next.js and Supabase.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Hızlı Linkler
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link
                    href="/etiket"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Etiketler
                  </Link>
                </li>
                <li>
                  <Link
                    href="/arsiv"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Arşiv
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                İletişim
              </h3>
              <p className="text-gray-600">Sorularınız için bize ulaşın.</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm">
              © 2024 Velvele. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
