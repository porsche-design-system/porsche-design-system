import {
  addEventListener,
  expectA11yToMatchSnapshot,
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
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { ElementHandle, Page } from 'puppeteer';
import type { Components } from '@porsche-design-system/components';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-flyout-navigation');
const getFlyoutNavigation = () => selectNode(page, 'p-flyout-navigation >>> dialog');
const getFlyoutNavigationContent = () => selectNode(page, 'p-flyout-navigation >>> .content');
const getFlyoutNavigationDismissButton = () => selectNode(page, 'p-flyout-navigation >>> p-button-pure.dismiss');
const getFlyoutNavigationDismissButtonReal = () =>
  selectNode(page, 'p-flyout-navigation >>> p-button-pure.dismiss >>> button');
const getFlyoutNavigationVisibility = async () => await getElementStyle(await getFlyoutNavigation(), 'visibility');
const getFlyoutNavigationItem = (identifier: string) =>
  selectNode(page, `p-flyout-navigation-item[identifier="${identifier}"]`);
const getFlyoutNavigationItemScroller = (identifier: string) =>
  selectNode(page, `p-flyout-navigation-item[identifier="${identifier}"] >>> .scroller`);
const getFlyoutNavigationItemVisibility = async (identifier: string) =>
  await getElementStyle(await getFlyoutNavigationItemScroller(identifier), 'visibility');
const getBodyStyle = async () => getAttribute(await selectNode(page, 'body'), 'style');

const initBasicFlyoutNavigation = (
  flyoutNavigationProps?: Components.PFlyoutNavigation,
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

  const navigationItemContent = `
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>`;

  const flyoutMarkup = `
<p-flyout-navigation ${getHTMLAttributes(flyoutNavigationProps)}>
  ${[...Array(amount)]
    .map(
      (_, i) =>
        `<p-flyout-navigation-item identifier="item-${i + 1}">${
          content[i] ? content[i] : navigationItemContent
        }</p-flyout-navigation-item>`
    )
    .join('\n')}
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

const expectDismissButtonToBeFocused = async (failMessage?: string) => {
  const host = await getHost();
  expect(await getActiveElementTagNameInShadowRoot(host), failMessage).toBe('P-BUTTON-PURE');
  expect(await getActiveElementClassNameInShadowRoot(host), failMessage).toContain('dismiss');
};

it('should render and be visible when open', async () => {
  await initBasicFlyoutNavigation({ open: true });
  expect(await getFlyoutNavigation()).not.toBeNull();
  expect(await getFlyoutNavigationVisibility()).toBe('visible');
});

it('should not be visible when not open', async () => {
  await initBasicFlyoutNavigation({ open: false });
  expect(await getFlyoutNavigationVisibility()).toBe('hidden');
});

it('should be visible after opened', async () => {
  await initBasicFlyoutNavigation({ open: false });
  const host = await getHost();
  await setProperty(host, 'open', true);

  expect(await getFlyoutNavigationVisibility()).toBe('visible');
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
  let host: ElementHandle;

  beforeEach(async () => {
    await initBasicFlyoutNavigation({ open: true });
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

  it('should be closable via backdrop', async () => {
    await page.setViewport({ width: 800, height: 600 });
    await page.mouse.move(799, 300);

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(0);

    await page.mouse.down();
    await page.mouse.up();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(1);
  });

  it('should not be dismissed if mousedown inside flyout', async () => {
    await page.setViewport({ width: 800, height: 600 });
    await page.mouse.move(5, 5);
    await page.mouse.down();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse down').toBe(0);

    await page.mouse.up();

    expect((await getEventSummary(host, 'dismiss')).counter, 'after mouse up').toBe(0);
  });

  it('should not bubble dismiss event', async () => {
    const body = await selectNode(page, 'body');
    await addEventListener(body, 'dismiss');

    const dismissBtn = await getFlyoutNavigationDismissButton();
    await dismissBtn.click();

    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
    expect((await getEventSummary(body, 'dismiss')).counter).toBe(0);
  });
});

describe('focus behavior', () => {
  it('should focus dismiss button after tab press', async () => {
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
    expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-NAVIGATION-ITEM');
    expect(await getActiveElementProp(page, 'identifier')).toBe('item-1');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-NAVIGATION-ITEM');
    expect(await getActiveElementProp(page, 'identifier')).toBe('item-2');
  });

  it('should have correct focus order when level 2 is open', async () => {
    await initBasicFlyoutNavigation({ open: false, activeIdentifier: 'item-1' });
    await openFlyoutNavigation();

    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused();

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-NAVIGATION-ITEM');
    expect(await getActiveElementProp(page, 'identifier')).toBe('item-1');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('A');
  });

  it('should have correct focus order when level 2 is opened', async () => {
    await initBasicFlyoutNavigation({ open: false });
    await openFlyoutNavigation();

    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused();

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-NAVIGATION-ITEM');
    expect(await getActiveElementProp(page, 'identifier')).toBe('item-1');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-NAVIGATION-ITEM');
    expect(await getActiveElementProp(page, 'identifier')).toBe('item-2');

    await page.keyboard.press('Enter'); // Open second level
    await waitForStencilLifecycle(page);

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('A');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('A');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('A');

    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-NAVIGATION-ITEM');
    expect(await getActiveElementProp(page, 'identifier')).toBe('item-3');
  });

  // Only works in pipeline correctly
  it('should not allow focusing element behind of flyout when pressing Tab', async () => {
    await initBasicFlyoutNavigation({ open: false }, { amount: 0 });
    await addButtonsBeforeAndAfterFlyout();
    await openFlyoutNavigation();

    expect(await getActiveElementTagName(page)).toBe('BODY');
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused();
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('BODY');
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused();
  });

  // Only works in pipeline correctly
  it('should not allow focusing element behind of flyout when pressing Shift Tab', async () => {
    await initBasicFlyoutNavigation({ open: false }, { amount: 0 });
    await addButtonsBeforeAndAfterFlyout();
    await openFlyoutNavigation();

    expect(await getActiveElementTagName(page)).toBe('BODY');
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused();
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('BODY');
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused();
  });

  it('should focus last focused element after flyout is dismissed', async () => {
    await initBasicFlyoutNavigation({ open: false }, {}, { markupBefore: '<button id="btn-open"></button>' });

    expect(await getFlyoutNavigationVisibility(), 'initial').toBe('hidden');
    expect(await getActiveElementTagName(page)).toBe('BODY');

    await page.evaluate(() => {
      const flyout: any = document.querySelector('p-flyout-navigation');
      document.getElementById('btn-open').addEventListener('click', () => {
        flyout.open = true;
      });
      flyout.addEventListener('dismiss', () => {
        flyout.open = false;
      });
    });

    await (await selectNode(page, '#btn-open')).click();
    await waitForStencilLifecycle(page);

    expect(await getFlyoutNavigationVisibility()).toBe('visible');

    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);

    expect(await getFlyoutNavigationVisibility(), 'after escape').toBe('hidden');
    expect(await getActiveElementId(page)).toBe('btn-open');
  });

  it('should not focus flyout content when not open', async () => {
    await initBasicFlyoutNavigation(
      { open: false },
      {},
      { markupBefore: '<button id="btn-before"></button>', markupAfter: '<button id="btn-after"></button>' }
    );
    expect(await getActiveElementTagName(page)).toBe('BODY');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-before');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-after');
  });

  it('should focus element after flyout when open accordion contains link but flyout is not open', async () => {
    await initBasicFlyoutNavigation(
      { open: false },
      {
        content: [
          `<p-accordion heading="Some Heading" open="true">
  <a id="inside" href="#inside-flyout">Some anchor inside flyout</a>
</p-accordion>`,
        ],
      },
      {
        markupBefore: '<a id="before" href="#before-flyout">Some anchor before flyout</a>',
        markupAfter: '<a id="after" href="#after-flyout">Some anchor after flyout</a>',
      }
    );

    console.log(await page.content());

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page), 'after 1st tab').toBe('before');

    await page.keyboard.press('Tab');
    await page.waitForFunction(() => document.activeElement === document.querySelector('#after'));
    expect(await getActiveElementId(page), 'after 2nd tab').toBe('after');
  });
});

describe('second level', () => {
  it('should have hidden second level when no activeIdentifier is set', async () => {
    await initBasicFlyoutNavigation({ open: false });
    await openFlyoutNavigation();
    expect(await getFlyoutNavigationItemVisibility('item-1')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-2')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-3')).toBe('hidden');
  });

  it('should have correct second level open when activeIdentifier is set', async () => {
    await initBasicFlyoutNavigation({ open: false, activeIdentifier: 'item-2' });
    await openFlyoutNavigation();
    expect(await getFlyoutNavigationItemVisibility('item-1')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-2')).toBe('visible');
    expect(await getFlyoutNavigationItemVisibility('item-3')).toBe('hidden');
  });

  it('should change to correct second level open when activeIdentifier is changed', async () => {
    await initBasicFlyoutNavigation({ open: false, activeIdentifier: 'item-2' });
    await openFlyoutNavigation();
    const host = await getHost();
    expect(await getFlyoutNavigationItemVisibility('item-1')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-2')).toBe('visible');
    expect(await getFlyoutNavigationItemVisibility('item-3')).toBe('hidden');

    await setProperty(host, 'activeIdentifier', 'item-3');
    await waitForStencilLifecycle(page);

    expect(await getFlyoutNavigationItemVisibility('item-1')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-2')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-3')).toBe('visible');
  });

  it('should open correct second level on Click', async () => {
    await initBasicFlyoutNavigation({ open: false });
    await openFlyoutNavigation();
    expect(await getFlyoutNavigationItemVisibility('item-1')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-2')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-3')).toBe('hidden');

    const item1 = await getFlyoutNavigationItem('item-1');
    await item1.click();
    await waitForStencilLifecycle(page);

    expect(await getFlyoutNavigationItemVisibility('item-1')).toBe('visible');
    expect(await getFlyoutNavigationItemVisibility('item-2')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-3')).toBe('hidden');

    const item3 = await getFlyoutNavigationItem('item-3');
    await item3.click();
    await waitForStencilLifecycle(page);

    expect(await getFlyoutNavigationItemVisibility('item-1')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-2')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-3')).toBe('visible');
  });

  it('should open second level on Enter', async () => {
    await initBasicFlyoutNavigation({ open: false });
    await openFlyoutNavigation();
    expect(await getActiveElementTagName(page)).toBe('BODY');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-NAVIGATION-ITEM');
    expect(await getActiveElementProp(page, 'identifier')).toBe('item-1');
    expect(await getFlyoutNavigationItemVisibility('item-1')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-2')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-3')).toBe('hidden');

    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);
    expect(await getFlyoutNavigationItemVisibility('item-1')).toBe('visible');
    expect(await getFlyoutNavigationItemVisibility('item-2')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-3')).toBe('hidden');
  });

  it('should open second level on Space', async () => {
    await initBasicFlyoutNavigation({ open: false });
    await openFlyoutNavigation();
    expect(await getActiveElementTagName(page)).toBe('BODY');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('P-FLYOUT-NAVIGATION-ITEM');
    expect(await getActiveElementProp(page, 'identifier')).toBe('item-1');
    expect(await getFlyoutNavigationItemVisibility('item-1')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-2')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-3')).toBe('hidden');

    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);
    expect(await getFlyoutNavigationItemVisibility('item-1')).toBe('visible');
    expect(await getFlyoutNavigationItemVisibility('item-2')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-3')).toBe('hidden');
  });
});

describe('activeIdentifier', () => {
  it('should emit update event when activeIdentifier changes by clicking on item', async () => {
    await initBasicFlyoutNavigation({ open: false, activeIdentifier: 'item-2' });
    await openFlyoutNavigation();
    const host = await getHost();
    await addEventListener(host, 'update');

    expect((await getEventSummary(host, 'update')).counter, 'before activeIdentifier change').toBe(0);

    await (await getFlyoutNavigationItem('item-1')).click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after activeIdentifier change').toBe(1);
    expect((await getEventSummary(host, 'update')).details, 'after activeIdentifier change').toEqual([
      { activeIdentifier: 'item-1' },
    ]);
  });
});

describe('slotted', () => {
  it('should open second level of item when item is appended and clicked', async () => {
    await initBasicFlyoutNavigation({ open: true });
    const host = await getHost();

    expect(await getFlyoutNavigationItemVisibility('item-1')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-2')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-3')).toBe('hidden');
    expect(await getFlyoutNavigationItem('item-4')).toBeNull();

    await host.evaluate((el) => {
      const newItem = document.createElement('p-flyout-navigation-item');
      newItem.innerHTML = '<a href="#some-anchor">Some anchor</a>';
      newItem.setAttribute('identifier', 'item-4');
      el.appendChild(newItem);
    });

    const item4 = await getFlyoutNavigationItem('item-4');
    expect(item4).toBeDefined();
    expect(await getFlyoutNavigationItemVisibility('item-1')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-2')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-3')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-4')).toBe('hidden');

    await item4.click();
    await waitForStencilLifecycle(page);
    expect(await getFlyoutNavigationItemVisibility('item-1')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-2')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-3')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-4')).toBe('visible');
  });

  // TODO: Check if warning is logged when validation trigger is implemented
  it('should close second level of active item when item is removed', async () => {
    await initBasicFlyoutNavigation({ open: true, activeIdentifier: 'item-3' });
    const host = await getHost();

    expect(await getFlyoutNavigationItemVisibility('item-1')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-2')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-3')).toBe('visible');

    await host.evaluate((el) => {
      el.removeChild(el.lastElementChild);
    });
    await waitForStencilLifecycle(page);

    expect(await getFlyoutNavigationItemVisibility('item-1')).toBe('hidden');
    expect(await getFlyoutNavigationItemVisibility('item-2')).toBe('hidden');
    expect(await getFlyoutNavigationItem('item-3')).toBeNull();
  });

  // TODO: should this be supported?
  // it('should show correct second level when flyout-navigation-item with currently activeIdentifier is added', async () => {
  //   await initBasicFlyoutNavigation({ open: true, activeIdentifier: 'item-4' });
  //   const host = await getHost();
  //   await waitForStencilLifecycle(page);
  //
  //   expect(getConsoleErrorsAmount()).toBe(1);
  //
  //   await host.evaluate((el) => {
  //     const newItem = document.createElement('p-flyout-navigation-item');
  //     newItem.setAttribute('active-identifier', 'item-4');
  //     el.appendChild(newItem);
  //   });
  //
  //   await waitForStencilLifecycle(page);
  //   expect(await getFlyoutNavigationItemVisibility('item-1')).toBe('hidden');
  //   expect(await getFlyoutNavigationItemVisibility('item-2')).toBe('hidden');
  //   expect(await getFlyoutNavigationItemVisibility('item-3')).toBe('hidden');
  //   expect(await getFlyoutNavigationItemVisibility('item-4')).toBe('visible');
  // });
});

describe('scroll lock', () => {
  describe('Desktop Browser', () => {
    const bodyLockedStyle = 'overflow: hidden;';

    it('should prevent page from scrolling when open', async () => {
      await initBasicFlyoutNavigation({ open: false });
      expect(await getBodyStyle()).toBe(null);

      await openFlyoutNavigation();
      expect(await getBodyStyle()).toBe(bodyLockedStyle);

      await setProperty(await getHost(), 'open', false);
      await waitForStencilLifecycle(page);
      expect(await getBodyStyle()).toBe('');
    });

    it('should prevent page from scrolling when initially open', async () => {
      await initBasicFlyoutNavigation({ open: true });
      expect(await getBodyStyle()).toBe(bodyLockedStyle);
    });

    it('should remove overflow hidden from body if unmounted', async () => {
      await initBasicFlyoutNavigation({ open: true });
      expect(await getBodyStyle()).toBe(bodyLockedStyle);

      await page.evaluate(() => {
        document.querySelector('p-flyout-navigation').remove();
      });
      await waitForStencilLifecycle(page);

      expect(await getBodyStyle()).toBe('');
    });
  });

  describe('iOS Safari', () => {
    const bodyLockedStyleIOS = 'top: 0px; overflow-y: scroll; position: fixed;';

    it('should prevent page from scrolling when open', async () => {
      await page.setUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      );

      await initBasicFlyoutNavigation({ open: false });
      expect(await getBodyStyle()).toBe(null);

      await openFlyoutNavigation();
      expect(await getBodyStyle()).toBe(bodyLockedStyleIOS);

      await setProperty(await getHost(), 'open', false);
      await waitForStencilLifecycle(page);
      expect(await getBodyStyle()).toBe('');
    });

    it('should not override body styles on prop change', async () => {
      await page.setUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      );

      await initBasicFlyoutNavigation({ open: false }, {}, { markupBefore: '<div style="height: 2000px;"></div>' });
      expect(await getBodyStyle()).toBe(null);

      await page.evaluate(() => {
        window.scrollTo(0, 500);
      });

      await openFlyoutNavigation();
      expect(await getBodyStyle()).toBe('top: -500px; overflow-y: scroll; position: fixed;');

      await setProperty(await getHost(), 'aria', "{'aria-label': 'Other Heading'}");
      expect(await getBodyStyle()).toBe('top: -500px; overflow-y: scroll; position: fixed;');
    });

    it('should not override body styles on slot change', async () => {
      await page.setUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      );
      await initBasicFlyoutNavigation({ open: false }, {}, { markupBefore: '<div style="height: 2000px;"></div>' });
      const host = await getHost();
      await page.evaluate(() => {
        window.scrollTo(0, 500);
      });

      expect(await getBodyStyle()).toBe(null);

      await openFlyoutNavigation();
      expect(await getBodyStyle()).toBe('top: -500px; overflow-y: scroll; position: fixed;');

      await host.evaluate((el) => {
        el.innerHTML = '<button id="btn-new">New Button</button>';
      });
      expect(await getBodyStyle()).toBe('top: -500px; overflow-y: scroll; position: fixed;');
    });

    it('should prevent page from scrolling when initially open', async () => {
      await page.setUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      );

      await initBasicFlyoutNavigation({ open: true });
      expect(await getBodyStyle()).toBe(bodyLockedStyleIOS);
    });

    it('should remove overflowY, top and position styles from body if unmounted', async () => {
      await page.setUserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      );

      await initBasicFlyoutNavigation({ open: true });
      expect(await getBodyStyle()).toBe(bodyLockedStyleIOS);

      await page.evaluate(() => {
        document.querySelector('p-flyout-navigation').remove();
      });
      await waitForStencilLifecycle(page);

      expect(await getBodyStyle()).toBe('');
    });
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initBasicFlyoutNavigation({ open: true });
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-flyout-navigation'], 'componentDidLoad: p-flyout-navigation').toBe(1);
    expect(status.componentDidLoad['p-flyout-navigation-item'], 'componentDidLoad: p-flyout-navigation-item').toBe(3);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(7); // 3 item buttons + 3 back buttons + 1 dismiss button
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(7);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(18);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips after clicking item', async () => {
    await initBasicFlyoutNavigation({ open: true });
    const statusBefore = await getLifecycleStatus(page);

    expect(statusBefore.componentDidLoad.all, 'componentDidLoad: all').toBe(18);
    expect(statusBefore.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);

    const item1 = await getFlyoutNavigationItem('item-1');
    await item1.click();
    await waitForStencilLifecycle(page);

    const statusAfter = await getLifecycleStatus(page);

    expect(statusAfter.componentDidUpdate['p-flyout-navigation'], 'componentDidUpdate: p-flyout-navigation').toBe(1);
    expect(
      statusAfter.componentDidUpdate['p-flyout-navigation-item'],
      'componentDidUpdate: p-flyout-navigation-item'
    ).toBe(3);
    expect(statusAfter.componentDidUpdate['p-button-pure'], 'componentDidUpdate: p-button-pure').toBe(1);
    expect(statusAfter.componentDidUpdate.all, 'componentDidUpdate: all').toBe(5);
  });

  it('should work without unnecessary round trips after closing flyout', async () => {
    await initBasicFlyoutNavigation({ open: true });
    const statusBefore = await getLifecycleStatus(page);

    expect(statusBefore.componentDidLoad.all, 'componentDidLoad: all').toBe(18);
    expect(statusBefore.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);

    await dismissFlyoutNavigation();

    const statusAfter = await getLifecycleStatus(page);

    expect(statusAfter.componentDidUpdate['p-flyout-navigation'], 'componentDidUpdate: p-flyout-navigation').toBe(1);
    expect(
      statusAfter.componentDidUpdate['p-flyout-navigation-item'],
      'componentDidUpdate: p-flyout-navigation-item'
    ).toBe(3);
    expect(statusAfter.componentDidUpdate.all, 'componentDidUpdate: all').toBe(4);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initBasicFlyoutNavigation({ open: true });
    const flyout = await getFlyoutNavigation();

    await expectA11yToMatchSnapshot(page, flyout, { interestingOnly: false });
  });

  it('should not expose accessibility tree if flyout is hidden', async () => {
    await initBasicFlyoutNavigation({ open: false });
    const flyout = await getFlyoutNavigation();

    await expectA11yToMatchSnapshot(page, flyout);
  });

  it('should overwrite aria-label when adding aria prop', async () => {
    await initBasicFlyoutNavigation({ open: false, aria: "{'aria-label': 'Some Heading'}" });
    const host = await getHost();
    const flyoutContent = await getFlyoutNavigationContent();
    expect(await getProperty(flyoutContent, 'ariaLabel')).toBe('Some Heading');

    await setProperty(host, 'aria', "{'aria-label': 'Other Heading'}");
    await waitForStencilLifecycle(page);

    expect(await getProperty(flyoutContent, 'ariaLabel')).toBe('Other Heading');
  });
});
