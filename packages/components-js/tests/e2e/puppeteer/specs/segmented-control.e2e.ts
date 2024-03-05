import { expectA11yToMatchSnapshot, selectNode, setContentWithDesignSystem } from '../helpers';
import type { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-segmented-control');

const initSegmentedControl = (opts?: { amount?: number; value?: number }): Promise<void> => {
  const { amount = 1, value } = opts || {};
  const items = Array.from(Array(amount))
    .map((_, i) => `<p-segmented-control-item value="${i + 1}">Option ${i + 1}</p-segmented-control-item>`)
    .join('\n');

  const content = `<p-segmented-control${value ? ` value="${value}"` : ''}>
  ${items}
</p-segmented-control>`;

  return setContentWithDesignSystem(page, content);
};

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initSegmentedControl({ amount: 2, value: 1 });
    const host = await getHost();

    await expectA11yToMatchSnapshot(page, host, { message: 'segmented-control', interestingOnly: false });
  });
});
