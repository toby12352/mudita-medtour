import { getRelativeLocaleUrl } from 'astro:i18n';

// Keep in sync with `i18n.locales` in astro.config.mjs.
export const locales = ['en', 'my'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** Each language named in itself, for the language switcher. */
export const languageNames: Record<Locale, string> = {
  en: 'English',
  my: 'မြန်မာ',
};

/** Open Graph locale codes. */
export const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  my: 'my_MM',
};

/** Interface copy. English defines the keys; every other locale must translate all of them. */
const en = {
  'site.description':
    'Information for international patients about medical treatments, hospitals, specialists, and planning care abroad.',
  'nav.home': 'Home',
  'nav.articles': 'Articles',
  'nav.contact': 'Contact',
  'nav.main': 'Main',
  'nav.menu': 'Menu',
  'nav.language': 'Language',
  'layout.skipToContent': 'Skip to content',
  'footer.social': 'Social media',
  'footer.line': 'Mudita Medtour on Line',
  'footer.viber': 'Mudita Medtour on Viber',
  'footer.messenger': 'Message Mudita Medtour on Messenger',
  'footer.facebook': 'Mudita Medtour on Facebook',
  'home.heroTitle': 'Clear information for care abroad.',
  'home.readArticles': 'Read articles',
  'home.latestArticles': 'Latest articles',
  'home.viewAll': 'View all',
  'home.hospitals.title': 'Featured Hospital Partners',
  'home.hospitals.lead':
    'Partnering with internationally accredited hospitals and ISO-certified facilities across Thailand to deliver quality healthcare.',
  'home.steps.title': 'How care abroad works',
  'home.steps.lead': 'From your first conversation to follow-up after you return home.',
  'home.steps.contact': 'Contact',
  'home.steps.contactText': 'Tell us which treatment you are looking into, and what you want to know.',
  'home.steps.planning': 'Planning',
  'home.steps.planningText':
    'Compare hospitals, specialists, dates, and what the quoted cost covers.',
  'home.steps.travel': 'Travel',
  'home.steps.travelText': 'Plan the journey, where you will stay, and how you will arrive.',
  'home.steps.procedure': 'Procedure',
  'home.steps.procedureText': 'Have the treatment, with the plan explained before it starts.',
  'home.steps.postOp': 'Post-op',
  'home.steps.postOpText': 'Recover with the care team nearby before you travel home.',
  'home.steps.followUp': 'Follow-up',
  'home.steps.followUpText': 'Stay in touch about recovery after you are home.',
  'articles.title': 'Articles',
  'articles.description':
    'Articles and guides for international patients planning medical care abroad.',
  'articles.lead': 'Guides and information for international patients.',
  'articles.empty': 'No articles have been published yet.',
  'article.published': 'Published',
  'article.updated': 'Updated',
  'contact.title': 'Contact us',
  'contact.description':
    'Message Mudita Medtour on LINE, Viber, Messenger, or Facebook.',
  'contact.lead': 'Choose the way that suits you. Tap an option to open it on your phone.',
  'contact.channels': 'Ways to contact us',
  'contact.line': 'LINE',
  'contact.lineAction': 'Chat on LINE',
  'contact.viber': 'Viber',
  'contact.viberValue': 'Myanmar and Thailand',
  'contact.viberAction': 'Choose a number',
  'contact.viberNumbers': 'Viber numbers',
  'contact.myanmar': 'Myanmar',
  'contact.thailand': 'Thailand',
  'contact.messenger': 'Messenger',
  'contact.messengerAction': 'Send a message',
  'contact.facebook': 'Facebook',
  'contact.facebookAction': 'Open Facebook',
} as const;

export type UiKey = keyof typeof en;

