import { Locator, type Page, expect, test } from '@playwright/test';
import type { ModalAriaAttribute, SelectedAriaAttributes } from '@porsche-design-system/components';
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

const getHost = (page: Page) => page.locator('p-modal');
const getScrollContainer = (page: Page) => page.locator('p-modal .scroller');
const getHeader = (page: Page) => page.locator('p-modal slot[name="header"]');
const getModal = (page: Page) => page.locator('p-modal dialog');
const getDismissButton = (page: Page) => page.locator('p-modal .dismiss');
const getFooter = (page: Page) => page.locator('p-modal slot[name="footer"]');
const getFooterBoxShadow = async (page: Page): Promise<string> => getElementStyle(getFooter(page), 'boxShadow');
const waitForModalTransition = async () => sleep(CSS_TRANSITION_DURATION);

const initBasicModal = (
  page: Page,
  opts?: {
    isOpen?: boolean;
    content?: string;
    aria?: SelectedAriaAttributes<ModalAriaAttribute>;
    hasSlottedHeader?: boolean;
    hasSlottedFooter?: boolean;
    dismissButton?: boolean;
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
    hasSlottedFooter,
    dismissButton = true,
    markupBefore,
    markupAfter,
  } = opts || {};

  const attributes = [
    isOpen && 'open',
    aria && `aria="${aria}"`,
    `dismiss-button="${dismissButton}"`,
  ]
    .filter(Boolean)
    .join(' ');

  return setContentWithDesignSystem(
    page,
    `${markupBefore ? markupBefore : ''}<p-modal ${attributes}>
  ${hasSlottedHeader ? '<div slot="header"><h2>Some Heading <a href="https://porsche.com">Some link</a></h2> <p>Some header content</p></div>' : ''}
  ${content}
  ${hasSlottedFooter ? '<div slot="footer">Some Footer</div>' : ''}
</p-modal>${markupAfter ? markupAfter : ''}`,
    options
  );
};

const initAdvancedModal = (page: Page): Promise<void> => {
  return setContentWithDesignSystem(
    page,
    `<p-modal heading="Some Heading">
  Some Content
  <p-button id="btn-content-1">Content Button 1</p-button>
  <p-button id="btn-content-2">Content Button 2</p-button>

  <div>
    <p-button id="btn-footer-1">Footer Button 1</p-button>
    <p-button id="btn-footer-2">Footer Button 2</p-button>
  </div>
</p-modal>`
  );
};

const openModal = async (page: Page) => {
  await setProperty(getHost(page), 'open', true);
  await waitForStencilLifecycle(page);
};

const dismissModal = async (page: Page) => {
  await setProperty(getHost(page), 'open', false);
  await waitForStencilLifecycle(page);
};

const getModalVisibility = async (page: Page) => await getElementStyle(getModal(page), 'visibility');

const addButtonsBeforeAndAfterModal = (page: Page) =>
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
  await expect(await getActiveElementTagName(page)).toBe('P-MODAL');
  await page.keyboard.press('Tab');
  await expectDismissButtonToBeFocused(page);
};

const waitForSlotChange = () => new Promise((resolve) => setTimeout(resolve));

test('should render and be visible when open', async ({ page }) => {
  await initBasicModal(page);
  console.log(getModal(page));
  expect(getModal(page)).not.toBeNull();
  expect(await getModalVisibility(page)).toBe('visible');
});

test('should not be visible when not open', async ({ page }) => {
  await initBasicModal(page, { isOpen: false });
  expect(await getModalVisibility(page)).toBe('hidden');
});

test('should be visible after opened', async ({ page }) => {
  await initBasicModal(page, { isOpen: false });
  const host = getHost(page);
  await setProperty(host, 'open', true);
  await waitForStencilLifecycle(page);

  expect(await getModalVisibility(page)).toBe('visible');
});

