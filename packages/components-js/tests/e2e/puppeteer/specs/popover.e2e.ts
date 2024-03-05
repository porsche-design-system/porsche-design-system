import {
  expectA11yToMatchSnapshot,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { PopoverDirection } from '@porsche-design-system/components/dist/types/bundle';
import type { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-popover');
const getButton = () => selectNode(page, 'p-popover >>> button');

const togglePopover = async (): Promise<void> => {
  const button = await getButton();
  await button.click();
  await waitForStencilLifecycle(page);
};

type InitOptions = {
  direction?: PopoverDirection;
  withLink?: boolean;
  withStrong?: boolean;
  withButtonOutside?: boolean;
};
const initPopover = (opts?: InitOptions): Promise<void> => {
  const { direction = 'bottom', withLink = false, withStrong = false, withButtonOutside = false } = opts || {};

  const linkMarkup = withLink ? '<a href="#">Some Link</a>' : '';
  const strongMarkup = withStrong ? '<strong>strong</strong>' : '';
  const buttonMarkup = withButtonOutside ? '<button>Some Button</button>' : '';

  return setContentWithDesignSystem(
    page,
    `
<p-popover direction="${direction}">
  ${linkMarkup}
  ${strongMarkup}
  Some Popover Content
</p-popover>
${buttonMarkup}`
  );
};

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initPopover();

    await expectA11yToMatchSnapshot(page, await getButton());
  });

  it('should expose correct accessibility tree when aria property is changed', async () => {
    await initPopover();
    const host = await getHost();

    await setProperty(host, 'aria', {
      'aria-label': 'Some more detailed label',
    });
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, await getButton());
  });

  it('should expose correct accessibility tree when popover is opened', async () => {
    await initPopover();
    await togglePopover();

    await expectA11yToMatchSnapshot(page, await getButton());
  });
});
