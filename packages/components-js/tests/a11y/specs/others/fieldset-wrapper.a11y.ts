import { type Page, test, expect } from '@playwright/test';
import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';
import type { FormState } from '@porsche-design-system/components/dist/types/bundle';

type InitOptions = {
  state?: FormState;
};

const initFieldset = async (page: Page, opts?: InitOptions) => {
  const { state = 'none' } = opts || {};

  await setContentWithDesignSystem(
    page,
    `<p-fieldset-wrapper state="${state}" message="Some Message"></p-fieldset-wrapper>`
  );
};

const getHost = (page: Page) => page.locator('p-fieldset-wrapper');
const getFieldset = (page: Page) => page.locator('p-fieldset-wrapper fieldset');
const getMessage = (page: Page) => page.locator('p-fieldset-wrapper .message');

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initFieldset(page);
  const fieldset = getFieldset(page);

  // await expectA11yToMatchSnapshot(page, fieldset, { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree property in error state', async ({ page }) => {
  await initFieldset(page, { state: 'error' });
  const fieldset = getFieldset(page);

  // await expectA11yToMatchSnapshot(page, fieldset, { interestingOnly: false });
});

test.fixme(
  'should expose correct accessibility tree property if error state added programmatically',
  async ({ page }) => {
    await initFieldset(page);
    const host = getHost(page);

    await setProperty(host, 'state', 'error');
    await waitForStencilLifecycle(page);

    const fieldset = getFieldset(page);

    // await expectA11yToMatchSnapshot(page, fieldset, { interestingOnly: false });
  }
);
