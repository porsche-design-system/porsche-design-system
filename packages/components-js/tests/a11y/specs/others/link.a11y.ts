import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';
import { type Page, test, expect } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-link');
const getLink = (page: Page) => page.locator('p-link a');

const initLink = (page: Page, opts?: { useSlottedAnchor?: boolean }): Promise<void> => {
  const { useSlottedAnchor = false } = opts || {};

  return setContentWithDesignSystem(
    page,
    `
    <p-link onclick="return false;" ${!useSlottedAnchor ? 'href="#" ' : 'style="width: 500px;"'}>
      ${useSlottedAnchor ? '<a onclick="return false;" href="">' : ''}
      Some label
      ${useSlottedAnchor ? '</a>' : ''}
    </p-link>`
  );
};

test.fixme('should expose correct initial accessibility tree properties', async ({ page }) => {
  await initLink(page);
  const link = getLink(page);

  // await expectA11yToMatchSnapshot(page, link);
});

test.fixme('should expose correct accessibility tree if accessibility properties are set', async ({ page }) => {
  await initLink(page);
  const host = getHost(page);
  const link = getLink(page);

  await setProperty(host, 'aria', {
    'aria-label': 'Some more detailed label',
  });
  await waitForStencilLifecycle(page);
  // await expectA11yToMatchSnapshot(page, link);
});

test.fixme('should expose correct accessibility tree if label is hidden', async ({ page }) => {
  await initLink(page);
  const host = getHost(page);
  const link = getLink(page);

  await setProperty(host, 'hide-label', 'true');
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, link);
});
