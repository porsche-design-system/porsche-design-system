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
  getHTMLAttributes,
  getLifecycleStatus,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  sleep,
  waitForStencilLifecycle,
} from '../helpers';
import { Components } from '@porsche-design-system/components';

const CSS_TRANSITION_DURATION = 600;
const flyoutMinWidth = 320;

const getHost = (page: Page) => page.$('p-flyout');
const getFlyout = (page: Page) => page.$('p-flyout dialog');
const getHeader = (page: Page) => page.$('p-flyout .header');
const getFooter = (page: Page) => page.$('p-flyout .footer');
const getFlyoutDismissButton = (page: Page) => page.$('p-flyout p-button-pure.dismiss');
const getFlyoutDismissButtonReal = (page: Page) => page.$('p-flyout p-button-pure.dismiss button');
const getBodyStyle = async (page: Page) => getAttribute(await page.$('body'), 'style');
const getFlyoutVisibility = async (page: Page) => await getElementStyle(await getFlyout(page), 'visibility');
const waitForFlyoutTransition = async () => sleep(CSS_TRANSITION_DURATION);
const waitForSlotChange = () => sleep();

const initBasicFlyout = (
  page: Page,
  flyoutProps: Components.PFlyout = {
    open: true,
  },
  flyoutSlots?: {
    content?: string;
    header?: string;
    footer?: string;
    subFooter?: string;
  },
  other?: {
    markupBefore?: string;
    markupAfter?: string;
  }
): Promise<void> => {
  const { header = '', content = '<p>Some Content</p>', footer = '', subFooter = '' } = flyoutSlots || {};
  const { markupBefore = '', markupAfter = '' } = other || {};

  const flyoutMarkup = `
<p-flyout ${getHTMLAttributes(flyoutProps)}>
  ${[header, content, footer, subFooter].filter(Boolean).join('\n  ')}
</p-flyout>`;

  return setContentWithDesignSystem(page, [markupBefore, flyoutMarkup, markupAfter].filter(Boolean).join('\n'));
};

const initAdvancedFlyout = async (page: Page) => {
  const header = '<div slot="header"><button id="btn-header">Header button</button></div>';
  const footer = '<div slot="footer"><button id="btn-footer">Content button</button></div>';
  const content = '<button id="btn-content">Content button</button>';
  const subFooter = '<div slot="sub-footer"><button id="btn-sub-footer">Content button</button></div>';
  await initBasicFlyout(
    page,
    { open: false },
    {
      header: header,
      footer: footer,
      content: content,
      subFooter: subFooter,
    }
  );
};

const openFlyout = async (page: Page) => {
  await setProperty(await getHost(page), 'open', true);
  await waitForStencilLifecycle(page);
};

