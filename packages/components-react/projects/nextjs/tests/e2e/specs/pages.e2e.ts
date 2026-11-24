import { harnessPageConsole, test } from '@porsche-design-system/testing/playwright';
import { routes } from '../../../routes';
import { goto } from '../helpers';

const pageUrls = routes.map((item) => item.path);

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
  // TODO: Remove once the SSR streaming issue is fixed (#4162)
  '/streaming-props': [/A second declarative shadow root cannot be created on a host/],
};

for (const pageUrl of pageUrls) {
  test.describe(pageUrl, () => {
    test.use({
      expectedConsole: async ({ expectedConsole }, use) => use([...expectedConsole, ...(pageConsole[pageUrl] ?? [])]),
    });

    test(`should work without error or warning for ${pageUrl}`, async ({ page }) => {
      // TODO: Remove once SSR streaming issue is fixed
      test.skip(pageUrl === '/streaming', 'Streaming issues not fixed yet');
      await goto(page, pageUrl);
    });
  });
}
