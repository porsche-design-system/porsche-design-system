import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getActiveElementId,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
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
const getSpacer = () => selectNode(page, 'p-popover >>> .spacer');
const getPopover = () => selectNode(page, 'p-popover >>> .popover');
const getButton = () => selectNode(page, 'p-popover >>> button');
const getSecondPopover = () => selectNode(page, 'p-popover.second >>> .popover');
const getTableScroller = () => selectNode(page, 'p-table >>> p-scroller >>> .scroll-area');
const isNativePopoverOpen = async () => (await getSpacer()).evaluate((el) => el.matches(':popover-open'));

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

const initPopoverWithinTable = (opts?: { direction: PopoverDirection }): Promise<void> => {
  const { direction = 'bottom' } = opts || {};
  return setContentWithDesignSystem(
    page,
    `
<p-table style="position: absolute; top: 80%; left: 50vw; transform: translate(-50%); background: deeppink">
  <p-table-head>
    <p-table-head-row>
      <p-table-head-cell
        >Within table <p-popover direction="${direction}">Some Popover Content</p-popover>
      </p-table-head-cell>
      ${[...Array(10)].map((e, i) => `<p-table-head-cell>Column ${i}</p-table-head-cell>`)}
    </p-table-head-row>
  </p-table-head>
</p-table>`
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

  it('should be possible to select/highlight text within open popover', async () => {
    await initPopover({ withStrong: true });
    await togglePopover();

    const strongEl = await selectNode(page, 'strong');
    await strongEl.click({ count: 2 });

    const selection = await page.evaluate(() => window.getSelection().toString());
    expect(selection).toBe('strong');
  });
});

describe('keyboard behavior', () => {
  describe('escape', () => {
    const focusedElementTagName = 'BUTTON';

    it('should close popover when button is focused', async () => {
      await initPopover();
      const host = await getHost();
      await togglePopover();

      expect(await getPopover()).not.toBeNull();
      expect(await getActiveElementTagNameInShadowRoot(host)).toBe(focusedElementTagName);

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getPopover()).toBeNull();
      expect(await getActiveElementTagNameInShadowRoot(host), 'focus on button after escape').toBe(
        focusedElementTagName
      );
    });

    it('should close popover when content is focused', async () => {
      await initPopover({ withLink: true });
      const host = await getHost();
      await togglePopover();

      expect(await getPopover()).not.toBeNull();
      expect(await getActiveElementTagNameInShadowRoot(host)).toBe(focusedElementTagName);

      await page.keyboard.press('Tab');
      await waitForStencilLifecycle(page);

      expect(await getActiveElementTagName(page)).toBe('A');

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getPopover()).toBeNull();
      expect(await getActiveElementTagNameInShadowRoot(host)).toBe(focusedElementTagName);
    });

    it('should close popover when content outside is focused', async () => {
      await initPopover({ withButtonOutside: true });
      const host = await getHost();
      await togglePopover();

      expect(await getActiveElementTagNameInShadowRoot(host)).toBe(focusedElementTagName);
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

describe('native', () => {
  it('should not render native when used outside of table', async () => {
    await initPopover();
    await togglePopover();
    const button = await getButton();
    const spacer = await getSpacer();

    expect(await getAttribute(button, 'popoverTarget')).toBe(null);
    expect(await getProperty(spacer, 'popover')).toBe(null);
  });

  it('should render native popover when used within table', async () => {
    await initPopoverWithinTable();
    const button = await getButton();
    const spacer = await getSpacer();

    expect(await getAttribute(button, 'popoverTarget')).toBe(await getProperty(spacer, 'id'));
    expect(await getProperty(spacer, 'popover')).toBe('auto');
  });

  it('should open popover with correct position on click', async () => {
    await initPopoverWithinTable();
    await togglePopover();

    expect(await isNativePopoverOpen()).toBeTruthy();
  });

  it('should close popover on page scroll', async () => {
    await initPopoverWithinTable();
    await togglePopover();

    expect(await isNativePopoverOpen()).toBeTruthy();

    // Simulate a scroll event on the window
    await page.evaluate(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(await isNativePopoverOpen()).toBeFalsy();
  });

  it('should close popover on table scroll', async () => {
    await initPopoverWithinTable();
    await togglePopover();

    expect(await isNativePopoverOpen()).toBeTruthy();

    // Simulate a scroll event on the table
    await (
      await getTableScroller()
    ).evaluate((el) => {
      el.dispatchEvent(new Event('scroll'));
    });

    expect(await isNativePopoverOpen()).toBeFalsy();
  });
});
