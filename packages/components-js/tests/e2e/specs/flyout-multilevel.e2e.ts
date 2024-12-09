import { type Locator, type Page, expect, test } from '@playwright/test';
import type { Components } from '@porsche-design-system/components';
import {
  addEventListener,
  getActiveElementClassNameInShadowRoot,
  getActiveElementId,
  getActiveElementProp,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getElementStyle,
  getEventSummary,
  getHTMLAttributes,
  getLifecycleStatus,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  sleep,
  waitForStencilLifecycle,
} from '../helpers';

const CSS_TRANSITION_DURATION = 600;

const getHost = (page: Page) => page.locator('p-flyout-multilevel');
const getFlyoutMultilevelDialog = (page: Page) => page.locator('p-flyout-multilevel dialog');
const getFlyoutMultilevelDismissButton = (page: Page) =>
  page.locator('p-flyout-multilevel p-button-pure.dismiss-desktop');
const getFlyoutMultilevelDialogVisibility = async (page: Page) =>
  await getElementStyle(getFlyoutMultilevelDialog(page), 'visibility');
const getFlyoutMultilevelItem = (page: Page, identifier: string) =>
  page.locator(`p-flyout-multilevel-item[identifier="${identifier}"] .button`);
const getFlyoutMultilevelItemScroller = (page: Page, identifier: string) =>
  page.locator(`p-flyout-multilevel-item[identifier="${identifier}"] .scroller`);
const getBodyStyle = async (page: Page) => getAttribute(page.locator('body'), 'style');

const waitForFlyoutTransition = async () => sleep(CSS_TRANSITION_DURATION);

const initBasicFlyoutMultilevel = (
  page: Page,
  flyoutMultilevelProps?: Components.PFlyoutMultilevel,
  items?: {
    amount?: number;
    content?: string[];
  },
  other?: {
    markupBefore?: string;
    markupAfter?: string;
  }
): Promise<void> => {
  const { markupBefore = '', markupAfter = '' } = other || {};
  const { amount = 3, content = [] } = items || {};

  const flyoutMultilevelItemContent = `
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>`;

  const flyoutMarkup = `
<p-flyout-multilevel ${getHTMLAttributes(flyoutMultilevelProps)}>
  ${[...Array(amount)]
    .map(
      (_, i) =>
        `<p-flyout-multilevel-item identifier="item-${i + 1}" label="item-${i + 1}">${
          content[i] ? content[i] : flyoutMultilevelItemContent
        }</p-flyout-multilevel-item>`
    )
    .join('\n')}
</p-flyout-multilevel>`;

  return setContentWithDesignSystem(page, [markupBefore, flyoutMarkup, markupAfter].filter(Boolean).join('\n'));
};

const openFlyoutMultilevel = async (page: Page) => {
  await setProperty(getHost(page), 'open', true);
  await waitForStencilLifecycle(page);
};

const dismissFlyoutMultilevel = async (page: Page) => {
  await setProperty(getHost(page), 'open', false);
  await waitForStencilLifecycle(page);
};

const addButtonsBeforeAndAfterFlyout = (page: Page) =>
  page.evaluate(() => {
    const buttonBefore = document.createElement('button');
    buttonBefore.innerText = 'Button Before';
    buttonBefore.id = 'btn-before';
    document.body.prepend(buttonBefore);

    const buttonAfter = document.createElement('button');
    buttonAfter.innerText = 'Button After';
    buttonAfter.id = 'btn-after';
    document.body.append(buttonAfter);
  });

const expectDismissButtonToBeFocused = async (page: Page, failMessage?: string) => {
  const host = getHost(page);
  expect(await getActiveElementTagNameInShadowRoot(host), failMessage).toBe('P-BUTTON-PURE');
  expect(await getActiveElementClassNameInShadowRoot(host), failMessage).toContain('dismiss');
};

test('should render and be visible when open', async ({ page }) => {
  await initBasicFlyoutMultilevel(page, { open: true });
  expect(getFlyoutMultilevelDialog(page)).not.toBeNull();
  expect(await getFlyoutMultilevelDialogVisibility(page)).toBe('visible');
});

