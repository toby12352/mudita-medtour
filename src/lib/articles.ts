import { getCollection, type CollectionEntry } from 'astro:content';
import { isLocale, localizePath, locales, type Locale } from '../i18n/ui';

export type Article = CollectionEntry<'articles'>;

/** Locale from the article's folder, e.g. `my` for `my/hip-replacement`. */
export function getArticleLocale(article: Article): Locale {
  const [locale] = article.id.split('/');
  if (!isLocale(locale)) {
    throw new Error(
      `Article "${article.id}" must be in a locale folder: src/content/articles/{${locales.join(',')}}/`,
    );
  }
  return locale;
}

/** File name under the locale folder. The same name in both folders links the switcher. */
export function getArticleSlug(article: Article): string {
  return article.id.split('/').slice(1).join('/');
}

export function getArticleUrl(article: Article): string {
  return localizePath(getArticleLocale(article), `/articles/${getArticleSlug(article)}/`);
}

/** Drafts are included only in development. A published article may exist in one language. */
async function getAllPublishedArticles(): Promise<Article[]> {
  return getCollection('articles', ({ data }) => import.meta.env.DEV || !data.draft);
}

/** Published articles in one locale, newest first. */
export async function getPublishedArticles(locale: Locale): Promise<Article[]> {
  const articles = (await getAllPublishedArticles()).filter(
    (article) => getArticleLocale(article) === locale,
  );
  return articles.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** URLs of the article in every locale where a published translation exists. */
export async function getArticleAlternates(
  article: Article,
): Promise<Partial<Record<Locale, string>>> {
  const slug = getArticleSlug(article);
  const translations = (await getAllPublishedArticles()).filter(
    (entry) => getArticleSlug(entry) === slug,
  );
  return Object.fromEntries(
    translations.map((entry) => [getArticleLocale(entry), getArticleUrl(entry)]),
  );
}

/** Static paths for `[slug].astro` in one locale. */
export async function getArticlePaths(locale: Locale) {
  const articles = await getPublishedArticles(locale);
  return articles.map((article) => ({
    params: { slug: getArticleSlug(article) },
    props: { article },
  }));
}
