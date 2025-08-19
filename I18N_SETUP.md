# Internationalization (i18n) Setup

This project uses i18next for internationalization with domain-based language routing.

## How It Works

- **velvele.net** → Turkish (default language)
- **en.velvele.net** → English

## Features

- Domain-based language detection
- Automatic language switching with domain redirects
- Fallback to Turkish for unknown domains
- Local storage persistence for user preferences
- TypeScript support

## File Structure

```
src/
├── i18n/
│   └── config.ts          # i18next configuration
├── hooks/
│   └── useLanguage.ts     # Custom hook for language management
├── components/
│   └── LanguageSwitcher.tsx # Language switcher component
└── app/
    ├── layout.tsx         # Root layout with i18n initialization
    └── page.tsx           # Example page using translations

public/
└── locales/
    ├── en/
    │   └── translation.json # English translations
    └── tr/
        └── translation.json # Turkish translations
```

## Usage

### 1. Using the useLanguage Hook

```tsx
import { useLanguage } from '../hooks/useLanguage';

function MyComponent() {
  const { t, currentLanguage, switchLanguage } = useLanguage();

  return (
    <div>
      <h1>{t('homepage.title')}</h1>
      <p>Current language: {currentLanguage}</p>
      <button onClick={() => switchLanguage('en')}>Switch to English</button>
    </div>
  );
}
```

### 2. Adding New Translations

Add new keys to both translation files:

**public/locales/en/translation.json:**

```json
{
  "newSection": {
    "title": "New Section Title",
    "description": "This is a new section"
  }
}
```

**public/locales/tr/translation.json:**

```json
{
  "newSection": {
    "title": "Yeni Bölüm Başlığı",
    "description": "Bu yeni bir bölüm"
  }
}
```

### 3. Language Switching

The `switchLanguage` function automatically redirects to the appropriate domain:

- `switchLanguage('en')` → redirects to `en.velvele.net`
- `switchLanguage('tr')` → redirects to `velvele.net`

### 4. Domain Configuration

For production, you'll need to configure your DNS and hosting:

1. **Main domain**: `velvele.net` → Turkish content
2. **Subdomain**: `en.velvele.net` → English content

## Development

### Running Locally

1. Start the development server:

   ```bash
   yarn dev
   ```

2. Test different languages by modifying your hosts file:

   ```
   127.0.0.1 velvele.net
   127.0.0.1 en.velvele.net
   ```

3. Access the site at:
   - `http://velvele.net:3000` → Turkish
   - `http://en.velvele.net:3000` → English

### Adding New Languages

To add a new language (e.g., German):

1. Create `public/locales/de/translation.json`
2. Update the i18n config in `src/i18n/config.ts`
3. Add language detection logic for the new domain (e.g., `de.velvele.net`)
4. Update the LanguageSwitcher component

## Best Practices

- Always provide translations for both languages
- Use nested keys for better organization
- Keep translation keys descriptive and consistent
- Test language switching on both domains
- Use TypeScript for type safety with translation keys

## Troubleshooting

- **Language not switching**: Check domain configuration and DNS settings
- **Translations not loading**: Verify file paths and JSON syntax
- **Build errors**: Ensure all translation files exist and are valid JSON
