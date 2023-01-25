import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getActiveElementId,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getEventSummary,
  getLifecycleStatus,
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
const getPopover = () => selectNode(page, 'p-popover >>> .popover');
const getButton = () => selectNode(page, 'p-popover >>> button');
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
  const { direction = 'bottom', withLink = false, withButtonOutside = false } = opts || {};

  const linkMarkup = withLink ? '<a href="#">Some Link</a>' : '';
  const buttonMarkup = withButtonOutside ? '<button>Some Button</button>' : '';

  return setContentWithDesignSystem(
    page,
    `
<p-popover direction="${direction}">
  ${linkMarkup}
  Some Popover Content
</p-popover>
${buttonMarkup}`
  );
};

it('should trigger focus & blur events at the correct time', async () => {
  await setContentWithDesignSystem(
    page,
    `
    <div id="wrapper">
      <a href="#" id="before">before</a>
      <p-popover id="my-popover">Some Popover Content</p-popover>
      <a href="#" id="after">after</a>
    </div>`
  );

  const popover = await getHost();
  const before = await selectNode(page, '#before');
  const after = await selectNode(page, '#after');

  await addEventListener(before, 'focus');
  await addEventListener(popover, 'focus');
  await addEventListener(popover, 'focusin');
  await addEventListener(popover, 'blur');
  await addEventListener(popover, 'focusout');
  await addEventListener(after, 'focus');

  expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls initially').toBe(0);
  expect((await getEventSummary(popover, 'focus')).counter, 'buttonFocusCalls initially').toBe(0);
  expect((await getEventSummary(popover, 'focusin')).counter, 'buttonFocusInCalls initially').toBe(0);
  expect((await getEventSummary(popover, 'blur')).counter, 'buttonBlurCalls initially').toBe(0);
  expect((await getEventSummary(popover, 'focusout')).counter, 'buttonFocusOutCalls initially').toBe(0);
  expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls initially').toBe(0);
  expect(await getActiveElementId(page), 'activeElementId initially').toBe('');

  await page.keyboard.press('Tab');
  expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 1st tab').toBe(1);
  expect((await getEventSummary(popover, 'focus')).counter, 'buttonFocusCalls after 1st tab').toBe(0);
  expect((await getEventSummary(popover, 'focusin')).counter, 'buttonFocusInCalls after 1st tab').toBe(0);
  expect((await getEventSummary(popover, 'blur')).counter, 'buttonBlurCalls after 1st tab').toBe(0);
  expect((await getEventSummary(popover, 'focusout')).counter, 'buttonFocusOutCalls after 1st tab').toBe(0);
  expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 1st tab').toBe(0);
  expect(await getActiveElementId(page), 'activeElementId after 1st tab').toBe('before');

  await page.keyboard.press('Tab');
  expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 2nd tab').toBe(1);
  expect((await getEventSummary(popover, 'focus')).counter, 'buttonFocusCalls after 2nd tab').toBe(1);
  expect((await getEventSummary(popover, 'focusin')).counter, 'buttonFocusInCalls after 2nd tab').toBe(1);
  expect((await getEventSummary(popover, 'blur')).counter, 'buttonBlurCalls after 2nd tab').toBe(0);
  expect((await getEventSummary(popover, 'focusout')).counter, 'buttonFocusOutCalls after 2nd tab').toBe(0);
  expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 2nd tab').toBe(0);
  expect(await getActiveElementId(page), 'activeElementId after 2nd tab').toBe('my-popover');

  await page.keyboard.press('Tab');
  expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 3rd tab').toBe(1);
  expect((await getEventSummary(popover, 'focus')).counter, 'buttonFocusCalls after 3rd tab').toBe(1);
  expect((await getEventSummary(popover, 'focusin')).counter, 'buttonFocusInCalls after 3rd tab').toBe(1);
  expect((await getEventSummary(popover, 'blur')).counter, 'buttonBlurCalls after 3rd tab').toBe(1);
  expect((await getEventSummary(popover, 'focusout')).counter, 'buttonFocusOutCalls after 3rd tab').toBe(1);
  expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 3rd tab').toBe(1);
  expect(await getActiveElementId(page), 'activeElementId after 3rd tab').toBe('after');

  // tab back
  await page.keyboard.down('ShiftLeft');
  await page.keyboard.press('Tab');
  expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 1st tab back').toBe(1);
  expect((await getEventSummary(popover, 'focus')).counter, 'buttonFocusCalls after 1st tab back').toBe(2);
  expect((await getEventSummary(popover, 'focusin')).counter, 'buttonFocusInCalls after 1st tab back').toBe(2);
  expect((await getEventSummary(popover, 'blur')).counter, 'buttonBlurCalls after 1st tab back').toBe(1);
  expect((await getEventSummary(popover, 'focusout')).counter, 'buttonFocusOutCalls after 1st tab back').toBe(1);
  expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 1st tab back').toBe(1);
  expect(await getActiveElementId(page), 'activeElementId after 1st tab back').toBe('my-popover');

  await page.keyboard.press('Tab');
  expect((await getEventSummary(before, 'focus')).counter, 'beforeFocusCalls after 2nd tab back').toBe(2);
  expect((await getEventSummary(popover, 'focus')).counter, 'buttonFocusCalls after 2nd tab back').toBe(2);
  expect((await getEventSummary(popover, 'focusin')).counter, 'buttonFocusInCalls after 2nd tab back').toBe(2);
  expect((await getEventSummary(popover, 'blur')).counter, 'buttonBlurCalls after 2nd tab back').toBe(2);
  expect((await getEventSummary(popover, 'focusout')).counter, 'buttonFocusOutCalls after 2nd tab back').toBe(2);
  expect((await getEventSummary(after, 'focus')).counter, 'afterFocusCalls after 2nd tab back').toBe(1);
  expect(await getActiveElementId(page), 'activeElementId after 2nd tab back').toBe('before');

  await page.keyboard.up('ShiftLeft');
});

