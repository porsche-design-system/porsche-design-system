import {
  addEventListener,
  getActiveElementClassNameInShadowRoot,
  getActiveElementProp,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getElementStyle,
  getEventSummary,
  getHTMLAttributes,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { ElementHandle, Page } from 'puppeteer';
import { Components } from '@porsche-design-system/components';

let page: Page;
const CSS_TRANSITION_DURATION = 600; // motionDurationLong
const flyoutMinWidth = 320;

beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-flyout-navigation');
const getFlyoutNavigation = () => selectNode(page, 'p-flyout-navigation >>> dialog');
const getFlyoutNavigationDismissButton = () => selectNode(page, 'p-flyout-navigation >>> p-button-pure.dismiss');
const getFlyoutNavigationDismissButtonReal = () =>
  selectNode(page, 'p-flyout-navigation >>> p-button-pure.dismiss >>> button');
const getBodyStyle = async () => getAttribute(await selectNode(page, 'body'), 'style');
const getFlyoutVisibility = async () => await getElementStyle(await getFlyoutNavigation(), 'visibility');
const waitForFlyoutTransition = async () => {
  await new Promise((resolve) => setTimeout(resolve, CSS_TRANSITION_DURATION));
};
const waitForSlotChange = () => new Promise((resolve) => setTimeout(resolve));

const initBasicFlyoutNavigation = (
  flyoutNavigationProps: Components.PFlyout = {
    open: true,
  },
  items?: {
    amount?: number;
  },
  other?: {
    markupBefore?: string;
    markupAfter?: string;
  }
): Promise<void> => {
  const { markupBefore = '', markupAfter = '' } = other || {};
  const { amount = 3 } = items || {};

  const flyoutMarkup = `
<p-flyout-navigation ${getHTMLAttributes(flyoutNavigationProps)}>
  ${[...Array(amount)].map((_, i) => `<p-flyout-navigation-item identifier="item-${i}">${links}<`)}
  <p-flyout-navigation-item identifier="item-1">
    <h3>Some heading</h3>
    <a href="#some-anchor">Some anchor</a>
    <a href="#some-anchor">Some anchor</a>
    <a href="#some-anchor">Some anchor</a>
  </p-flyout-navigation-item>
</p-flyout-navigation>`;

  return setContentWithDesignSystem(page, [markupBefore, flyoutMarkup, markupAfter].filter(Boolean).join('\n'));
};

const openFlyoutNavigation = async () => {
  await setProperty(await getHost(), 'open', true);
  await waitForStencilLifecycle(page);
};

const dismissFlyoutNavigation = async () => {
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
  await initBasicFlyoutNavigation({ open: true });
  expect(await getFlyoutNavigation()).not.toBeNull();
  expect(await getFlyoutVisibility()).toBe('visible');
});

it('should not be visible when not open', async () => {
  await initBasicFlyoutNavigation({ open: false });
  expect(await getFlyoutVisibility()).toBe('hidden');
});

it('should be visible after opened', async () => {
  await initBasicFlyoutNavigation({ open: false });
  const host = await getHost();
  await setProperty(host, 'open', true);

  expect(await getFlyoutVisibility()).toBe('visible');
});

it('should have correct transform when opened and dismissed', async () => {
  await initBasicFlyoutNavigation({ open: false });
  const getFlyoutTransform = async () =>
    getElementStyle(await getFlyoutNavigation(), 'transform', { waitForTransition: true });

  const initialFlyoutTransform = await getFlyoutTransform();
  expect(initialFlyoutTransform).toBe(`matrix(1, 0, 0, 1, -537, 0)`);

  await openFlyoutNavigation();

  const openFlyoutTransform = await getFlyoutTransform();
  expect(openFlyoutTransform).toBe('matrix(1, 0, 0, 1, 0, 0)');
  expect(initialFlyoutTransform).not.toBe(openFlyoutTransform);

  await dismissFlyoutNavigation();
  const finalFlyoutTransform = await getFlyoutTransform();
  expect(finalFlyoutTransform).toBe(initialFlyoutTransform);
});

