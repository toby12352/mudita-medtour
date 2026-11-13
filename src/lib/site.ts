import type { UiKey } from '../i18n/ui';

// The brand name and slogan are shared by every language; translated copy lives in src/i18n/ui.ts.
export const site = {
  name: 'Mudita Medtour',
  /** Burmese on every locale; render with `lang="my"`. */
  slogan: 'ကျန်းမာစွာအသက်ကြီးပါ',
} as const;

export type SocialNetwork = 'line' | 'viber' | 'messenger' | 'facebook';
export type ContactChannelId = SocialNetwork;

export interface ViberNumber {
  /** Key in the `ui` dictionary in `src/i18n/ui.ts`; the country the number belongs to. */
  countryKey: UiKey;
  /** Number as shown, with the trunk prefix in brackets. */
  value: string;
  /** Opens a chat in the Viber app; the number without the trunk prefix. */
  href: string;
}

export interface LinkChannel {
  id: Exclude<ContactChannelId, 'viber'>;
  /** Account name shown on the contact page. */
  value: string;
  /** Web link; also used on desktops and when the app does not open. */
  href: string;
  /** App link tried first on phones and tablets. */
  appHref?: string;
}

export interface ViberChannel {
  id: 'viber';
  numbers: ViberNumber[];
}

export type ContactChannel = LinkChannel | ViberChannel;

const facebookProfileId = '100064288861600';
const facebookProfile = {
  href: `https://www.facebook.com/profile.php?id=${facebookProfileId}`,
  appHref: `fb://profile/${facebookProfileId}`,
};

// LINE is a placeholder: it opens reliably by official account ID (`@...`), not by phone number.
export const contactChannels: ContactChannel[] = [
  { id: 'line', value: '@muditamedtour', href: 'https://line.me/R/ti/p/@muditamedtour' },
  {
    id: 'viber',
    numbers: [
      {
        countryKey: 'contact.myanmar',
        value: '+95 (0) 9982164065',
        href: 'viber://chat?number=%2B959982164065',
      },
      {
        countryKey: 'contact.myanmar',
        value: '+95 (0) 95401171',
        href: 'viber://chat?number=%2B9595401171',
      },
      {
        countryKey: 'contact.thailand',
        value: '+66 (0) 631072505',
        href: 'viber://chat?number=%2B66631072505',
      },
    ],
  },
  { id: 'messenger', value: site.name, ...facebookProfile },
  { id: 'facebook', value: site.name, ...facebookProfile },
];

const socialLabelKeys: Record<SocialNetwork, UiKey> = {
  line: 'footer.line',
  viber: 'footer.viber',
  messenger: 'footer.messenger',
  facebook: 'footer.facebook',
};

export interface SocialLink {
  channel: ContactChannel;
  /** Key in the `ui` dictionary in `src/i18n/ui.ts`; the accessible name of the icon link. */
  labelKey: UiKey;
}

export const socialLinks: SocialLink[] = contactChannels.map((channel) => ({
  channel,
  labelKey: socialLabelKeys[channel.id],
}));
