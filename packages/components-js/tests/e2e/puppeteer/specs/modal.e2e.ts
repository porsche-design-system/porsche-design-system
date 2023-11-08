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
import type { ModalAriaAttribute, SelectedAriaAttributes } from '@porsche-design-system/components/dist/types/bundle';
import type { TagName } from '@porsche-design-system/shared';
import { footerShadowClass } from '@porsche-design-system/components/src/components/modal/modal-styles';

let page: Page;
const CSS_TRANSITION_DURATION = 600;

beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-modal');
const getHeader = () => selectNode(page, 'p-modal >>> .header');
const getModal = () => selectNode(page, 'p-modal >>> .root');
const getDismissButton = () => selectNode(page, 'p-modal >>> p-button-pure.dismiss');
const getFooter = () => selectNode(page, 'p-modal >>> .footer');
const getFooterBoxShadow = async (): Promise<string> => getElementStyle(await getFooter(), 'boxShadow');
const getBodyStyle = async () => getAttribute(await selectNode(page, 'body'), 'style');

const initBasicModal = (opts?: {
  isOpen?: boolean;
  content?: string;
  heading?: string;
  aria?: SelectedAriaAttributes<ModalAriaAttribute>;
  hasSlottedHeading?: boolean;
  hasSlottedFooter?: boolean;
  disableCloseButton?: boolean;
  markupBefore?: string;
  markupAfter?: string;
}): Promise<void> => {
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
    `${markupBefore}<p-modal ${attributes}>
  ${hasSlottedHeading ? '<div slot="heading">Some Heading<a href="https://porsche.com">Some link</a></div>' : ''}
  ${content}
  ${hasSlottedFooter ? '<div slot="footer">Some Footer</div>' : ''}
</p-modal>${markupAfter}`
  );
};

const initAdvancedModal = (): Promise<void> => {
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

const openModal = async () => {
  await setProperty(await getHost(), 'open', true);
  await waitForStencilLifecycle(page);
};

const dismissModal = async () => {
  await setProperty(await getHost(), 'open', false);
  await waitForStencilLifecycle(page);
};

const getModalVisibility = async () => await getElementStyle(await getModal(), 'visibility');

const addButtonsBeforeAndAfterModal = () =>
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
  await initBasicModal();
  expect(await getModal()).not.toBeNull();
  expect(await getModalVisibility()).toBe('visible');
});

it('should not be visible when not open', async () => {
  await initBasicModal({ isOpen: false });

  expect(await getModalVisibility()).toBe('hidden');
});

it('should have correct transform when dismissed and opened', async () => {
  await initBasicModal({ isOpen: false });
  const getModalTransform = async () => getElementStyle(await getModal(), 'transform', { waitForTransition: true });

  const initialModalTransform = await getModalTransform();
  expect(initialModalTransform).toBe('matrix(1, 0, 0, 1, 0, 33.5)');

  await openModal();
  const openModalTransform = await getModalTransform();
  expect(openModalTransform).toBe('matrix(1, 0, 0, 1, 0, 0)');
  expect(initialModalTransform).not.toBe(openModalTransform);

  await dismissModal();
  // TODO: why is timeout needed? transition durations should be overwritten with 0s
  await new Promise((resolve) => setTimeout(resolve, CSS_TRANSITION_DURATION)); // transition delay for visibility
  const finalModalTransform = await getModalTransform();
  expect(finalModalTransform).toBe(initialModalTransform);
});

