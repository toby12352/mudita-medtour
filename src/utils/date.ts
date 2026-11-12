import type { Locale } from '../i18n/ui';

// Western digits in every locale, so dates match prices and figures in the body text.
const dateFormatters = new Map<Locale, Intl.DateTimeFormat>();

export function formatDate(date: Date, locale: Locale): string {
  let formatter = dateFormatters.get(locale);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
      numberingSystem: 'latn',
    });
    dateFormatters.set(locale, formatter);
  }
  return formatter.format(date);
}

export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