test.describe('can be dismissed', () => {
  let host: Locator;

  test.beforeEach(async ({ page }) => {
    await initBasicModal(page);
    host = getHost(page);
    await addEventListener(host, 'dismiss');
  });

  test('should be closable via x button', async ({ page }) => {
    const dismissBtn = getDismissButton(page);
    expect(dismissBtn).not.toBeNull();

    const dismissBtnReal = page.locator('p-modal .dismiss button');
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

  test('should not be dismissed if mousedown inside modal', async ({ page }) => {
    const viewportSize = page.viewportSize();
    await page.mouse.move(viewportSize.width / 2, viewportSize.height / 2);
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
    await addEventListener(body, 'close');
    await page.mouse.click(5, 5);

    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
    expect((await getEventSummary(body, 'dismiss')).counter).toBe(0);
  });

});

skipInBrowsers(['firefox', 'webkit'], () => {
  test.describe('focus behavior', () => {
    test('should focus dismiss button after open', async ({ page }) => {
      await initAdvancedModal(page);
      await openModal(page);
      await expectDialogAndThenDismissButtonToBeFocused(page);
    });

    test('should focus dismiss button after open when there is no focusable content element', async ({ page }) => {
      await initBasicModal(page, { isOpen: false });
      await openModal(page);
      await expectDialogAndThenDismissButtonToBeFocused(page);
    });

    test('should focus dismiss button after open when there is a focusable content element', async ({ page }) => {
      await initBasicModal(page, {
        isOpen: false,
        content: `<a href="https://porsche.com">Some link in content</a>`,
        aria: "{'aria-label': 'Some Heading'}",
      });
      await openModal(page);
      await expectDialogAndThenDismissButtonToBeFocused(page);
    });

    test('should have correct focus order when there is a focusable content element and focusable slotted element in header', async ({
      page,
    }) => {
      await initBasicModal(page, {
        isOpen: false,
        content: `<p-button>Some focusable button in content</p-button>`,
        aria: "{'aria-label': 'Some Heading'}",
        hasSlottedHeader: true,
      });
      await openModal(page);

      await expectDialogAndThenDismissButtonToBeFocused(page);
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('A'); // slotted header anchor
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('P-BUTTON'); // slotted content button
    });

    test('should not allow focusing element behind of modal when pressing Tab', async ({ page }) => {
      await initBasicModal(page, { isOpen: false, content: '<p-text>Some text content</p-text>' });
      await addButtonsBeforeAndAfterModal(page);
      await openModal(page);

      await expectDialogAndThenDismissButtonToBeFocused(page);

      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('BODY');

      await page.keyboard.press('Tab');
      await expectDismissButtonToBeFocused(page);
    });

    test('should not allow focusing element behind of modal when pressing Shift Tab', async ({ page }) => {
      await initBasicModal(page, { isOpen: false, content: '<p-text>Some text content</p-text>' });
      await addButtonsBeforeAndAfterModal(page);
      await openModal(page);

      await expectDialogAndThenDismissButtonToBeFocused(page);
      await page.keyboard.down('Shift');
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('BODY');
      await page.keyboard.press('Tab');
      await expectDismissButtonToBeFocused(page);
    });

    test('should focus last focused element after modal is dismissed', async ({ page }) => {
      await setContentWithDesignSystem(
        page,
        `
      <button id="btn-open"></button>
      <p-modal id="modal">
        <h2 slot="header">Some Heading</h2>
        Some Content
      </p-modal>
      <script>
        const modal = document.getElementById('modal');
        document.getElementById('btn-open').addEventListener('click', () => {
          modal.open = true;
        });
        modal.addEventListener('close', () => {
          modal.open = false;
        });
      </script>`
      );

      expect(await getModalVisibility(page), 'initial').toBe('hidden');
      expect(await getActiveElementTagName(page)).toBe('BODY');

      await page.locator('#btn-open').click();
      await waitForStencilLifecycle(page);

      expect(await getModalVisibility(page)).toBe('visible');

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);
      // TODO: why is timeout needed? transition durations should be overwritten with 0s
      await sleep(CSS_TRANSITION_DURATION);

      // transition delay for visibility

      expect(await getModalVisibility(page), 'after escape').toBe('hidden');
      expect(await getActiveElementId(page)).toBe('btn-open');
    });

    test('should focus element after modal when open accordion contains link but modal is not open', async ({
      page,
    }) => {
      await initBasicModal(page, {
        isOpen: false,
        content: `<p-accordion heading="Some Heading" open="true">
  <a id="inside" href="#inside-modal">Some anchor inside modal</a>
</p-accordion>`,
        markupBefore: '<a id="before" href="#before-modal">Some anchor before modal</a>',
        markupAfter: '<a id="after" href="#after-modal">Some anchor after modal</a>',
      });

      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page), 'after 1st tab').toBe('before');

      await page.keyboard.press('Tab');
      await page.waitForFunction(() => document.activeElement === document.querySelector('#after'));
      expect(await getActiveElementId(page), 'after 2nd tab').toBe('after');
    });

    test.describe('after content change', () => {
      test('should not allow focusing element behind of modal', async ({ page }) => {
        await initAdvancedModal(page);
        await addButtonsBeforeAndAfterModal(page);
        await openModal(page);
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
        await initAdvancedModal(page);
        await openModal(page);

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

    test.describe('with dismissButton=false', () => {
      const initModalOpts = { isOpen: false, dismissButton: false };

      test('should focus p-modal when there is no focusable element', async ({ page }) => {
        await initBasicModal(page, initModalOpts);
        await openModal(page);
        await expect(await getActiveElementTagName(page)).toBe('P-MODAL');
      });

      test('should not focus element behind modal if modal has no focusable element', async ({ page }) => {
        await initBasicModal(page, initModalOpts);
        await addButtonsBeforeAndAfterModal(page);
        await openModal(page);
        await expect(await getActiveElementTagName(page)).toBe('P-MODAL');

        await page.keyboard.press('Tab');
        expect(await getActiveElementTagName(page)).toBe('BODY');

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
          await initBasicModal(page, {
            ...initModalOpts,
            content:
              (tagName === 'input'
                ? `<${tagName} type="text" />`
                : `<${tagName}${attributes}>Some element</${tagName}>`) + otherFocusableElement,
          });
          await openModal(page);
          await expect(await getActiveElementTagName(page)).toBe('P-MODAL');
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
    test('should cycle tab events within modal', async ({ page }) => {
      await initAdvancedModal(page);
      await openModal(page);
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

    test('should reverse cycle tab events within modal', async ({ page }) => {
      await initAdvancedModal(page);
      await openModal(page);
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

test('should open modal at scroll top position zero when its content is scrollable', async ({ page }) => {
  await initBasicModal(page, { isOpen: true, content: '<div style="height: 150vh;"></div>' });

  const host = getHost(page);
  const hostScrollTop = await host.evaluate((el) => el.scrollTop);

  expect(hostScrollTop).toBe(0);
});

test.describe('scroll lock', () => {
  test('should prevent page from scrolling when open', async ({ page }) => {
    await initBasicModal(page, { isOpen: false });
    await expect(page.locator('body')).toHaveCSS('overflow', 'visible');

    await openModal(page);
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');

    await setProperty(getHost(page), 'open', false);
    await waitForStencilLifecycle(page);
    await expect(page.locator('body')).toHaveCSS('overflow', 'visible');
  });

  test('should prevent page from scrolling when initially open', async ({ page }) => {
    await initBasicModal(page, { isOpen: true });
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
  });

  test('should remove overflow hidden from body if unmounted', async ({ page }) => {
    await initBasicModal(page, { isOpen: true });
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');

    await page.evaluate(() => {
      document.querySelector('p-modal').remove();
    });
    await waitForStencilLifecycle(page);

    await expect(page.locator('body')).toHaveCSS('overflow', 'visible');
  });
});

test.describe('sticky footer', () => {
  const expectedBoxShadow = 'rgba(204, 204, 204, 0.35) 0px -5px 10px 0px';
  test('should not show box-shadow initially when not scrollable', async ({ page }) => {
    await initBasicModal(page, { isOpen: true, content: '<div>Some Content</div>', hasSlottedFooter: true });

    expect(await getFooterBoxShadow(page)).toBe('none');
  });

  test('should show box-shadow initially when scrollable', async ({ page }) => {
    await initBasicModal(page, {
      isOpen: true,
      content: '<div style="height: 110vh">Some Content</div>',
      hasSlottedFooter: true,
    });

    expect(await getFooterBoxShadow(page)).toBe(expectedBoxShadow);
  });

  test('should remove box-shadow when scrolled to bottom', async ({ page }) => {
    await initBasicModal(page, {
      isOpen: true,
      content: '<div style="height: 110vh">Some Content</div>',
      hasSlottedFooter: true,
    });

    expect(await getFooterBoxShadow(page)).toBe(expectedBoxShadow);

    const scrollContainer = getScrollContainer(page);
    await scrollContainer.evaluate((el) => {
      el.scrollBy({ top: 1000 });
    });

    const footerLocator = getFooter(page);
    await page.waitForFunction(
      (el) => getComputedStyle(el).boxShadow === 'none',
      await footerLocator.evaluateHandle((el) => el)
    );
    expect(await getFooterBoxShadow(page)).toBe('none');
  });

  skipInBrowsers(['webkit'], () => {
    test('should show box-shadow again when scrolling up from bottom', async ({ page }) => {
      await initBasicModal(page, {
        isOpen: true,
        content: '<div style="height: 110vh">Some Content</div>',
        hasSlottedFooter: true,
      });

      const footer = page.locator('p-modal slot[name="footer"]');

      const scrollContainer = getScrollContainer(page);
      await scrollContainer.evaluate((el) => {
        el.scrollBy({ top: 1000 }); // should be bottom
      });

      await expect(footer).toHaveCSS('box-shadow', 'none');

      await scrollContainer.evaluate((el) => {
        el.scrollBy({ top: -500 });
      });

      await expect(footer).toHaveCSS('box-shadow', expectedBoxShadow);
    });
  });

  test('should show box-shadow when slot changes', async ({ page }) => {
    await initBasicModal(page, {
      isOpen: true,
      hasSlottedFooter: true,
    });

    const host = getHost(page);
    const footer = getFooter(page);
    await footer.evaluate((el) => (el.style.visibility = 'hidden'));

    await expect(footer).toBeHidden();
    await expect(footer).toHaveCSS('box-shadow', 'none');

    await host.evaluate((el) => {
      const content = document.createElement('div');
      content.style.height = '100vh';
      el.appendChild(content);
    });
    await footer.evaluate((el) => (el.style.visibility = 'visible'));

    await waitForStencilLifecycle(page);

    await expect(footer).toBeVisible();
    await expect(footer).toHaveCSS('box-shadow', expectedBoxShadow);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initBasicModal(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-modal'], 'componentDidLoad: p-modal').toBe(1);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(1); // includes p-icon

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initBasicModal(page);
    const host = getHost(page);

    await setProperty(host, 'open', false);
    await waitForStencilLifecycle(page);

    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate['p-modal'];
        },
        {
          message: 'componentDidUpdate: p-modal',
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

  test('should work without unnecessary round trips after deeply nested slot content change', async ({ page }) => {
    await initBasicModal(page, { hasSlottedFooter: true });
    const host = getHost(page);
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-modal'], 'componentDidLoad: p-modal').toBe(1);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(1); // includes p-icon

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);

    await host.evaluate((el) => {
      const header = el.querySelector('[slot="footer"]');
      header.innerHTML = `<p>Some new footer content</p>`;
    });
    await waitForStencilLifecycle(page);

    const statusAfter = await getLifecycleStatus(page);

    expect(statusAfter.componentDidUpdate['p-modal'], 'componentDidUpdate: p-modal').toBe(0);
    expect(statusAfter.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should update when adding named slot', async ({ page }) => {
    await initBasicModal(page);
    const host = getHost(page);

    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidLoad['p-modal'];
        },
        {
          message: 'componentDidLoad: p-modal',
        }
      )
      .toBe(1);
    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidLoad['p-button'];
        },
        {
          message: 'componentDidLoad: p-button',
        }
      )
      .toBe(1); // includes p-icon

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
      .toBe(0);

    await host.evaluate((el) => {
      const header = document.createElement('div');
      header.slot = 'header';
      header.innerHTML = `<h2>Some header content</h2>`;
      el.appendChild(header);
    });
    await waitForStencilLifecycle(page);

    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate['p-modal'];
        },
        {
          message: 'componentDidUpdate: p-modal',
        }
      )
      .toBe(1);
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
    await initBasicModal(page, { hasSlottedHeader: true });
    const header = getHeader(page);
    expect(header).toBeDefined();
    await expect(getModal(page)).toHaveAttribute('aria-label', 'Some Heading Some link Some header content');
  });

  test('should use aria text from aria prop instead of slotted header', async ({ page }) => {
    await initBasicModal(page, { hasSlottedHeader: true, aria: "{'aria-label': 'A slightly more detailed label'}" });

    await expect(getModal(page)).toHaveAttribute('aria-label', 'A slightly more detailed label');
  });
});

test.describe('after dynamic slot change', () => {
  test('should show header when header slot is added dynamically', async ({ page }) => {
    await initBasicModal(page);
    const host = getHost(page);

    const headerText = 'Some slotted header content';

    await expect(page.getByText(headerText)).not.toBeVisible();

    await host.evaluate((el, headerText) => {
      const header = document.createElement('div');
      header.slot = 'header';
      header.innerHTML = `<h2>${headerText}</h2>`;
      el.appendChild(header);
    }, headerText);

    await waitForStencilLifecycle(page);

    await expect(page.getByText(headerText)).toBeVisible();
    await expect(getModal(page)).toHaveAttribute('aria-label', headerText);
  });

  test('should show footer with shadow when footer slot is added dynamically', async ({ page }) => {
    await initBasicModal(page);
    const host = getHost(page);
    const footerText = 'Some slotted footer content';

    await expect(page.getByText(footerText)).not.toBeVisible();

    await host.evaluate((el, footerText) => {
      el.innerHTML = `<div style="height: 110vh">Some content</div><div slot="footer"><p>${footerText}</p></div>`;
    }, footerText);

    await waitForStencilLifecycle(page);

    await expect(page.getByText(footerText)).toBeVisible();
    expect(await getFooterBoxShadow(page)).toBe('rgba(204, 204, 204, 0.35) 0px -5px 10px 0px');
  });
});

test.describe('events', () => {
  skipInBrowsers(['firefox', 'webkit']);
  test('should call motionVisibleEnd event when opening transition is finished', async ({ page }) => {
    await initBasicModal(
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

    await openModal(page);
    await waitForModalTransition();

    expect((await getEventSummary(host, 'motionVisibleEnd')).counter).toBe(1);
    expect((await getEventSummary(host, 'motionHiddenEnd')).counter).toBe(0);
  });
  test('should call motionHiddenEnd event when closing transition is finished', async ({ page }) => {
    await initBasicModal(
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

    await dismissModal(page);
    await waitForModalTransition();

    expect((await getEventSummary(host, 'motionVisibleEnd')).counter).toBe(0);
    expect((await getEventSummary(host, 'motionHiddenEnd')).counter).toBe(1);
  });
});
