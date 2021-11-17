import { selectNode, setContentWithDesignSystem, waitForStencilLifecycle } from '../helpers';
import { FormState } from '@porsche-design-system/components/src/types';
import { PopoverDirection } from '@porsche-design-system/components/src/components/feedback/popover/popover-utils';
import { ElementHandle, Page } from 'puppeteer';

describe('popover', () => {
  let page: Page;

  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-popover');
  const getPopover = () => selectNode(page, 'p-popover >>> .popover');
  const getButton = () => selectNode(page, 'p-popover >>> p-button-pure >>> button');
  const getLink = () => selectNode(page, 'p-popover a');
  const getExtendedMarkup = () => selectNode(page, 'p');

  type InitOptions = {
    direction?: PopoverDirection;
    withLink?: boolean;
    withExtendedMarkup?: boolean;
  };
  const initPopover = (opts?: InitOptions): Promise<void> => {
    const { direction = 'bottom', withLink, withExtendedMarkup } = opts ?? {};

    const linkMarkup = '<a>Some Link</a>';
    const extendedMarkup = '<p>Some Markup</p>';

    return setContentWithDesignSystem(
      page,
      `
        ${withExtendedMarkup ? extendedMarkup : ''}
        <p-popover direction="${direction}">
            Some Popover Content${withLink ? linkMarkup : ''}
        </p-popover>`
    );
  };

  fdescribe('onClick behavior', () => {
    it('should open popover on click', async () => {
      await initPopover();
      await waitForStencilLifecycle(page);

      expect(await getPopover()).toBeNull();

      const button = await getButton();
      button.click();
      await waitForStencilLifecycle(page);

      expect(await getPopover()).not.toBeNull();
    });

    it('should close popover on second click', async () => {
      await initPopover();
      await waitForStencilLifecycle(page);

      const button = await getButton();

      button.click();
      await waitForStencilLifecycle(page);
      button.click();
      await waitForStencilLifecycle(page);
      expect(await getPopover()).toBeNull();
    });

    it('should close popover if clicked outside host element', async () => {
      await initPopover({ withExtendedMarkup: true });
      await waitForStencilLifecycle(page);

      const button = await getButton();
      const extendedMarkup = await getExtendedMarkup();

      button.click();
      await waitForStencilLifecycle(page);
      expect(await getPopover()).not.toBeNull();

      extendedMarkup.click();
      await waitForStencilLifecycle(page);

      expect(await getPopover()).toBeNull();
    });
    it('should not close popover if content is clicked', async () => {
      await initPopover({ withLink: true });
      const button = await getButton();
      button.click();
      await waitForStencilLifecycle(page);
      expect(await getPopover()).not.toBeNull();

      const link = await getLink();
      link.click();
      await waitForStencilLifecycle(page);
      expect(await getPopover()).not.toBeNull();
    });
  });
});