const dismissFlyout = async (page: Page) => {
  await setProperty(await getHost(page), 'open', false);
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

const scrollFlyoutTo = async (page: Page, selector: string) =>
  await page.evaluate(
    (el) => {
      el.scrollIntoView();
    },
    await page.$(selector)
  );

const expectDismissButtonToBeFocused = async (page: Page, failMessage?: string) => {
  const host = await getHost(page);
  expect(await getActiveElementTagNameInShadowRoot(host), failMessage).toBe('P-BUTTON-PURE');
  expect(await getActiveElementClassNameInShadowRoot(host), failMessage).toContain('dismiss');
};

test('should render and be visible when open', async ({ page }) => {
  await initBasicFlyout(page, { open: true });
  expect(await getFlyout(page)).not.toBeNull();
  expect(await getFlyoutVisibility(page)).toBe('visible');
});

test('should not be visible when not open', async ({ page }) => {
  await initBasicFlyout(page, { open: false });
  expect(await getFlyoutVisibility(page)).toBe('hidden');
});

test('should be visible after opened', async ({ page }) => {
  await initBasicFlyout(page, { open: false });
  const host = await getHost(page);
  await setProperty(host, 'open', true);

  await waitForFlyoutTransition();

  expect(await getFlyoutVisibility(page)).toBe('visible');
});

test('should have correct transform when opened and dismissed', async ({ page }) => {
  await initBasicFlyout(page, { open: false });
  const getFlyoutTransform = async (page: Page) =>
    getElementStyle(await getFlyout(page), 'transform', { waitForTransition: true });

  const initialFlyoutTransform = await getFlyoutTransform(page);
  expect(initialFlyoutTransform).toBe(`matrix(1, 0, 0, 1, ${flyoutMinWidth}, 0)`);

  await openFlyout(page);

  const openFlyoutTransform = await getFlyoutTransform(page);
  expect(openFlyoutTransform).toBe('none');
  expect(initialFlyoutTransform).not.toBe(openFlyoutTransform);

  await dismissFlyout(page);
  const finalFlyoutTransform = await getFlyoutTransform(page);
  expect(finalFlyoutTransform).toBe(initialFlyoutTransform);
});

test.describe('scroll shadows', () => {
  test('should have header scroll shadow when header slot is used and scrolled down', async ({ page }) => {
    await initBasicFlyout(
      page,
      { open: true },
      {
        header: '<div slot="header">Some Heading</div>',
        content: '<div style="height: 200vh">Some Content</div>',
        subFooter: '<div slot="sub-footer" class="scroll-here">Some Content</div>',
      }
    );
    const header = await getHeader(page);
    expect(await getElementStyle(header, 'boxShadow'), 'initial').toBe('none');

    await scrollFlyoutTo(page, '.scroll-here');

    await page.waitForFunction(
      (el) => getComputedStyle(el).boxShadow === 'rgba(204, 204, 204, 0.35) 0px 5px 10px 0px',
      await getHeader(page)
    );
    expect(await getElementStyle(header, 'boxShadow'), 'after scroll outside threshold').toBe(
      'rgba(204, 204, 204, 0.35) 0px 5px 10px 0px'
    );
  });

  test('should not have footer shadow when content is not scrollable', async ({ page }) => {
    await initBasicFlyout(
      page,
      { open: true },
      {
        footer: '<div slot="footer"><button>Some Footer</button></div>',
        content: '<div>Some Content</div>',
      }
    );
    const footer = await getFooter(page);
    expect(await getElementStyle(footer, 'boxShadow')).toBe('none');
  });

  skipInBrowsers(['webkit'], () => {
    test('footer scroll shadow with sub-footer content', async ({ page }) => {
      await initBasicFlyout(
        page,
        { open: true },
        {
          footer: '<div slot="footer"><button>Some Footer</button></div>',
          content: '<div style="height: 100vh">Some Content</div>',
          subFooter: '<div slot="sub-footer">Sub Footer Content<span class="scroll-here"></span></div>',
        }
      );
      const footer = await getFooter(page);
      expect(await getElementStyle(footer, 'boxShadow'), 'before scroll').toBe(
        'rgba(204, 204, 204, 0.35) 0px -5px 10px 0px'
      );

      await scrollFlyoutTo(page, '.scroll-here');
      await page.waitForFunction((el) => getComputedStyle(el).boxShadow === 'none', footer);
      expect(await getElementStyle(footer, 'boxShadow'), 'after scroll').toBe('none');
    });
  });
});

test.describe('can be dismissed', () => {
  test('should not be closed if content is scrollable and mousedown is inside area of scroll track', async ({
    page,
  }) => {
    await initBasicFlyout(
      page,
      { open: true },
      {
        content: '<div style="height: 150vh;"></div>',
      }
    );

    await addEventListener(host, 'dismiss');
    await page.setViewportSize({ width: 800, height: 600 });
    await page.mouse.move(784, 300);
    await page.mouse.down();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(0);

    await page.mouse.up();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(0);
  });

  let host: ElementHandle;

  test.beforeEach(async ({ page }) => {
    await initBasicFlyout(page);
    host = await getHost(page);
    await addEventListener(host, 'dismiss');
  });

  test('should be closable via x button', async ({ page }) => {
    const dismissBtn = await getFlyoutDismissButton(page);
    const dismissBtnReal = await getFlyoutDismissButtonReal(page);
    expect(dismissBtn).not.toBeNull();

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
    await page.mouse.move(5, 5);
    await page.mouse.down();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(0);

    await page.mouse.up();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(1);
  });

  test('should not be dismissed if mousedown inside flyout', async ({ page }) => {
    await page.mouse.move(1800, 400);
    await page.mouse.down();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(0);

    await page.mouse.up();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(0);
  });

  // native dialog behaviour, disabled for now
  test.skip('should not be dismissed if mousedown inside flyout and mouseup inside backdrop', async ({ page }) => {
    await page.mouse.move(1800, 400);
    await page.mouse.down();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(0);

    await page.mouse.move(5, 5);
    await page.mouse.up();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(0);
  });

  test('should not bubble dismiss event', async ({ page }) => {
    const body = await page.$('body');
    await addEventListener(body, 'dismiss');
    await page.mouse.move(5, 5);
    await page.mouse.down();
    await page.mouse.up();

    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
    expect((await getEventSummary(body, 'dismiss')).counter).toBe(0);
  });
});

test.describe('focus behavior', () => {
  skipInBrowsers(['firefox', 'webkit']);

  test('should focus dismiss button after open', async ({ page }) => {
    await initBasicFlyout(page, { open: false });
    await openFlyout(page);
    await expectDismissButtonToBeFocused(page);
  });

  test('should focus dismiss button after open when there are other focusable elements', async ({ page }) => {
    await initAdvancedFlyout(page);
    await openFlyout(page);
    await expectDismissButtonToBeFocused(page);
  });

  test('should focus dismiss button after open when there is a focusable content element', async ({ page }) => {
    await initBasicFlyout(
      page,
      {
        open: false,
      },
      { content: `<a href="https://porsche.com">Some link in content</a>` }
    );
    await openFlyout(page);
    await expectDismissButtonToBeFocused(page);
  });

  test('should have correct focus order when there are focusable elements in header, content, footer and sub-footer', async ({
    page,
  }) => {
    await initAdvancedFlyout(page);
    await openFlyout(page);

    await expectDismissButtonToBeFocused(page);
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-header');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-content');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-footer');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-sub-footer');
    await page.keyboard.press('Tab');
    // now the focus is on the address bar, so we need to tab again to get back to the flyout (native dialog behaviour)
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused(page);
  });

  test('should not allow focusing element behind of flyout when pressing Tab', async ({ page }) => {
    await initBasicFlyout(page, { open: false });
    await addButtonsBeforeAndAfterFlyout(page);
    await openFlyout(page);

    await expectDismissButtonToBeFocused(page);
    await page.keyboard.press('Tab');

    expect(await getActiveElementId(page)).not.toBe('btn-after');
    expect(await getActiveElementId(page)).not.toBe('btn-before');

    // now the focus is on the address bar, so we need to tab again to get back to the flyout (native dialog behaviour)
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused(page);

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).not.toBe('btn-after');
    expect(await getActiveElementId(page)).not.toBe('btn-before');

    // now the focus is on the address bar, so we need to tab again to get back to the flyout (native dialog behaviour)
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused(page);
  });

  test('should not allow focusing element behind of flyout when pressing Shift Tab', async ({ page }) => {
    await initBasicFlyout(page, { open: false });
    await addButtonsBeforeAndAfterFlyout(page);
    await openFlyout(page);

    await expectDismissButtonToBeFocused(page);
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');

    expect(await getActiveElementId(page)).not.toBe('btn-after');
    expect(await getActiveElementId(page)).not.toBe('btn-before');

    // now the focus is on the address bar, so we need to tab again to get back to the flyout (native dialog behaviour)
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused(page);
  });

  test('should focus last focused element after flyout is dismissed', async ({ page }) => {
    await setContentWithDesignSystem(
      page,
      `
      <button id="btn-open"></button>
      <p-flyout id="flyout">
        Some Content
      </p-flyout>
      <script>
        const flyout = document.getElementById('flyout');
        document.getElementById('btn-open').addEventListener('click', () => {
          flyout.open = true;
        });
        flyout.addEventListener('dismiss', () => {
          flyout.open = false;
        });
      </script>`
    );
    await waitForStencilLifecycle(page);

    expect(await getFlyoutVisibility(page), 'initial').toBe('hidden');
    expect(await getActiveElementTagName(page)).toBe('BODY');

    await (await page.$('#btn-open')).click();
    await waitForStencilLifecycle(page);

    expect(await getFlyoutVisibility(page)).toBe('visible');

    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);

    expect(await getFlyoutVisibility(page), 'after escape').toBe('hidden');
    expect(await getActiveElementId(page)).toBe('btn-open');
  });

  test('should focus element after flyout when open accordion contains link but flyout is not open', async ({
    page,
  }) => {
    await initBasicFlyout(
      page,
      { open: false },
      {
        content: `<p-accordion heading="Some Heading" open="true">
  <a id="inside" href="#inside-flyout">Some anchor inside flyout</a>
</p-accordion>`,
      },
      {
        markupBefore: '<a id="before" href="#before-flyout">Some anchor before flyout</a>',
        markupAfter: '<a id="after" href="#after-flyout">Some anchor after flyout</a>',
      }
    );

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'after 1st tab').toBe('before');

    await page.keyboard.press('Tab');
    await page.waitForFunction(() => document.activeElement === document.querySelector('#after'));
    expect(await getActiveElementId(page), 'after 2nd tab').toBe('after');
  });
});