describe('can be dismissed', () => {
  let host: ElementHandle;

  it('should not be closed if content is scrollable and mousedown is inside area of scroll track', async () => {
    await initBasicModal({
      content: '<div style="height: 150vh;"></div>',
    });

    await addEventListener(host, 'close');
    await page.setViewport({ width: 800, height: 600 });
    await page.mouse.move(784, 300);
    await page.mouse.down();

    expect((await getEventSummary(host, 'close')).counter, 'after mouse down').toBe(0);

    await page.mouse.up();

    expect((await getEventSummary(host, 'close')).counter, 'after mouse up').toBe(0);
  });

  beforeEach(async () => {
    await initBasicModal();
    host = await getHost();
    await addEventListener(host, 'close');
  });

  it('should be closed if content is not scrollable and mousedown is inside area of scroll track', async () => {
    await page.setViewport({ width: 800, height: 600 });
    await page.mouse.move(784, 300);
    await page.mouse.down();

    expect((await getEventSummary(host, 'close')).counter, 'after mouse down').toBe(1);

    await page.mouse.up();

    expect((await getEventSummary(host, 'close')).counter, 'after mouse up').toBe(1);
  });

  it('should be closable via x button', async () => {
    const dismissBtn = await getDismissButton();
    expect(dismissBtn).not.toBeNull();

    const dismissBtnReal = await selectNode(page, 'p-modal >>> p-button-pure.dismiss >>> button');
    expect(await getAttribute(dismissBtnReal, 'type')).toBe('button');

    await dismissBtn.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'close')).counter).toBe(1);
  });

  it('should be closable via esc key', async () => {
    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'close')).counter).toBe(1);
  });

  it('should not be closable via esc key when disableCloseButton is set', async () => {
    const host = await getHost();
    await setProperty(host, 'disableCloseButton', true);
    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'close')).counter).toBe(0);
  });

  it('should be closable via backdrop', async () => {
    await page.mouse.move(5, 5);
    await page.mouse.down();

    expect((await getEventSummary(host, 'close')).counter, 'after mouse down').toBe(1);

    await page.mouse.up();

    expect((await getEventSummary(host, 'close')).counter, 'after mouse up').toBe(1);
  });

  it('should not be dismissed if mousedown inside modal', async () => {
    await page.mouse.move(960, 400);
    await page.mouse.down();

    expect((await getEventSummary(host, 'close')).counter, 'after mouse down').toBe(0);

    await page.mouse.up();

    expect((await getEventSummary(host, 'close')).counter, 'after mouse up').toBe(0);
  });

  it('should not be dismissed if mousedown inside modal and mouseup inside backdrop', async () => {
    await page.mouse.move(960, 400);
    await page.mouse.down();

    expect((await getEventSummary(host, 'close')).counter, 'after mouse down').toBe(0);

    await page.mouse.move(5, 5);
    await page.mouse.up();

    expect((await getEventSummary(host, 'close')).counter, 'after mouse up').toBe(0);
  });

  it('should not be closable via backdrop when disableBackdropClick is set', async () => {
    const host = await getHost();
    await setProperty(host, 'disableBackdropClick', true);

    await page.mouse.move(5, 5);
    await page.mouse.down();

    expect((await getEventSummary(host, 'close')).counter).toBe(0);
  });

  it('should not bubble close event', async () => {
    const body = await selectNode(page, 'body');
    await addEventListener(body, 'close');
    await page.mouse.move(5, 5);
    await page.mouse.down();

    expect((await getEventSummary(host, 'close')).counter).toBe(1);
    expect((await getEventSummary(body, 'close')).counter).toBe(0);
  });

  it('should emit both close and dismiss event', async () => {
    // close handler in applied via beforeEach
    await addEventListener(host, 'dismiss');
    expect((await getEventSummary(host, 'close')).counter).toBe(0);
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(0);

    const dismissBtn = await getDismissButton();
    await dismissBtn.click();
    expect((await getEventSummary(host, 'close')).counter).toBe(1);
    expect((await getEventSummary(host, 'dismiss')).counter).toBe(1);
  });
});

