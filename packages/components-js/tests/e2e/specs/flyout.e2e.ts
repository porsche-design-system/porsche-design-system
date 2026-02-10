import { expect, type Locator, type Page, test } from '@playwright/test';
import type { Components } from '@porsche-design-system/components';
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
  type Options,
  setContentWithDesignSystem,
  setProperty,
  skipInBrowsers,
  sleep,
  waitForStencilLifecycle,
} from '../helpers';

const CSS_TRANSITION_DURATION = 600; // Corresponds to durationLg
const flyoutMinWidth = 320;

const getHost = (page: Page) => page.locator('p-flyout');
const getFlyout = (page: Page) => page.locator('p-flyout dialog');
const getFlyoutScroller = (page: Page) => page.locator('p-flyout dialog .scroller');
const getHeader = (page: Page) => page.locator('p-flyout slot[name="header"]');
const getFooter = (page: Page) => page.locator('p-flyout slot[name="footer"]');
const getFlyoutDismissButton = (page: Page) => page.locator('p-flyout .dismiss');
const getFlyoutDismissButtonReal = (page: Page) => page.locator('p-flyout .dismiss button');
const getBody = (page: Page) => page.locator('body');
const getFlyoutVisibility = async (page: Page) => await getElementStyle(getFlyout(page), 'visibility');
const waitForFlyoutTransition = async () => sleep(CSS_TRANSITION_DURATION);
const waitForSlotChange = () => sleep();
const getStickyTopCssVarValue = async (page: Page) =>
  getHost(page).evaluate((element) => getComputedStyle(element).getPropertyValue('--p-flyout-sticky-top'));

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
  },
  options?: Options
): Promise<void> => {
  const { header = '', content = '<p>Some Content</p>', footer = '', subFooter = '' } = flyoutSlots || {};
  const { markupBefore = '', markupAfter = '' } = other || {};

  const flyoutMarkup = `
<p-flyout ${getHTMLAttributes(flyoutProps)}>
  ${[header, content, footer, subFooter].filter(Boolean).join('\n  ')}
</p-flyout>`;

  return setContentWithDesignSystem(
    page,
    [markupBefore, flyoutMarkup, markupAfter].filter(Boolean).join('\n'),
    options
  );
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
  await setProperty(getHost(page), 'open', true);
  await waitForStencilLifecycle(page);
};

const dismissFlyout = async (page: Page) => {
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

const scrollFlyoutTo = async (page: Page, selector: string) => {
  const locator = page.locator(selector);
  const elementHandle = await locator.elementHandle();
  if (elementHandle) {
    await page.evaluate((el) => {
      el.scrollIntoView();
    }, elementHandle);
  } else {
    throw new Error(`Element with selector "${selector}" not found.`);
  }
};

const addHeaderSlot = async (host: Locator) => {
  await host.evaluate((el) => {
    const header = document.createElement('div');
    header.slot = 'header';
    header.innerHTML = `<h2>Some slotted header with long text in order to show different header heights</h2>`;
    el.appendChild(header);
  });
};

const removeHeaderSlot = async (host: Locator) => {
  await host.evaluate((el: HTMLElement) => {
    el.querySelector('[slot="header"]').remove();
  });
};

const expectDismissButtonToBeFocused = async (page: Page, failMessage?: string) => {
  const host = getHost(page);
  expect(await getActiveElementTagNameInShadowRoot(host), failMessage).toBe('P-BUTTON');
  expect(await getActiveElementClassNameInShadowRoot(host), failMessage).toContain('dismiss');
};

const expectDialogAndThenDismissButtonToBeFocused = async (page: Page, failMessage?: string) => {
  // In order to assure that its correct we press tab to assure the next element will be the dismiss button
  await expect(await getActiveElementTagName(page)).toBe('P-FLYOUT');
  await page.keyboard.press('Tab');
  await expectDismissButtonToBeFocused(page);
};

const expectHeaderShadowToAppear = async (page: Page) => {
  const headerLocator = getHeader(page);
  await expect(headerLocator).toHaveCSS('boxShadow', 'rgba(204, 204, 204, 0.35) 0px 5px 10px 0px');
  // await page.waitForFunction(
  //   (el) => getComputedStyle(el).boxShadow === 'rgba(204, 204, 204, 0.35) 0px 5px 10px 0px',
  //   await headerLocator.evaluateHandle((el) => el)
  // );
  // expect(await getElementStyle(getHeader(page), 'boxShadow'), 'after scroll outside threshold').toBe(
  //   'rgba(204, 204, 204, 0.35) 0px 5px 10px 0px'
  // );
};

test('should render and be visible when open', async ({ page }) => {
  await initBasicFlyout(page, { open: true });
  expect(getFlyout(page)).not.toBeNull();
  expect(await getFlyoutVisibility(page)).toBe('visible');
});

test('should not be visible when not open', async ({ page }) => {
  await initBasicFlyout(page, { open: false });
  expect(await getFlyoutVisibility(page)).toBe('hidden');
});

test('should be visible after opened', async ({ page }) => {
  await initBasicFlyout(page, { open: false });
  await openFlyout(page);

  await waitForFlyoutTransition();

  expect(await getFlyoutVisibility(page)).toBe('visible');
});

test('should have correct transform when opened and dismissed', async ({ page }) => {
  await initBasicFlyout(page, { open: false });
  const initialFlyoutTransform = `matrix(1, 0, 0, 1, ${flyoutMinWidth}, 0)`;

  await expect(getFlyoutScroller(page)).toHaveCSS('transform', initialFlyoutTransform);

  await openFlyout(page);

  await expect(getFlyoutScroller(page)).toHaveCSS('transform', 'none');

  await dismissFlyout(page);

  await expect(getFlyoutScroller(page)).toHaveCSS('transform', initialFlyoutTransform);
});

test.describe('scroll shadows', () => {
  test('should not have footer shadow when content is not scrollable', async ({ page }) => {
    await initBasicFlyout(
      page,
      { open: true },
      {
        footer: '<div slot="footer"><button>Some Footer</button></div>',
        content: '<div>Some Content</div>',
      }
    );
    const footer = getFooter(page);
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
      const footer = getFooter(page);

      await expect(footer).toHaveAttribute('data-stuck');

      await scrollFlyoutTo(page, '.scroll-here');

      await expect(footer).not.toHaveAttribute('data-stuck');
    });
  });
});

