import { type Locator, type Page, expect, test } from '@playwright/test';
import type { SelectedAriaAttributes, SheetAriaAttribute } from '@porsche-design-system/components';
import {
  type Options,
  addEventListener,
  getActiveElementClassNameInShadowRoot,
  getActiveElementId,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  sleep,
  waitForStencilLifecycle,
} from '../helpers';

const CSS_TRANSITION_DURATION = 600; // Corresponds to durationLg

const getHost = (page: Page) => page.locator('p-sheet');
const getHeader = (page: Page) => page.locator('p-sheet slot[name="header"]');
const getDialog = (page: Page) => page.locator('p-sheet dialog');
const getDismissButton = (page: Page) => page.locator('p-sheet .dismiss');
const waitForSheetTransition = async () => sleep(CSS_TRANSITION_DURATION);

const initBasicSheet = (
  page: Page,
  opts?: {
    isOpen?: boolean;
    content?: string;
    aria?: SelectedAriaAttributes<SheetAriaAttribute>;
    hasSlottedHeader?: boolean;
    disableCloseButton?: boolean;
    markupBefore?: string;
    markupAfter?: string;
  },
  options?: Options
): Promise<void> => {
  const {
    isOpen = true,
    content = 'Some Content',
    aria,
    hasSlottedHeader,
    disableCloseButton,
    markupBefore,
    markupAfter,
  } = opts || {};

  const attributes = [isOpen && 'open', aria && `aria="${aria}"`, disableCloseButton && 'disable-close-button']
    .filter(Boolean)
    .join(' ');

  return setContentWithDesignSystem(
    page,
    `${markupBefore ? markupBefore : ''}<p-sheet ${attributes}>
  ${hasSlottedHeader ? '<div slot="header"><h2>Some Heading</h2><a href="#">some anchor</a></div>' : ''}
  ${content}
</p-sheet>${markupAfter ? markupAfter : ''}`,
    options
  );
};

const initAdvancedSheet = (page: Page): Promise<void> => {
  return setContentWithDesignSystem(
    page,
    `<p-sheet>
  <h2 slot="header">Some Heading</h2>
  Some Content
  <p-button id="btn-content-1">Content Button 1</p-button>
  <p-button id="btn-content-2">Content Button 2</p-button>

  <div>
    <p-button id="btn-footer-1">Footer Button 1</p-button>
    <p-button id="btn-footer-2">Footer Button 2</p-button>
  </div>
</p-sheet>`
  );
};

const openSheet = async (page: Page) => {
  await setProperty(getHost(page), 'open', true);
  await waitForStencilLifecycle(page);
};

const dismissSheet = async (page: Page) => {
  await setProperty(getHost(page), 'open', false);
  await waitForStencilLifecycle(page);
};

const getSheetVisibility = async (page: Page) => await getElementStyle(getDialog(page), 'visibility');

const addButtonsBeforeAndAfterSheet = (page: Page) =>
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
  expect(await getActiveElementTagNameInShadowRoot(host), failMessage).toBe('P-BUTTON');
  expect(await getActiveElementClassNameInShadowRoot(host), failMessage).toContain('dismiss');
};

const expectDialogAndThenDismissButtonToBeFocused = async (page: Page, failMessage?: string) => {
  // In order to assure that its correct we press tab to assure the next element will be the dismiss button
  await expect(await getActiveElementTagName(page)).toBe('P-SHEET');
  await page.keyboard.press('Tab');
  await expectDismissButtonToBeFocused(page);
};

const waitForSlotChange = () => new Promise((resolve) => setTimeout(resolve));

test('should render and be visible when open', async ({ page }) => {
  await initBasicSheet(page);

  expect(getDialog(page)).not.toBeNull();
  expect(await getSheetVisibility(page)).toBe('visible');
});

test('should not be visible when not open', async ({ page }) => {
  await initBasicSheet(page, { isOpen: false });

  expect(await getSheetVisibility(page)).toBe('hidden');
});

