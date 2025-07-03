import { expect, test } from '@playwright/test';
import type { PopoverDirection } from '@porsche-design-system/components';
import type { Page } from 'playwright';
import {
  addEventListener,
  getActiveElementId,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-popover');
const getPopover = (page: Page) => page.locator('p-popover [popover]');
const getButton = (page: Page) => page.locator('p-popover button').first();

const togglePopover = async (page: Page): Promise<void> => {
  const button = getButton(page);
  await button.click();
  await waitForStencilLifecycle(page);
};

const openPopover = async (page: Page) => {
  await setProperty(getHost(page), 'open', true);
  await waitForStencilLifecycle(page);
};

const dismissPopover = async (page: Page) => {
  await setProperty(getHost(page), 'open', false);
  await waitForStencilLifecycle(page);
};

type InitOptions = {
  direction?: PopoverDirection;
  withLink?: boolean;
  withStrong?: boolean;
  withButtonOutside?: boolean;
  withSlottedButton?: boolean;
};
const initPopover = (page: Page, opts?: InitOptions): Promise<void> => {
  const {
    direction = 'bottom',
    withLink = false,
    withStrong = false,
    withButtonOutside = false,
    withSlottedButton = false,
  } = opts || {};

  const linkMarkup = withLink ? '<a href="#">Some Link</a>' : '';
  const strongMarkup = withStrong ? '<strong>strong</strong>' : '';
  const buttonMarkup = withButtonOutside ? '<button>Some Button</button>' : '';
  const slottedButtonMarkup = withSlottedButton ? '<button slot="button">Some Button</button>' : '';

  return setContentWithDesignSystem(
    page,
    `
<p-popover direction="${direction}">
  ${slottedButtonMarkup}
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

skipInBrowsers(['webkit', 'firefox'], () => {
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

    const popover = getHost(page);
    const before = page.locator('#before');
    const after = page.locator('#after');

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

    await expect(getPopover(page)).toHaveCount(0);
    await togglePopover(page);
    await expect(getPopover(page)).not.toHaveCount(0);
  });

  test('should open popover with slotted button on click', async ({ page }) => {
    await initPopover(page, { withSlottedButton: true });

    await expect(getPopover(page)).toHaveCount(0);
    await openPopover(page);
    await expect(getPopover(page)).not.toHaveCount(0);
  });

  test('should close popover on second click', async ({ page }) => {
    await initPopover(page);

    await togglePopover(page);
    await expect(getPopover(page)).not.toHaveCount(0);
    await togglePopover(page);
    await expect(getPopover(page)).toHaveCount(0);
  });

  test('should close popover with slotted button on second click', async ({ page }) => {
    await initPopover(page, { withSlottedButton: true });

    await openPopover(page);
    await expect(getPopover(page)).not.toHaveCount(0);
    await dismissPopover(page);
    await expect(getPopover(page)).toHaveCount(0);
  });

  test('should close popover if clicked outside host element', async ({ page }) => {
    await initPopover(page);

    await togglePopover(page);
    await expect(getPopover(page)).not.toHaveCount(0);

    page.locator('body').click();
    await waitForStencilLifecycle(page);

    await expect(getPopover(page)).toHaveCount(0);
  });

  skipInBrowsers(['webkit'], () => {
    test('should close popover if another popover is clicked', async ({ page }) => {
      await setContentWithDesignSystem(
        page,
        `<p-popover class="first">Some Content</p-popover>
      <p-popover class="second">Some Content</p-popover>`
      );

      const firstButton = getButton(page);
      const secondButton = page.locator('p-popover.second button');

      // We have to click the second button first, otherwise it gets overlapped by the first button and cant be clicked
      await secondButton.click();
      await waitForStencilLifecycle(page);
      await expect(page.locator('p-popover.second [popover]'), 'second popover, second click').toBeVisible();
      await expect(page.locator('p-popover.first [popover]'), 'first popover, second click').toBeHidden();

      await firstButton.click();
      await waitForStencilLifecycle(page);
      await expect(page.locator('p-popover.first [popover]'), 'first popover, first click').toBeVisible();
      await expect(page.locator('p-popover.second [popover]'), 'second popover, first click').toBeHidden();
    });
  });

  test('should not close popover when its content is clicked', async ({ page }) => {
    await initPopover(page);
    await togglePopover(page);
    await expect(getPopover(page)).not.toHaveCount(0);

    await getPopover(page).click();

    await expect(getPopover(page)).not.toHaveCount(0);
  });

  test('should be possible to select/highlight text within open popover', async ({ page }) => {
    await initPopover(page, { withStrong: true });
    await togglePopover(page);

    const strongEl = page.locator('strong');
    await strongEl.click({ clickCount: 2 });

    const selection = await page.evaluate(() => window.getSelection().toString());
    expect(selection).toBe('strong');
  });
});

test.describe('keyboard behavior', () => {
  skipInBrowsers(['webkit']);
  test.describe('escape', () => {
    const focusedElementTagName = 'BUTTON';

    test('should close popover when button is focused', async ({ page }) => {
      await initPopover(page);
      const host = getHost(page);
      await togglePopover(page);

      await expect(getPopover(page)).not.toHaveCount(0);
      expect(await getActiveElementTagNameInShadowRoot(host)).toBe(focusedElementTagName);

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      await expect(getPopover(page)).toHaveCount(0);
      expect(await getActiveElementTagNameInShadowRoot(host), 'focus on button after escape').toBe(
        focusedElementTagName
      );
    });

    skipInBrowsers(['firefox'], () => {
      test('should close popover when content is focused', async ({ page }) => {
        await initPopover(page, { withLink: true });
        const host = getHost(page);
        await togglePopover(page);

        await expect(getPopover(page)).not.toHaveCount(0);
        expect(await getActiveElementTagNameInShadowRoot(host)).toBe(focusedElementTagName);

        await page.keyboard.press('Tab');
        await waitForStencilLifecycle(page);

        expect(await getActiveElementTagName(page)).toBe('A');

        await page.keyboard.press('Escape');
        await waitForStencilLifecycle(page);

        await expect(getPopover(page)).toHaveCount(0);
        expect(await getActiveElementTagNameInShadowRoot(host)).toBe(focusedElementTagName);
      });
    });

    test('should close popover when content outside is focused', async ({ page }) => {
      await initPopover(page, { withButtonOutside: true });
      const host = getHost(page);
      await togglePopover(page);

      expect(await getActiveElementTagNameInShadowRoot(host)).toBe(focusedElementTagName);
      await expect(getPopover(page)).not.toHaveCount(0);

      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('BUTTON');

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getActiveElementTagName(page)).toBe('BUTTON');
      await expect(getPopover(page)).toHaveCount(0);
    });
  });

  test.describe('enter', () => {
    test('should open / close popover', async ({ page }) => {
      await initPopover(page);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      await expect(getPopover(page), 'first enter').not.toHaveCount(0);

      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      await expect(getPopover(page), 'second enter').toHaveCount(0);
    });

    test('should close other popovers that are open', async ({ page }) => {
      await setContentWithDesignSystem(
        page,
        `<p-popover class="first">Some Content</p-popover>
        <p-popover class="second">Some Content</p-popover>`
      );
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      await expect(page.locator('p-popover.first [popover]'), 'first popover, first enter').toBeVisible();
      await expect(page.locator('p-popover.second [popover]'), 'second popover, first enter').toBeHidden();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      await expect(page.locator('p-popover.first [popover]'), 'first popover, second enter').toBeHidden();
      await expect(page.locator('p-popover.second [popover]'), 'second popover, second enter').toBeVisible();
    });
  });
});

test.describe('dismiss event', () => {
  test('should not fire on a non controlled component if closed with ESC key', async ({ page }) => {
    await initPopover(page);
    const host = getHost(page);

    await addEventListener(host, 'dismiss');
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);

    await togglePopover(page);
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);

    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);
  });

  test('should not fire on a non controlled component if closed with click outside', async ({ page }) => {
    await initPopover(page);
    const host = getHost(page);

    await addEventListener(host, 'dismiss');
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);

    await openPopover(page);
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);

    page.locator('body').click();
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);
  });

  test('should fire on a controlled component if closed with ESC key', async ({ page }) => {
    await initPopover(page, { withSlottedButton: true });
    const host = getHost(page);

    await addEventListener(host, 'dismiss');
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);

    await getButton(page).focus();
    await openPopover(page);
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);

    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });

  test('should fire on a controlled component if closed with click outside', async ({ page }) => {
    await initPopover(page, { withSlottedButton: true });
    const host = getHost(page);

    await addEventListener(host, 'dismiss');
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);

    await openPopover(page);
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);

    page.locator('body').click();
    await waitForStencilLifecycle(page);
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
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
    const host = getHost(page);

    await setProperty(host, 'direction', 'right');
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-popover'], 'componentDidUpdate: p-popover').toBe(1);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