test.describe('can be dismissed', () => {
  let host: Locator;

  test.beforeEach(async ({ page }) => {
    await initBasicFlyout(page);
    host = getHost(page);
    await addEventListener(host, 'dismiss');
  });

  test('should be closable via x button', async ({ page }) => {
    const dismissBtn = getFlyoutDismissButton(page);
    const dismissBtnReal = getFlyoutDismissButtonReal(page);
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
    await page.mouse.click(5, 5);

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(1);
  });

  test('should not be dismissed if mousedown inside flyout', async ({ page }) => {
    const viewportSize = page.viewportSize();
    await page.mouse.move(viewportSize.width - 1, viewportSize.height / 2);
    await page.mouse.down();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(0);

    await page.mouse.up();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(0);
  });

  skipInBrowsers(['webkit'], () => {
    test('should not be closable via backdrop when disableBackdropClick is set', async ({ page }) => {
      const host = getHost(page);
      await setProperty(host, 'disableBackdropClick', true);

      await page.mouse.move(5, 5);
      await page.mouse.down();

      expect((await getEventSummary(host, 'close')).counter).toBe(0);
    });
  });

  test('should not bubble dismiss event', async ({ page }) => {
    const body = page.locator('body');
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

  test('should focus dialog button after open', async ({ page }) => {
    await initBasicFlyout(page, { open: false });
    await openFlyout(page);
    await expectDialogAndThenDismissButtonToBeFocused(page);
  });

  test('should focus dismiss button after open when there are other focusable elements', async ({ page }) => {
    await initAdvancedFlyout(page);
    await openFlyout(page);
    await expectDialogAndThenDismissButtonToBeFocused(page);
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
    await expectDialogAndThenDismissButtonToBeFocused(page);
  });

  test('should have correct focus order when there are focusable elements in header, content, footer and sub-footer', async ({
    page,
  }) => {
    await initAdvancedFlyout(page);
    await openFlyout(page);

    await expectDialogAndThenDismissButtonToBeFocused(page);
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

    await expectDialogAndThenDismissButtonToBeFocused(page);
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

    await expectDialogAndThenDismissButtonToBeFocused(page);
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

    page.locator('#btn-open').click();
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

  test('should not allow focusing element behind of flyout', async ({ page }) => {
    await initAdvancedFlyout(page);
    await addButtonsBeforeAndAfterFlyout(page);
    await openFlyout(page);
    await expectDialogAndThenDismissButtonToBeFocused(page, 'initially');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'after 1st tab').toBe('btn-header');

    const host = getHost(page);
    await host.evaluate((el) => {
      el.innerHTML = '';
    });
    await waitForSlotChange();

    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused(page, 'after slot change');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('BODY');

    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused(page, 'after tab cycle');
  });

  test('should correctly focus dismiss button from appended focusable element', async ({ page }) => {
    await initAdvancedFlyout(page);
    await openFlyout(page);

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
    await expectDialogAndThenDismissButtonToBeFocused(page, 'initially');

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
    await expectDialogAndThenDismissButtonToBeFocused(page, 'initially');

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

  const host = getHost(page);
  const hostScrollTop = await host.evaluate((el) => el.scrollTop);

  expect(hostScrollTop).toBe(0);
});

test.describe('scroll lock', () => {
  test('should prevent page from scrolling when open', async ({ page }) => {
    await initBasicFlyout(page, { open: false });
    const body = getBody(page);

    await expect(body).toHaveCSS('overflow', 'visible');

    await openFlyout(page);
    await expect(body).toHaveCSS('overflow', 'hidden');

    await setProperty(getHost(page), 'open', false);

    await expect(body).toHaveCSS('overflow', 'visible');
  });

  test('should prevent page from scrolling when initially open', async ({ page }) => {
    await initBasicFlyout(page, { open: true });
    const body = getBody(page);
    await expect(body).toHaveCSS('overflow', 'hidden');
  });

  test('should remove overflow hidden from body if unmounted', async ({ page }) => {
    await initBasicFlyout(page, { open: true });
    const body = getBody(page);
    await expect(body).toHaveCSS('overflow', 'hidden');

    await page.evaluate(() => {
      document.querySelector('p-flyout').remove();
    });
    await waitForStencilLifecycle(page);

    await expect(body).toHaveCSS('overflow', 'visible');
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initBasicFlyout(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-flyout'], 'componentDidLoad: p-flyout').toBe(1);
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(1); // includes p-icon

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips after state change', async ({ page }) => {
    await initBasicFlyout(page);
    const host = getHost(page);

    await setProperty(host, 'open', false);
    await waitForStencilLifecycle(page);

    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate['p-flyout'];
        },
        {
          message: 'componentDidUpdate: p-flyout',
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
    await initBasicFlyout(page, { open: true }, { header: '<div slot="header">Some content</div>' });
    const host = getHost(page);

    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidLoad['p-flyout'];
        },
        {
          message: 'componentDidLoad: p-flyout',
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
      const header = el.querySelector('[slot="header"]');
      header.innerHTML = `<h2>Some new header content</h2>`;
    });
    await waitForStencilLifecycle(page);

    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate['p-flyout'];
        },
        {
          message: 'componentDidUpdate: p-flyout',
        }
      )
      .toBe(0);
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
  });

  test('should update when adding named slot', async ({ page }) => {
    await initBasicFlyout(page);
    const host = getHost(page);

    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidLoad['p-flyout'];
        },
        {
          message: 'componentDidLoad: p-flyout',
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

    await addHeaderSlot(host);
    await waitForStencilLifecycle(page);

    await expect
      .poll(
        async () => {
          const status = await getLifecycleStatus(page);
          return status.componentDidUpdate['p-flyout'];
        },
        {
          message: 'componentDidUpdate: p-flyout',
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

test.describe('after dynamic slot change', () => {
  skipInBrowsers(['webkit', 'firefox']);

  test('should show header and set correct aria-label', async ({ page }) => {
    await initBasicFlyout(
      page,
      { open: true },
      {
        content: '<div style="height: 200vh">Some Content</div>',
        subFooter: '<div slot="sub-footer" class="scroll-here">Some Content</div>',
      }
    );
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

    const dialog = getFlyout(page);
    await expect(page.getByText(headerText)).toBeVisible();
    await expect(dialog).toHaveAttribute('aria-label', headerText);
  });

  test('should show footer with shadow', async ({ page }) => {
    await initBasicFlyout(page);
    const host = getHost(page);
    const footer = getFlyout(page);
    const footerText = 'Some slotted footer content';

    await expect(page.getByText(footerText)).not.toBeVisible();

    await host.evaluate((el, footerText) => {
      el.innerHTML = `<div style="height: 110vh">Some content</div><div slot="footer"><p>${footerText}</p></div>`;
    }, footerText);

    await waitForStencilLifecycle(page);

    await expect(page.getByText(footerText)).toBeVisible();
    // TODO: Check footer background working
    // await expect
    //   .poll(() => footer.evaluate((el) => getComputedStyle(el, '::after').backgroundColor))
    //   .toBe('rgba(122, 123, 138, 0.15)');
  });

  test('should show subfooter', async ({ page }) => {
    await initBasicFlyout(page);
    const host = getHost(page);
    const footerText = 'Some slotted sub-footer content';

    await expect(page.getByText(footerText)).not.toBeVisible();

    await host.evaluate((el, footerText) => {
      el.innerHTML = `<div slot="sub-footer"><p>${footerText}</p></div>`;
    }, footerText);

    await waitForStencilLifecycle(page);
    await expect(page.getByText(footerText)).toBeVisible();
  });

  test('should update css sticky top custom property correctly if no header exists initially', async ({ page }) => {
    await initBasicFlyout(page);
    const host = getHost(page);

    await expect(host).toHaveCSS('--p-flyout-sticky-top', '0px');

    await addHeaderSlot(host);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveCSS('--p-flyout-sticky-top', '107px');

    await removeHeaderSlot(host);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveCSS('--p-flyout-sticky-top', '0px');

    await addHeaderSlot(host);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveCSS('--p-flyout-sticky-top', '107px');

    await page.setViewportSize({ width: 320, height: 500 });

    await expect(host).toHaveCSS('--p-flyout-sticky-top', '167px');
  });

  test('should update css sticky top custom property correctly if header exists initially', async ({ page }) => {
    await initAdvancedFlyout(page);
    const host = getHost(page);
    await expect(host).toHaveCSS('--p-flyout-sticky-top', '68px');

    await removeHeaderSlot(host);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveCSS('--p-flyout-sticky-top', '0px');

    await addHeaderSlot(host);
    await waitForStencilLifecycle(page);

    await expect(host).toHaveCSS('--p-flyout-sticky-top', '107px');

    await page.setViewportSize({ width: 320, height: 500 });

    await expect(host).toHaveCSS('--p-flyout-sticky-top', '167px');
  });
});

test.describe('events', () => {
  skipInBrowsers(['firefox', 'webkit']);
  test('should call motionVisibleEnd event when opening transition is finished', async ({ page }) => {
    await initBasicFlyout(
      page,
      { open: false },
      {},
      {},
      { injectIntoHead: '<style>:root { --p-transition-duration: unset; }</style>' }
    );
    const host = getHost(page);
    await waitForStencilLifecycle(page);
    await addEventListener(host, 'motionVisibleEnd');
    await addEventListener(host, 'motionHiddenEnd');

    expect((await getEventSummary(host, 'motionVisibleEnd')).counter).toBe(0);
    expect((await getEventSummary(host, 'motionHiddenEnd')).counter).toBe(0);

    await openFlyout(page);
    await waitForFlyoutTransition();

    expect((await getEventSummary(host, 'motionVisibleEnd')).counter).toBe(1);
    expect((await getEventSummary(host, 'motionHiddenEnd')).counter).toBe(0);
  });
  test('should call motionHiddenEnd event when closing transition is finished', async ({ page }) => {
    await initBasicFlyout(
      page,
      { open: true },
      {},
      {},
      { injectIntoHead: '<style>:root { --p-transition-duration: unset; }</style>' }
    );
    const host = getHost(page);
    await waitForStencilLifecycle(page);
    await addEventListener(host, 'motionVisibleEnd');
    await addEventListener(host, 'motionHiddenEnd');

    expect((await getEventSummary(host, 'motionVisibleEnd')).counter).toBe(0);
    expect((await getEventSummary(host, 'motionHiddenEnd')).counter).toBe(0);

    await dismissFlyout(page);
    await waitForFlyoutTransition();

    expect((await getEventSummary(host, 'motionVisibleEnd')).counter).toBe(0);
    expect((await getEventSummary(host, 'motionHiddenEnd')).counter).toBe(1);
  });
});

test.describe('aria-label on dialog', () => {
  test('should have correct value if aria prop is set', async ({ page }) => {
    await initBasicFlyout(page, { open: true, aria: { 'aria-label': 'Some Heading' } });
    const dialog = getFlyout(page);
    await expect(dialog).toHaveAttribute('aria-label', 'Some Heading');
  });

  test('should have correct value if header slot is set', async ({ page }) => {
    await initBasicFlyout(page, { open: true }, { header: '<div slot="header">Some Heading</div>' });
    const dialog = getFlyout(page);
    await expect(dialog).toHaveAttribute('aria-label', 'Some Heading');
  });

  test('should have correct value if aria prop and header slot are set', async ({ page }) => {
    await initBasicFlyout(
      page,
      { open: true, aria: { 'aria-label': 'Some Prop Heading' } },
      { header: '<div slot="header">Some Slot Heading</div>' }
    );
    const dialog = getFlyout(page);
    await expect(dialog).toHaveAttribute('aria-label', 'Some Prop Heading');
  });
});
