import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getActiveElementClassNameInShadowRoot,
  getActiveElementId,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getElementStyle,
  getEventSummary,
  getLifecycleStatus,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { ElementHandle, Page } from 'puppeteer';
import type { SelectedAriaAttributes } from '@porsche-design-system/components/dist/types/bundle';
import { Components, FlyoutAriaAttribute } from '@porsche-design-system/components';
import { expect } from '@playwright/test';
import PFlyout = Components.PFlyout;

let page: Page;
const CSS_TRANSITION_DURATION = 600;
const flyoutMinWidth = 320;
const flyoutMaxWidth = 1080;

beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-flyout');

const getFlyout = () => selectNode(page, 'p-flyout >>> .root');
const getHeader = () => selectNode(page, 'p-flyout >>> .header');

const getHeaderContent = () => selectNode(page, 'p-flyout >>> .header-content');

const getFooter = () => selectNode(page, 'p-flyout >>> .footer');

const getSecondaryContent = () => selectNode(page, 'p-flyout >>> .secondary-content');

const getFlyoutDismissButton = () => selectNode(page, 'p-flyout >>> p-button-pure.dismiss');

const getFlyoutDismissButtonReal = () => selectNode(page, 'p-flyout >>> p-button-pure.dismiss >>> button');
const getBodyOverflow = async () => getElementStyle(await selectNode(page, 'body'), 'overflow');

const getFlyoutVisibility = async () => await getElementStyle(await getFlyout(), 'visibility');

const waitForFlyoutToBeVisible = async () =>
  page.waitForFunction(
    (selector) => getComputedStyle(document.querySelector(selector)).visibility !== 'hidden',
    {},
    'p-flyout'
  );

const waitForFlyoutTransition = async () => {
  await new Promise((resolve) => setTimeout(resolve, CSS_TRANSITION_DURATION));
};

/**
 * Creates HTML attributes string from an object of properties.
 * @param props - The object containing the properties.
 * @returns The generated HTML attributes string.
 */
