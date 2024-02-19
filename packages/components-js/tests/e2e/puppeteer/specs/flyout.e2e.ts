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
  getHTMLAttributes,
  getLifecycleStatus,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { ElementHandle, Page } from 'puppeteer';
import type { Components } from '@porsche-design-system/components/src/components';

let page: Page;
const CSS_TRANSITION_DURATION = 600;
const flyoutMinWidth = 320;

beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-flyout');
const getFlyout = () => selectNode(page, 'p-flyout >>> dialog');
const getHeader = () => selectNode(page, 'p-flyout >>> .header');
const getHeaderSlottedContent = () => selectNode(page, '[slot="header"]');
const getFooter = () => selectNode(page, 'p-flyout >>> .footer');
const getFooterSlottedContent = () => selectNode(page, '[slot="footer"]');
const getSubFooter = () => selectNode(page, 'p-flyout >>> .sub-footer');
const getSubFooterSlottedContent = () => selectNode(page, '[slot="sub-footer"]');
const getFlyoutDismissButton = () => selectNode(page, 'p-flyout >>> p-button-pure.dismiss');
const getFlyoutDismissButtonReal = () => selectNode(page, 'p-flyout >>> p-button-pure.dismiss >>> button');
const getBodyStyle = async () => getAttribute(await selectNode(page, 'body'), 'style');
const getFlyoutVisibility = async () => await getElementStyle(await getFlyout(), 'visibility');
const waitForFlyoutTransition = async () => {
  await new Promise((resolve) => setTimeout(resolve, CSS_TRANSITION_DURATION));
};
const waitForSlotChange = () => new Promise((resolve) => setTimeout(resolve));

