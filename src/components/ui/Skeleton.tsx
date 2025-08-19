/**
 * Skeleton component for loading states
 * Provides smooth loading animations with different shapes
 */

import { cn } from '@velvele/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  lines = 1,
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200';

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height)
    style.height = typeof height === 'number' ? `${height}px` : height;

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              variantClasses.text,
              index === lines - 1 && 'w-3/4' // Last line is shorter
            )}
            style={index === lines - 1 ? {} : style}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={style}
    />
  );
}

// Preset skeleton components for common use cases
export function SkeletonCard() {
  return (
    <div className="space-y-4 rounded-lg border border-gray-200 p-6">
      <Skeleton variant="rectangular" height={192} />
      <div className="space-y-2">
        <Skeleton variant="text" lines={2} />
        <div className="flex items-center space-x-2">
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="text" width={100} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonPost() {
  return (
    <article className="space-y-4">
      <Skeleton variant="rectangular" height={240} className="w-full" />
      <div className="space-y-3">
        <div className="flex space-x-2">
          <Skeleton variant="text" width={60} height={20} />
          <Skeleton variant="text" width={80} height={20} />
        </div>
        <Skeleton variant="text" lines={1} height={28} />
        <Skeleton variant="text" lines={3} />
        <div className="flex items-center space-x-3">
          <Skeleton variant="circular" width={32} height={32} />
          <div className="space-y-1">
            <Skeleton variant="text" width={100} height={16} />
            <Skeleton variant="text" width={80} height={14} />
          </div>
        </div>
      </div>
    </article>
  );
}
