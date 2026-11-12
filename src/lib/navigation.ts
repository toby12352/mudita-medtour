import type { UiKey } from '../i18n/ui';

export interface NavItem {
  /** Key in the `ui` dictionary in `src/i18n/ui.ts`. */
  labelKey: UiKey;
  /** Unprefixed site path; localize it with `localizePath`. */
  href: string;
}

export const mainNavigation: NavItem[] = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.articles', href: '/articles/' },
  { labelKey: 'nav.contact', href: '/contact/' },
];
