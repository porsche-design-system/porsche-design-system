import { setContentWithDesignSystem } from '../../helpers';
import { type Page, test, expect } from '@playwright/test';

const initModelSignature = (page: Page): Promise<void> => {
  return setContentWithDesignSystem(page, `<p-model-signature></p-model-signature>`);
};

const getHost = (page: Page) => page.locator('p-model-signature');

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initModelSignature(page);
  // await expectA11yToMatchSnapshot(page, getHost(), { interestingOnly: false });
});
