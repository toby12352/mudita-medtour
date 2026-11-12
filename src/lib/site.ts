import type { UiKey } from '../i18n/ui';

// The brand name is shared by every language; translated copy lives in src/i18n/ui.ts.
export const site = {
  name: 'Mudita Medtour',
} as const;

export type SocialNetwork = 'line' | 'viber' | 'messenger' | 'facebook';

export interface SocialLink {
  network: SocialNetwork;
  /** Key in the `ui` dictionary in `src/i18n/ui.ts`; the accessible name of the icon link. */
  labelKey: UiKey;
  href: string;
}

// Placeholder hrefs: replace each `#` with the real profile URL.
export const socialLinks: SocialLink[] = [
  { network: 'line', labelKey: 'footer.line', href: '#' },
  { network: 'viber', labelKey: 'footer.viber', href: '#' },
  { network: 'messenger', labelKey: 'footer.messenger', href: '#' },
  { network: 'facebook', labelKey: 'footer.facebook', href: '#' },
];
