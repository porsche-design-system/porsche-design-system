import type { ElementHandle, Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  addEventListener,
  getActiveElementClassNameInShadowRoot,
  getActiveElementId,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  sleep,
  waitForStencilLifecycle,
} from '../helpers';
import type { ModalAriaAttribute, SelectedAriaAttributes } from '@porsche-design-system/components';

const CSS_TRANSITION_DURATION = 600;

const getHost = (page: Page) => page.$('p-modal');
const getScrollContainer = (page: Page) => page.$('p-modal .scroller');
const getHeading = (page: Page) => page.$('p-modal slot[name="heading"]');
const getModal = (page: Page) => page.$('p-modal .root');
const getDismissButton = (page: Page) => page.$('p-modal p-button-pure.dismiss');
const getFooter = (page: Page) => page.$('p-modal slot[name="footer"]');
const getFooterBoxShadow = async (page: Page): Promise<string> => getElementStyle(await getFooter(page), 'boxShadow');
const getBodyStyle = async (page: Page) => getAttribute(await page.$('body'), 'style');

const initBasicModal = (
  page: Page,
  opts?: {
    isOpen?: boolean;
    content?: string;
    heading?: string;
    aria?: SelectedAriaAttributes<ModalAriaAttribute>;
    hasSlottedHeading?: boolean;
    hasSlottedFooter?: boolean;
    disableCloseButton?: boolean;
    markupBefore?: string;
    markupAfter?: string;
  }
): Promise<void> => {
  const {
    isOpen = true,
    content = 'Some Content',
    heading = 'Some Heading',
    aria,
    hasSlottedHeading,
    hasSlottedFooter,
    disableCloseButton,
    markupBefore,
    markupAfter,
  } = opts || {};

  const attributes = [
    !hasSlottedHeading && `heading="${heading}"`,
    isOpen && 'open',
    aria && `aria="${aria}"`,
    disableCloseButton && 'disable-close-button',
  ]
    .filter(Boolean)
    .join(' ');

  return setContentWithDesignSystem(
    page,
    `${markupBefore ? markupBefore : ''}<p-modal ${attributes}>
  ${hasSlottedHeading ? '<div slot="heading">Some Heading<a href="https://porsche.com">Some link</a></div>' : ''}
  ${content}
  ${hasSlottedFooter ? '<div slot="footer">Some Footer</div>' : ''}
</p-modal>${markupAfter ? markupAfter : ''}`
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
  await setProperty(await getHost(page), 'open', true);
  await waitForStencilLifecycle(page);
};

const dismissModal = async (page: Page) => {
  await setProperty(await getHost(page), 'open', false);
  await waitForStencilLifecycle(page);
};

const getModalVisibility = async (page: Page) => await getElementStyle(await getModal(page), 'visibility');

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

const expectDialogToBeFocused = async (page: Page, failMessage?: string) => {
  const host = await getHost(page);
  expect(await getActiveElementTagNameInShadowRoot(host), failMessage).toBe('DIALOG');
};

const expectDismissButtonToBeFocused = async (page: Page, failMessage?: string) => {
  const host = await getHost(page);
  expect(await getActiveElementTagNameInShadowRoot(host), failMessage).toBe('P-BUTTON-PURE');
  expect(await getActiveElementClassNameInShadowRoot(host), failMessage).toContain('dismiss');
};

const waitForSlotChange = () => new Promise((resolve) => setTimeout(resolve));

test('should render and be visible when open', async ({ page }) => {
  await initBasicModal(page);
  expect(await getModal(page)).not.toBeNull();
  expect(await getModalVisibility(page)).toBe('visible');
});

test('should not be visible when not open', async ({ page }) => {
  await initBasicModal(page, { isOpen: false });

  expect(await getModalVisibility(page)).toBe('hidden');
});

test.describe('can be dismissed', () => {
  let host: ElementHandle;

  test.beforeEach(async ({ page }) => {
    await initBasicModal(page);
    host = await getHost(page);
    await addEventListener(host, 'close');
  });

  test('should be closable via x button', async ({ page }) => {
    const dismissBtn = await getDismissButton(page);
    expect(dismissBtn).not.toBeNull();

    const dismissBtnReal = await page.$('p-modal p-button-pure.dismiss button');
    expect(await getAttribute(dismissBtnReal, 'type')).toBe('button');

    await dismissBtn.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'close')).counter).toBe(1);
  });

  test('should be closable via esc key', async ({ page }) => {
    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'close')).counter).toBe(1);
  });

  test('should be closable via backdrop', async ({ page }) => {
    await page.mouse.click(5, 5);

    expect((await getEventSummary(host, 'close')).counter, 'after mouse down').toBe(1);
  });

  test('should not be dismissed if mousedown inside modal', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await page.mouse.move(400, 300);
    await page.mouse.down();

    expect((await getEventSummary(host, 'close')).counter, 'after mouse down').toBe(0);

    await page.mouse.up();

    expect((await getEventSummary(host, 'close')).counter, 'after mouse up').toBe(0);
  });

  test.fixme('should not be dismissed if mousedown inside modal and mouseup inside backdrop', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await page.mouse.move(400, 300);
    await page.mouse.down();

    expect((await getEventSummary(host, 'close')).counter, 'after mouse down').toBe(0);

    await page.mouse.move(200, 150);
    await page.mouse.up();

    expect((await getEventSummary(host, 'close')).counter, 'after mouse up').toBe(0);
  });

  skipInBrowsers(['webkit'], () => {
    test('should not be closable via backdrop when disableBackdropClick is set', async ({ page }) => {
      const host = await getHost(page);
      await setProperty(host, 'disableBackdropClick', true);

      await page.mouse.move(5, 5);
      await page.mouse.down();

      expect((await getEventSummary(host, 'close')).counter).toBe(0);
    });
  });

  test('should not bubble close event', async ({ page }) => {
    const body = await page.$('body');
    await addEventListener(body, 'close');
    await page.mouse.click(5, 5);

    expect((await getEventSummary(host, 'close')).counter).toBe(1);
    expect((await getEventSummary(body, 'close')).counter).toBe(0);
  });

  test('should emit both close and dismiss event', async ({ page }) => {
    // close handler in applied via beforeEach
    await addEventListener(host, 'dismiss');
    expect((await getEventSummary(host, 'close')).counter).toBe(0);
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);

    const dismissBtn = await getDismissButton(page);
    await dismissBtn.click();
    expect((await getEventSummary(host, 'close')).counter).toBe(1);
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });
});

