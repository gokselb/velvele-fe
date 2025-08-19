/**
 * Enhanced Markdown component with MDX-like shortcodes
 * Supports blockquotes, callouts, image captions, and better typography
 */

import type { Components } from 'react-markdown';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { twMerge } from 'tailwind-merge';

interface MarkdownProps {
  content: string;
  className?: string;
}

// Custom components for enhanced markdown rendering
const components: Components = {
  // Enhanced blockquotes with different styles
  blockquote: ({ children, className, ...props }) => {
    const content = children;
    const text = typeof content === 'string' ? content : '';

    // Check for special blockquote types
    if (text.startsWith('> ')) {
      const type = text.match(/^> (info|warning|error|success|note):\s*(.*)/);
      if (type) {
        const [, quoteType, quoteText] = type;
        const typeStyles = {
          info: twMerge('border-blue-200 bg-blue-50 text-blue-800'),
          warning: twMerge('border-yellow-200 bg-yellow-50 text-yellow-800'),
          error: twMerge('border-red-200 bg-red-50 text-red-800'),
          success: twMerge('border-green-200 bg-green-50 text-green-800'),
          note: twMerge('border-purple-200 bg-purple-50 text-purple-800'),
        };

        return (
          <div
            className={twMerge(
              'my-6 rounded-lg border-l-4 p-4',
              typeStyles[quoteType as keyof typeof typeStyles] ||
                typeStyles.info
            )}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {quoteType === 'info' && (
                  <svg
                    className="h-5 w-5 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {quoteType === 'warning' && (
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {quoteType === 'error' && (
                  <svg
                    className="h-5 w-5 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {quoteType === 'success' && (
                  <svg
                    className="h-5 w-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {quoteType === 'note' && (
                  <svg
                    className="h-5 w-5 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium capitalize">{quoteType}</p>
                <div className="mt-1 text-sm">{quoteText}</div>
              </div>
            </div>
          </div>
        );
      }
    }

    // Regular blockquote
    return (
      <blockquote
        className={twMerge(
          'my-6 border-l-4 border-gray-300 bg-gray-50 pl-4 italic text-gray-700',
          className
        )}
        {...props}
      >
        {children}
      </blockquote>
    );
  },

  // Enhanced images with captions and Next.js Image optimization
  img: ({ src, alt, className, ...props }) => {
    if (!src || typeof src !== 'string') return null;

    // Check if it's a whitelisted domain for Next.js Image
    const isWhitelisted =
      src.includes('images.unsplash.com') ||
      src.includes('picsum.photos') ||
      src.includes('via.placeholder.com');

    // Extract caption from alt text (format: "alt text | caption")
    const [imageAlt, caption] = alt?.split(' | ') || [alt, ''];

    if (isWhitelisted) {
      return (
        <figure className="my-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={src}
              alt={imageAlt || ''}
              fill
              className={twMerge('object-cover', className)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          {caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-600">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    // Fallback to regular img for non-whitelisted domains
    return (
      <figure className="my-6">
        <img
          src={src}
          alt={imageAlt || ''}
          className={twMerge('w-full rounded-lg', className)}
          {...props}
        />
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-gray-600">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  },

  // Enhanced headings with better spacing and typography
  h1: ({ children, className, ...props }) => (
    <h1
      className={twMerge(
        'mb-6 mt-8 text-3xl font-bold text-gray-900 first:mt-0',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  ),

  h2: ({ children, className, ...props }) => (
    <h2
      className={twMerge(
        'mb-4 mt-8 text-2xl font-semibold text-gray-900 first:mt-0',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  ),

  h3: ({ children, className, ...props }) => (
    <h3
      className={twMerge(
        'mb-3 mt-6 text-xl font-semibold text-gray-900 first:mt-0',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  ),

  h4: ({ children, className, ...props }) => (
    <h4
      className={twMerge(
        'mb-2 mt-4 text-lg font-medium text-gray-900 first:mt-0',
        className
      )}
      {...props}
    >
      {children}
    </h4>
  ),

  // Enhanced links with better styling
  a: ({ children, href, className, ...props }) => (
    <a
      href={href}
      className={twMerge(
        'text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-800 hover:decoration-blue-500',
        className
      )}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),

  // Enhanced code blocks
  code: ({ children, className, ...props }) => {
    const isInline = typeof children === 'string' && !children.includes('\n');

    if (isInline) {
      return (
        <code
          className={twMerge(
            'rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-gray-800',
            className
          )}
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <code
        className={twMerge(
          'block rounded-lg bg-gray-900 p-4 text-sm text-gray-100',
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  },

  // Enhanced lists
  ul: ({ children, className, ...props }) => (
    <ul
      className={twMerge(
        'my-4 list-disc space-y-2 pl-6 text-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </ul>
  ),

  ol: ({ children, className, ...props }) => (
    <ol
      className={twMerge(
        'my-4 list-decimal space-y-2 pl-6 text-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </ol>
  ),

  // Enhanced paragraphs
  p: ({ children, className, ...props }) => (
    <p
      className={twMerge(
        'mb-4 leading-relaxed text-gray-700 last:mb-0',
        className
      )}
      {...props}
    >
      {children}
    </p>
  ),
};

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div className={twMerge('prose prose-gray max-w-none', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