describe('can be dismissed', () => {
  it('should not be closed if content is scrollable and mousedown is inside area of scroll track', async () => {
    await initBasicFlyoutNavigation({ open: true }, '<div style="height: 150vh;"></div>');

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
    await initBasicFlyoutNavigation();
    host = await getHost();
    await addEventListener(host, 'dismiss');
  });

  it('should be closable via x button', async () => {
    const dismissBtn = await getFlyoutNavigationDismissButton();
    const dismissBtnReal = await getFlyoutNavigationDismissButtonReal();
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

  // fit('should be closable via backdrop', async () => {
  //   await page.setViewport({ width: 800, height: 600 });
  //   await page.mouse.move(799, 599);
  //   await page.mouse.down();
  //
  //   expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(1);
  //
  //   await page.mouse.up();
  //
  //   expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(1);
  // });

  it('should not be dismissed if mousedown inside flyout', async () => {
    await page.mouse.move(5, 5);
    await page.mouse.down();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(0);

    await page.mouse.up();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(0);
  });

  // it('should not be dismissed if mousedown inside flyout and mouseup inside backdrop', async () => {
  //   await page.mouse.move(5, 5);
  //   await page.mouse.down();
  //
  //   expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(0);
  //
  //   await page.mouse.move(1000, 400);
  //   await page.mouse.up();
  //
  //   expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(0);
  // });
  //
  // it('should not bubble dismiss event', async () => {
  //   const body = await selectNode(page, 'body');
  //   await addEventListener(body, 'dismiss');
  //   await page.mouse.move(1000, 400);
  //   await page.mouse.down();
  //
  //   expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  //   expect((await getEventSummary(body, 'dismiss')).counter).toBe(0);
  // });
});

fdescribe('focus behavior', () => {
  it('should focus dismiss button after open', async () => {
    await initBasicFlyoutNavigation({ open: false });
    await openFlyoutNavigation();
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused();
  });

  it('should have correct focus order in level 1 when level 2 is closed', async () => {
    await initBasicFlyoutNavigation({ open: false });
    await openFlyoutNavigation();
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused();
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('p-flyout-navigation-item');
    expect(await getActiveElementProp(page, 'identifier')).toBe('item-1');
  });
  //   it('should have correct focus order when there are focusable elements in header, content, footer and sub-footer', async () => {
  //     await initAdvancedFlyout();
  //     await openFlyout();
  //
  //     await expectDismissButtonToBeFocused();
  //     await page.keyboard.press('Tab');
  //     expect(await getActiveElementId(page)).toBe('btn-header');
  //     await page.keyboard.press('Tab');
  //     expect(await getActiveElementId(page)).toBe('btn-content');
  //     await page.keyboard.press('Tab');
  //     expect(await getActiveElementId(page)).toBe('btn-footer');
  //     await page.keyboard.press('Tab');
  //     expect(await getActiveElementId(page)).toBe('btn-sub-footer');
  //     await page.keyboard.press('Tab');
  //     await expectDismissButtonToBeFocused();
  //   });
  //
  //   it('should not allow focusing element behind of flyout when pressing Tab', async () => {
  //     await initBasicFlyout({ open: false });
  //     await addButtonsBeforeAndAfterFlyout();
  //     await openFlyout();
  //
  //     await expectDismissButtonToBeFocused();
  //     await page.keyboard.press('Tab');
  //     await expectDismissButtonToBeFocused();
  //     await page.keyboard.press('Tab');
  //     await expectDismissButtonToBeFocused();
  //   });
  //
  //   it('should not allow focusing element behind of flyout when pressing Shift Tab', async () => {
  //     await initBasicFlyout({ open: false });
  //     await addButtonsBeforeAndAfterFlyout();
  //     await openFlyout();
  //
  //     await expectDismissButtonToBeFocused();
  //     await page.keyboard.down('Shift');
  //     await page.keyboard.press('Tab');
  //     await expectDismissButtonToBeFocused();
  //     await page.keyboard.press('Tab');
  //     await expectDismissButtonToBeFocused();
  //   });
  //
  //   it('should focus last focused element after flyout is dismissed', async () => {
  //     await setContentWithDesignSystem(
  //       page,
  //       `
  //       <button id="btn-open"></button>
  //       <p-flyout id="flyout">
  //         Some Content
  //       </p-flyout>
  //       <script>
  //         const flyout = document.getElementById('flyout');
  //         document.getElementById('btn-open').addEventListener('click', () => {
  //           flyout.open = true;
  //         });
  //         flyout.addEventListener('dismiss', () => {
  //           flyout.open = false;
  //         });
  //       </script>`
  //     );
  //     await waitForStencilLifecycle(page);
  //
  //     expect(await getFlyoutVisibility(), 'initial').toBe('hidden');
  //     expect(await getActiveElementTagName(page)).toBe('BODY');
  //
  //     await (await selectNode(page, '#btn-open')).click();
  //     await waitForStencilLifecycle(page);
  //
  //     expect(await getFlyoutVisibility()).toBe('visible');
  //
  //     await page.keyboard.press('Escape');
  //     await waitForStencilLifecycle(page);
  //
  //     // TODO: why is timeout needed? transition durations should be overwritten with 0s
  //     // TODO: Check why this is taking so much time?
  //     await waitForFlyoutTransition(); // Necessary extra time
  //
  //     expect(await getFlyoutVisibility(), 'after escape').toBe('hidden');
  //     expect(await getActiveElementId(page)).toBe('btn-open');
  //   });
  //
  //   it('should focus element after flyout when open accordion contains link but flyout is not open', async () => {
  //     await initBasicFlyout(
  //       { open: false },
  //       {
  //         content: `<p-accordion heading="Some Heading" open="true">
  //   <a id="inside" href="#inside-flyout">Some anchor inside flyout</a>
  // </p-accordion>`,
  //       },
  //       {
  //         markupBefore: '<a id="before" href="#before-flyout">Some anchor before flyout</a>',
  //         markupAfter: '<a id="after" href="#after-flyout">Some anchor after flyout</a>',
  //       }
  //     );
  //
  //     await page.keyboard.press('Tab');
  //     expect(await getActiveElementId(page), 'after 1st tab').toBe('before');
  //
  //     await page.keyboard.press('Tab');
  //     await page.waitForFunction(() => document.activeElement === document.querySelector('#after'));
  //     expect(await getActiveElementId(page), 'after 2nd tab').toBe('after');
  //   });
});
//
// describe('after content change', () => {
//   it('should focus dismiss button again', async () => {
//     await initAdvancedFlyout();
//     await openFlyout();
//     await expectDismissButtonToBeFocused('initially');
//
//     await page.keyboard.press('Tab');
//     expect(await getActiveElementId(page), 'after 1st tab').toBe('btn-header');
//     await page.keyboard.press('Tab');
//     expect(await getActiveElementId(page), 'after 2nd tab').toBe('btn-content');
//
//     const host = await getHost();
//     await host.evaluate((el) => {
//       el.innerHTML = '<button id="btn-new">New Button</button>';
//     });
//     await waitForSlotChange();
//     await expectDismissButtonToBeFocused('after slot change');
//     await page.keyboard.press('Tab');
//     expect(await getActiveElementId(page), 'after content change 1nd tab').toBe('btn-new');
//   });
//
//   it('should not allow focusing element behind of flyout', async () => {
//     await initAdvancedFlyout();
//     await addButtonsBeforeAndAfterFlyout();
//     await openFlyout();
//     await expectDismissButtonToBeFocused('initially');
//     await page.keyboard.press('Tab');
//     expect(await getActiveElementId(page), 'after 1st tab').toBe('btn-header');
//
//     const host = await getHost();
//     await host.evaluate((el) => {
//       el.innerHTML = '';
//     });
//     await waitForSlotChange();
//     await expectDismissButtonToBeFocused('after content change');
//
//     await page.keyboard.press('Tab');
//     await expectDismissButtonToBeFocused('after content change 1st tab');
//
//     await page.keyboard.press('Tab');
//     await expectDismissButtonToBeFocused('after content change 2nd tab');
//   });
//
//   it('should correctly focus dismiss button from appended focusable element', async () => {
//     await initAdvancedFlyout();
//     await openFlyout();
//
//     const host = await getHost();
//     await host.evaluate((el) => {
//       const button = document.createElement('button');
//       button.innerText = 'New Button';
//       button.id = 'btn-new';
//       el.append(button);
//     });
//     await waitForSlotChange();
//     await expectDismissButtonToBeFocused('after button appended');
//
//     await page.keyboard.press('Tab');
//     expect(await getActiveElementId(page)).toBe('btn-header');
//     await page.keyboard.press('Tab');
//     expect(await getActiveElementId(page)).toBe('btn-content');
//     await page.keyboard.press('Tab');
//     expect(await getActiveElementId(page)).toBe('btn-new');
//     await page.keyboard.press('Tab');
//     expect(await getActiveElementId(page)).toBe('btn-footer');
//     await page.keyboard.press('Tab');
//     expect(await getActiveElementId(page)).toBe('btn-sub-footer');
//     await page.keyboard.press('Tab');
//     await expectDismissButtonToBeFocused('finally');
//   });
// });
//
// describe('can be controlled via keyboard', () => {
//   it('should cycle tab events within flyout', async () => {
//     await initAdvancedFlyout();
//     await openFlyout();
//     await expectDismissButtonToBeFocused('initially');
//
//     await page.keyboard.press('Tab');
//     expect(await getActiveElementId(page)).toBe('btn-header');
//     await page.keyboard.press('Tab');
//     expect(await getActiveElementId(page)).toBe('btn-content');
//     await page.keyboard.press('Tab');
//     expect(await getActiveElementId(page)).toBe('btn-footer');
//     await page.keyboard.press('Tab');
//     expect(await getActiveElementId(page)).toBe('btn-sub-footer');
//     await page.keyboard.press('Tab');
//     await expectDismissButtonToBeFocused('finally');
//   });
//
//   it('should reverse cycle tab events within flyout', async () => {
//     await initAdvancedFlyout();
//     await openFlyout();
//     await expectDismissButtonToBeFocused('initially');
//
//     await page.keyboard.down('ShiftLeft');
//     await page.keyboard.press('Tab');
//     expect(await getActiveElementId(page)).toBe('btn-sub-footer');
//     await page.keyboard.press('Tab');
//     expect(await getActiveElementId(page)).toBe('btn-footer');
//     await page.keyboard.press('Tab');
//     expect(await getActiveElementId(page)).toBe('btn-content');
//     await page.keyboard.press('Tab');
//     expect(await getActiveElementId(page)).toBe('btn-header');
//     await page.keyboard.press('Tab');
//     await expectDismissButtonToBeFocused('finally');
//     await page.keyboard.up('ShiftLeft');
//   });
// });
//
// it('should open flyout at scroll top position zero when its content is scrollable', async () => {
//   await initBasicFlyout({ open: true }, { content: '<div style="height: 150vh;"></div>' });
//
//   const host = await getHost();
//   const hostScrollTop = await host.evaluate((el) => el.scrollTop);
//
//   expect(hostScrollTop).toBe(0);
// });
//
// describe('scroll lock', () => {
//   describe('Desktop Browser', () => {
//     const bodyLockedStyle = 'overflow: hidden;';
//
//     it('should prevent page from scrolling when open', async () => {
//       await initBasicFlyout({ open: false });
//       expect(await getBodyStyle()).toBe(null);
//
//       await openFlyout();
//       expect(await getBodyStyle()).toBe(bodyLockedStyle);
//
//       await setProperty(await getHost(), 'open', false);
//       await waitForStencilLifecycle(page);
//       expect(await getBodyStyle()).toBe('');
//     });
//
//     it('should prevent page from scrolling when initially open', async () => {
//       await initBasicFlyout({ open: true });
//       expect(await getBodyStyle()).toBe(bodyLockedStyle);
//     });
//
//     it('should remove overflow hidden from body if unmounted', async () => {
//       await initBasicFlyout({ open: true });
//       expect(await getBodyStyle()).toBe(bodyLockedStyle);
//
//       await page.evaluate(() => {
//         document.querySelector('p-flyout').remove();
//       });
//       await waitForStencilLifecycle(page);
//
//       expect(await getBodyStyle()).toBe('');
//     });
//   });
//
//   describe('iOS Safari', () => {
//     const bodyLockedStyleIOS = 'top: 0px; overflow-y: scroll; position: fixed;';
//
//     it('should prevent page from scrolling when open', async () => {
//       await page.setUserAgent(
//         'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
//       );
//
//       await initBasicFlyout({ open: false });
//       expect(await getBodyStyle()).toBe(null);
//
//       await openFlyout();
//       expect(await getBodyStyle()).toBe(bodyLockedStyleIOS);
//
//       await setProperty(await getHost(), 'open', false);
//       await waitForStencilLifecycle(page);
//       expect(await getBodyStyle()).toBe('');
//     });
//
//     it('should not override body styles on prop change', async () => {
//       await page.setUserAgent(
//         'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
//       );
//
//       await initBasicFlyout({ open: false }, {}, { markupBefore: '<div style="height: 2000px;"></div>' });
//       expect(await getBodyStyle()).toBe(null);
//
//       await page.evaluate(() => {
//         window.scrollTo(0, 500);
//       });
//
//       await openFlyout();
//       expect(await getBodyStyle()).toBe('top: -500px; overflow-y: scroll; position: fixed;');
//
//       await setProperty(await getHost(), 'aria', "{'aria-label': 'Other Heading'}");
//       expect(await getBodyStyle()).toBe('top: -500px; overflow-y: scroll; position: fixed;');
//     });
//
//     it('should not override body styles on slot change', async () => {
//       await page.setUserAgent(
//         'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
//       );
//       await initBasicFlyout({ open: false }, {}, { markupBefore: '<div style="height: 2000px;"></div>' });
//       const host = await getHost();
//       await page.evaluate(() => {
//         window.scrollTo(0, 500);
//       });
//
//       expect(await getBodyStyle()).toBe(null);
//
//       await openFlyout();
//       expect(await getBodyStyle()).toBe('top: -500px; overflow-y: scroll; position: fixed;');
//
//       await host.evaluate((el) => {
//         el.innerHTML = '<button id="btn-new">New Button</button>';
//       });
//       expect(await getBodyStyle()).toBe('top: -500px; overflow-y: scroll; position: fixed;');
//     });
//
//     it('should prevent page from scrolling when initially open', async () => {
//       await page.setUserAgent(
//         'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
//       );
//
//       await initBasicFlyout({ open: true });
//       expect(await getBodyStyle()).toBe(bodyLockedStyleIOS);
//     });
//
//     it('should remove overflowY, top and position styles from body if unmounted', async () => {
//       await page.setUserAgent(
//         'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
//       );
//
//       await initBasicFlyout({ open: true });
//       expect(await getBodyStyle()).toBe(bodyLockedStyleIOS);
//
//       await page.evaluate(() => {
//         document.querySelector('p-flyout').remove();
//       });
//       await waitForStencilLifecycle(page);
//
//       expect(await getBodyStyle()).toBe('');
//     });
//   });
// });
//
// describe('lifecycle', () => {
//   it('should work without unnecessary round trips on init', async () => {
//     await initBasicFlyout();
//     const status = await getLifecycleStatus(page);
//
//     expect(status.componentDidLoad['p-flyout'], 'componentDidLoad: p-flyout').toBe(1);
//     expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1); // includes p-icon
//
//     expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
//     expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
//   });
//
//   it('should work without unnecessary round trips after state change', async () => {
//     await initBasicFlyout();
//     const host = await getHost();
//
//     await setProperty(host, 'open', false);
//     await waitForStencilLifecycle(page);
//     const status = await getLifecycleStatus(page);
//
//     expect(status.componentDidUpdate['p-flyout'], 'componentDidUpdate: p-flyout').toBe(1);
//
//     expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
//     expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
//   });
// });
//
// describe('slotted', () => {
//   it('should set slotted header, footer, sub-footer', async () => {
//     const headerContent = '<h1>Sticky Heading</h1><p>Sticky header text</p>';
//     const footerContent = '<button>Footer Button</button>';
//     const subFooterContent = '<p>Sub Footer Content</p>';
//     await initBasicFlyout(
//       { open: true },
//       {
//         header: `<div slot="header">${headerContent}</div>`,
//         footer: `<div slot="footer">${footerContent}</div>`,
//         subFooter: `<div slot="sub-footer">${subFooterContent}</div>`,
//       }
//     );
//     const header = await getHeader();
//     const headerSlottedContent = await getHeaderSlottedContent();
//     expect(await getProperty(header, 'innerHTML')).toMatchInlineSnapshot(
//       `"<p-button-pure class="dismiss hydrated">Dismiss flyout</p-button-pure><slot name="header"></slot>"`
//     );
//     expect(await getProperty(headerSlottedContent, 'innerHTML')).toMatchInlineSnapshot(
//       `"<h1>Sticky Heading</h1><p>Sticky header text</p>"`
//     );
//
//     const footer = await getFooter();
//     const footerSlottedContent = await getFooterSlottedContent();
//     expect(await getProperty(footer, 'innerHTML')).toMatchInlineSnapshot(`"<slot name="footer"></slot>"`);
//     expect(await getProperty(footerSlottedContent, 'innerHTML')).toMatchInlineSnapshot(
//       `"<button>Footer Button</button>"`
//     );
//
//     const subFooter = await getSubFooter();
//     const subFooterSlottedContent = await getSubFooterSlottedContent();
//     expect(await getProperty(subFooter, 'innerHTML')).toMatchInlineSnapshot(`"<slot name="sub-footer"></slot>"`);
//     expect(await getProperty(subFooterSlottedContent, 'innerHTML')).toMatchInlineSnapshot(
//       `"<p>Sub Footer Content</p>"`
//     );
//   });
// });
//
// describe('accessibility', () => {
//   it('should expose correct initial accessibility tree', async () => {
//     await initBasicFlyout();
//     const flyout = await getFlyout();
//
//     await expectA11yToMatchSnapshot(page, flyout, { interestingOnly: false });
//   });
//
//   it('should not expose accessibility tree if flyout is hidden', async () => {
//     await initBasicFlyout({ open: false });
//     const flyout = await getFlyout();
//
//     await expectA11yToMatchSnapshot(page, flyout);
//   });
//
//   it('should overwrite aria-label when adding aria prop', async () => {
//     await initBasicFlyout({ open: false, aria: "{'aria-label': 'Some Heading'}" });
//     const host = await getHost();
//     const flyout = await getFlyout();
//     await setProperty(host, 'aria', "{'aria-label': 'Other Heading'}");
//     await waitForStencilLifecycle(page);
//
//     expect(await getProperty(flyout, 'ariaLabel')).toBe('Other Heading');
//   });
// });
