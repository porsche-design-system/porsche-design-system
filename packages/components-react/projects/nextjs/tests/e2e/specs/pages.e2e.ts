import { harnessPageConsole, test } from '@porsche-design-system/testing/playwright';
import { routes } from '../../../routes';
import { goto } from '../helpers';

const pageUrls = routes.map((item) => item.path);

// these harness pages set prose as value of a date, time or number input
const invalidInputValue = [
  /^The specified value "(?:Without label and description|Responsive label and description|Lorem ipsum dolor sit amet, consetetur sadipscing elitr,)" /,
];

const pageConsole: Record<string, RegExp[]> = {
  '/button-pure': harnessPageConsole['button-pure'],
  '/display': [/component p-display is deprecated and will be removed with next major release/],
  '/input-date': invalidInputValue,
  '/input-month': invalidInputValue,
  '/input-number': invalidInputValue,
  '/input-time': invalidInputValue,
  '/input-week': invalidInputValue,
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
      // TODO: Remove once SSR streaming issue is fixed
      test.skip(pageUrl === '/streaming', 'Streaming issues not fixed yet');
      await goto(page, pageUrl);
    });
  });
}
