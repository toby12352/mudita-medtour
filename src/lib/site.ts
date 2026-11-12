import type { UiKey } from '../i18n/ui';

// The brand name and slogan are shared by every language; translated copy lives in src/i18n/ui.ts.
export const site = {
  name: 'Mudita Medtour',
  /** Burmese on every locale; render with `lang="my"`. */
  slogan: 'ကျန်းမာစွာအသက်ကြီးပါ',
} as const;

export type SocialNetwork = 'line' | 'viber' | 'messenger' | 'facebook';
export type ContactChannelId = 'phone' | SocialNetwork;

export interface ContactChannel {
  id: ContactChannelId;
  /** Number or account name shown on the contact page. */
  value: string;
  /** Link that opens the phone dialer or the app. */
  href: string;
}

// Placeholder details: replace `value` and `href` together for each channel.
// LINE opens reliably by official account ID (`@...`), not by phone number.
export const contactChannels: ContactChannel[] = [
  { id: 'phone', value: '+66 00 000 0000', href: 'tel:+66000000000' },
  { id: 'line', value: '@muditamedtour', href: 'https://line.me/R/ti/p/@muditamedtour' },
  { id: 'viber', value: '+66 00 000 0000', href: 'viber://chat?number=%2B66000000000' },
  { id: 'messenger', value: 'muditamedtour', href: 'https://m.me/muditamedtour' },
  { id: 'facebook', value: 'muditamedtour', href: 'https://www.facebook.com/muditamedtour' },
];

function channelHref(id: ContactChannelId): string {
  return contactChannels.find((channel) => channel.id === id)?.href ?? '#';
}

export interface SocialLink {
  network: SocialNetwork;
  /** Key in the `ui` dictionary in `src/i18n/ui.ts`; the accessible name of the icon link. */
  labelKey: UiKey;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { network: 'line', labelKey: 'footer.line', href: channelHref('line') },
  { network: 'viber', labelKey: 'footer.viber', href: channelHref('viber') },
  { network: 'messenger', labelKey: 'footer.messenger', href: channelHref('messenger') },
  { network: 'facebook', labelKey: 'footer.facebook', href: channelHref('facebook') },
];
