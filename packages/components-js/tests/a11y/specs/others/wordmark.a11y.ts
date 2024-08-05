import { type Page, test, expect } from '@playwright/test';
import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';

const getHost = (page: Page) => page.locator('p-wordmark');
const getLink = (page: Page) => page.locator('p-wordmark a');

const initWordmark = (
  page: Page,
  opts?: {
    hasHref?: boolean;
    isWrapped?: boolean;
    hasFocusableElementBefore?: boolean;
    hasFocusableElementAfter?: boolean;
  }
): Promise<void> => {
  const {
    hasHref = false,
    isWrapped = false,
    hasFocusableElementBefore = false,
    hasFocusableElementAfter = false,
  } = opts || {};

  const focusableElementBefore = hasFocusableElementBefore ? `<a href="#" id="before">before</a>` : '';
  const focusableElementAfter = hasFocusableElementAfter ? `<a href="#" id="after">after</a>` : '';
  const markup = `<p-wordmark ${hasHref ? 'href="about:blank#" ' : ''} id="my-wordmark"></p-wordmark>`;

  return setContentWithDesignSystem(
    page,
    isWrapped ? `<div>${focusableElementBefore}${markup}${focusableElementAfter}</div>` : markup
  );
};

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initWordmark(page);
  // await expectA11yToMatchSnapshot(page, getHost(), { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree if accessibility properties are set', async ({ page }) => {
  await initWordmark(page, { hasHref: true });
  const host = getHost(page);
  const link = getLink(page);

  await setProperty(host, 'aria', {
    'aria-label': 'Some more detailed label',
  });
  await waitForStencilLifecycle(page);
  // await expectA11yToMatchSnapshot(page, link);
});