test.describe('after content change', () => {
  skipInBrowsers(['webkit', 'firefox']);

  test('should focus dismiss button again', async ({ page }) => {
    await initAdvancedFlyout(page);
    await openFlyout(page);
    await expectDismissButtonToBeFocused(page, 'initially');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'after 1st tab').toBe('btn-header');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'after 2nd tab').toBe('btn-content');

    const host = await getHost(page);
    await host.evaluate((el) => {
      el.innerHTML = '<button id="btn-new">New Button</button>';
    });
    await waitForSlotChange();
    await expectDismissButtonToBeFocused(page, 'after slot change');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'after content change 1nd tab').toBe('btn-new');
  });

  test('should not allow focusing element behind of flyout', async ({ page }) => {
    await initAdvancedFlyout(page);
    await addButtonsBeforeAndAfterFlyout(page);
    await openFlyout(page);
    await expectDismissButtonToBeFocused(page, 'initially');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'after 1st tab').toBe('btn-header');

    const host = await getHost(page);
    await host.evaluate((el) => {
      el.innerHTML = '';
    });
    await waitForSlotChange();
    await expectDismissButtonToBeFocused(page, 'after content change');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('BODY');

    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused(page, 'after content change 2nd tab');
  });

  test('should correctly focus dismiss button from appended focusable element', async ({ page }) => {
    await initAdvancedFlyout(page);
    await openFlyout(page);

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
    expect(await getActiveElementId(page)).toBe('btn-header');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-content');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-new');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-footer');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-sub-footer');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('BODY');
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused(page, 'finally');
  });
});

