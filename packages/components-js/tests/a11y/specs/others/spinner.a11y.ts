import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';
import { type Page, test, expect } from '@playwright/test';

const initSpinner = (page: Page): Promise<void> => {
  return setContentWithDesignSystem(page, `<p-spinner></p-spinner>`);
};

const getHost = (page: Page) => page.locator('p-spinner');
const getSpinner = (page: Page) => page.locator('p-spinner .root');

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initSpinner(page);
  const spinner = getSpinner(page);

  // await expectA11yToMatchSnapshot(page, spinner, { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree if accessibility properties are set', async ({ page }) => {
  await initSpinner(page);
  const host = getHost(page);
  const spinner = getSpinner(page);

  await setProperty(host, 'aria', {
    'aria-label': 'Loading page content',
  });
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, spinner, { interestingOnly: false });
});
