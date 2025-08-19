import { type ClassValue, clsx } from 'clsx';
import {
  format,
  formatDistance,
  formatRelative,
  isDate,
  parseISO,
} from 'date-fns';

// Utility function for combining CSS classes
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Date formatting utilities
export function formatDate(date: Date | string, formatString: string = 'PPP') {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatString);
}

export function formatDateDistance(date: Date | string) {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistance(dateObj, new Date(), { addSuffix: true });
}

export function formatDateRelative(date: Date | string) {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatRelative(dateObj, new Date());
}

// Validation utilities
export function isValidDate(date: unknown): date is Date {
  return isDate(date) && !isNaN(date.getTime());
}
