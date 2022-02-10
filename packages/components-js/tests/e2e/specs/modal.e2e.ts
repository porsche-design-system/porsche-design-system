import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getActiveElementId,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getElementStyle,
  getLifecycleStatus,
  getProperty,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForComponentsReady,
  waitForEventSerialization,
  waitForStencilLifecycle,
} from '../helpers';
import { Page } from 'puppeteer';
import type { SelectedAriaAttributes } from '@porsche-design-system/components/src/types';
import type { ModalAriaAttributes } from '@porsche-design-system/components/src/components/content/modal/modal-utils';

describe('modal', () => {
  let page: Page;
  const CSS_TRANSITION_DURATION = 600;

  beforeEach(async () => (page = await browser.newPage()));
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-modal');
  const getHeader = () => selectNode(page, 'p-modal >>> .header');
  const getModal = () => selectNode(page, 'p-modal >>> .root');
  const getModalCloseButton = () => selectNode(page, 'p-modal >>> p-button-pure.close');
  const getBodyOverflow = async () => getElementStyle(await selectNode(page, 'body'), 'overflow');

  const initBasicModal = (opts?: {
    isOpen?: boolean;
    content?: string;
    heading?: string;
    aria?: SelectedAriaAttributes<ModalAriaAttributes>;
    hasSlottedHeading?: boolean;
  }): Promise<void> => {
    const { isOpen = true, content = 'Some Content', heading = 'Some Heading', aria, hasSlottedHeading } = opts ?? {};
    const slottedHeadingAttribute = hasSlottedHeading ? '' : ` heading="${heading}"`;
    const openAttribute = isOpen ? ' open' : '';
    const ariaAttributes = aria ? ` aria="${aria}"` : '';
    const attributes = `${slottedHeadingAttribute}${openAttribute}${ariaAttributes}`;

    return setContentWithDesignSystem(
      page,
      `
      <p-modal${attributes}>
        ${hasSlottedHeading ? '<div slot="heading">Some Heading<a href="https://porsche.com">Some link</a></div>' : ''}
        ${content}
      </p-modal>`
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

  const closeModal = async () => {
    await setProperty(await getHost(), 'open', false);
    await waitForStencilLifecycle(page);
  };

  const getModalVisibility = async () => await getElementStyle(await getModal(), 'visibility');

  it('should render and be visible when open', async () => {
    await initBasicModal();
    expect(await getModal()).not.toBeNull();
    expect(await getModalVisibility()).toBe('visible');
  });

  it('should not be visible when not open', async () => {
    await initBasicModal({ isOpen: false });
    await page.waitForTimeout(CSS_TRANSITION_DURATION); // wait for visibility transition to finish
    expect(await getModalVisibility()).toBe('hidden');
  });

  it('should have correct transform when closed and opened', async () => {
    await initBasicModal({ isOpen: false });
    const getModalTransform = async () => getElementStyle(await getModal(), 'transform', { waitForTransition: true });

    const initialModalTransform = await getModalTransform();
    expect(initialModalTransform).toBe('matrix(0.9, 0, 0, 0.9, 0, 0)');

    await openModal();
    const openModalTransform = await getModalTransform();
    expect(openModalTransform).toBe('matrix(1, 0, 0, 1, 0, 0)');
    expect(initialModalTransform).not.toBe(openModalTransform);

    await closeModal();
    const finalModalTransform = await getModalTransform();
    expect(finalModalTransform).toBe(initialModalTransform);
  });

  describe('can be closed', () => {
    let calls = 0;

    beforeEach(async () => {
      calls = 0;
      await initBasicModal();
      await initAddEventListener(page);
      await addEventListener(await getHost(), 'close', () => calls++);
    });

    it('should be closable via x button', async () => {
      const closeBtn = await getModalCloseButton();
      expect(closeBtn).not.toBeNull();

      const closeBtnReal = await selectNode(page, 'p-modal >>> p-button-pure.close >>> button');
      expect(await getAttribute(closeBtnReal, 'type')).toBe('button');

      await closeBtn.click();
      await waitForStencilLifecycle(page);

      expect(calls).toBe(1);
    });

    it('should be closable via esc key', async () => {
      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(calls).toBe(1);
    });

    it('should not be closable via esc key when disableCloseButton is set', async () => {
      const host = await getHost();
      await setProperty(host, 'disableCloseButton', true);
      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(calls).toBe(0);
    });

    it('should be closable via backdrop', async () => {
      await page.mouse.move(5, 5);
      await page.mouse.down();
      await waitForEventSerialization(page);

      expect(calls, 'after mouse down').toBe(1);

      await page.mouse.up();

      expect(calls, 'after mouse up').toBe(1);
    });

    it('should not be closed if mousedown inside modal', async () => {
      await page.mouse.move(960, 400);
      await page.mouse.down();
      await waitForEventSerialization(page);

      expect(calls, 'after mouse down').toBe(0);

      await page.mouse.up();

      expect(calls, 'after mouse up').toBe(0);
    });

    it('should not be closed if mousedown inside modal and mouseup inside backdrop', async () => {
      await page.mouse.move(960, 400);
      await page.mouse.down();
      await waitForEventSerialization(page);

      expect(calls, 'after mouse down').toBe(0);

      await page.mouse.move(5, 5);
      await page.mouse.up();

      expect(calls, 'after mouse up').toBe(0);
    });

    it('should not be closable via backdrop when disableBackdropClick is set', async () => {
      const host = await getHost();
      await setProperty(host, 'disableBackdropClick', true);
      await waitForEventSerialization(page);

      await page.mouse.move(5, 5);
      await page.mouse.down();
      await waitForEventSerialization(page);

      expect(calls).toBe(0);
    });

    it('should not bubble close event', async () => {
      const body = await selectNode(page, 'body');
      let bodyCalls = 0;
      await addEventListener(body, 'close', () => bodyCalls++);
      await page.mouse.move(5, 5);
      await page.mouse.down();
      await waitForEventSerialization(page);

      expect(calls).toBe(1);
      expect(bodyCalls).toBe(0);
    });
  });

  describe('focus behavior', () => {
    it('should focus first focusable element', async () => {
      await initAdvancedModal();
      const host = await getHost();
      await openModal();
      expect(await getActiveElementTagNameInShadowRoot(host)).toBe('P-BUTTON-PURE'); // close button
    });

    it('should focus close button when there is no focusable content element', async () => {
      await initBasicModal({ isOpen: false });
      const host = await getHost();
      await openModal();
      expect(await getActiveElementTagNameInShadowRoot(host)).toBe('P-BUTTON-PURE'); // close button
    });

    it('should focus close button when there is a focusable content element', async () => {
      await initBasicModal({
        isOpen: false,
        content: `<a href="https://porsche.com">Some link in content</a>`,
        aria: "{'aria-label': 'Some Heading'}",
      });
      const host = await getHost();
      await openModal();
      expect(await getActiveElementTagNameInShadowRoot(host)).toBe('P-BUTTON-PURE'); // close button
    });

    it('should have correct focus order when there is a focusable content element and focusable slotted element in header', async () => {
      await initBasicModal({
        isOpen: false,
        content: `<p-button>Some focusable button in content</p-button>`,
        aria: "{'aria-label': 'Some Heading'}",
        hasSlottedHeading: true,
      });
      const host = await getHost();
      await openModal();

      expect(await getActiveElementTagNameInShadowRoot(host)).toBe('P-BUTTON-PURE'); // close button
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('A'); // slotted header anchor
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagName(page)).toBe('P-BUTTON'); // slotted content button
    });

    it('should focus nothing when there is no focusable element', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-modal heading="Some Heading" disable-close-button>
          Some Content
        </p-modal>`
      );
      await openModal();
      const activeElementTagName = await getActiveElementTagName(page);
      expect(activeElementTagName).toBe('BODY');
    });

    it('should not allow focusing element behind of modal', async () => {
      await initBasicModal({ isOpen: false, content: '<p-text>Some text content</p-text>' });
      await page.evaluate(() => {
        const button = document.createElement('btn-behind');
        button.id = 'button';
        document.body.append(button);
      });
      const host = await getHost();
      await openModal();

      expect(await getActiveElementTagNameInShadowRoot(host)).toBe('P-BUTTON-PURE'); // close button
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagNameInShadowRoot(host)).toBe('P-BUTTON-PURE'); // close button
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagNameInShadowRoot(host)).toBe('P-BUTTON-PURE'); // close button
    });

    it('should focus last focused element after modal is closed', async () => {
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
      await page.waitForTimeout(CSS_TRANSITION_DURATION);

      expect(await getModalVisibility(), 'initial').toBe('hidden');
      expect(await getActiveElementTagName(page)).toBe('BODY');

      await (await selectNode(page, '#btn-open')).click();
      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_TRANSITION_DURATION);

      expect(await getModalVisibility()).toBe('visible');

      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);
      await page.waitForTimeout(CSS_TRANSITION_DURATION); // transition delay for visibility

      expect(await getModalVisibility(), 'after escape').toBe('hidden');
      expect(await getActiveElementId(page)).toBe('btn-open');
    });
  });

  describe('can be controlled via keyboard', () => {
    it('should cycle tab events within modal', async () => {
      await initAdvancedModal();
      const host = await getHost();
      await openModal();
      expect(await getActiveElementTagNameInShadowRoot(host), 'initially').toBe('P-BUTTON-PURE'); // close button

      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-content-1');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-content-2');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-footer-1');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-footer-2');
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagNameInShadowRoot(host), 'finally').toBe('P-BUTTON-PURE'); // close button
    });

    it('should reverse cycle tab events within modal', async () => {
      await initAdvancedModal();
      const host = await getHost();
      await openModal();
      expect(await getActiveElementTagNameInShadowRoot(host), 'initially').toBe('P-BUTTON-PURE'); // close button

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
      expect(await getActiveElementTagNameInShadowRoot(host), 'finally').toBe('P-BUTTON-PURE'); // close button
      await page.keyboard.up('ShiftLeft');
    });
  });

  it('should prevent page from scrolling when open', async () => {
    await initBasicModal({ isOpen: false });
    expect(await getBodyOverflow()).toBe('visible');

    await openModal();
    expect(await getBodyOverflow()).toBe('hidden');

    await setProperty(await getHost(), 'open', false);
    await waitForStencilLifecycle(page);
    expect(await getBodyOverflow()).toBe('visible');
  });

  it('should prevent page from scrolling when initially open', async () => {
    await initBasicModal({ isOpen: true });
    expect(await getBodyOverflow()).toBe('hidden');
  });

  it('should remove overflow hidden from body if unmounted', async () => {
    await initBasicModal({ isOpen: true });
    expect(await getBodyOverflow()).toBe('hidden');

    await page.evaluate(() => {
      document.querySelector('p-modal').remove();
    });
    await waitForStencilLifecycle(page);

    expect(await getBodyOverflow()).toBe('visible');
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initBasicModal();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-modal'], 'componentDidLoad: p-modal').toBe(1);
      expect(status.componentDidLoad['p-headline'], 'componentDidLoad: p-headline').toBe(1);
      expect(status.componentDidLoad['p-button-pure'], 'componentDidLoad: p-button-pure').toBe(1); // has p-icon and p-text

      expect(
        status.componentDidLoad.all,
        'componentDidLoad: all | (p-button-pure -> p-text, p-icon), (p-headline -> p-text), p-modal'
      ).toBe(6);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips after state change', async () => {
      await initBasicModal();
      const host = await getHost();

      await setProperty(host, 'open', false);
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-modal'], 'componentDidUpdate: p-modal').toBe(1);

      expect(
        status.componentDidLoad.all,
        'componentDidLoad: all | (p-button-pure -> p-text, p-icon), (p-headline -> p-text), p-modal'
      ).toBe(6);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all | p-modal, (p-headline -> p-text)').toBe(3);
    });
  });

  describe('slotted heading', () => {
    it('should set slotted heading', async () => {
      await initBasicModal({ hasSlottedHeading: true });
      const header = await getHeader();

      expect(await getProperty(header, 'innerHTML')).toMatchInlineSnapshot('"<slot name=\\"heading\\"></slot>"');
    });

    it('should overwrite slotted heading when setting heading prop', async () => {
      await initBasicModal({ hasSlottedHeading: true });
      const host = await getHost();

      const header = await getHeader();
      await setProperty(host, 'heading', 'Some Heading');
      await waitForStencilLifecycle(page);
      await waitForComponentsReady(page); // wait for p-headline to initialize

      expect(await getProperty(header, 'innerHTML')).toMatchInlineSnapshot(
        '"<p-headline class=\\"hydrated\\">Some Heading</p-headline>"'
      );
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

    it.each<[string, SelectedAriaAttributes<ModalAriaAttributes>, string]>([
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
});
