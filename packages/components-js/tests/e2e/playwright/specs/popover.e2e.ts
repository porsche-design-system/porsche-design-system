import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  addEventListener,
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
  skipInBrowser,
  waitForStencilLifecycle,
} from '../helpers';
import type { PopoverDirection } from '@porsche-design-system/components/dist/types/bundle';

const getHost = (page: Page) => selectNode(page, 'p-popover');
const getSpacer = (page: Page) => selectNode(page, 'p-popover >>> .spacer');
const getPopover = (page: Page) => selectNode(page, 'p-popover >>> .popover');
const getButton = (page: Page) => selectNode(page, 'p-popover >>> button');
const getSecondPopover = (page: Page) => selectNode(page, 'p-popover.second >>> .popover');
const getTableScroller = (page: Page) => selectNode(page, 'p-table >>> p-scroller >>> .scroll-area');
const isNativePopoverOpen = async (page: Page): Promise<boolean> =>
  (await getSpacer(page)).evaluate((el) => el.matches(':popover-open'));

const togglePopover = async (page: Page): Promise<void> => {
  const button = await getButton(page);
  await button.click();
  await waitForStencilLifecycle(page);
};

type InitOptions = {
  direction?: PopoverDirection;
  withLink?: boolean;
  withStrong?: boolean;
  withButtonOutside?: boolean;
};
const initPopover = (page: Page, opts?: InitOptions): Promise<void> => {
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

const initPopoverWithinTable = (page: Page, opts?: { direction: PopoverDirection }): Promise<void> => {
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

skipInBrowser(['webkit', 'firefox'], () => {
  test('should trigger focus & blur events at the correct time', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `
    <div id="wrapper">
      <a href="#" id="before">before</a>
      <p-popover id="my-popover">Some Popover Content</p-popover>
      <a href="#" id="after">after</a>
    </div>`
    );

    const popover = await getHost(page);
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
});

test.describe('mouse behavior', () => {
  test('should open popover on click', async ({ page }) => {
    await initPopover(page);

    expect(await getPopover(page)).toBeNull();

    await togglePopover(page);

    expect(await getPopover(page)).not.toBeNull();
  });

  test('should close popover on second click', async ({ page }) => {
    await initPopover(page);

    await togglePopover(page);
    expect(await getPopover(page)).not.toBeNull();
    await togglePopover(page);
    expect(await getPopover(page)).toBeNull();
  });

  test('should close popover if clicked outside host element', async ({ page }) => {
    await initPopover(page);

    await togglePopover(page);
    expect(await getPopover(page)).not.toBeNull();

    (await selectNode(page, 'body')).click();
    await waitForStencilLifecycle(page);

    expect(await getPopover(page)).toBeNull();
  });

  test('should close popover if another popover is clicked', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `<p-popover>Some Content</p-popover>
      <p-popover class="second">Some Content</p-popover>`
    );

    const firstButton = await getButton(page);
    const secondButton = await selectNode(page, 'p-popover.second >>> button');

    // We have to click the second button first, otherwise it gets overlapped by the first button and cant be clicked
    await secondButton.click();
    await waitForStencilLifecycle(page);
    expect(await getSecondPopover(page), 'second popover, second click').not.toBeNull();
    expect(await getPopover(page), 'first popover, second click').toBeNull();

    await firstButton.click();
    await waitForStencilLifecycle(page);
    expect(await getPopover(page), 'first popover, first click').not.toBeNull();
    expect(await getSecondPopover(page), 'second popover, first click').toBeNull();
  });

  test('should not close popover when its content is clicked', async ({ page }) => {
    await initPopover(page);
    await togglePopover(page);
    expect(await getPopover(page)).not.toBeNull();

    await (await getPopover(page)).click();

    expect(await getPopover(page)).not.toBeNull();
  });

  test('should be possible to select/highlight text within open popover', async ({ page }) => {
    await initPopover(page, { withStrong: true });
    await togglePopover(page);

    const strongEl = await selectNode(page, 'strong');
    await strongEl.click({ clickCount: 2 });

    const selection = await page.evaluate(() => window.getSelection().toString());
    expect(selection).toBe('strong');
  });
});