// TODO: fails in CI while it works locally
skipInBrowsers(['webkit'], () => {
  test('should be visible after opened', async ({ page }) => {
    await initBasicSheet(page, { isOpen: false });
    const host = getHost(page);
    await setProperty(host, 'open', true);

    expect(await getSheetVisibility(page)).toBe('visible');
  });
});

test.describe('can be dismissed', () => {
  let host: Locator;

  test.beforeEach(async ({ page }) => {
    await initBasicSheet(page);
    host = getHost(page);
    await addEventListener(host, 'dismiss');
  });

  test('should be closable via x button', async ({ page }) => {
    const dismissBtn = getDismissButton(page);
    expect(dismissBtn).not.toBeNull();

    const dismissBtnReal = page.locator('p-sheet .dismiss button');
    expect(await getAttribute(dismissBtnReal, 'type')).toBe('button');

    await dismissBtn.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });

  test('should be closable via esc key', async ({ page }) => {
    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });

  test('should be closable via backdrop', async ({ page }) => {
    await page.mouse.click(5, 5);

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(1);
  });

  test('should not be dismissed if mousedown inside sheet', async ({ page }) => {
    const viewportSize = page.viewportSize();
    await page.mouse.move(viewportSize.width / 2, viewportSize.height - 1);
    await page.mouse.down();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(0);

    await page.mouse.up();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(0);
  });

  test('should not be dismissed if dismissButton is set to false and ESC is pressed', async ({ page }) => {
    const host = getHost(page);
    await setProperty(host, 'dismissButton', false);
    await page.keyboard.press('Escape');

    expect((await getEventSummary(host, 'dismiss')).counter, 'after escape press').toBe(0);
  });

  skipInBrowsers(['webkit'], () => {
    test('should not be closable via backdrop when disableBackdropClick is set', async ({ page }) => {
      const host = getHost(page);
      await setProperty(host, 'disableBackdropClick', true);
      await page.mouse.click(5, 5);

      expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);
    });
  });

  test('should not bubble close event', async ({ page }) => {
    const body = page.locator('body');
    await addEventListener(body, 'dismiss');
    await page.mouse.click(5, 5);

    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
    expect((await getEventSummary(body, 'dismiss')).counter).toBe(0);
  });
});