skipInBrowsers(['firefox', 'webkit'], () => {
  test.describe('focus behavior', () => {
    test('should focus dismiss button after open', async ({ page }) => {
      await initAdvancedModal(page);
      await openModal(page);
      await expectDismissButtonToBeFocused(page);
    });

    test('should focus dismiss button after open when there is no focusable content element', async ({ page }) => {
      await initBasicModal(page, { isOpen: false });
      await openModal(page);
      await expectDismissButtonToBeFocused(page);
    });

    test('should focus dismiss button after open when there is a focusable content element', async ({ page }) => {
      await initBasicModal(page, {
        isOpen: false,
        content: `<a href="https://porsche.com">Some link in content</a>`,
        aria: "{'aria-label': 'Some Heading'}",
      });
      await openModal(page);
      await expectDismissButtonToBeFocused(page);
    });

    test('should have correct focus order when there is a focusable content element and focusable slotted element in header', async ({
      page,
    }) => {
      await initBasicModal(page, {
        isOpen: false,
        content: `<p-button>Some focusable button in content</p-button>`,
        aria: "{'aria-label': 'Some Heading'}",
        hasSlottedHeading: true,
      });
      await openModal(page);

      await expectDismissButtonToBeFocused(page);
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('A'); // slotted header anchor
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('P-BUTTON'); // slotted content button
    });

    test('should not allow focusing element behind of modal when pressing Tab', async ({ page }) => {
      await initBasicModal(page, { isOpen: false, content: '<p-text>Some text content</p-text>' });
      await addButtonsBeforeAndAfterModal(page);
      await openModal(page);

      await expectDismissButtonToBeFocused(page);

      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('BODY');

      await page.keyboard.press('Tab');
      await expectDismissButtonToBeFocused(page);
    });

    test('should not allow focusing element behind of modal when pressing Shift Tab', async ({ page }) => {
      await initBasicModal(page, { isOpen: false, content: '<p-text>Some text content</p-text>' });
      await addButtonsBeforeAndAfterModal(page);
      await openModal(page);

      await expectDismissButtonToBeFocused(page);
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
      <p-modal id="modal" heading="Some Heading">
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

      await (await page.$('#btn-open')).click();
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
        await expectDismissButtonToBeFocused(page, 'initially');

        await page.keyboard.press('Tab');
        expect(await getActiveElementTagName(page)).toBe('P-BUTTON');

        const host = await getHost(page);
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

        const host = await getHost(page);
        await host.evaluate((el) => {
          const button = document.createElement('button');
          button.innerText = 'New Button';
          button.id = 'btn-new';
          el.append(button);
        });
        await waitForSlotChange();
        await expectDismissButtonToBeFocused(page, 'after button appended');

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

    test.describe('with disable-close-button', () => {
      const initModalOpts = { isOpen: false, disableCloseButton: true };

      test('should focus body when there is no focusable element', async ({ page }) => {
        await initBasicModal(page, initModalOpts);
        await openModal(page);
        await expectDialogToBeFocused(page);
      });

      test('should not focus element behind modal if modal has no focusable element', async ({ page }) => {
        await initBasicModal(page, initModalOpts);
        await addButtonsBeforeAndAfterModal(page);
        await openModal(page);
        await expectDialogToBeFocused(page);

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
        'p-link-social',
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
      await expectDismissButtonToBeFocused(page, 'initially');

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
      await expectDismissButtonToBeFocused(page, 'after 1st tab');

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

  const host = await getHost(page);
  const hostScrollTop = await host.evaluate((el) => el.scrollTop);

  expect(hostScrollTop).toBe(0);
});

test.describe('scroll lock', () => {
  const bodyLockedStyle = 'overflow: hidden;';

  test('should prevent page from scrolling when open', async ({ page }) => {
    await initBasicModal(page, { isOpen: false });
    expect(await getBodyStyle(page)).toBe(null);

    await openModal(page);
    expect(await getBodyStyle(page)).toBe(bodyLockedStyle);

    await setProperty(await getHost(page), 'open', false);
    await waitForStencilLifecycle(page);
    expect(await getBodyStyle(page)).toBe('');
  });

  test('should prevent page from scrolling when initially open', async ({ page }) => {
    await initBasicModal(page, { isOpen: true });
    expect(await getBodyStyle(page)).toBe(bodyLockedStyle);
  });

  test('should remove overflow hidden from body if unmounted', async ({ page }) => {
    await initBasicModal(page, { isOpen: true });
    expect(await getBodyStyle(page)).toBe(bodyLockedStyle);

    await page.evaluate(() => {
      document.querySelector('p-modal').remove();
    });
    await waitForStencilLifecycle(page);

    expect(await getBodyStyle(page)).toBe('');
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

    const scrollContainer = await getScrollContainer(page);
    await scrollContainer.evaluate((el) => {
      el.scrollBy({ top: 1000 });
    });

    const footer = await getFooter(page);
    await page.waitForFunction((el) => getComputedStyle(el).boxShadow === 'none', footer);
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

      const scrollContainer = await getScrollContainer(page);
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

    const host = await getHost(page);
    const footer = await getFooter(page);
    await footer.evaluate((el) => (el.style.visibility = 'hidden'));

    expect(await getElementStyle(footer, 'visibility')).toBe('hidden');
    expect(await getFooterBoxShadow(page)).toBe('none');

    await host.evaluate((el) => {
      el.innerHTML = '<div style="height: 110vh">Some Content</div>';
    });
    await footer.evaluate((el) => (el.style.visibility = 'visible'));

    await waitForStencilLifecycle(page);

    expect(await getElementStyle(footer, 'visibility')).toBe('visible');
    expect(await getFooterBoxShadow(page)).toBe(expectedBoxShadow);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initBasicModal(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-modal'], 'componentDidLoad: p-modal').toBe(1);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1); // includes p-icon

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initBasicModal(page);
    const host = await getHost(page);

    await setProperty(host, 'open', false);
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-modal'], 'componentDidUpdate: p-modal').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

test.describe('slotted heading', () => {
  test('should set slotted heading', async ({ page }) => {
    await initBasicModal(page, { hasSlottedHeading: true });
    const heading = await getHeading(page);
    expect(heading).toBeDefined();
  });

  test('should overwrite slotted heading when setting heading prop', async ({ page }) => {
    await initBasicModal(page, { hasSlottedHeading: true });
    const host = await getHost(page);

    await setProperty(host, 'heading', 'Some Heading');
    await waitForStencilLifecycle(page);

    expect(page.locator('p-modal h2')).toBeDefined();
    expect(await getHeading(page)).toBeNull();
    expect(page.getByText('Some Heading')).toBeDefined();
  });
});
