/**
 * EmptyState component for displaying when no content is available
 * Clean, centered design with optional actions
 */

import { Button } from './Button';
import { cn } from '@velvele/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 text-center',
        className
      )}
    >
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          {icon}
        </div>
      )}

      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>

      {description && (
        <p className="mb-6 max-w-sm text-gray-600">{description}</p>
      )}

      {action && (
        <Button onClick={action.onClick} variant="primary">
          {action.label}
        </Button>
      )}
    </div>
  );
}