const createHTMLAttributes = <T extends object>(props: T): string => {
  return Object.entries(props)
    .filter(([, value]) => value !== undefined)
    .map(([prop, value]) => {
      const attributeName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      const attributeValue = typeof value === 'object' ? JSON.stringify(value).replace(/"/g, "'") : value;
      return `${attributeName}="${attributeValue}"`;
    })
    .join(' ');
};

const initBasicFlyout = (
  flyoutProps: PFlyout = {
    open: true,
  },
  flyoutSlots?: {
    content?: string;
    header?: string;
    footer?: string;
    secondaryContent?: string;
  }
): Promise<void> => {
  const { header, content = '<p>Some Content</p>', footer, secondaryContent } = flyoutSlots || {};

  const flyoutMarkup = `
    <p-flyout ${createHTMLAttributes(flyoutProps)}>
      ${header ? header : ''}
      ${content}
      ${footer ? footer : ''}
      ${secondaryContent ? secondaryContent : ''}
    </p-flyout>`;

  return setContentWithDesignSystem(page, flyoutMarkup);
};

const initAdvancedFlyout = async () => {
  const header = '<div slot="header"><p-button id="btn-header">Header button</p-button></div>';
  const footer = '<div slot="footer"><p-button id="btn-footer">Content button</p-button></div>';
  const content = '<p-button id="btn-content">Content button</p-button>';
  const secondaryContent =
    '<div slot="secondary-content"><p-button id="btn-secondary-content">Content button</p-button></div>';
  await initBasicFlyout(
    { open: false },
    { header: header, footer: footer, content: content, secondaryContent: secondaryContent }
  );
};

const openFlyout = async () => {
  await setProperty(await getHost(), 'open', true);
  await waitForStencilLifecycle(page);
};

const dismissFlyout = async () => {
  await setProperty(await getHost(), 'open', false);
  await waitForStencilLifecycle(page);
};

const addButtonsBeforeAndAfterFlyout = () =>
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

const expectDialogToBeFocused = async (failMessage?: string) => {
  const host = await getHost();
  expect(await getActiveElementTagNameInShadowRoot(host), failMessage).toBe('DIV');
  expect(await getActiveElementClassNameInShadowRoot(host), failMessage).toBe('root');
};

const expectDismissButtonToBeFocused = async (failMessage?: string) => {
  const host = await getHost();
  expect(await getActiveElementTagNameInShadowRoot(host), failMessage).toBe('P-BUTTON-PURE');
  expect(await getActiveElementClassNameInShadowRoot(host), failMessage).toContain('dismiss');
};

const waitForSlotChange = () => new Promise((resolve) => setTimeout(resolve));

it('should render and be visible when open', async () => {
  await initBasicFlyout({ open: true });
  expect(await getFlyout()).not.toBeNull();
  expect(await getFlyoutVisibility()).toBe('visible');
});

it('should not be visible when not open', async () => {
  await initBasicFlyout({ open: false });
  expect(await getFlyoutVisibility()).toBe('hidden');
});

it('should visible after opened', async () => {
  await initBasicFlyout({ open: false });
  const host = await getHost();
  await setProperty(host, 'open', true);
  await waitForFlyoutToBeVisible();
  expect(await getFlyoutVisibility()).toBe('visible');
});

// TODO: Add test for min/max width flyout
it('should have correct transform when dismissed and opened', async () => {
  await initBasicFlyout({ open: false });
  const getFlyoutTransform = async () => getElementStyle(await getFlyout(), 'transform', { waitForTransition: true });

  const initialFlyoutTransform = await getFlyoutTransform();
  expect(initialFlyoutTransform).toBe(`matrix(1, 0, 0, 1, ${flyoutMinWidth}, 0)`);

  await openFlyout();
  await waitForFlyoutTransition();
  const openFlyoutTransform = await getFlyoutTransform();
  expect(openFlyoutTransform).toBe('none');
  expect(initialFlyoutTransform).not.toBe(openFlyoutTransform);

  await dismissFlyout();
  await waitForFlyoutTransition();
  const finalFlyoutTransform = await getFlyoutTransform();
  expect(finalFlyoutTransform).toBe(initialFlyoutTransform);
});

describe('can be dismissed', () => {
  it('should not be closed if content is scrollable and mousedown is inside area of scroll track', async () => {
    await initBasicFlyout(
      { open: true },
      {
        content: '<div style="height: 150vh;"></div>',
      }
    );

    await addEventListener(host, 'dismiss');
    await page.setViewport({ width: 800, height: 600 });
    await page.mouse.move(784, 300);
    await page.mouse.down();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(0);

    await page.mouse.up();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(0);
  });

  let host: ElementHandle;

  beforeEach(async () => {
    await initBasicFlyout();
    host = await getHost();
    await addEventListener(host, 'dismiss');
  });

  // it('should be closed if content is not scrollable and mousedown is inside area of scroll track', async () => {
  //   await page.setViewport({ width: 800, height: 600 });
  //   await page.mouse.move(784, 300);
  //   await page.mouse.down();
  //
  //   expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(1);
  //
  //   await page.mouse.up();
  //
  //   expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(1);
  // });
  //
  it('should be closable via x button', async () => {
    const dismissBtn = await getFlyoutDismissButton();
    const dismissBtnReal = await getFlyoutDismissButtonReal();
    expect(dismissBtn).not.toBeNull();

    expect(await getAttribute(dismissBtnReal, 'type')).toBe('button');

    await dismissBtn.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });

  it('should be closable via esc key', async () => {
    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });

  it('should be closable via backdrop', async () => {
    await page.mouse.move(5, 5);
    await page.mouse.down();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(1);

    await page.mouse.up();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(1);
  });

  it('should not be dismissed if mousedown inside flyout', async () => {
    await page.mouse.move(1800, 400);
    await page.mouse.down();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(0);

    await page.mouse.up();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(0);
  });

  it('should not be dismissed if mousedown inside flyout and mouseup inside backdrop', async () => {
    await page.mouse.move(1800, 400);
    await page.mouse.down();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(0);

    await page.mouse.move(5, 5);
    await page.mouse.up();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(0);
  });

  it('should not bubble dismiss event', async () => {
    const body = await selectNode(page, 'body');
    await addEventListener(body, 'dismiss');
    await page.mouse.move(5, 5);
    await page.mouse.down();

    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
    expect((await getEventSummary(body, 'dismiss')).counter).toBe(0);
  });
});

describe('focus behavior', () => {
  it('should focus dismiss button after open', async () => {
    await initBasicFlyout({ open: false });
    await openFlyout();
    await expectDismissButtonToBeFocused();
  });

  it('should focus dismiss button after open when there are other focusable elements', async () => {
    await initAdvancedFlyout();
    await openFlyout();
    await expectDismissButtonToBeFocused();
  });

  it('should focus dismiss button after open when there is a focusable content element', async () => {
    await initBasicFlyout(
      {
        open: false,
      },
      { content: `<a href="https://porsche.com">Some link in content</a>` }
    );
    await openFlyout();
    await expectDismissButtonToBeFocused();
  });

  it('should have correct focus order when there are focusable elements in header, content, footer and secondary content', async () => {
    await initAdvancedFlyout();
    await openFlyout();

    await expectDismissButtonToBeFocused();
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-content');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-footer');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-secondary-content');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-header');
  });

  it('should not allow focusing element behind of flyout when pressing Tab', async () => {
    await initBasicFlyout({ open: false });
    await addButtonsBeforeAndAfterFlyout();
    await openFlyout();

    await expectDismissButtonToBeFocused();
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused();
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused();
  });

  it('should not allow focusing element behind of flyout when pressing Shift Tab', async () => {
    await initBasicFlyout({ open: false });
    await addButtonsBeforeAndAfterFlyout();
    await openFlyout();

    await expectDismissButtonToBeFocused();
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused();
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused();
  });

  it('should focus last focused element after flyout is dismissed', async () => {
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
    await waitForFlyoutTransition();

    expect(await getFlyoutVisibility(), 'initial').toBe('hidden');
    expect(await getActiveElementTagName(page)).toBe('BODY');

    await (await selectNode(page, '#btn-open')).click();
    await waitForStencilLifecycle(page);
    await waitForFlyoutTransition();

    expect(await getFlyoutVisibility()).toBe('visible');

    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);
    await waitForFlyoutTransition();

    const host = await selectNode(page, '#flyout');
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
    expect(await getFlyoutVisibility(), 'after escape').toBe('hidden');
    expect(await getActiveElementId(page)).toBe('btn-open');
  });
});
describe('after content change', () => {
  it('should focus dismiss button again', async () => {
    await initAdvancedFlyout();
    await openFlyout();
    await expectDismissButtonToBeFocused('initially');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'after 1nd tab').toBe('btn-content');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'after 2nd tab').toBe('btn-footer');

    const host = await getHost();
    await host.evaluate((el) => {
      el.innerHTML = '<button id="btn-new">New Button</button>';
    });
    await waitForSlotChange();
    await expectDismissButtonToBeFocused('after slot change');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'after content change 1nd tab').toBe('btn-new');
  });

  it('should not allow focusing element behind of flyout', async () => {
    await initAdvancedFlyout();
    await addButtonsBeforeAndAfterFlyout();
    await openFlyout();
    await expectDismissButtonToBeFocused('initially');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'after 1nd tab').toBe('btn-content');

    const host = await getHost();
    await host.evaluate((el) => {
      el.innerHTML = '';
    });
    await waitForSlotChange();
    await expectDismissButtonToBeFocused('after content change');

    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused('after content change 1st tab');

    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused('after content change 2nd tab');
  });

  it('should correctly focus dismiss button from appended focusable element', async () => {
    await initAdvancedFlyout();
    await openFlyout();

    const host = await getHost();
    await host.evaluate((el) => {
      const button = document.createElement('button');
      button.innerText = 'New Button';
      button.id = 'btn-new';
      el.append(button);
    });
    await waitForSlotChange();
    await expectDismissButtonToBeFocused('after button appended');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-new');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-secondary-content');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-header');
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused('finally');
  });
});

