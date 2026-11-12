import type { Locale } from '../i18n/ui';

export interface SeoImage {
  /** Absolute URL or site-relative path, e.g. `/images/articles/cover.jpg`. */
  src: string;
  alt: string;
}

export interface SeoProps {
  /** Page-specific title. The site name is appended automatically. */
  title?: string;
  description?: string;
  /** Overrides the canonical URL derived from the current path. */
  canonical?: string | URL;
  image?: SeoImage;
  type?: 'website' | 'article';
  noindex?: boolean;
  publishedTime?: Date;
  modifiedTime?: Date;
  /**
   * Paths of this page in each language that has it. Defaults to the same path in every locale.
   * Pages whose translations can be missing (articles) pass only the ones that exist.
   */
  alternates?: Partial<Record<Locale, string>>;
}
