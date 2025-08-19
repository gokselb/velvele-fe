import {
  format,
  formatDistance,
  formatRelative,
  isDate,
  parseISO,
} from 'date-fns';

import { tr } from 'date-fns/locale';

// Date formatting utilities
export function formatDate(date: Date | string, formatString: string = 'PPP') {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatString, { locale: tr });
}

export function formatDateDistance(date: Date | string) {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistance(dateObj, new Date(), { addSuffix: true, locale: tr });
}

export function formatDateRelative(date: Date | string) {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatRelative(dateObj, new Date(), { locale: tr });
}

// Validation utilities
export function isValidDate(date: unknown): date is Date {
  return isDate(date) && !isNaN(date.getTime());
}
