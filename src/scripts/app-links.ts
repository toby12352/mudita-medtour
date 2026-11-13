// Links with `data-app-href` try the app on phones and tablets (touch, below `lg`), then fall
// back to their web `href` if the app does not take over the page. Desktops follow `href`.
const handheld = window.matchMedia('(max-width: 63.99rem) and (pointer: coarse)');
const fallbackDelay = 1500;

function openApp(link: HTMLAnchorElement, appHref: string): void {
  const fallback = window.setTimeout(() => {
    if (!document.hidden) window.location.href = link.href;
  }, fallbackDelay);
  const cancel = () => window.clearTimeout(fallback);

  document.addEventListener('visibilitychange', cancel, { once: true });
  window.addEventListener('pagehide', cancel, { once: true });
  window.location.href = appHref;
}

for (const link of document.querySelectorAll<HTMLAnchorElement>('a[data-app-href]')) {
  link.addEventListener('click', (event) => {
    const appHref = link.dataset.appHref;
    const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (!appHref || !handheld.matches || modified || event.button !== 0) return;

    event.preventDefault();
    openApp(link, appHref);
  });
}
