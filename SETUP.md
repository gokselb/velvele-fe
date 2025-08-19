# Project Setup Guide

## Environment Configuration

This project requires Supabase environment variables to be configured. Follow these steps:

1. Copy the example environment file:

   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Supabase credentials in `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
   ```

3. Get your Supabase credentials from your Supabase project dashboard:
   - Go to your Supabase project
   - Navigate to Settings > API
   - Copy the Project URL and anon/public key
   - For the service role key, use the service_role key (keep this secret!)

## Installed Packages

### Core Dependencies

- **@supabase/supabase-js**: Supabase JavaScript client
- **@supabase/ssr**: Server-side rendering support for Supabase
- **date-fns**: Modern date utility library
- **clsx**: Utility for constructing className strings
- **react-markdown**: Markdown renderer for React
- **remark-gfm**: GitHub Flavored Markdown support

### Development Dependencies

- **@tailwindcss/typography**: Typography plugin for Tailwind CSS

## Usage Examples

### Supabase Client

```typescript
import {
  createSupabaseClient,
  createSupabaseServerClient,
} from '@/lib/supabase';

// Client-side usage
const supabase = createSupabaseClient();

// Server-side usage (in Server Components)
const supabase = createSupabaseServerClient();
```

### Utility Functions

```typescript
import { cn, formatDate, formatDateDistance } from '@/lib/utils';

// Combine CSS classes
const className = cn('base-class', condition && 'conditional-class');

// Format dates
const formatted = formatDate(new Date(), 'PPP');
const relative = formatDateDistance(new Date());
```

### Markdown Component

```typescript
import { Markdown } from '@/components/Markdown';

<Markdown content="# Hello World\nThis is **markdown** content!" />;
```

## Tailwind Typography

The `@tailwindcss/typography` plugin is enabled and provides the `prose` classes for beautiful typography:

```html
<div class="prose prose-gray max-w-none">
  <!-- Your content here -->
</div>
```

## Environment Validation

The project includes automatic environment variable validation in `src/lib/env.ts`. If any required environment variables are missing, the application will throw helpful error messages during startup.

## Next Steps

1. Set up your Supabase project and add the credentials to `.env.local`
2. Start the development server: `yarn dev`
3. The environment validation will run and show any missing variables
4. Begin building your application with the configured packages!
