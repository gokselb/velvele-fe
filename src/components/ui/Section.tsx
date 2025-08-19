/**
 * Section component for consistent vertical spacing and layout
 * Provides semantic structure with proper spacing
 */

import { twMerge } from 'tailwind-merge';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  as?: 'section' | 'div' | 'article' | 'main';
}

const spacingClasses = {
  sm: twMerge('py-8'),
  md: twMerge('py-12'),
  lg: twMerge('py-16'),
  xl: twMerge('py-24'),
};

export function Section({
  children,
  className,
  spacing = 'md',
  as: Component = 'section',
}: SectionProps) {
  return (
    <Component className={twMerge(spacingClasses[spacing], className)}>
      {children}
    </Component>
  );
}