test('should not be visible when not open', async ({ page }) => {
  await initBasicFlyoutMultilevel(page, { open: false });
  expect(await getFlyoutMultilevelDialogVisibility(page)).toBe('hidden');
});

test('should be visible after opened', async ({ page }) => {
  await initBasicFlyoutMultilevel(page, { open: false });
  const host = getHost(page);
  await setProperty(host, 'open', true);

  await waitForFlyoutTransition();

  expect(await getFlyoutMultilevelDialogVisibility(page)).toBe('visible');
});

test.describe('update event', () => {
  let host: Locator;

  test.beforeEach(async ({ page }) => {
    await initBasicFlyoutMultilevel(page, { open: true });
    host = getHost(page);
    await addEventListener(host, 'update');
  });

  test('should be emitted when clicking on a navigation-item', async ({ page }) => {
    expect((await getEventSummary(host, 'update')).counter, 'before activeIdentifier change').toBe(0);

    await getFlyoutMultilevelItem(page, 'item-1').click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after activeIdentifier change').toBe(1);
    expect((await getEventSummary(host, 'update')).details, 'after activeIdentifier change').toEqual([
      { activeIdentifier: 'item-1' },
    ]);
  });

  skipInBrowsers(['webkit'], () => {
    test('should be emitted when pressing Enter on a navigation-item', async ({ page }) => {
      expect((await getEventSummary(host, 'update')).counter, 'before activeIdentifier change').toBe(0);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-MULTILEVEL-ITEM');
      expect(await getActiveElementProp(page, 'identifier')).toBe('item-2');
      await page.keyboard.press('Enter');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'update')).counter, 'after activeIdentifier change').toBe(1);
      expect((await getEventSummary(host, 'update')).details, 'after activeIdentifier change').toEqual([
        { activeIdentifier: 'item-2' },
      ]);
    });
  });

  skipInBrowsers(['webkit'], () => {
    test('should be emitted when pressing Space on a navigation-item', async ({ page }) => {
      expect((await getEventSummary(host, 'update')).counter, 'before activeIdentifier change').toBe(0);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-MULTILEVEL-ITEM');
      expect(await getActiveElementProp(page, 'identifier')).toBe('item-3');
      await page.keyboard.press('Space');
      await waitForStencilLifecycle(page);

      expect((await getEventSummary(host, 'update')).counter, 'after activeIdentifier change').toBe(1);
      expect((await getEventSummary(host, 'update')).details, 'after activeIdentifier change').toEqual([
        { activeIdentifier: 'item-3' },
      ]);
    });
  });

  test('should not bubble', async ({ page }) => {
    const body = page.locator('body');
    await addEventListener(body, 'update');

    expect((await getEventSummary(host, 'update')).counter).toBe(0);
    expect((await getEventSummary(body, 'update')).counter).toBe(0);

    await getFlyoutMultilevelItem(page, 'item-1').click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter).toBe(1);
    expect((await getEventSummary(body, 'update')).counter).toBe(0);
  });
});

test.describe('dismiss event', () => {
  let host: Locator;

  test.beforeEach(async ({ page }) => {
    await initBasicFlyoutMultilevel(page, { open: true });
    host = getHost(page);
    await addEventListener(host, 'dismiss');
  });

  test('should be emitted when clicking dismiss button', async ({ page }) => {
    const dismissBtn = getFlyoutMultilevelDismissButton(page);

    await expect(dismissBtn).not.toHaveCount(0);
    expect(await getProperty(dismissBtn, 'type')).toBe('button');

    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);

    await dismissBtn.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });

  test('should be emitted when pressing ESC', async ({ page }) => {
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);

    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });

  test('should be emitted when clicking backdrop', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await page.mouse.move(799, 300);

    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);

    await page.mouse.down();
    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(0);

    await page.mouse.up();
    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(1);
  });

  test('should not be emitted when clicking within dialog', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await page.mouse.move(5, 5);

    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);

    await page.mouse.down();
    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(0);

    await page.mouse.up();
    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(0);
  });

  test('should not bubble', async ({ page }) => {
    const body = page.locator('body');
    await addEventListener(body, 'dismiss');

    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);
    expect((await getEventSummary(body, 'dismiss')).counter).toBe(0);

    const dismissBtn = getFlyoutMultilevelDismissButton(page);
    await dismissBtn.click();

    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
    expect((await getEventSummary(body, 'dismiss')).counter).toBe(0);
  });
});

