# Velvele Blog Platform

Modern blog platform built with Next.js 15, Supabase, and Tailwind CSS.

## Features

- **Next.js 15 App Router** with React Server Components
- **Supabase** for database and authentication
- **Tailwind CSS** with typography plugin
- **TypeScript** for type safety
- **Enhanced Markdown** with MDX-like shortcodes
- **SEO Optimized** with metadata and sitemap
- **Turkish Language Support** with proper localization
- **Responsive Design** with mobile-first approach
- **Image Optimization** with Next.js Image
- **Pagination** for better content navigation
- **ISR (Incremental Static Regeneration)** for performance

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, @tailwindcss/typography
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Markdown**: react-markdown, remark-gfm
- **Date Handling**: date-fns with Turkish locale
- **Utilities**: clsx for conditional classes
- **Development**: ESLint, Prettier

## Quick Start

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for the project to be ready (usually takes 2-3 minutes)
4. Note down your project URL and anon key

### 2. Set Up Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Copy the contents of `supabase/schema.sql`
3. Paste and run the SQL to create all tables, indexes, and RLS policies

### 3. Environment Configuration

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Supabase credentials:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Optional: Database URL for direct connections
DATABASE_URL=your_database_url_here
```

⚠️ **IMPORTANT**:

- Never commit your `.env.local` file
- The `SUPABASE_SERVICE_ROLE_KEY` has full database access
- Use temporary values for local development only

### 4. Install Dependencies

```bash
yarn install
```

### 5. Seed Database with Sample Data

```bash
# Option 1: Using the yarn script (recommended)
yarn seed

# Option 2: Using ts-node directly
npx ts-node --project scripts/tsconfig.json scripts/seed.ts

# Option 3: Using node with ts-node loader
node --loader ts-node/esm scripts/seed.ts
```

This will create:

- 1 sample author (Ahmet Yılmaz)
- 6 technology tags (JavaScript, React, Next.js, TypeScript, Web Geliştirme, Yazılım Mühendisliği)
- 8 sample blog posts in Turkish with markdown content
- Proper relationships between posts and tags

> 💡 **Note**: The seed script is idempotent - you can run it multiple times safely. It will only create new data that doesn't already exist.

### 6. Start Development Server

```bash
yarn dev
```

Your blog will be available at `http://localhost:3000`

## Project Structure

```
velvele-fe/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (routes)/          # Route groups
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Footer.tsx        # Site footer
│   │   ├── Hero.tsx          # Hero section
│   │   ├── PostCard.tsx      # Post preview card
│   │   ├── PostList.tsx      # Post list component
│   │   ├── Pagination.tsx    # Pagination controls
│   │   └── Markdown.tsx      # Enhanced markdown renderer
│   ├── lib/                  # Utility libraries
│   │   ├── supabase/         # Supabase clients and types
│   │   ├── blog/             # Blog data fetching
│   │   ├── utils.ts          # General utilities
│   │   └── env.ts            # Environment validation
│   └── hooks/                # Custom React hooks
├── supabase/
│   └── schema.sql            # Database schema
├── scripts/
│   └── seed.ts               # Database seeding script
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── next.config.ts            # Next.js configuration
└── package.json              # Dependencies and scripts
```

## Available Scripts

```bash
# Development
yarn dev              # Start development server
yarn build            # Build for production
yarn start            # Start production server
yarn lint             # Run ESLint

# Database
yarn seed             # Seed database with sample data
```

## Database Schema

The platform uses the following main tables:

- **`authors`**: Blog post authors with profiles
- **`tags`**: Content categorization tags
- **`posts`**: Blog posts with markdown content
- **`post_tags`**: Many-to-many relationship between posts and tags

All tables have:

- UUID primary keys
- Proper foreign key relationships
- Row Level Security (RLS) policies
- Automatic timestamp management
- Optimized indexes for performance

## Content Management

### Writing Posts

Posts are written in Markdown with enhanced features:

- **Special Blockquotes**: `> info:`, `> warning:`, `> error:`, `> success:`, `> note:`
- **Image Captions**: `![alt text | caption](image_url)`
- **Code Highlighting**: Automatic syntax highlighting for code blocks
- **Responsive Images**: Automatic optimization with Next.js Image

### Example Post Structure

```markdown
# Post Title

> info: This is an informational note

## Section Heading

Regular paragraph with **bold** and _italic_ text.

![Image description | Caption text](https://example.com/image.jpg)

\`\`\`javascript
// Code example
function hello() {
console.log("Hello, World!");
}
\`\`\`
```

## SEO Features

- **Dynamic Metadata**: Each page generates appropriate meta tags
- **Open Graph**: Rich social media previews
- **Twitter Cards**: Enhanced Twitter sharing
- **Sitemap**: Automatic XML sitemap generation
- **Robots.txt**: Search engine guidance
- **Canonical URLs**: Prevents duplicate content issues

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The platform works with any hosting provider that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
