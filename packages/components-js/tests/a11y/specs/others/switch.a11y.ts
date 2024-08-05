import { type Page, test, expect } from '@playwright/test';
import { setContentWithDesignSystem } from '../../helpers';

type InitOptions = {
  isDisabled?: boolean;
  isLoading?: boolean;
  otherMarkup?: string;
};

const initSwitch = (page: Page, opts?: InitOptions): Promise<void> => {
  const { isDisabled = false, isLoading = false, otherMarkup = '' } = opts || {};
  return setContentWithDesignSystem(
    page,
    `<p-switch disabled="${isDisabled}" loading="${isLoading}">Some Label</p-switch>${otherMarkup}`
  );
};

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initSwitch(page);
  const label = (page: Page) => page.locator('p-switch label');

  // await expectA11yToMatchSnapshot(page, await label(), { interestingOnly: false });
});
