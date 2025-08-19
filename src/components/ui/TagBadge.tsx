/**
 * TagBadge component for displaying tags with consistent styling
 * Clean, minimal design with hover states
 */

import { cn } from '@velvele/lib/utils';

interface TagBadgeProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md';
  onClick?: () => void;
}

const variantClasses = {
  default: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  outline:
    'bg-transparent text-gray-600 border border-gray-300 hover:bg-gray-50',
};

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

export function TagBadge({
  children,
  href,
  className,
  variant = 'default',
  size = 'sm',
  onClick,
}: TagBadgeProps) {
  const baseClasses = cn(
    'inline-flex items-center rounded-full font-medium transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    (href || onClick) && 'cursor-pointer',
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={baseClasses}>
        {children}
      </button>
    );
  }

  return <span className={baseClasses}>{children}</span>;
}
