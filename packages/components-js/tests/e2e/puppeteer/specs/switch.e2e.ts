import type { Page } from 'puppeteer';
import { expectA11yToMatchSnapshot, selectNode, setContentWithDesignSystem } from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

type InitOptions = {
  isDisabled?: boolean;
  isLoading?: boolean;
  otherMarkup?: string;
};

const initSwitch = (opts?: InitOptions): Promise<void> => {
  const { isDisabled = false, isLoading = false, otherMarkup = '' } = opts || {};
  return setContentWithDesignSystem(
    page,
    `<p-switch disabled="${isDisabled}" loading="${isLoading}">Some Label</p-switch>${otherMarkup}`
  );
};

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initSwitch();
    const label = () => selectNode(page, 'p-switch >>> label');

    await expectA11yToMatchSnapshot(page, await label(), { interestingOnly: false });
  });
});
