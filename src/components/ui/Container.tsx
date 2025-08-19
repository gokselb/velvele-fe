/**
 * Container component for consistent page layout and spacing
 * Provides centered content with responsive max-widths
 */

import { twMerge } from 'tailwind-merge';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const sizeClasses = {
  sm: twMerge('max-w-2xl'),
  md: twMerge('max-w-3xl'),
  lg: twMerge('max-w-4xl'),
  xl: twMerge('max-w-7xl'),
  '2xl': twMerge('max-w-screen-xl'),
};

export function Container({
  children,
  className,
  size = 'md',
}: ContainerProps) {
  return (
    <div
      className={twMerge(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}
