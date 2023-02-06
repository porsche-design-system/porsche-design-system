import {
  expectA11yToMatchSnapshot,
  getLifecycleStatus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';
import type { IconName } from '@porsche-design-system/components/dist/types/bundle';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

type InitOptions = {
  name?: IconName;
};

const initOptions: InitOptions[] = [{}];

const initIcon = async (opts?: InitOptions): Promise<void> => {
  const { name } = opts || {};

  const nameAttribute = name ? `name="${name}"` : '';
  const attributes = `${nameAttribute}`;

  const content = `<p-icon ${attributes} aria="{ 'aria-label': 'Some label' }" />`;

  await setContentWithDesignSystem(page, content);
};

const getHost = async () => selectNode(page, 'p-icon');
const getIconImg = async () => selectNode(page, 'p-icon >>> img');

describe('lifecycle', () => {
  initOptions.forEach((opts) => {
    it('should work without unnecessary round trips on init', async () => {
      await initIcon(opts);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips after state change', async () => {
      await initIcon({ ...opts, name: 'highway' });
      const host = await getHost();

      await setProperty(host, 'name', 'car');
      await waitForStencilLifecycle(page);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-icon'], 'componentDidUpdate: p-icon').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    });
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initIcon();
    const icon = await getIconImg();

    await expectA11yToMatchSnapshot(page, icon);
  });
});
