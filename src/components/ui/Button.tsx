'use client';

/**
 * Button component with consistent styling and variants
 * Supports different sizes, variants, and states
 */

import { SpinnerGapIcon } from '@phosphor-icons/react';
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
          <SpinnerGapIcon
            className="mr-2 h-4 w-4 animate-spin"
            weight="regular"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
