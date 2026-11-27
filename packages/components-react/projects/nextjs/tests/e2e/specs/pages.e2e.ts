import { type Page } from '@playwright/test';
import { expect, harnessPageConsole, test } from '@porsche-design-system/testing/playwright';
import { routes } from '../../../routes';
import { goto } from '../helpers';

const pageUrls = routes.map((item) => item.path);

const getServerMarkers = (page: Page): Promise<string[]> =>
  page.evaluate(() => {
    const markers: string[] = [];
    const collect = (root: Document | ShadowRoot): void => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (node instanceof Comment) {
          if (node.data === 'dsr-end') {
            markers.push(`comment in ${(node.parentNode as Element).localName ?? 'shadow root'}`);
          }
        } else if (node instanceof Element) {
          if (node.hasAttribute('data-dsr') || node.hasAttribute('data-ssr-props') || node.localName === 'frame') {
            markers.push(node.localName);
          }
          if (node.shadowRoot) {
            collect(node.shadowRoot);
          }
        }
      }
    };
    collect(document);
    return markers;
  });

const pageConsole: Record<string, RegExp[]> = {
  '/button-pure': harnessPageConsole['button-pure'],
  '/display': harnessPageConsole.display,
  '/input-date': harnessPageConsole['input-date'],
  '/input-month': harnessPageConsole['input-month'],
  '/input-number': harnessPageConsole['input-number'],
  '/input-time': harnessPageConsole['input-time'],
  '/input-week': harnessPageConsole['input-week'],
  '/modal': harnessPageConsole.modal,
  '/modal-footer-scrolled': harnessPageConsole.modal,
  '/overview-components': harnessPageConsole['overview-components'],
};

for (const pageUrl of pageUrls) {
  test.describe(pageUrl, () => {
    test.use({
      expectedConsole: async ({ expectedConsole }, use) => use([...expectedConsole, ...(pageConsole[pageUrl] ?? [])]),
    });

    test(`should work without error or warning for ${pageUrl}`, async ({ page }) => {
      await goto(page, pageUrl);
    });

    // React hydrates the page before the components are loaded here. Whatever the server wrote to tell a component
    // where its markup ends has to be gone once the component has started: a component must not find it among its
    // children.
    test(`should leave no marker of the server behind for ${pageUrl}`, async ({ page }) => {
      await goto(page, pageUrl);

      expect(await getServerMarkers(page)).toEqual([]);
    });
  });
}