const initBasicFlyout = (
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

const initAdvancedFlyout = async () => {
  const header = '<div slot="header"><button id="btn-header">Header button</button></div>';
  const footer = '<div slot="footer"><button id="btn-footer">Content button</button></div>';
  const content = '<button id="btn-content">Content button</button>';
  const subFooter = '<div slot="sub-footer"><button id="btn-sub-footer">Content button</button></div>';
  await initBasicFlyout({ open: false }, { header: header, footer: footer, content: content, subFooter: subFooter });
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

const scrollFlyoutTo = async (selector: string) =>
  await page.evaluate(
    (el) => {
      el.scrollIntoView();
    },
    await selectNode(page, selector)
  );

const expectDismissButtonToBeFocused = async (failMessage?: string) => {
  const host = await getHost();
  expect(await getActiveElementTagNameInShadowRoot(host), failMessage).toBe('P-BUTTON-PURE');
  expect(await getActiveElementClassNameInShadowRoot(host), failMessage).toContain('dismiss');
};

it('should render and be visible when open', async () => {
  await initBasicFlyout({ open: true });
  expect(await getFlyout()).not.toBeNull();
  expect(await getFlyoutVisibility()).toBe('visible');
});

it('should not be visible when not open', async () => {
  await initBasicFlyout({ open: false });
  expect(await getFlyoutVisibility()).toBe('hidden');
});

it('should be visible after opened', async () => {
  await initBasicFlyout({ open: false });
  const host = await getHost();
  await setProperty(host, 'open', true);

  expect(await getFlyoutVisibility()).toBe('visible');
});

it('should have correct transform when opened and dismissed', async () => {
  await initBasicFlyout({ open: false });
  const getFlyoutTransform = async () => getElementStyle(await getFlyout(), 'transform', { waitForTransition: true });

  const initialFlyoutTransform = await getFlyoutTransform();
  expect(initialFlyoutTransform).toBe(`matrix(1, 0, 0, 1, ${flyoutMinWidth}, 0)`);

  await openFlyout();

  const openFlyoutTransform = await getFlyoutTransform();
  expect(openFlyoutTransform).toBe('none');
  expect(initialFlyoutTransform).not.toBe(openFlyoutTransform);

  await dismissFlyout();
  // TODO: why is timeout needed? transition durations should be overwritten with 0s
  await waitForFlyoutTransition();
  const finalFlyoutTransform = await getFlyoutTransform();
  expect(finalFlyoutTransform).toBe(initialFlyoutTransform);
});

describe('scroll shadows', () => {
  it('should have header scroll shadow when header slot is used and scrolled down', async () => {
    await initBasicFlyout(
      { open: true },
      {
        header: '<div slot="header">Some Heading</div>',
        content: '<div style="height: 200vh">Some Content</div>',
        subFooter: '<div slot="sub-footer" class="scroll-here">Some Content</div>',
      }
    );
    const header = await getHeader();
    expect(await getElementStyle(header, 'boxShadow'), 'initial').toBe('none');

    await scrollFlyoutTo('.scroll-here');

    await page.waitForFunction(
      (el) => getComputedStyle(el).boxShadow === 'rgba(204, 204, 204, 0.35) 0px 5px 10px 0px',
      {},
      await getHeader()
    );
    expect(await getElementStyle(header, 'boxShadow'), 'after scroll outside threshold').toBe(
      'rgba(204, 204, 204, 0.35) 0px 5px 10px 0px'
    );
  });

  it('should not have footer shadow when content is not scrollable', async () => {
    await initBasicFlyout(
      { open: true },
      {
        footer: '<div slot="footer"><button>Some Footer</button></div>',
        content: '<div>Some Content</div>',
      }
    );
    const footer = await getFooter();
    expect(await getElementStyle(footer, 'boxShadow')).toBe('none');
  });

  it('footer scroll shadow with sub-footer content', async () => {
    await initBasicFlyout(
      { open: true },
      {
        footer: '<div slot="footer"><button>Some Footer</button></div>',
        content: '<div style="height: 100vh">Some Content</div>',
        subFooter: '<div slot="sub-footer">Sub Footer Content<span class="scroll-here"></span></div>',
      }
    );
    const footer = await getFooter();
    expect(await getElementStyle(footer, 'boxShadow'), 'before scroll').toBe(
      'rgba(204, 204, 204, 0.35) 0px -5px 10px 0px'
    );

    await scrollFlyoutTo('.scroll-here');
    await page.waitForFunction((el) => getComputedStyle(el).boxShadow === 'none', {}, footer);
    expect(await getElementStyle(footer, 'boxShadow'), 'after scroll').toBe('none');
  });
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
    await page.mouse.up();

    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });

  it('should not be dismissed if mousedown inside flyout and mouseup inside backdrop', async () => {
    await page.mouse.move(1800, 400);
    await page.mouse.down();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(0);

    await page.mouse.move(5, 5);
    await page.mouse.up();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(1);
  });

  it('should not bubble dismiss event', async () => {
    const body = await selectNode(page, 'body');
    await addEventListener(body, 'dismiss');
    await page.mouse.move(5, 5);
    await page.mouse.down();
    await page.mouse.up();

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

  // TODO: Disabled for now since dismiss button focus is not working properly in e2e test scenario
  xit('should have correct focus order when there are focusable elements in header, content, footer and sub-footer', async () => {
    await initAdvancedFlyout();
    await openFlyout();

    await expectDismissButtonToBeFocused();
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-header');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-content');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-footer');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-sub-footer');
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused();
  });

  // TODO: Disabled for now since tabbing is not working properly in e2e test scenario
  xit('should not allow focusing element behind of flyout when pressing Tab', async () => {
    await initBasicFlyout({ open: false });
    await addButtonsBeforeAndAfterFlyout();
    await openFlyout();

    expect(await getActiveElementTagName(page)).toBe('P-FLYOUT');
    await expectDismissButtonToBeFocused();
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('BODY');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('P-FLYOUT');
    await expectDismissButtonToBeFocused();
  });

  it('should not allow focusing element behind of flyout when pressing Shift Tab', async () => {
    await initBasicFlyout({ open: false });
    await addButtonsBeforeAndAfterFlyout();
    await openFlyout();

    expect(await getActiveElementTagName(page)).toBe('P-FLYOUT');
    await expectDismissButtonToBeFocused();
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('BODY');
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('P-FLYOUT');
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
    await waitForStencilLifecycle(page);

    expect(await getFlyoutVisibility(), 'initial').toBe('hidden');
    expect(await getActiveElementTagName(page)).toBe('BODY');

    await (await selectNode(page, '#btn-open')).click();
    await waitForStencilLifecycle(page);

    expect(await getFlyoutVisibility()).toBe('visible');

    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);

    // TODO: why is timeout needed? transition durations should be overwritten with 0s
    // TODO: Check why this is taking so much time?
    await waitForFlyoutTransition(); // Necessary extra time

    expect(await getFlyoutVisibility(), 'after escape').toBe('hidden');
    expect(await getActiveElementId(page)).toBe('btn-open');
  });

  it('should focus element after flyout when open accordion contains link but flyout is not open', async () => {
    await initBasicFlyout(
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

describe('after content change', () => {
  it('should focus dismiss button again', async () => {
    await initAdvancedFlyout();
    await openFlyout();
    await expectDismissButtonToBeFocused('initially');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'after 1st tab').toBe('btn-header');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'after 2nd tab').toBe('btn-content');

    const host = await getHost();
    await host.evaluate((el) => {
      el.innerHTML = '<button id="btn-new">New Button</button>';
    });
    await waitForSlotChange();
    await expectDismissButtonToBeFocused('after slot change');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'after content change 1nd tab').toBe('btn-new');
  });

  xit('should not allow focusing element behind of flyout', async () => {
    await initAdvancedFlyout();
    await addButtonsBeforeAndAfterFlyout();
    await openFlyout();
    await expectDismissButtonToBeFocused('initially');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'after 1st tab').toBe('btn-header');

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

  // TODO: Disabled for now since focusing is not working properly in e2e test scenario
  xit('should correctly focus dismiss button from appended focusable element', async () => {
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
    await expectDismissButtonToBeFocused('finally');
  });
});

describe('can be controlled via keyboard', () => {
  // TODO: Disabled for now since tabbing is not working properly in e2e test scenario
  xit('should cycle tab events within flyout', async () => {
    await initAdvancedFlyout();
    await openFlyout();
    await expectDismissButtonToBeFocused('initially');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-header');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-content');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-footer');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-sub-footer');
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused('finally');
  });

  // TODO: Disabled for now since tabbing is not working properly in e2e test scenario
  xit('should reverse cycle tab events within flyout', async () => {
    await initAdvancedFlyout();
    await openFlyout();
    await expectDismissButtonToBeFocused('initially');

    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-sub-footer');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-footer');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-content');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-header');
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused('finally');
    await page.keyboard.up('ShiftLeft');
  });
});