describe('can be controlled via keyboard', () => {
  it('should cycle tab events within flyout', async () => {
    await initAdvancedFlyout();
    await openFlyout();
    await expectDismissButtonToBeFocused('initially');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-content');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-footer');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-secondary-content');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-header');
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused('finally');
  });

  it('should reverse cycle tab events within flyout', async () => {
    await initAdvancedFlyout();
    await openFlyout();
    await expectDismissButtonToBeFocused('initially');

    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-header');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-secondary-content');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-footer');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-content');
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused('finally');
    await page.keyboard.up('ShiftLeft');
  });
});

it('should prevent page from scrolling when open', async () => {
  await initBasicFlyout({ open: false });
  expect(await getBodyOverflow()).toBe('visible');

  await openFlyout();
  expect(await getBodyOverflow()).toBe('hidden');

  await setProperty(await getHost(), 'open', false);
  await waitForStencilLifecycle(page);
  expect(await getBodyOverflow()).toBe('visible');
});

it('should prevent page from scrolling when initially open', async () => {
  await initBasicFlyout({ open: true });
  expect(await getBodyOverflow()).toBe('hidden');
});

it('should open flyout at scroll top position zero when its content is scrollable', async () => {
  await initBasicFlyout({ open: true }, { content: '<div style="height: 150vh;"></div>' });

  const host = await getHost();
  const hostScrollTop = await host.evaluate((el) => el.scrollTop);

  expect(hostScrollTop).toBe(0);
});