skipInBrowsers(['firefox', 'webkit'], () => {
  test.describe('focus behavior', () => {
    test('should focus dismiss button after open', async ({ page }) => {
      await initAdvancedSheet(page);
      await openSheet(page);
      await expectDialogAndThenDismissButtonToBeFocused(page);
    });

    test('should focus dismiss button after open when there is no focusable content element', async ({ page }) => {
      await initBasicSheet(page, { isOpen: false });
      await openSheet(page);
      await expectDialogAndThenDismissButtonToBeFocused(page);
    });

    test('should focus dismiss button after open when there is a focusable content element', async ({ page }) => {
      await initBasicSheet(page, {
        isOpen: false,
        content: `<a href="https://porsche.com">Some link in content</a>`,
        aria: "{'aria-label': 'Some Heading'}",
      });
      await openSheet(page);
      await expectDialogAndThenDismissButtonToBeFocused(page);
    });

    test('should have correct focus order when there is a focusable content element and focusable slotted element in header', async ({
      page,
    }) => {
      await initBasicSheet(page, {
        isOpen: false,
        content: '<p-button>Some focusable button in content</p-button>',
        aria: "{'aria-label': 'Some Heading'}",
        hasSlottedHeader: true,
      });
      await openSheet(page);

      await expectDialogAndThenDismissButtonToBeFocused(page);
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('A'); // slotted header anchor
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('P-BUTTON'); // slotted content button
    });

    test('should not allow focusing element behind of sheet when pressing Tab', async ({ page }) => {
      await initBasicSheet(page, { isOpen: false, content: '<p-text>Some text content</p-text>' });
      await addButtonsBeforeAndAfterSheet(page);
      await openSheet(page);

      await expectDialogAndThenDismissButtonToBeFocused(page);

      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('BODY');

      await page.keyboard.press('Tab');
      await expectDismissButtonToBeFocused(page);
    });

    test('should not allow focusing element behind of sheet when pressing Shift Tab', async ({ page }) => {
      await initBasicSheet(page, { isOpen: false, content: '<p-text>Some text content</p-text>' });
      await addButtonsBeforeAndAfterSheet(page);
      await openSheet(page);

      await expectDialogAndThenDismissButtonToBeFocused(page);
      await page.keyboard.down('Shift');
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('BODY');
      await page.keyboard.press('Tab');
      await expectDismissButtonToBeFocused(page);
    });

    test('should focus last focused element after sheet is dismissed', async ({ page }) => {
      await setContentWithDesignSystem(
        page,
        `
      <button id="btn-open"></button>
      <p-sheet id="sheet" heading="Some Heading">
        Some Content
      </p-sheet>
      <script>
        const sheet = document.getElementById('sheet');
        document.getElementById('btn-open').addEventListener('click', () => {
          sheet.open = true;
        });
        sheet.addEventListener('dismiss', () => {
          sheet.open = false;
        });
      </script>`
      );

      expect(await getSheetVisibility(page), 'initial').toBe('hidden');
      expect(await getActiveElementTagName(page)).toBe('BODY');

      await page.locator('#btn-open').click();
      await waitForStencilLifecycle(page);

      expect(await getSheetVisibility(page)).toBe('visible');

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);
      // TODO: why is timeout needed? transition durations should be overwritten with 0s
      await sleep(CSS_TRANSITION_DURATION);

      // transition delay for visibility

      expect(await getSheetVisibility(page), 'after escape').toBe('hidden');
      expect(await getActiveElementId(page)).toBe('btn-open');
    });

    test('should focus element after sheet when open accordion contains link but sheet is not open', async ({
      page,
    }) => {
      await initBasicSheet(page, {
        isOpen: false,
        content: `<p-accordion heading="Some Heading" open="true">
  <a id="inside" href="#inside-sheet">Some anchor inside sheet</a>
</p-accordion>`,
        markupBefore: '<a id="before" href="#before-sheet">Some anchor before sheet</a>',
        markupAfter: '<a id="after" href="#after-sheet">Some anchor after sheet</a>',
      });

      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page), 'after 1st tab').toBe('before');

      await page.keyboard.press('Tab');
      await page.waitForFunction(() => document.activeElement === document.querySelector('#after'));
      expect(await getActiveElementId(page), 'after 2nd tab').toBe('after');
    });

    test.describe('after content change', () => {
      test('should not allow focusing element behind of sheet', async ({ page }) => {
        await initAdvancedSheet(page);
        await addButtonsBeforeAndAfterSheet(page);
        await openSheet(page);
        await expectDialogAndThenDismissButtonToBeFocused(page, 'initially');

        await page.keyboard.press('Tab');
        expect(await getActiveElementTagName(page)).toBe('P-BUTTON');

        const host = getHost(page);
        await host.evaluate((el) => {
          el.innerHTML = '';
        });
        await waitForSlotChange();

        await page.keyboard.press('Tab');
        await expectDismissButtonToBeFocused(page, 'after content change 1st tab');

        await page.keyboard.press('Tab');
        expect(await getActiveElementTagName(page)).toBe('BODY');

        await page.keyboard.press('Tab');
        await expectDismissButtonToBeFocused(page, 'after content change 3rd tab');
      });

      test('should correctly focus dismiss button from appended focusable element', async ({ page }) => {
        await initAdvancedSheet(page);
        await openSheet(page);

        const host = getHost(page);
        await host.evaluate((el) => {
          const button = document.createElement('button');
          button.innerText = 'New Button';
          button.id = 'btn-new';
          el.append(button);
        });
        await waitForSlotChange();
        await expectDialogAndThenDismissButtonToBeFocused(page, 'after button appended');

        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        expect(await getActiveElementId(page)).toBe('btn-footer-2');

        await page.keyboard.press('Tab');
        expect(await getActiveElementId(page)).toBe('btn-new');

        await page.keyboard.press('Tab');
        expect(await getActiveElementTagName(page)).toBe('BODY');
      });
    });

    test.describe('with disable-dismiss-button', () => {
      const initSheetOpts = { isOpen: false, dismissButton: true };

      test('should focus p-sheet when there is no focusable element', async ({ page }) => {
        await initBasicSheet(page, initSheetOpts);
        await openSheet(page);
        await expect(await getActiveElementTagName(page)).toBe('P-SHEET');
      });

      test('should not focus element behind sheet if sheet has no focusable element', async ({ page }) => {
        await initBasicSheet(page, initSheetOpts);
        await addButtonsBeforeAndAfterSheet(page);
        await openSheet(page);
        await expect(await getActiveElementTagName(page)).toBe('P-SHEET');

        // TODO: why is second tab still 'P-SHEET'?
        await page.keyboard.press('Tab');
        expect(await getActiveElementTagName(page)).toBe('P-SHEET');

        await page.keyboard.press('Tab');
        expect(await getActiveElementTagName(page)).toBe('BODY');
      });

      const otherFocusableElement = '<button type="button">Another focusable element</button>';

      for (const tagName of [
        'p-button',
        'p-button-pure',
        'p-link',
        'p-link-pure',
        'p-switch',
        'p-accordion',
        'input',
        'textarea',
        'select',
        'button',
        'a',
      ]) {
        test(`should focus first focusable element: ${tagName}`, async ({ page }) => {
          const attributes = tagName.includes('link') || tagName === 'a' ? ' href="#"' : '';
          await initBasicSheet(page, {
            ...initSheetOpts,
            content:
              (tagName === 'input'
                ? `<${tagName} type="text" />`
                : `<${tagName}${attributes}>Some element</${tagName}>`) + otherFocusableElement,
          });
          await openSheet(page);
          await expect(await getActiveElementTagName(page)).toBe('P-SHEET');
          await page.keyboard.press('Tab');

          // TODO: why do we need to tab twice?
          await expect(await getActiveElementTagName(page)).toBe('P-SHEET');
          await page.keyboard.press('Tab');

          expect(await getActiveElementTagName(page)).toBe(tagName.toUpperCase());

          await page.keyboard.press('Tab');
          expect(await getActiveElementTagName(page)).toBe('BUTTON');

          await page.keyboard.press('Tab');
          expect(await getActiveElementTagName(page)).toBe('BODY');
        });
      }
    });
  });
});