const my: Record<UiKey, string> = {
  'site.description':
    'နိုင်ငံတကာ လူနာများအတွက် ဆေးကုသမှုများ၊ ဆေးရုံများ၊ အထူးကုဆရာဝန်များနှင့် နိုင်ငံခြားတွင် ဆေးကုသမှု စီစဉ်ခြင်းဆိုင်ရာ အချက်အလက်များ။',
  'nav.home': 'ပင်မစာမျက်နှာ',
  'nav.articles': 'ဆောင်းပါးများ',
  'nav.contact': 'ဆက်သွယ်ရန်',
  'nav.main': 'ပင်မလမ်းညွှန်',
  'nav.menu': 'မီနူး',
  'nav.language': 'ဘာသာစကား',
  'layout.skipToContent': 'အကြောင်းအရာသို့ ကျော်သွားရန်',
  'footer.social': 'လူမှုကွန်ရက်များ',
  'footer.line': 'Line တွင် Mudita Medtour',
  'footer.viber': 'Viber တွင် Mudita Medtour',
  'footer.messenger': 'Messenger မှ Mudita Medtour သို့ မက်ဆေ့ချ် ပို့ရန်',
  'footer.facebook': 'Facebook တွင် Mudita Medtour',
  'home.heroTitle': 'နိုင်ငံခြား ဆေးကုသမှုအတွက် ရှင်းလင်းသော အချက်အလက်များ။',
  'home.readArticles': 'ဆောင်းပါးများ ဖတ်ရန်',
  'home.latestArticles': 'နောက်ဆုံးထွက် ဆောင်းပါးများ',
  'home.viewAll': 'အားလုံးကြည့်ရန်',
  'home.hospitals.title': 'ရွေးချယ်ထားသော မိတ်ဖက်ဆေးရုံများ',
  'home.hospitals.lead':
    'အရည်အသွေးမီ ကျန်းမာရေးစောင့်ရှောက်မှု ပေးနိုင်ရန် ထိုင်းနိုင်ငံတစ်ဝန်းရှိ နိုင်ငံတကာ အသိအမှတ်ပြု (internationally accredited) ဆေးရုံများနှင့် ISO လက်မှတ်ရ (ISO-certified) ဆေးကုသရေးဌာနများနှင့် ပူးပေါင်းဆောင်ရွက်လျက်ရှိပါသည်။',
  'home.steps.title': 'နိုင်ငံခြားတွင် ဆေးကုသမှု ခံယူပုံ အဆင့်ဆင့်',
  'home.steps.lead':
    'ပထမဆုံး ဆက်သွယ်မေးမြန်းချိန်မှစ၍ အိမ်ပြန်ရောက်ပြီးနောက် ဆက်လက်စောင့်ရှောက်မှုအထိ။',
  'home.steps.contact': 'ဆက်သွယ်ခြင်း',
  'home.steps.contactText':
    'သင်စုံစမ်းနေသော ဆေးကုသမှုနှင့် သိလိုသည့်အချက်များကို ကျွန်ုပ်တို့ထံ ပြောပြပါ။',
  'home.steps.planning': 'စီစဉ်ခြင်း',
  'home.steps.planningText':
    'ဆေးရုံများ၊ အထူးကုဆရာဝန်များ၊ ရက်စွဲများနှင့် ကုန်ကျစရိတ် ခန့်မှန်းချက်တွင် ပါဝင်သည့်အရာများကို နှိုင်းယှဉ်ပါ။',
  'home.steps.travel': 'ခရီးသွားခြင်း',
  'home.steps.travelText': 'ခရီးစဉ်၊ တည်းခိုမည့်နေရာနှင့် ရောက်ရှိမည့်ပုံကို စီစဉ်ပါ။',
  'home.steps.procedure': 'ကုသမှု ခံယူခြင်း (Procedure)',
  'home.steps.procedureText': 'ကုသမှု မစတင်မီ အစီအစဉ်ကို ရှင်းပြပြီးနောက် ကုသမှု ခံယူပါ။',
  'home.steps.postOp': 'ခွဲစိတ်ပြီးနောက် စောင့်ရှောက်မှု (Post-op)',
  'home.steps.postOpText':
    'အိမ်မပြန်မီ ဆေးကုသရေးအဖွဲ့ အနီးတွင်ရှိစဉ် ပြန်လည်နာလန်ထူပါ။',
  'home.steps.followUp': 'နောက်ဆက်တွဲ စောင့်ရှောက်မှု (Follow-up)',
  'home.steps.followUpText':
    'အိမ်ပြန်ရောက်ပြီးနောက်လည်း ပြန်လည်နာလန်ထူမှုအကြောင်း ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။',
  'articles.title': 'ဆောင်းပါးများ',
  'articles.description':
    'နိုင်ငံခြားတွင် ဆေးကုသမှု ခံယူရန် စီစဉ်နေသော နိုင်ငံတကာ လူနာများအတွက် ဆောင်းပါးများနှင့် လမ်းညွှန်များ။',
  'articles.lead': 'နိုင်ငံတကာ လူနာများအတွက် လမ်းညွှန်များနှင့် အချက်အလက်များ။',
  'articles.empty': 'ထုတ်ဝေထားသော ဆောင်းပါး မရှိသေးပါ။',
  'article.published': 'ထုတ်ဝေသည့်ရက်',
  'article.updated': 'ပြင်ဆင်သည့်ရက်',
  'contact.title': 'ကျွန်ုပ်တို့ကို ဆက်သွယ်ရန်',
  'contact.description':
    'Mudita Medtour ကို LINE၊ Viber၊ Messenger သို့မဟုတ် Facebook မှတစ်ဆင့် မက်ဆေ့ချ် ပို့နိုင်ပါသည်။',
  'contact.lead':
    'သင့်အတွက် အဆင်ပြေသော နည်းလမ်းကို ရွေးချယ်ပါ။ နှိပ်လိုက်သည်နှင့် သင့်ဖုန်းတွင် ဖွင့်ပေးပါမည်။',
  'contact.channels': 'ဆက်သွယ်နိုင်သော နည်းလမ်းများ',
  'contact.line': 'LINE',
  'contact.lineAction': 'LINE တွင် စကားပြောရန်',
  'contact.viber': 'Viber',
  'contact.viberValue': 'မြန်မာနှင့် ထိုင်း',
  'contact.viberAction': 'နံပါတ် ရွေးချယ်ရန်',
  'contact.viberNumbers': 'Viber ဖုန်းနံပါတ်များ',
  'contact.myanmar': 'မြန်မာ',
  'contact.thailand': 'ထိုင်း',
  'contact.messenger': 'Messenger',
  'contact.messengerAction': 'မက်ဆေ့ချ် ပို့ရန်',
  'contact.facebook': 'Facebook',
  'contact.facebookAction': 'Facebook စာမျက်နှာ ဖွင့်ရန်',
};

export const ui: Record<Locale, Record<UiKey, string>> = { en, my };

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

/** Narrows `Astro.currentLocale` to a supported locale. */
export function getLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function useTranslations(locale: Locale) {
  return (key: UiKey): string => ui[locale][key];
}

/** Turns a site path such as `/articles/` into its URL in `locale`. */
export function localizePath(locale: Locale, path: string): string {
  return getRelativeLocaleUrl(locale, path.replace(/^\/+|\/+$/g, ''));
}

/** Removes the locale prefix: `/my/articles/` becomes `/articles/`. */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split('/');
  if (first === defaultLocale || !isLocale(first)) return pathname;
  return `/${rest.join('/')}`;
}
