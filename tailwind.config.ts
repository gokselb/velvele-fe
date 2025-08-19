import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette for newsroom-clean aesthetic
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            // Improve article readability
            maxWidth: 'none',
            color: '#404040',
            lineHeight: '1.75',
            fontSize: '1.125rem',
            '[class~="lead"]': {
              fontSize: '1.25rem',
              lineHeight: '1.6',
            },
            h1: {
              fontSize: '2.25rem',
              fontWeight: '700',
              lineHeight: '1.2',
              marginBottom: '1rem',
            },
            h2: {
              fontSize: '1.875rem',
              fontWeight: '600',
              lineHeight: '1.3',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              fontSize: '1.5rem',
              fontWeight: '600',
              lineHeight: '1.4',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            p: {
              marginBottom: '1.5rem',
            },
            a: {
              color: '#171717',
              textDecoration: 'underline',
              textDecorationColor: '#d4d4d4',
              textUnderlineOffset: '3px',
              '&:hover': {
                textDecorationColor: '#171717',
              },
            },
            blockquote: {
              borderLeftColor: '#d4d4d4',
              borderLeftWidth: '4px',
              paddingLeft: '1.5rem',
              fontStyle: 'italic',
              color: '#525252',
            },
            code: {
              backgroundColor: '#f5f5f5',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Add line-clamp plugin
    function ({ addUtilities }: any) {
      addUtilities({
        '.line-clamp-1': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '1',
        },
        '.line-clamp-2': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
        },
        '.line-clamp-3': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
        },
        '.line-clamp-4': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '4',
        },
      });
    },
  ],
};

export default config;