test.describe('can be controlled via keyboard', () => {
  skipInBrowsers(['webkit', 'firefox']);

  test('should cycle tab events within flyout', async ({ page }) => {
    await initAdvancedFlyout(page);
    await openFlyout(page);
    await expectDismissButtonToBeFocused(page, 'initially');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-header');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-content');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-footer');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-sub-footer');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('BODY');
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused(page, 'finally');
  });

  test('should reverse cycle tab events within flyout', async ({ page }) => {
    await initAdvancedFlyout(page);
    await openFlyout(page);
    await expectDismissButtonToBeFocused(page, 'initially');

    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('BODY');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-sub-footer');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-footer');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-content');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-header');
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused(page, 'finally');
    await page.keyboard.up('ShiftLeft');
  });
});

test('should open flyout at scroll top position zero when its content is scrollable', async ({ page }) => {
  await initBasicFlyout(page, { open: true }, { content: '<div style="height: 150vh;"></div>' });

  const host = await getHost(page);
  const hostScrollTop = await host.evaluate((el) => el.scrollTop);

  expect(hostScrollTop).toBe(0);
});

test.describe('scroll lock', () => {
  const bodyLockedStyle = 'overflow: hidden;';

  test('should prevent page from scrolling when open', async ({ page }) => {
    await initBasicFlyout(page, { open: false });
    expect(await getBodyStyle(page)).toBe(null);

    await openFlyout(page);
    expect(await getBodyStyle(page)).toBe(bodyLockedStyle);

    await setProperty(await getHost(page), 'open', false);
    await waitForStencilLifecycle(page);
    expect(await getBodyStyle(page)).toBe('');
  });

  test('should prevent page from scrolling when initially open', async ({ page }) => {
    await initBasicFlyout(page, { open: true });
    expect(await getBodyStyle(page)).toBe(bodyLockedStyle);
  });

  test('should remove overflow hidden from body if unmounted', async ({ page }) => {
    await initBasicFlyout(page, { open: true });
    expect(await getBodyStyle(page)).toBe(bodyLockedStyle);

    await page.evaluate(() => {
      document.querySelector('p-flyout').remove();
    });
    await waitForStencilLifecycle(page);

    expect(await getBodyStyle(page)).toBe('');
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initBasicFlyout(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-flyout'], 'componentDidLoad: p-flyout').toBe(1);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1); // includes p-icon

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initBasicFlyout(page);
    const host = await getHost(page);

    await setProperty(host, 'open', false);
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-flyout'], 'componentDidUpdate: p-flyout').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});
