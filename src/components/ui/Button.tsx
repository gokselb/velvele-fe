/**
 * Button component with consistent styling and variants
 * Supports different sizes, variants, and states
 */

import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const variantClasses = {
  primary: twMerge(
    'bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900 border-transparent'
  ),
  secondary: twMerge(
    'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 border-transparent'
  ),
  ghost: twMerge(
    'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 border-transparent'
  ),
  outline: twMerge(
    'bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500 border-gray-300'
  ),
};

const sizeClasses = {
  sm: twMerge('px-3 py-1.5 text-sm'),
  md: twMerge('px-4 py-2 text-sm'),
  lg: twMerge('px-6 py-3 text-base'),
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={twMerge(
          // Base styles
          'inline-flex items-center justify-center rounded-md border font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          // Variant styles
          variantClasses[variant],
          // Size styles
          sizeClasses[size],
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
