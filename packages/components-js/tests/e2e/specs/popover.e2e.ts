import {
  expectA11yToMatchSnapshot,
  expectedStyleOnFocus,
  getLifecycleStatus,
  getOutlineStyle,
  hasFocus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
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
  const getTextContent = () => selectNode(page, 'p-popover p');
  const getExtendedMarkup = () => selectNode(page, 'p');
  const getSecondPopover = () => selectNode(page, '.second >>> .popover');
  const getSecondButton = () => selectNode(page, '.second >>> p-button-pure >>> button');

  type InitOptions = {
    direction?: PopoverDirection;
    withLink?: boolean;
    withExtendedMarkup?: boolean;
    withLinkOutside?: boolean;
  };
  const initPopover = (opts?: InitOptions): Promise<void> => {
    const { direction = 'bottom', withLink, withExtendedMarkup, withLinkOutside } = opts ?? {};

    const linkMarkup = '<a href="#">Some Link</a>';
    const extendedMarkup = `<p>Some Markup${withLinkOutside ? '<a href="#">Some Link</a>' : ''}</p>`;

    return setContentWithDesignSystem(
      page,
      `
        ${withExtendedMarkup ? extendedMarkup : ''}
        <p-popover direction="${direction}">
           ${withLink ? linkMarkup : ''}
           <p>Some Popover Content</p>
        </p-popover>`
    );
  };

  describe('mouse behavior', () => {
    it('should open popover on click', async () => {
      await initPopover();
      await waitForStencilLifecycle(page);

      expect(await getPopover()).toBeNull();

      const button = await getButton();
      await button.click();
      await waitForStencilLifecycle(page);

      expect(await getPopover()).not.toBeNull();
    });

    it('should close popover on second click', async () => {
      await initPopover();
      await waitForStencilLifecycle(page);

      const button = await getButton();

      await button.click();
      await waitForStencilLifecycle(page);
      await button.click();
      await waitForStencilLifecycle(page);
      expect(await getPopover()).toBeNull();
    });

    it('should close popover if clicked outside host element', async () => {
      await initPopover({ withExtendedMarkup: true });
      await waitForStencilLifecycle(page);

      const button = await getButton();
      const extendedMarkup = await getExtendedMarkup();

      await button.click();
      await waitForStencilLifecycle(page);
      expect(await getPopover()).not.toBeNull();

      extendedMarkup.click();
      await waitForStencilLifecycle(page);

      expect(await getPopover()).toBeNull();
    });

    it('should close popover if another popover is clicked', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-popover>Some Content</p-popover>
        <p-popover class="second">Some Content</p-popover>`
      );

      const firstButton = await getButton();
      const secondButton = await getSecondButton();

      await firstButton.click();
      await waitForStencilLifecycle(page);
      expect(await getPopover(), 'first popover, first click').not.toBeNull();
      expect(await getSecondPopover(), 'second popover, first click').toBeNull();

      await secondButton.click();
      await waitForStencilLifecycle(page);
      expect(await getSecondPopover(), 'first popover, second click').not.toBeNull();
      expect(await getPopover(), 'second popover, second click').toBeNull();
    });

    it('should not close popover if content is clicked', async () => {
      await initPopover({ withLink: true });
      const button = await getButton();
      await button.click();
      await waitForStencilLifecycle(page);
      expect(await getPopover()).not.toBeNull();

      const textContent = await getTextContent();
      textContent.click();
      await waitForStencilLifecycle(page);
      expect(await getPopover()).not.toBeNull();
    });
  });

  describe('keyboard behavior', () => {
    describe('escape', () => {
      it('should close popover on escape when button is focused', async () => {
        await initPopover();
        const button = await getButton();
        await button.click();
        await waitForStencilLifecycle(page);

        expect(await getPopover()).not.toBeNull();
        expect((await page.accessibility.snapshot()).children[0].focused, 'focus after open click').toBe(true);

        await page.keyboard.press('Escape');
        await waitForStencilLifecycle(page);

        expect(await getPopover()).toBeNull();
        expect((await page.accessibility.snapshot()).children[0].focused, 'focus after escape').toBe(true);
      });

      it('should close popover on escape when content is focused', async () => {
        await initPopover({ withLink: true });
        const button = await getButton();
        await button.click();
        await waitForStencilLifecycle(page);

        expect(await getPopover()).not.toBeNull();
        expect((await page.accessibility.snapshot()).children[0].focused, 'focus on button after open').toBe(true);

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);

        expect((await page.accessibility.snapshot()).children[0].focused, 'focus on button after tab').toBe(undefined);
        expect((await page.accessibility.snapshot()).children[1].focused, 'focus on link after tab').toBe(true);

        await page.keyboard.press('Escape');
        await waitForStencilLifecycle(page);

        expect(await getPopover()).toBeNull();
        expect((await page.accessibility.snapshot()).children[0].focused, 'focus on button after escape').toBe(true);
      });

      it('should close popover on escape when content outside is focused', async () => {
        await initPopover({ withExtendedMarkup: true, withLinkOutside: true });
        const button = await getButton();
        await button.click();
        await waitForStencilLifecycle(page);

        expect(await getPopover()).not.toBeNull();
        expect((await page.accessibility.snapshot()).children[0].focused, 'focus on link initial').toBe(undefined);

        await page.keyboard.down('Shift');
        await page.keyboard.press('Tab');
        await page.keyboard.up('Shift');

        await page.keyboard.press('Escape');
        await waitForStencilLifecycle(page);

        expect(await getPopover()).toBeNull();
        expect((await page.accessibility.snapshot()).children[1].focused, 'focus on link after escape').toBe(true);
      });
    });

    describe('enter', () => {
      it('should open / close popover on enter press', async () => {
        await initPopover();

        page.keyboard.press('Tab');
        page.keyboard.press('Enter');
        await waitForStencilLifecycle(page);

        expect(await getPopover(), 'first enter').not.toBeNull();

        page.keyboard.press('Enter');
        await waitForStencilLifecycle(page);

        expect(await getPopover(), 'second enter').toBeNull();
      });

      it('should close other popovers that are open on enter click', async () => {
        await setContentWithDesignSystem(
          page,
          `<p-popover>Some Content</p-popover>
        <p-popover class="second">Some Content</p-popover>`
        );
        page.keyboard.press('Tab');
        page.keyboard.press('Enter');
        await waitForStencilLifecycle(page);

        expect(await getPopover(), 'first popover, first enter').not.toBeNull();
        expect(await getSecondPopover(), 'second popover, first enter').toBeNull();

        page.keyboard.press('Tab');
        page.keyboard.press('Enter');
        await waitForStencilLifecycle(page);

        expect(await getPopover(), 'first popover, second enter').toBeNull();
        expect(await getSecondPopover(), 'second popover, second enter').not.toBeNull();
      });
    });
  });

  describe('accessibility', () => {
    it('should expose correct initial accessibility tree properties', async () => {
      await initPopover();
      const button = await getButton();

      await expectA11yToMatchSnapshot(page, button);
    });

    it('should expose correct accessibility tree when label property is changed', async () => {
      await initPopover();
      const host = await getHost();
      const button = await getButton();

      await setProperty(host, 'aria', {
        'aria-label': 'Some more detailed label',
      });
      await waitForStencilLifecycle(page);

      await expectA11yToMatchSnapshot(page, button);
    });

    it('should expose correct accessibility tree when popover is opened', async () => {
      await initPopover();
      const button = await getButton();
      await button.click();
      await waitForStencilLifecycle(page);

      await expectA11yToMatchSnapshot(page, button);
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initPopover();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-popover'], 'componentDidLoad: p-popover').toBe(1);
      expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1);
      expect(status.componentDidLoad['p-text'], 'componentDidLoad: p-text').toBe(1);
      expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(4);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips on prop change', async () => {
      await initPopover();
      const host = await getHost();

      await setProperty(host, 'direction', 'right');
      await waitForStencilLifecycle(page);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-popover'], 'componentDidUpdate: p-popover').toBe(1);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    });
  });
});
