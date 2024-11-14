import { setContentWithDesignSystem } from '../../helpers';
import { type Page, test, expect } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-segmented-control');

const initSegmentedControl = (page: Page, opts?: { amount?: number; value?: number }): Promise<void> => {
  const { amount = 1, value } = opts || {};
  const items = Array.from(new Array(amount))
    .map((_, i) => `<p-segmented-control-item value="${i + 1}">Option ${i + 1}</p-segmented-control-item>`)
    .join('\n');

  const content = `<p-segmented-control${value ? ` value="${value}"` : ''}>
  ${items}
</p-segmented-control>`;

  return setContentWithDesignSystem(page, content);
};

test.fixme('should expose correct initial accessibility tree properties', async ({ page }) => {
  await initSegmentedControl(page, { amount: 2, value: 1 });
  const host = getHost(page);

  // await expectA11yToMatchSnapshot(page, host, { message: 'segmented-control', interestingOnly: false });
});