it('should open flyout at scroll top position zero when its content is scrollable', async () => {
  await initBasicFlyout({ open: true }, { content: '<div style="height: 150vh;"></div>' });

  const host = await getHost();
  const hostScrollTop = await host.evaluate((el) => el.scrollTop);

  expect(hostScrollTop).toBe(0);
});

describe('scroll lock', () => {
  const bodyLockedStyle = 'overflow: hidden;';

  it('should prevent page from scrolling when open', async () => {
    await initBasicFlyout({ open: false });
    expect(await getBodyStyle()).toBe(null);

    await openFlyout();
    expect(await getBodyStyle()).toBe(bodyLockedStyle);

    await setProperty(await getHost(), 'open', false);
    await waitForStencilLifecycle(page);
    expect(await getBodyStyle()).toBe('');
  });

  it('should prevent page from scrolling when initially open', async () => {
    await initBasicFlyout({ open: true });
    expect(await getBodyStyle()).toBe(bodyLockedStyle);
  });

  it('should remove overflow hidden from body if unmounted', async () => {
    await initBasicFlyout({ open: true });
    expect(await getBodyStyle()).toBe(bodyLockedStyle);

    await page.evaluate(() => {
      document.querySelector('p-flyout').remove();
    });
    await waitForStencilLifecycle(page);

    expect(await getBodyStyle()).toBe('');
  });
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
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-flyout'], 'componentDidUpdate: p-flyout').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

describe('slotted', () => {
  it('should set slotted header, footer, sub-footer', async () => {
    const headerContent = '<h1>Sticky Heading</h1><p>Sticky header text</p>';
    const footerContent = '<button>Footer Button</button>';
    const subFooterContent = '<p>Sub Footer Content</p>';
    await initBasicFlyout(
      { open: true },
      {
        header: `<div slot="header">${headerContent}</div>`,
        footer: `<div slot="footer">${footerContent}</div>`,
        subFooter: `<div slot="sub-footer">${subFooterContent}</div>`,
      }
    );
    const header = await getHeader();
    const headerSlottedContent = await getHeaderSlottedContent();
    expect(await getProperty(header, 'innerHTML')).toMatchInlineSnapshot(
      `"<p-button-pure class="dismiss hydrated">Dismiss flyout</p-button-pure><slot name="header"></slot>"`
    );
    expect(await getProperty(headerSlottedContent, 'innerHTML')).toMatchInlineSnapshot(
      `"<h1>Sticky Heading</h1><p>Sticky header text</p>"`
    );

    const footer = await getFooter();
    const footerSlottedContent = await getFooterSlottedContent();
    expect(await getProperty(footer, 'innerHTML')).toMatchInlineSnapshot(`"<slot name="footer"></slot>"`);
    expect(await getProperty(footerSlottedContent, 'innerHTML')).toMatchInlineSnapshot(
      `"<button>Footer Button</button>"`
    );

    const subFooter = await getSubFooter();
    const subFooterSlottedContent = await getSubFooterSlottedContent();
    expect(await getProperty(subFooter, 'innerHTML')).toMatchInlineSnapshot(`"<slot name="sub-footer"></slot>"`);
    expect(await getProperty(subFooterSlottedContent, 'innerHTML')).toMatchInlineSnapshot(
      `"<p>Sub Footer Content</p>"`
    );
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

  it('should overwrite aria-label when adding aria prop', async () => {
    await initBasicFlyout({ open: false, aria: "{'aria-label': 'Some Heading'}" });
    const host = await getHost();
    const flyout = await getFlyout();
    await setProperty(host, 'aria', "{'aria-label': 'Other Heading'}");
    await waitForStencilLifecycle(page);

    expect(await getProperty(flyout, 'ariaLabel')).toBe('Other Heading');
  });
});