skipInBrowsers(['firefox', 'webkit'], () => {
  test.describe('can be controlled via keyboard', () => {
    test('should cycle tab events within sheet', async ({ page }) => {
      await initAdvancedSheet(page);
      await openSheet(page);
      await expectDialogAndThenDismissButtonToBeFocused(page, 'initially');

      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-content-1');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-content-2');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-footer-1');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-footer-2');
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('BODY');
    });

    test('should reverse cycle tab events within sheet', async ({ page }) => {
      await initAdvancedSheet(page);
      await openSheet(page);
      await expectDialogAndThenDismissButtonToBeFocused(page, 'after 1st tab');

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('BODY');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-footer-2');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-footer-1');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-content-2');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-content-1');
      await page.keyboard.press('Tab');
      await expectDismissButtonToBeFocused(page, 'finally');
      await page.keyboard.up('ShiftLeft');
    });
  });
});

test('should open sheet at scroll top position zero when its content is scrollable', async ({ page }) => {
  await initBasicSheet(page, { isOpen: true, content: '<div style="height: 150vh;"></div>' });

  const host = getHost(page);
  const hostScrollTop = await host.evaluate((el) => el.scrollTop);

  expect(hostScrollTop).toBe(0);
});

test.describe('scroll lock', () => {
  test('should prevent page from scrolling when open', async ({ page }) => {
    await initBasicSheet(page, { isOpen: false });
    await expect(page.locator('body')).toHaveCSS('overflow', 'visible');

    await openSheet(page);
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');

    await setProperty(getHost(page), 'open', false);
    await waitForStencilLifecycle(page);
    await expect(page.locator('body')).toHaveCSS('overflow', 'visible');
  });

  test('should prevent page from scrolling when initially open', async ({ page }) => {
    await initBasicSheet(page, { isOpen: true });
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  });

  test('should remove overflow hidden from body if unmounted', async ({ page }) => {
    await initBasicSheet(page, { isOpen: true });
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');

    await page.evaluate(() => {
      document.querySelector('p-sheet').remove();
    });
    await waitForStencilLifecycle(page);

    await expect(page.locator('body')).toHaveCSS('overflow', 'visible');
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initBasicSheet(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-sheet'], 'componentDidLoad: p-sheet').toBe(1);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(1); // includes p-icon

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initBasicSheet(page);
    const host = getHost(page);

    await setProperty(host, 'open', false);
    await waitForStencilLifecycle(page);

    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate['p-sheet'];
        },
        {
          message: 'componentDidUpdate: p-sheet',
        }
      )
      .toBe(1);

    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidLoad.all;
        },
        {
          message: 'componentDidLoad: all',
        }
      )
      .toBe(3);
    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate.all;
        },
        {
          message: 'componentDidUpdate: all',
        }
      )
      .toBe(1);
  });
});

