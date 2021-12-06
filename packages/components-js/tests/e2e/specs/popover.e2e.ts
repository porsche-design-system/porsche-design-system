import {
  expectA11yToMatchSnapshot,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getLifecycleStatus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import { PopoverDirection } from '@porsche-design-system/components/src/components/feedback/popover/popover-utils';
import { Page } from 'puppeteer';

let page: Page;

beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-popover');
const getPopover = () => selectNode(page, 'p-popover >>> .popover');
const getButton = () => selectNode(page, 'p-popover >>> p-button-pure >>> button');
const getSecondPopover = () => selectNode(page, 'p-popover.second >>> .popover');

const togglePopover = async (): Promise<void> => {
  const button = await getButton();
  await button.click();
  await waitForStencilLifecycle(page);
};

type InitOptions = {
  direction?: PopoverDirection;
  withLink?: boolean;
  withButtonOutside?: boolean;
};
const initPopover = (opts?: InitOptions): Promise<void> => {
  const { direction = 'bottom', withLink = false, withButtonOutside = false } = opts ?? {};

  const linkMarkup = '<a href="#">Some Link</a>';

  return setContentWithDesignSystem(
    page,
    `
        <p-popover direction="${direction}">
           ${withLink ? linkMarkup : ''}
           Some Popover Content
        </p-popover>
        ${withButtonOutside ? '<button>Some Button</button>' : ''}`
  );
};

describe('mouse behavior', () => {
  it('should open popover on click', async () => {
    await initPopover();

    expect(await getPopover()).toBeNull();

    await togglePopover();

    expect(await getPopover()).not.toBeNull();
  });

  it('should close popover on second click', async () => {
    await initPopover();

    await togglePopover();
    expect(await getPopover()).not.toBeNull();
    await togglePopover();
    expect(await getPopover()).toBeNull();
  });

  it('should close popover if clicked outside host element', async () => {
    await initPopover();

    await togglePopover();
    expect(await getPopover()).not.toBeNull();

    (await selectNode(page, 'body')).click();
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
    const secondButton = await selectNode(page, 'p-popover.second >>> p-button-pure');

    // We have to click the second button first, otherwise it gets overlapped by the first button and cant be clicked
    await secondButton.click();
    await waitForStencilLifecycle(page);
    expect(await getSecondPopover(), 'second popover, second click').not.toBeNull();
    expect(await getPopover(), 'first popover, second click').toBeNull();

    await firstButton.click();
    await waitForStencilLifecycle(page);
    expect(await getPopover(), 'first popover, first click').not.toBeNull();
    expect(await getSecondPopover(), 'second popover, first click').toBeNull();
  });

  it('should not close popover when its content is clicked', async () => {
    await initPopover();
    await togglePopover();
    expect(await getPopover()).not.toBeNull();

    await (await getPopover()).click();

    expect(await getPopover()).not.toBeNull();
  });
});

describe('keyboard behavior', () => {
  describe('escape', () => {
    const focusedElement = 'P-BUTTON-PURE';

    it('should close popover when button is focused', async () => {
      await initPopover();
      const host = await getHost();
      await togglePopover();

      expect(await getPopover()).not.toBeNull();
      expect(await getActiveElementTagNameInShadowRoot(host)).toBe(focusedElement);

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getPopover()).toBeNull();
      expect(await getActiveElementTagNameInShadowRoot(host), 'focus on button after escape').toBe(focusedElement);
    });

    it('should close popover when content is focused', async () => {
      await initPopover({ withLink: true });
      const host = await getHost();
      await togglePopover();

      expect(await getPopover()).not.toBeNull();
      expect(await getActiveElementTagNameInShadowRoot(host)).toBe(focusedElement);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      expect(await getActiveElementTagName(page)).toBe('A');

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getPopover()).toBeNull();
      expect(await getActiveElementTagNameInShadowRoot(host)).toBe(focusedElement);
    });

    it('should close popover when content outside is focused', async () => {
      await initPopover({ withButtonOutside: true });
      const host = await getHost();
      await togglePopover();

      expect(await getActiveElementTagNameInShadowRoot(host)).toBe(focusedElement);
      expect(await getPopover()).not.toBeNull();

      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('BUTTON');

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getActiveElementTagName(page)).toBe('BUTTON');
      expect(await getPopover()).toBeNull();
    });
  });

  describe('enter', () => {
    it('should open / close popover', async () => {
      await initPopover();

      page.keyboard.press('Tab');
      page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getPopover(), 'first enter').not.toBeNull();

      page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getPopover(), 'second enter').toBeNull();
    });

    it('should close other popovers that are open', async () => {
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

  it('should expose correct accessibility tree when aria property is changed', async () => {
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
    await togglePopover();

    await expectA11yToMatchSnapshot(page, await getButton());
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
    expect(status.componentDidUpdate['p-button-pure'], 'componentDidUpdate: p-button-pure').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(2);
  });
});