test.describe('focus behavior', () => {
  skipInBrowsers(['webkit']);

  test('should focus dismiss button after open', async ({ page }) => {
    await initBasicFlyoutMultilevel(page, { open: false });
    await openFlyoutMultilevel(page);

    expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-MULTILEVEL');
    await expectDismissButtonToBeFocused(page);
  });

  test('should have correct focus order in level 1 when level 2 is closed', async ({ page }) => {
    await initBasicFlyoutMultilevel(page, { open: false });
    await openFlyoutMultilevel(page);

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-MULTILEVEL-ITEM');
    expect(await getActiveElementProp(page, 'identifier')).toBe('item-1');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-MULTILEVEL-ITEM');
    expect(await getActiveElementProp(page, 'identifier')).toBe('item-2');
  });

  skipInBrowsers(['firefox'], () => {
    test('should have correct focus order when level 2 is open', async ({ page }) => {
      await initBasicFlyoutMultilevel(page, { open: false, activeIdentifier: 'item-1' });
      await openFlyoutMultilevel(page);

      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-MULTILEVEL-ITEM');
      expect(await getActiveElementProp(page, 'identifier')).toBe('item-1');

      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('A');
    });
  });

  skipInBrowsers(['firefox'], () => {
    test('should have correct focus order when level 2 is opened', async ({ page }) => {
      await initBasicFlyoutMultilevel(page, { open: false });
      const host = getHost(page);
      await openFlyoutMultilevel(page);
      await waitForStencilLifecycle(page);

      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-MULTILEVEL-ITEM');
      expect(await getActiveElementProp(page, 'identifier')).toBe('item-1');

      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-MULTILEVEL-ITEM');
      expect(await getActiveElementProp(page, 'identifier')).toBe('item-2');

      await setProperty(host, 'activeIdentifier', 'item-2'); // Open second level
      await waitForStencilLifecycle(page);

      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('A');
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('A');
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('A');

      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-MULTILEVEL-ITEM');
      expect(await getActiveElementProp(page, 'identifier')).toBe('item-3');
    });
  });

  skipInBrowsers(['firefox'], () => {
    test('should not allow focusing element behind of flyout when pressing Tab', async ({ page }) => {
      await initBasicFlyoutMultilevel(page, { open: false }, { amount: 0 });
      await addButtonsBeforeAndAfterFlyout(page);
      await openFlyoutMultilevel(page);

      expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-MULTILEVEL');
      await expectDismissButtonToBeFocused(page);
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('BODY');
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-MULTILEVEL');
      await expectDismissButtonToBeFocused(page);
    });
  });

  skipInBrowsers(['firefox'], () => {
    test('should not allow focusing element behind of flyout when pressing Shift Tab', async ({ page }) => {
      await initBasicFlyoutMultilevel(page, { open: false }, { amount: 0 });
      await addButtonsBeforeAndAfterFlyout(page);
      await openFlyoutMultilevel(page);

      expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-MULTILEVEL');
      await expectDismissButtonToBeFocused(page);
      await page.keyboard.down('Shift');
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('BODY');
      await page.keyboard.down('Shift');
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-MULTILEVEL');
      await expectDismissButtonToBeFocused(page);
    });
  });

  test('should focus last focused element after flyout is dismissed', async ({ page }) => {
    await initBasicFlyoutMultilevel(page, { open: false }, {}, { markupBefore: '<button id="btn-open"></button>' });

    expect(await getFlyoutMultilevelDialogVisibility(page), 'initial').toBe('hidden');
    expect(await getActiveElementTagName(page)).toBe('BODY');

    await page.evaluate(() => {
      const flyout: any = document.querySelector('p-flyout-multilevel');
      document.getElementById('btn-open').addEventListener('click', () => {
        flyout.open = true;
      });
      flyout.addEventListener('dismiss', () => {
        flyout.open = false;
      });
    });

    page.locator('#btn-open').click();
    await waitForStencilLifecycle(page);

    expect(await getFlyoutMultilevelDialogVisibility(page)).toBe('visible');
    await expectDismissButtonToBeFocused(page);

    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);

    expect(await getFlyoutMultilevelDialogVisibility(page), 'after escape').toBe('hidden');
    expect(await getActiveElementId(page)).toBe('btn-open');
  });

  skipInBrowsers(['firefox'], () => {
    test('should not focus flyout content when not open', async ({ page }) => {
      await initBasicFlyoutMultilevel(page, { open: false }, {});
      await addButtonsBeforeAndAfterFlyout(page);
      expect(await getActiveElementTagName(page)).toBe('BODY');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-before');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-after');
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('BODY');
    });
  });

  test('should focus element after flyout when open accordion contains link but flyout is not open', async ({
    page,
  }) => {
    await initBasicFlyoutMultilevel(
      page,
      { open: false },
      {
        content: [
          `<p-accordion heading="Some Heading" open="true">
  <a id="inside" href="#inside-flyout">Some anchor inside flyout</a>
</p-accordion>`,
        ],
      }
    );
    await addButtonsBeforeAndAfterFlyout(page);
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-before');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-after');
  });
});