it('should remove overflow hidden from body if unmounted', async () => {
  await initBasicFlyout({ open: true });
  expect(await getBodyOverflow()).toBe('hidden');

  await page.evaluate(() => {
    document.querySelector('p-flyout').remove();
  });
  await waitForStencilLifecycle(page);

  expect(await getBodyOverflow()).toBe('visible');
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initBasicFlyout();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-flyout'], 'componentDidLoad: p-flyout').toBe(1);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1); // includes p-icon

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips after state change', async () => {
    await initBasicFlyout();
    const host = await getHost();

    await setProperty(host, 'open', false);
    await waitForFlyoutTransition();
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-flyout'], 'componentDidUpdate: p-flyout').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

describe('slotted heading', () => {
  it('should set slotted heading', async () => {
    const headerSlotMarkup =
      '<div slot="header"><p-heading tag="h5" size="large">Sticky Heading</p-heading><p-text size="small">Sticky header text</p-text></div>';
    await initBasicFlyout(
      { open: true },
      {
        header: headerSlotMarkup,
      }
    );
    const headerContent = await getHeaderContent();
    // TODO: Check if header content is in slot
    expect(await getProperty(headerContent, 'innerHTML')).toMatchInlineSnapshot(`"<slot name="header"></slot>"`);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initBasicFlyout();
    const flyout = await getFlyout();

    await expectA11yToMatchSnapshot(page, flyout, { interestingOnly: false });
  });

  it('should not expose accessibility tree if flyout is hidden', async () => {
    await initBasicFlyout({ open: false });
    const flyout = await getFlyout();

    await expectA11yToMatchSnapshot(page, flyout);
  });

  it.each<[string, SelectedAriaAttributes<FlyoutAriaAttribute>, string]>([
    ['Some Heading', undefined, 'Some Heading'],
    [undefined, "{'aria-label': 'Some Heading'}", 'Some Heading'],
    ['Some Heading', "{'aria-label': 'Other Heading'}", 'Other Heading'],
  ])('should with slot header: %s and aria: %s set aria-label: %s', async (heading, aria, expected) => {
    await initBasicFlyout({ open: false, aria }, { header: `<p-heading slot="header">${heading}</p-heading>` });
    const flyout = await getFlyout();

    expect(await getProperty(flyout, 'ariaLabel')).toBe(expected);
  });

  it('should overwrite aria-label when adding aria prop', async () => {
    await initBasicFlyout({ open: false });
    const host = await getHost();
    const flyout = await getFlyout();
    await setProperty(host, 'aria', "{'aria-label': 'Other Heading'}");
    await waitForStencilLifecycle(page);

    expect(await getProperty(flyout, 'ariaLabel')).toBe('Other Heading');
  });

  it('should overwrite aria-label with heading when setting aria prop to undefined', async () => {
    await initBasicFlyout(
      { open: false, aria: "{'aria-label': 'Other Heading'}" },
      { header: `<p-heading slot="header">Some Heading</p-heading>` }
    );
    const host = await getHost();
    const flyout = await getFlyout();
    await setProperty(host, 'aria', undefined);
    await waitForStencilLifecycle(page);

    expect(await getProperty(flyout, 'ariaLabel')).toBe('Some Heading');
  });
});