describe('focus behavior', () => {
  it('should focus dialog after open', async () => {
    await initAdvancedModal();
    await openModal();
    await expectDialogToBeFocused();
  });

  it('should focus dialog after open when there is no focusable content element', async () => {
    await initBasicModal({ isOpen: false });
    await openModal();
    await expectDialogToBeFocused();
  });

  it('should focus dialog after open when there is a focusable content element', async () => {
    await initBasicModal({
      isOpen: false,
      content: `<a href="https://porsche.com">Some link in content</a>`,
      aria: "{'aria-label': 'Some Heading'}",
    });
    await openModal();
    await expectDialogToBeFocused();
  });

  it('should have correct focus order when there is a focusable content element and focusable slotted element in header', async () => {
    await initBasicModal({
      isOpen: false,
      content: `<p-button>Some focusable button in content</p-button>`,
      aria: "{'aria-label': 'Some Heading'}",
      hasSlottedHeading: true,
    });
    await openModal();

    await expectDialogToBeFocused();
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused();
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('A'); // slotted header anchor
    await page.keyboard.press('Tab');
    expect(await getActiveElementTagName(page)).toBe('P-BUTTON'); // slotted content button
  });

  it('should not allow focusing element behind of modal when pressing Tab', async () => {
    await initBasicModal({ isOpen: false, content: '<p-text>Some text content</p-text>' });
    await addButtonsBeforeAndAfterModal();
    await openModal();

    await expectDialogToBeFocused();
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused();
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused();
  });

  it('should not allow focusing element behind of modal when pressing Shift Tab', async () => {
    await initBasicModal({ isOpen: false, content: '<p-text>Some text content</p-text>' });
    await addButtonsBeforeAndAfterModal();
    await openModal();

    await expectDialogToBeFocused();
    await page.keyboard.down('Shift');
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused();
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused();
  });

  it('should focus last focused element after modal is dismissed', async () => {
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

    expect(await getModalVisibility(), 'initial').toBe('hidden');
    expect(await getActiveElementTagName(page)).toBe('BODY');

    await (await selectNode(page, '#btn-open')).click();
    await waitForStencilLifecycle(page);

    expect(await getModalVisibility()).toBe('visible');

    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);
    // TODO: why is timeout needed? transition durations should be overwritten with 0s
    await new Promise((resolve) => setTimeout(resolve, CSS_TRANSITION_DURATION)); // transition delay for visibility

    expect(await getModalVisibility(), 'after escape').toBe('hidden');
    expect(await getActiveElementId(page)).toBe('btn-open');
  });

  it('should focus element after modal when open accordion contains link but modal is not open', async () => {
    await initBasicModal({
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

  describe('after content change', () => {
    it('should focus dismiss button again', async () => {
      await initAdvancedModal();
      await openModal();
      await expectDialogToBeFocused('initially');

      await page.keyboard.press('Tab');
      await expectDismissButtonToBeFocused('after 1st tab');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page), 'after 2nd tab').toBe('btn-content-1');

      const host = await getHost();
      await host.evaluate((el) => {
        el.innerHTML = '<button id="btn-new">New Button</button>';
      });
      await waitForSlotChange();
      await expectDialogToBeFocused('after content change');

      await page.keyboard.press('Tab');
      await expectDismissButtonToBeFocused('after content change 1st tab');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page), 'after content change 2nd tab').toBe('btn-new');

      await page.keyboard.press('Tab');
      await expectDismissButtonToBeFocused('after content change 3rd tab');
    });

    it('should not allow focusing element behind of modal', async () => {
      await initAdvancedModal();
      await addButtonsBeforeAndAfterModal();
      await openModal();
      await expectDialogToBeFocused('initially');
      await page.keyboard.press('Tab');
      await expectDismissButtonToBeFocused('after tab');

      const host = await getHost();
      await host.evaluate((el) => {
        el.innerHTML = '';
      });
      await waitForSlotChange();
      await expectDialogToBeFocused('after content change');

      await page.keyboard.press('Tab');
      await expectDismissButtonToBeFocused('after content change 1st tab');

      await page.keyboard.press('Tab');
      await expectDismissButtonToBeFocused('after content change 2nd tab');
    });

    it('should correctly focus dismiss button from appended focusable element', async () => {
      await initAdvancedModal();
      await openModal();

      const host = await getHost();
      await host.evaluate((el) => {
        const button = document.createElement('button');
        button.innerText = 'New Button';
        button.id = 'btn-new';
        el.append(button);
      });
      await waitForSlotChange();
      await expectDialogToBeFocused('after button appended');

      await page.keyboard.press('Tab');
      await expectDismissButtonToBeFocused('after button appended 1st tab');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-footer-2');

      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-new');

      await page.keyboard.press('Tab');
      await expectDismissButtonToBeFocused('finally');
    });
  });

  describe('with disable-close-button', () => {
    const initModalOpts = { isOpen: false, disableCloseButton: true };

    it('should focus body when there is no focusable element', async () => {
      await initBasicModal(initModalOpts);
      await openModal();
      await expectDialogToBeFocused();
    });

    it('should not focus element behind modal if modal has no focusable element', async () => {
      await initBasicModal(initModalOpts);
      await addButtonsBeforeAndAfterModal();
      await openModal();
      await expectDialogToBeFocused();

      await page.keyboard.press('Tab');
      await expectDialogToBeFocused();
    });

    const otherFocusableElement = '<button type="button">Another focusable element</button>';

    it.each<TagName | keyof HTMLElementTagNameMap>([
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
    ])('should focus first focusable element: %s', async (tagName) => {
      const attributes = tagName.includes('link') || tagName === 'a' ? ' href="#"' : '';
      await initBasicModal({
        ...initModalOpts,
        content:
          (tagName === 'input' ? `<${tagName} type="text" />` : `<${tagName}${attributes}>Some element</${tagName}>`) +
          otherFocusableElement,
      });
      await openModal();
      await expectDialogToBeFocused();

      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe(tagName.toUpperCase());
    });
  });
});

