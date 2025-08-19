import './globals.css';

import { Geist, Geist_Mono } from 'next/font/google';

import { Analytics } from '@vercel/analytics/next';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { I18nProvider } from '../components/I18nProvider';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Velvele — Teknoloji ve Yazılım Blogu',
    template: '%s | Velvele',
  },
  description:
    'Teknoloji, yazılım ve dijital dünya hakkında güncel blog yazıları. En son trendleri ve gelişmeleri keşfedin.',
  keywords: ['teknoloji', 'yazılım', 'blog', 'dijital', 'web', 'development'],
  authors: [{ name: 'Velvele Team' }],
  creator: 'Velvele',
  publisher: 'Velvele',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://velvele.net'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-simple.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://velvele.net',
    siteName: 'Velvele',
    title: 'Velvele — Teknoloji ve Yazılım Blogu',
    description:
      'Teknoloji, yazılım ve dijital dünya hakkında güncel blog yazıları.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Velvele - Teknoloji ve Yazılım Blogu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velvele — Teknoloji ve Yazılım Blogu',
    description:
      'Teknoloji, yazılım ve dijital dünya hakkında güncel blog yazıları.',
    images: ['/og-image.jpg'],
    creator: '@velvele',
    site: '@velvele',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </I18nProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