test.describe('slotted header', () => {
  test('should set slotted header', async ({ page }) => {
    await initBasicSheet(page, { hasSlottedHeader: true });
    const header = getHeader(page);
    expect(header).toBeDefined();
    // TODO: not sure, if this is really ideal?
    await expect(getDialog(page)).toHaveAttribute('aria-label', 'Some Headingsome anchor');
  });

  test('should use aria text from aria prop instead of slotted header', async ({ page }) => {
    await initBasicSheet(page, {
      hasSlottedHeader: true,
      aria: "{'aria-label': 'A slightly more detailed label'}",
    });

    await expect(getDialog(page)).toHaveAttribute('aria-label', 'A slightly more detailed label');
  });
});

test.describe('events', () => {
  skipInBrowsers(['firefox', 'webkit']);
  test('should call motionVisibleEnd event when opening transition is finished', async ({ page }) => {
    await initBasicSheet(
      page,
      { isOpen: false },
      { injectIntoHead: '<style>:root { --p-transition-duration: unset; }</style>' }
    );
    const host = getHost(page);
    await waitForStencilLifecycle(page);
    await addEventListener(host, 'motionVisibleEnd');
    await addEventListener(host, 'motionHiddenEnd');

    expect((await getEventSummary(host, 'motionVisibleEnd')).counter).toBe(0);
    expect((await getEventSummary(host, 'motionHiddenEnd')).counter).toBe(0);

    await openSheet(page);
    await waitForSheetTransition();

    expect((await getEventSummary(host, 'motionVisibleEnd')).counter).toBe(1);
    expect((await getEventSummary(host, 'motionHiddenEnd')).counter).toBe(0);
  });
  test('should call motionHiddenEnd event when closing transition is finished', async ({ page }) => {
    await initBasicSheet(
      page,
      { isOpen: true },
      { injectIntoHead: '<style>:root { --p-transition-duration: unset; }</style>' }
    );
    const host = getHost(page);
    await waitForStencilLifecycle(page);
    await addEventListener(host, 'motionVisibleEnd');
    await addEventListener(host, 'motionHiddenEnd');

    expect((await getEventSummary(host, 'motionVisibleEnd')).counter).toBe(0);
    expect((await getEventSummary(host, 'motionHiddenEnd')).counter).toBe(0);

    await dismissSheet(page);
    await waitForSheetTransition();

    expect((await getEventSummary(host, 'motionVisibleEnd')).counter).toBe(0);
    expect((await getEventSummary(host, 'motionHiddenEnd')).counter).toBe(1);
  });
});