describe('can be controlled via keyboard', () => {
  it('should cycle tab events within modal', async () => {
    await initAdvancedModal();
    await openModal();
    await expectDialogToBeFocused('initially');

    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused('after 1st tab');

    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-content-1');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-content-2');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-footer-1');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-footer-2');
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused('finally');
  });

  it('should reverse cycle tab events within modal', async () => {
    await initAdvancedModal();
    await openModal();
    await expectDialogToBeFocused('initially');

    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused('after 1st tab');

    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-footer-2');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-footer-1');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-content-2');
    await page.keyboard.press('Tab');
    expect(await getActiveElementId(page)).toBe('btn-content-1');
    await page.keyboard.press('Tab');
    await expectDismissButtonToBeFocused('finally');
    await page.keyboard.up('ShiftLeft');
  });
});

it('should open modal at scroll top position zero when its content is scrollable', async () => {
  await initBasicModal({ isOpen: true, content: '<div style="height: 150vh;"></div>' });

  const host = await getHost();
  const hostScrollTop = await host.evaluate((el) => el.scrollTop);

  expect(hostScrollTop).toBe(0);
});

describe('scroll lock', () => {
  const bodyLockedStyle = 'top: 0px; overflow-y: scroll; position: fixed;';

  it('should prevent page from scrolling when open', async () => {
    await initBasicModal({ isOpen: false });
    expect(await getBodyStyle()).toBe(null);

    await openModal();
    expect(await getBodyStyle()).toBe(bodyLockedStyle);

    await setProperty(await getHost(), 'open', false);
    await waitForStencilLifecycle(page);
    expect(await getBodyStyle()).toBe('');
  });

  it('should prevent page from scrolling when initially open', async () => {
    await initBasicModal({ isOpen: true });
    expect(await getBodyStyle()).toBe(bodyLockedStyle);
  });

  it('should remove overflow hidden from body if unmounted', async () => {
    await initBasicModal({ isOpen: true });
    expect(await getBodyStyle()).toBe(bodyLockedStyle);

    await page.evaluate(() => {
      document.querySelector('p-modal').remove();
    });
    await waitForStencilLifecycle(page);

    expect(await getBodyStyle()).toBe('');
  });
});

