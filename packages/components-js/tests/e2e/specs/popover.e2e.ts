import { expect, test } from '@playwright/test';
import type { PopoverDirection } from '@porsche-design-system/components';
import type { Page } from 'playwright';
import {
  addEventListener,
  getActiveElementId,
  getEventSummary,
  getLifecycleStatus,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-popover');
const getPopover = (page: Page) => page.locator('p-popover [popover]');
const getButton = (page: Page) => page.locator('p-popover button');

type InitOptions = {
  direction?: PopoverDirection;
  withLink?: boolean;
  withStrong?: boolean;
  withSlottedButton?: boolean;
};
const initPopover = (page: Page, opts?: InitOptions): Promise<void> => {
  const { direction = 'bottom', withLink = false, withStrong = false, withSlottedButton = false } = opts || {};

  const linkMarkup = withLink ? '<a href="#">Some Link</a>' : '';
  const strongMarkup = withStrong ? '<strong>strong</strong>' : '';
  const slottedButtonMarkup = withSlottedButton ? '<button slot="button">Some Button</button>' : '';

  return setContentWithDesignSystem(
    page,
    `
<p-popover direction="${direction}">
  ${slottedButtonMarkup}
  ${linkMarkup}
  ${strongMarkup}
  Some Popover Content
</p-popover>`
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
  test.describe('default button', () => {
    test('should open/close popover on button click', async ({ page }) => {
      await initPopover(page);
      const popover = getPopover(page);
      const button = getButton(page);

      await expect(popover).toBeHidden();

      await button.click();
      await expect(popover).toBeVisible();

      await button.click();
      await expect(popover).toBeHidden();
    });

    test('should close popover if clicked outside host element', async ({ page }) => {
      await initPopover(page);
      const popover = getPopover(page);

      await expect(popover).toBeHidden();

      await page.mouse.click(200, 200);
      await expect(popover).toBeHidden();
    });

    skipInBrowsers(['webkit'], () => {
      test('should close popover if another popover is clicked', async ({ page }) => {
        await setContentWithDesignSystem(
          page,
          `<p-popover class="first">Some Content</p-popover>
      <p-popover class="second">Some Content</p-popover>`
        );

        const firstButton = page.locator('p-popover.first button');
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
      const popover = getPopover(page);
      const button = getButton(page);

      await button.click();
      await expect(popover).toBeVisible();

      await popover.click();

      await expect(popover).toBeVisible();
    });

    test('should not close popover when non-focusable content is clicked after opening', async ({ page }, testInfo) => {
      await initPopover(page, { withStrong: true });
      const popover = getPopover(page);
      const button = getButton(page);

      await button.click();
      await expect(popover).toBeVisible();
      // WebKit does not focus a `<button>` on click, so only assert the trigger focus where it is reliable.
      if (testInfo.project.name !== 'safari') {
        await expect(button).toBeFocused();
      }

      // Clicking non-focusable content blurs the trigger with a `null` relatedTarget and must not dismiss the popover.
      await page.locator('strong').click();
      await expect(popover).toBeVisible();
    });

    test('should be possible to select/highlight text within open popover', async ({ page }) => {
      await initPopover(page, { withStrong: true });
      const popover = getPopover(page);
      const button = getButton(page);

      await button.click();
      await expect(popover).toBeVisible();

      const strongEl = page.locator('strong');
      await strongEl.click({ clickCount: 2 });

      // Some browsers (e.g. Firefox) include surrounding whitespace in the double-click selection, so compare trimmed.
      const selection = await page.evaluate(() => window.getSelection().toString());
      expect(selection.trim()).toBe('strong');
    });
  });

  test.describe('custom slotted button', () => {
    test('should open/close popover on button click', async ({ page }) => {
      await initPopover(page, { withSlottedButton: true });
      const popover = getPopover(page);
      const button = getButton(page);

      await expect(popover).toBeHidden();

      await button.click();
      await expect(popover).toBeVisible();

      await button.click();
      await expect(popover).toBeHidden();
    });

    test('should close popover if clicked outside host element', async ({ page }) => {
      await initPopover(page, { withSlottedButton: true });
      const popover = getPopover(page);

      await expect(popover).toBeHidden();

      await page.mouse.click(200, 200);
      await expect(popover).toBeHidden();
    });

    skipInBrowsers(['webkit'], () => {
      test('should close popover if another popover is clicked', async ({ page }) => {
        await setContentWithDesignSystem(
          page,
          `<p-popover class="first"><button slot="button">Some button</button>Some Content</p-popover>
      <p-popover class="second"><button slot="button">Some button</button>Some Content</p-popover>`
        );

        const firstButton = page.locator('p-popover.first button');
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
      await initPopover(page, { withSlottedButton: true });
      const popover = getPopover(page);
      const button = getButton(page);

      await button.click();
      await expect(popover).toBeVisible();

      await popover.click();

      await expect(popover).toBeVisible();
    });

    test('should be possible to select/highlight text within open popover', async ({ page }) => {
      await initPopover(page, { withStrong: true, withSlottedButton: true });
      const popover = getPopover(page);
      const button = getButton(page);

      await button.click();
      await expect(popover).toBeVisible();

      const strongEl = page.locator('strong');
      await strongEl.click({ clickCount: 2 });

      // Some browsers (e.g. Firefox) include surrounding whitespace in the double-click selection, so compare trimmed.
      const selection = await page.evaluate(() => window.getSelection().toString());
      expect(selection.trim()).toBe('strong');
    });
  });
});

test.describe('keyboard behavior', () => {
  skipInBrowsers(['webkit']);

  test.describe('default button', () => {
    test.describe('escape', () => {
      test('should close popover when button is focused', async ({ page }) => {
        await initPopover(page);
        const popover = getPopover(page);
        const button = getButton(page);

        await button.click();
        await expect(popover).toBeVisible();
        await expect(button).toBeFocused();

        await page.keyboard.press('Escape');

        await expect(popover).toBeHidden();
        await expect(button).toBeFocused();
      });

      skipInBrowsers(['firefox'], () => {
        test('should close popover when content is focused', async ({ page }) => {
          await initPopover(page, { withLink: true });
          const popover = getPopover(page);
          const button = getButton(page);
          const link = page.locator('p-popover a');

          await button.click();
          await expect(popover).toBeVisible();
          await expect(button).toBeFocused();

          await page.keyboard.press('Tab');
          await expect(link).toBeFocused();

          await page.keyboard.press('Escape');
          await expect(popover).toBeHidden();
          await expect(button).toBeFocused();
        });
      });
    });

    test.describe('enter', () => {
      test('should open / close popover', async ({ page }) => {
        await initPopover(page);
        const popover = getPopover(page);
        const button = getButton(page);

        await page.keyboard.press('Tab');
        await expect(button).toBeFocused();
        await page.keyboard.press('Enter');
        await expect(popover).toBeVisible();

        await page.keyboard.press('Enter');
        await expect(popover).toBeHidden();
      });

      test('should close other popovers that are open', async ({ page }) => {
        await setContentWithDesignSystem(
          page,
          `<p-popover class="first">Some Content</p-popover>
        <p-popover class="second">Some Content</p-popover>`
        );
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');

        await expect(page.locator('p-popover.first [popover]'), 'first popover, first enter').toBeVisible();
        await expect(page.locator('p-popover.second [popover]'), 'second popover, first enter').toBeHidden();

        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');

        await expect(page.locator('p-popover.first [popover]'), 'first popover, second enter').toBeHidden();
        await expect(page.locator('p-popover.second [popover]'), 'second popover, second enter').toBeVisible();
      });
    });

    test('should close popover when focus leaves it', async ({ page }) => {
      await setContentWithDesignSystem(
        page,
        `<p-popover>Some Content</p-popover>
        <button id="after">after</button>`
      );
      const popover = getPopover(page);
      const button = getButton(page);

      await button.click();
      await expect(popover).toBeVisible();

      // Tab moves focus to the button outside the popover, which must dismiss it (keyboard light-dismiss).
      await page.keyboard.press('Tab');
      await expect(page.locator('#after')).toBeFocused();
      await expect(popover).toBeHidden();
    });

    test('should not close popover when focus moves to slotted content', async ({ page }) => {
      await initPopover(page, { withLink: true });
      const popover = getPopover(page);
      const button = getButton(page);

      await button.click();
      await expect(popover).toBeVisible();

      // Tab moves focus into the slotted link inside the popover, which must keep it open.
      await page.keyboard.press('Tab');
      await expect(page.locator('p-popover a')).toBeFocused();
      await expect(popover).toBeVisible();
    });
  });

  test.describe('custom slotted button', () => {
    test.describe('escape', () => {
      test('should close popover when button is focused', async ({ page }) => {
        await initPopover(page, { withSlottedButton: true });
        const popover = getPopover(page);
        const button = getButton(page);

        await button.click();
        await expect(popover).toBeVisible();
        await expect(button).toBeFocused();

        await page.keyboard.press('Escape');

        await expect(popover).toBeHidden();
        await expect(button).toBeFocused();
      });

      skipInBrowsers(['firefox'], () => {
        test('should close popover when content is focused', async ({ page }) => {
          await initPopover(page, { withLink: true, withSlottedButton: true });
          const popover = getPopover(page);
          const button = getButton(page);
          const link = page.locator('p-popover a');

          await button.click();
          await expect(popover).toBeVisible();
          await expect(button).toBeFocused();

          await page.keyboard.press('Tab');
          await expect(link).toBeFocused();

          await page.keyboard.press('Escape');
          await expect(popover).toBeHidden();
          await expect(button).toBeFocused();
        });
      });
    });

    test.describe('enter', () => {
      test('should open / close popover', async ({ page }) => {
        await initPopover(page, { withSlottedButton: true });
        const popover = getPopover(page);
        const button = getButton(page);

        await page.keyboard.press('Tab');
        await expect(button).toBeFocused();
        await page.keyboard.press('Enter');
        await expect(popover).toBeVisible();

        await page.keyboard.press('Enter');
        await expect(popover).toBeHidden();
      });

      test('should close other popovers that are open', async ({ page }) => {
        await setContentWithDesignSystem(
          page,
          `<p-popover class="first"><button slot="button">Some button</button>Some Content</p-popover>
        <p-popover class="second"><button slot="button">Some button</button>Some Content</p-popover>`
        );
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');

        await expect(page.locator('p-popover.first [popover]'), 'first popover, first enter').toBeVisible();
        await expect(page.locator('p-popover.second [popover]'), 'second popover, first enter').toBeHidden();

        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');

        await expect(page.locator('p-popover.first [popover]'), 'first popover, second enter').toBeHidden();
        await expect(page.locator('p-popover.second [popover]'), 'second popover, second enter').toBeVisible();
      });
    });
  });
});

test.describe('dynamic content change', () => {
  test('should work with dynamic slotted button change correctly', async ({ page }) => {
    await initPopover(page);

    await page.evaluate(() => {
      const slottedButton = document.createElement('button');
      slottedButton.slot = 'button';
      slottedButton.textContent = 'Dynamic Button';
      document.querySelector('p-popover').appendChild(slottedButton);
    });

    const popover = getPopover(page);
    const button = getButton(page);

    await expect(popover).toBeHidden();

    await button.click();
    await expect(popover).toBeVisible();

    await button.click();
    await expect(popover).toBeHidden();

    await button.click();
    await expect(popover).toBeVisible();

    await page.mouse.click(200, 200);
    await expect(popover).toBeHidden();
  });
});

test.describe('lifecycle', () => {
  test.describe('default button', () => {
    test('should work without unnecessary round trips on init', async ({ page }) => {
      await initPopover(page);
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-popover'], 'componentDidLoad: p-popover').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    test('should work without unnecessary round trips on prop change', async ({ page }) => {
      await initPopover(page);
      const button = getButton(page);
      const popover = getPopover(page);

      const status = await getLifecycleStatus(page);
      expect(status.componentDidLoad['p-popover'], 'componentDidLoad: p-popover').toBe(1);
      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);

      await button.click();
      await expect(popover).toBeVisible();

      const status2 = await getLifecycleStatus(page);

      expect(status2.componentDidUpdate['p-popover'], 'componentDidUpdate: p-popover').toBe(1);
      expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    });
  });

  test.describe('custom slotted button', () => {
    test('should work without unnecessary round trips on init', async ({ page }) => {
      await initPopover(page, { withSlottedButton: true });
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-popover'], 'componentDidLoad: p-popover').toBe(1);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    test('should work without unnecessary round trips on prop change', async ({ page }) => {
      await initPopover(page, { withSlottedButton: true });
      const button = getButton(page);
      const popover = getPopover(page);

      const status = await getLifecycleStatus(page);
      expect(status.componentDidLoad['p-popover'], 'componentDidLoad: p-popover').toBe(1);
      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(1);

      await button.click();
      await expect(popover).toBeVisible();

      const status2 = await getLifecycleStatus(page);

      expect(status2.componentDidUpdate['p-popover'], 'componentDidUpdate: p-popover').toBe(1);
      expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
    });
  });
});

test.describe('accessibility', () => {
  test('should render the default button with correct static aria attributes', async ({ page }) => {
    await initPopover(page);
    const button = getButton(page);

    await expect(button).toHaveAttribute('aria-label', 'More information');
    await expect(button).toHaveAttribute('aria-details', 'popover');
  });

  test('should toggle aria-expanded on the default button when opening/closing', async ({ page }) => {
    await initPopover(page);
    const button = getButton(page);
    const popover = getPopover(page);

    await expect(button).toHaveAttribute('aria-expanded', 'false');

    await button.click();
    await expect(popover).toBeVisible();
    await expect(button).toHaveAttribute('aria-expanded', 'true');

    await button.click();
    await expect(popover).toBeHidden();
    await expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('should reflect the open prop in aria-expanded in controlled mode', async ({ page }) => {
    await setContentWithDesignSystem(page, '<p-popover>Some Popover Content</p-popover>');
    const host = getHost(page);
    const button = getButton(page);

    await setProperty(host, 'open', true);
    await expect(button).toHaveAttribute('aria-expanded', 'true');

    await setProperty(host, 'open', false);
    await expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('should override the aria-label of the default button via the aria prop', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `<p-popover aria="{ 'aria-label': 'Some custom label' }">Some Popover Content</p-popover>`
    );
    const button = getButton(page);

    await expect(button).toHaveAttribute('aria-label', 'Some custom label');
  });
});

test.describe('description', () => {
  test('should render the description prop as panel content instead of the default slot', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `<p-popover description="Some description text">Some Slotted Content</p-popover>`
    );
    const button = getButton(page);
    const popover = getPopover(page);

    await button.click();
    await expect(popover).toBeVisible();

    // The `description` prop renders a `<p>` inside the panel and suppresses the default slot content.
    await expect(popover.locator('p')).toHaveText('Some description text');
    await expect(popover).not.toContainText('Some Slotted Content');
  });
});

test.describe('controlled mode', () => {
  const initControlledPopover = async (page: Page, open: boolean): Promise<void> => {
    await setContentWithDesignSystem(
      page,
      `<p-popover>
        <button slot="button">Some Button</button>
        Some Popover Content
      </p-popover>`
    );
    await setProperty(getHost(page), 'open', open);
  };

  test('should be hidden when open prop is false', async ({ page }) => {
    await initControlledPopover(page, false);
    await expect(getPopover(page)).toBeHidden();
  });

  test('should be visible when open prop is true', async ({ page }) => {
    await initControlledPopover(page, true);
    await expect(getPopover(page)).toBeVisible();
  });

  test('should reflect open prop changes', async ({ page }) => {
    await initControlledPopover(page, false);
    const host = getHost(page);
    const popover = getPopover(page);

    await setProperty(host, 'open', true);
    await expect(popover).toBeVisible();

    await setProperty(host, 'open', false);
    await expect(popover).toBeHidden();
  });

  test('should not toggle visibility itself when the slotted button is clicked', async ({ page }) => {
    await initControlledPopover(page, false);
    const button = getButton(page);

    // In controlled mode the consumer owns the open state, so a click must not change visibility on its own
    await button.click();
    await expect(getPopover(page)).toBeHidden();
  });

  skipInBrowsers(['webkit', 'firefox'], () => {
    test('should emit dismiss event on outside click when open', async ({ page }) => {
      await initControlledPopover(page, true);
      const host = getHost(page);
      await addEventListener(host, 'dismiss');

      await page.mouse.click(300, 300);

      expect((await getEventSummary(host, 'dismiss')).counter, 'dismiss after outside click').toBe(1);
      // popover stays visible because the consumer owns `open` and hasn't updated it yet
      await expect(getPopover(page)).toBeVisible();
    });

    test('should emit dismiss event on Escape when open', async ({ page }) => {
      await initControlledPopover(page, true);
      const host = getHost(page);
      await addEventListener(host, 'dismiss');

      await page.keyboard.press('Escape');

      expect((await getEventSummary(host, 'dismiss')).counter, 'dismiss after Escape').toBe(1);
    });

    test('should return focus to the slotted trigger on Escape when open', async ({ page }) => {
      await initControlledPopover(page, true);
      const host = getHost(page);
      const button = getButton(page);
      await addEventListener(host, 'dismiss');

      await page.keyboard.press('Escape');

      // Focus must move back to the trigger synchronously (before the consumer flips `open`), so keyboard users
      // are not stranded on the panel that becomes `inert` once closed.
      await expect(button).toBeFocused();
      expect((await getEventSummary(host, 'dismiss')).counter, 'dismiss after Escape').toBe(1);
      // popover stays visible because the consumer owns `open` and hasn't updated it yet
      await expect(getPopover(page)).toBeVisible();
    });

    test('should emit dismiss event on the first popover when a second popover opens', async ({ page }) => {
      await setContentWithDesignSystem(
        page,
        `<p-popover class="first" open>
          <button slot="button">First Button</button>
          First Content
        </p-popover>
        <p-popover class="second">
          <button slot="button">Second Button</button>
          Second Content
        </p-popover>`
      );

      const firstHost = page.locator('p-popover.first');
      await addEventListener(firstHost, 'dismiss');

      // Opening the second (uncontrolled) popover must request dismissal of the first (controlled) popover.
      await page.locator('p-popover.second button').click();
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(firstHost, 'dismiss')).counter, 'dismiss after second popover opens').toBe(1);
      await expect(page.locator('p-popover.second [popover]'), 'second popover visible').toBeVisible();
      // first popover stays visible because the consumer owns `open` and hasn't updated it yet
      await expect(page.locator('p-popover.first [popover]'), 'first popover still visible').toBeVisible();
    });
  });
});

test.describe('viewport clamping', () => {
  // Mirrors POPOVER_SAFE_ZONE from packages/components/src/components/popover/popover-utils.ts. The default
  // `--p-popover-max-w`/`--p-popover-max-h` inset the panel by `2 * POPOVER_SAFE_ZONE` from the viewport edges.
  const POPOVER_SAFE_ZONE = 8;

  const longContent = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr. '.repeat(40);

  // works on macOS but not on Linux (CI/CD)
  test.fixme('should clamp the panel within the viewport via the default max-width and max-height', async ({
    page,
  }) => {
    // Small viewport so the long content is guaranteed to hit both the width (100dvw) and height (100dvh) clamps.
    await page.setViewportSize({ width: 360, height: 640 });
    await setContentWithDesignSystem(page, `<p-popover open="true">${longContent}</p-popover>`);

    const popover = getPopover(page);
    await expect(popover).toBeVisible();

    const box = await popover.boundingBox();
    const viewport = page.viewportSize();

    // The panel must never exceed the viewport minus the safe zone on both edges (default `100dvw/dvh - 2 * safeZone`).
    expect(box.width, 'panel width within viewport safe zone').toBeLessThanOrEqual(
      viewport.width - 2 * POPOVER_SAFE_ZONE
    );
    expect(box.height, 'panel height within viewport safe zone').toBeLessThanOrEqual(
      viewport.height - 2 * POPOVER_SAFE_ZONE
    );

    // The panel must stay fully inside the viewport (no overflow past any edge).
    expect(box.x, 'panel left edge inside viewport').toBeGreaterThanOrEqual(0);
    expect(box.y, 'panel top edge inside viewport').toBeGreaterThanOrEqual(0);
    expect(box.x + box.width, 'panel right edge inside viewport').toBeLessThanOrEqual(viewport.width);
    expect(box.y + box.height, 'panel bottom edge inside viewport').toBeLessThanOrEqual(viewport.height);
  });
});
