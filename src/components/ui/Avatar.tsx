/**
 * Avatar component for displaying user profile images
 * Supports fallback initials and different sizes
 */

import { cn } from '@velvele/lib/utils';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  className,
}: AvatarProps) {
  const displayName = alt || name || 'User';
  const initials = name
    ? getInitials(name)
    : displayName[0]?.toUpperCase() || 'U';

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full bg-gray-100 font-medium text-gray-600',
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={displayName}
          className="h-full w-full rounded-full object-cover"
        />
      ) : null}
      {!src && <span className="select-none">{initials}</span>}
    </div>
  );
}
