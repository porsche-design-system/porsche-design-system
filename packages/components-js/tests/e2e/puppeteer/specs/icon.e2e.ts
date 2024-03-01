import { expectA11yToMatchSnapshot, selectNode, setContentWithDesignSystem } from '../helpers';
import type { Page } from 'puppeteer';
import type { IconName } from '@porsche-design-system/components/dist/types/bundle';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

type InitOptions = {
  name?: IconName;
};

const initIcon = async (opts?: InitOptions): Promise<void> => {
  const { name } = opts || {};

  const nameAttribute = name ? `name="${name}"` : '';
  const attributes = `${nameAttribute}`;

  const content = `<p-icon ${attributes} aria="{ 'aria-label': 'Some label' }" />`;

  await setContentWithDesignSystem(page, content);
};

const getIconImg = async () => selectNode(page, 'p-icon >>> img');

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initIcon();
    const icon = await getIconImg();

    await expectA11yToMatchSnapshot(page, icon);
  });
});