it('should provide functionality to focus & blur the custom element', async () => {
  await setContentWithDesignSystem(
    page,
    `
    <div id="wrapper">
      <a href="#" id="before">before</a>
      <p-popover>Some Popover Content</p-popover>
    </div>`
  );

  const popoverHasFocus = () => page.evaluate(() => document.activeElement === document.querySelector('p-popover'));

  const popover = await getHost();
  const before = await selectNode(page, '#before');
  await before.focus();
  expect(await popoverHasFocus()).toBe(false);
  await popover.focus();
  expect(await popoverHasFocus()).toBe(true);
  await page.evaluate(() => {
    const buttonElement = document.querySelector('p-popover') as HTMLElement;
    buttonElement.blur();
  });
  expect(await popoverHasFocus()).toBe(false);
});

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
    const secondButton = await selectNode(page, 'p-popover.second >>> button');

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
    const focusedElement = 'BUTTON';

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

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getPopover(), 'first enter').not.toBeNull();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getPopover(), 'second enter').toBeNull();
    });

    it('should close other popovers that are open', async () => {
      await setContentWithDesignSystem(
        page,
        `<p-popover>Some Content</p-popover>
        <p-popover class="second">Some Content</p-popover>`
      );
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getPopover(), 'first popover, first enter').not.toBeNull();
      expect(await getSecondPopover(), 'second popover, first enter').toBeNull();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getPopover(), 'first popover, second enter').toBeNull();
      expect(await getSecondPopover(), 'second popover, second enter').not.toBeNull();
    });
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initPopover();

    await expectA11yToMatchSnapshot(page, await getButton());
  });

  it('should expose correct accessibility tree if accessibility properties are set', async () => {
    await initPopover();
    const host = await getHost();
    const button = await getButton();
    await setProperty(host, 'aria', {
      'aria-label': 'Some more detailed label',
      'aria-haspopup': true,
    });
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, button, { message: 'Initial' });

    await setProperty(host, 'aria', {
      'aria-pressed': true,
    });
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, button, { message: 'Pressed' }); // need to split the test in 2, because aria-expanded and aria-pressed are invalid if used simultaneously. Also aria-pressed removes the accessible name.
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

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initPopover();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-popover'], 'componentDidLoad: p-popover').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
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