test.describe('scroll lock', () => {
  const bodyLockedStyle = 'overflow: hidden;';

  test('should prevent page from scrolling when open', async ({ page }) => {
    await initBasicFlyoutMultilevel(page, { open: false });
    expect(await getBodyStyle(page)).toBe(null);

    await openFlyoutMultilevel(page);
    expect(await getBodyStyle(page)).toBe(bodyLockedStyle);

    await setProperty(getHost(page), 'open', false);
    await waitForStencilLifecycle(page);
    expect(await getBodyStyle(page)).toBe('');
  });

  test('should prevent page from scrolling when initially open', async ({ page }) => {
    await initBasicFlyoutMultilevel(page, { open: true });
    expect(await getBodyStyle(page)).toBe(bodyLockedStyle);
  });

  test('should remove overflow hidden from body if unmounted', async ({ page }) => {
    await initBasicFlyoutMultilevel(page, { open: true });
    expect(await getBodyStyle(page)).toBe(bodyLockedStyle);

    await page.evaluate(() => {
      document.querySelector('p-flyout-multilevel').remove();
    });
    await waitForStencilLifecycle(page);

    expect(await getBodyStyle(page)).toBe('');
  });
});

test.describe('second level', () => {
  test('should have hidden second level when no activeIdentifier is set', async ({ page }) => {
    await initBasicFlyoutMultilevel(page, { open: false });
    await openFlyoutMultilevel(page);
    await expect(getFlyoutMultilevelItemScroller(page, 'item-1')).toHaveCSS('display', 'none');
    await expect(getFlyoutMultilevelItemScroller(page, 'item-2')).toHaveCSS('display', 'none');
    await expect(getFlyoutMultilevelItemScroller(page, 'item-3')).toHaveCSS('display', 'none');
  });

  test('should have correct second level open when activeIdentifier is set', async ({ page }) => {
    await initBasicFlyoutMultilevel(page, { open: false, activeIdentifier: 'item-2' });
    await openFlyoutMultilevel(page);
    await expect(getFlyoutMultilevelItemScroller(page, 'item-1')).toHaveCSS('display', 'none');
    await expect(getFlyoutMultilevelItemScroller(page, 'item-2')).toHaveCSS('display', 'grid');
    await expect(getFlyoutMultilevelItemScroller(page, 'item-3')).toHaveCSS('display', 'none');
  });

  test('should open correct second level when setting activeIdentifier', async ({ page }) => {
    await initBasicFlyoutMultilevel(page, { open: false });
    await openFlyoutMultilevel(page);
    const host = getHost(page);
    await expect(getFlyoutMultilevelItemScroller(page, 'item-1')).toHaveCSS('display', 'none');
    await expect(getFlyoutMultilevelItemScroller(page, 'item-2')).toHaveCSS('display', 'none');
    await expect(getFlyoutMultilevelItemScroller(page, 'item-3')).toHaveCSS('display', 'none');

    await setProperty(host, 'activeIdentifier', 'item-3');
    await waitForStencilLifecycle(page);

    await expect(getFlyoutMultilevelItemScroller(page, 'item-1')).toHaveCSS('display', 'none');
    await expect(getFlyoutMultilevelItemScroller(page, 'item-2')).toHaveCSS('display', 'none');
    await expect(getFlyoutMultilevelItemScroller(page, 'item-3')).toHaveCSS('display', 'grid');
  });

  skipInBrowsers(['webkit'], () => {
    test('should change to correct second level open when activeIdentifier is changed', async ({ page }) => {
      await initBasicFlyoutMultilevel(page, { open: false, activeIdentifier: 'item-2' });
      await openFlyoutMultilevel(page);
      const host = getHost(page);
      await expect(getFlyoutMultilevelItemScroller(page, 'item-1')).toHaveCSS('display', 'none');
      await expect(getFlyoutMultilevelItemScroller(page, 'item-2')).toHaveCSS('display', 'grid');
      await expect(getFlyoutMultilevelItemScroller(page, 'item-3')).toHaveCSS('display', 'none');

      await setProperty(host, 'activeIdentifier', 'item-3');
      await waitForStencilLifecycle(page);

      await expect(getFlyoutMultilevelItemScroller(page, 'item-1')).toHaveCSS('display', 'none');
      await expect(getFlyoutMultilevelItemScroller(page, 'item-2')).toHaveCSS('display', 'none');
      await expect(getFlyoutMultilevelItemScroller(page, 'item-3')).toHaveCSS('display', 'grid');
    });
  });

  skipInBrowsers(['webkit'], () => {
    test('should open second level of item when item is appended and activeIdentifier is set to this item', async ({
      page,
    }) => {
      await initBasicFlyoutMultilevel(page, { open: true });
      const host = getHost(page);

      await expect(getFlyoutMultilevelItemScroller(page, 'item-1')).toHaveCSS('display', 'none');
      await expect(getFlyoutMultilevelItemScroller(page, 'item-2')).toHaveCSS('display', 'none');
      await expect(getFlyoutMultilevelItemScroller(page, 'item-3')).toHaveCSS('display', 'none');
      await expect(getFlyoutMultilevelItem(page, 'item-4')).toHaveCount(0);

      await host.evaluate((el) => {
        const newItem = document.createElement('p-flyout-multilevel-item');
        newItem.innerHTML = '<a href="#some-anchor">Some anchor</a>';
        newItem.setAttribute('identifier', 'item-4');
        el.appendChild(newItem);
      });

      const item4 = getFlyoutMultilevelItem(page, 'item-4');
      expect(item4).toBeDefined();
      await expect(getFlyoutMultilevelItemScroller(page, 'item-1')).toHaveCSS('display', 'none');
      await expect(getFlyoutMultilevelItemScroller(page, 'item-2')).toHaveCSS('display', 'none');
      await expect(getFlyoutMultilevelItemScroller(page, 'item-3')).toHaveCSS('display', 'none');
      await expect(getFlyoutMultilevelItemScroller(page, 'item-4')).toHaveCSS('display', 'none');

      await setProperty(host, 'activeIdentifier', 'item-4');
      await waitForStencilLifecycle(page);
      await expect(getFlyoutMultilevelItemScroller(page, 'item-1')).toHaveCSS('display', 'none');
      await expect(getFlyoutMultilevelItemScroller(page, 'item-2')).toHaveCSS('display', 'none');
      await expect(getFlyoutMultilevelItemScroller(page, 'item-3')).toHaveCSS('display', 'none');
      await expect(getFlyoutMultilevelItemScroller(page, 'item-4')).toHaveCSS('display', 'grid');
    });
  });

  test('should close second level of active item when item is removed', async ({ page }) => {
    await initBasicFlyoutMultilevel(page, { open: true, activeIdentifier: 'item-3' });
    const host = getHost(page);

    await expect(getFlyoutMultilevelItemScroller(page, 'item-1')).toHaveCSS('display', 'none');
    await expect(getFlyoutMultilevelItemScroller(page, 'item-2')).toHaveCSS('display', 'none');
    await expect(getFlyoutMultilevelItemScroller(page, 'item-3')).toHaveCSS('display', 'grid');

    await host.evaluate((el) => {
      el.removeChild(el.lastElementChild);
    });
    await waitForStencilLifecycle(page);

    await expect(getFlyoutMultilevelItemScroller(page, 'item-1')).toHaveCSS('display', 'none');
    await expect(getFlyoutMultilevelItemScroller(page, 'item-2')).toHaveCSS('display', 'none');
    await expect(getFlyoutMultilevelItem(page, 'item-3')).toHaveCount(0);
  });

  skipInBrowsers(['webkit'], () => {
    test.fixme(
      'should show correct second level when flyout-multilevel-item with currently activeIdentifier is added',
      async ({ page }) => {
        await initBasicFlyoutMultilevel(page, { open: true, activeIdentifier: 'item-4' });
        const host = getHost(page);
        await waitForStencilLifecycle(page);

        await host.evaluate((el) => {
          const newItem = document.createElement('p-flyout-multilevel-item');
          newItem.setAttribute('identifier', 'item-4');
          el.appendChild(newItem);
        });

        await waitForStencilLifecycle(page);
        await expect(getFlyoutMultilevelItemScroller(page, 'item-1')).toHaveCSS('display', 'none');
        await expect(getFlyoutMultilevelItemScroller(page, 'item-2')).toHaveCSS('display', 'none');
        await expect(getFlyoutMultilevelItemScroller(page, 'item-3')).toHaveCSS('display', 'none');
        await expect(getFlyoutMultilevelItemScroller(page, 'item-4')).toHaveCSS('display', 'grid');
      }
    );
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initBasicFlyoutMultilevel(page, { open: true });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-flyout-multilevel'], 'componentDidLoad: p-flyout-multilevel').toBe(1);
    expect(status.componentDidLoad['p-flyout-multilevel-item'], 'componentDidLoad: p-flyout-multilevel-item').toBe(3);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(8); // 3 item buttons + 3 item back buttons + 1 root back button + 1 dismiss button
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(9);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(22);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after setting an activeIdentifier', async ({ page }) => {
    await initBasicFlyoutMultilevel(page, { open: true });
    const host = getHost(page);
    const statusBefore = await getLifecycleStatus(page);

    expect(statusBefore.componentDidLoad.all, 'componentDidLoad: all').toBe(22);
    expect(statusBefore.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);

    await setProperty(host, 'activeIdentifier', 'item-1');
    await waitForStencilLifecycle(page);

    const statusAfter = await getLifecycleStatus(page);

    expect(statusAfter.componentDidUpdate['p-flyout-multilevel'], 'componentDidUpdate: p-flyout-multilevel').toBe(2);
    expect(
      statusAfter.componentDidUpdate['p-flyout-multilevel-item'],
      'componentDidUpdate: p-flyout-multilevel-item'
    ).toBe(1);
    expect(statusAfter.componentDidUpdate['p-button-pure'], 'componentDidUpdate: p-button-pure').toBe(1);
    expect(statusAfter.componentDidUpdate.all, 'componentDidUpdate: all').toBe(4);
  });

  test('should work without unnecessary round trips after closing flyout', async ({ page }) => {
    await initBasicFlyoutMultilevel(page, { open: true });
    const statusBefore = await getLifecycleStatus(page);

    expect(statusBefore.componentDidLoad.all, 'componentDidLoad: all').toBe(22);
    expect(statusBefore.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);

    await dismissFlyoutMultilevel(page);

    const statusAfter = await getLifecycleStatus(page);

    expect(statusAfter.componentDidUpdate['p-flyout-multilevel'], 'componentDidUpdate: p-flyout-multilevel').toBe(1);
    expect(
      statusAfter.componentDidUpdate['p-flyout-multilevel-item'],
      'componentDidUpdate: p-flyout-multilevel-item'
    ).toBe(0);
    expect(statusAfter.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