describe('sticky footer', () => {
  const expectedBoxShadow = 'rgba(204, 204, 204, 0.35) 0px -5px 10px 0px';
  it('should not show box-shadow initially when not scrollable', async () => {
    await initBasicModal({ isOpen: true, content: '<div>Some Content</div>', hasSlottedFooter: true });

    expect(await getFooterBoxShadow()).toBe('none');
  });

  it('should show box-shadow initially when scrollable', async () => {
    await initBasicModal({
      isOpen: true,
      content: '<div style="height: 110vh">Some Content</div>',
      hasSlottedFooter: true,
    });

    expect(await getFooterBoxShadow()).toBe(expectedBoxShadow);
  });

  it('should remove box-shadow when scrolled to bottom', async () => {
    await initBasicModal({
      isOpen: true,
      content: '<div style="height: 110vh">Some Content</div>',
      hasSlottedFooter: true,
    });

    expect(await getFooterBoxShadow()).toBe(expectedBoxShadow);

    const host = await getHost();
    await host.evaluate((el) => {
      el.scrollBy({ top: 1000 });
    });

    const footer = await getFooter();
    await page.waitForFunction((el) => getComputedStyle(el).boxShadow === 'none', {}, footer);
    expect(await getFooterBoxShadow()).toBe('none');
  });

  it('should show box-shadow again when scrolling up from bottom', async () => {
    await initBasicModal({
      isOpen: true,
      content: '<div style="height: 110vh">Some Content</div>',
      hasSlottedFooter: true,
    });

    const host = await getHost();
    await host.evaluate((el) => {
      el.scrollBy({ top: 1000 }); // should be bottom
    });

    expect(await getFooterBoxShadow()).toBe('none');

    await host.evaluate((el) => {
      el.scrollBy({ top: -81 }); // margin-bottom of modal is 80px for whatever reason, so this is the edge on when the shadow appears again
    });

    const footer = await getFooter();
    await page.waitForFunction((el) => getComputedStyle(el).boxShadow !== 'none', {}, footer);

    expect(await getFooterBoxShadow()).toBe(expectedBoxShadow);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initBasicModal();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-modal'], 'componentDidLoad: p-modal').toBe(1);
    expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1); // includes p-icon

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips after state change', async () => {
    await initBasicModal();
    const host = await getHost();

    await setProperty(host, 'open', false);
    await waitForStencilLifecycle(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidUpdate['p-modal'], 'componentDidUpdate: p-modal').toBe(1);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(3);
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });
});

describe('slotted heading', () => {
  it('should set slotted heading', async () => {
    await initBasicModal({ hasSlottedHeading: true });
    const header = await getHeader();

    expect(await getProperty(header, 'innerHTML')).toMatchInlineSnapshot(`"<slot name="heading"></slot>"`);
  });

  it('should overwrite slotted heading when setting heading prop', async () => {
    await initBasicModal({ hasSlottedHeading: true });
    const host = await getHost();

    const header = await getHeader();
    await setProperty(host, 'heading', 'Some Heading');
    await waitForStencilLifecycle(page);

    expect(await getProperty(header, 'innerHTML')).toMatchInlineSnapshot('"<h2>Some Heading</h2>"');
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initBasicModal();
    const modal = await getModal();

    await expectA11yToMatchSnapshot(page, modal, { interestingOnly: false });
  });

  it('should not expose accessibility tree if modal is hidden', async () => {
    await initBasicModal({ isOpen: false });
    const modal = await getModal();

    await expectA11yToMatchSnapshot(page, modal);
  });

  it.each<[string, SelectedAriaAttributes<ModalAriaAttribute>, string]>([
    ['Some Heading', undefined, 'Some Heading'],
    [undefined, "{'aria-label': 'Some Heading'}", 'Some Heading'],
    ['Some Heading', "{'aria-label': 'Other Heading'}", 'Other Heading'],
  ])('should with props heading: %s and aria: %s set aria-label: %s', async (heading, aria, expected) => {
    await initBasicModal({ isOpen: false, heading, aria });
    const modal = await getModal();

    expect(await getProperty(modal, 'ariaLabel')).toBe(expected);
  });

  it('should overwrite aria-label when adding aria prop', async () => {
    await initBasicModal({ isOpen: false });
    const host = await getHost();
    const modal = await getModal();
    await setProperty(host, 'aria', "{'aria-label': 'Other Heading'}");
    await waitForStencilLifecycle(page);

    expect(await getProperty(modal, 'ariaLabel')).toBe('Other Heading');
  });

  it('should overwrite aria-label with heading when setting aria prop to undefined', async () => {
    await initBasicModal({ isOpen: false, heading: 'Some Heading', aria: "{'aria-label': 'Other Heading'}" });
    const host = await getHost();
    const modal = await getModal();
    await setProperty(host, 'aria', undefined);
    await waitForStencilLifecycle(page);

    expect(await getProperty(modal, 'ariaLabel')).toBe('Some Heading');
  });
});
