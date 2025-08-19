/**
 * Section component for consistent vertical spacing and layout
 * Provides semantic structure with proper spacing
 */

import { cn } from '@velvele/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  as?: 'section' | 'div' | 'article' | 'main';
}

const spacingClasses = {
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-16',
  xl: 'py-24',
};

export function Section({
  children,
  className,
  spacing = 'md',
  as: Component = 'section',
}: SectionProps) {
  return (
    <Component className={cn(spacingClasses[spacing], className)}>
      {children}
    </Component>
  );
}
