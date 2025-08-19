/**
 * Enhanced Markdown component with MDX-like shortcodes
 * Supports blockquotes, callouts, image captions, and better typography
 */

import {
  CheckCircleIcon,
  InfoIcon,
  NoteIcon,
  WarningIcon,
  XCircleIcon,
} from '@phosphor-icons/react';

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
                  <InfoIcon className="h-5 w-5 text-blue-400" weight="fill" />
                )}
                {quoteType === 'warning' && (
                  <WarningIcon
                    className="h-5 w-5 text-yellow-400"
                    weight="fill"
                  />
                )}
                {quoteType === 'error' && (
                  <XCircleIcon className="h-5 w-5 text-red-400" weight="fill" />
                )}
                {quoteType === 'success' && (
                  <CheckCircleIcon
                    className="h-5 w-5 text-green-400"
                    weight="fill"
                  />
                )}
                {quoteType === 'note' && (
                  <NoteIcon className="h-5 w-5 text-purple-400" weight="fill" />
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