test.describe('keyboard behavior', () => {
  skipInBrowser(['webkit']);
  test.describe('escape', () => {
    const focusedElementTagName = 'BUTTON';

    test('should close popover when button is focused', async ({ page }) => {
      await initPopover(page);
      const host = await getHost(page);
      await togglePopover(page);

      expect(await getPopover(page)).not.toBeNull();
      expect(await getActiveElementTagNameInShadowRoot(host)).toBe(focusedElementTagName);

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getPopover(page)).toBeNull();
      expect(await getActiveElementTagNameInShadowRoot(host), 'focus on button after escape').toBe(
        focusedElementTagName
      );
    });

    skipInBrowser(['firefox'], () => {
      test('should close popover when content is focused', async ({ page }) => {
        await initPopover(page, { withLink: true });
        const host = await getHost(page);
        await togglePopover(page);

        expect(await getPopover(page)).not.toBeNull();
        expect(await getActiveElementTagNameInShadowRoot(host)).toBe(focusedElementTagName);

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);

        expect(await getActiveElementTagName(page)).toBe('A');

        await page.keyboard.press('Escape');
        await waitForStencilLifecycle(page);

        expect(await getPopover(page)).toBeNull();
        expect(await getActiveElementTagNameInShadowRoot(host)).toBe(focusedElementTagName);
      });
    });

    test('should close popover when content outside is focused', async ({ page }) => {
      await initPopover(page, { withButtonOutside: true });
      const host = await getHost(page);
      await togglePopover(page);

      expect(await getActiveElementTagNameInShadowRoot(host)).toBe(focusedElementTagName);
      expect(await getPopover(page)).not.toBeNull();

      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('BUTTON');

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getActiveElementTagName(page)).toBe('BUTTON');
      expect(await getPopover(page)).toBeNull();
    });
  });

  test.describe('enter', () => {
    test('should open / close popover', async ({ page }) => {
      await initPopover(page);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getPopover(page), 'first enter').not.toBeNull();

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getPopover(page), 'second enter').toBeNull();
    });

    test('should close other popovers that are open', async ({ page }) => {
      await setContentWithDesignSystem(
        page,
        `<p-popover>Some Content</p-popover>
        <p-popover class="second">Some Content</p-popover>`
      );
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getPopover(page), 'first popover, first enter').not.toBeNull();
      expect(await getSecondPopover(page), 'second popover, first enter').toBeNull();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getPopover(page), 'first popover, second enter').toBeNull();
      expect(await getSecondPopover(page), 'second popover, second enter').not.toBeNull();
    });
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initPopover(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-popover'], 'componentDidLoad: p-popover').toBe(1);
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(2);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on prop change', async ({ page }) => {
    await initPopover(page);
    const host = await getHost(page);

    await setProperty(host, 'direction', 'right');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-popover'], 'componentDidUpdate: p-popover').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

test.describe('native', () => {
  skipInBrowser(['firefox', 'webkit']);
  test('should not render native popover when used outside of table', async ({ page }) => {
    await initPopover(page);
    await togglePopover(page);
    const button = await getButton(page);
    const spacer = await getSpacer(page);

    expect(await getAttribute(button, 'popoverTarget')).toBe(null);
    expect(await getProperty(spacer, 'popover')).toBe(null);
  });

  test('should render native popover when used within table', async ({ page }) => {
    await initPopoverWithinTable(page);
    const button = await getButton(page);
    const spacer = await getSpacer(page);

    expect(await getAttribute(button, 'popoverTarget')).toBe(await getProperty(spacer, 'id'));
    expect(await getProperty(spacer, 'popover')).toBe('auto');
  });

  test('should open popover with correct position on click', async ({ page }) => {
    await initPopoverWithinTable(page);
    await togglePopover(page);

    expect(await isNativePopoverOpen(page)).toBe(true);
  });

  test('should close popover on table scroll', async ({ page }) => {
    await initPopoverWithinTable(page);
    await togglePopover(page);

    expect(await isNativePopoverOpen(page)).toBe(true);

    // Simulate a scroll event on the table
    await (
      await getTableScroller(page)
    ).evaluate((el) => {
      el.dispatchEvent(new Event('scroll'));
    });

    expect(await isNativePopoverOpen(page)).toBe(false);
  });
});
