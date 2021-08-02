import {
  addEventListener,
  getActiveElementId,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getBrowser,
  getElementStyle,
  getLifecycleStatus,
  initAddEventListener,
  removeAttribute,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import { Page } from 'puppeteer';

describe('modal', () => {
  let page: Page;
  const CSS_TRANSITION_DURATION = 600;

  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-modal');
  const getModal = () => selectNode(page, 'p-modal >>> .root');
  const getModalCloseButton = () => selectNode(page, 'p-modal >>> .close p-button-pure');
  const getModalAside = () => selectNode(page, 'p-modal >>> aside');
  const getBodyOverflow = async () => getElementStyle(await selectNode(page, 'body'), 'overflow');

  const initBasicModal = (opts?: { isOpen: boolean }): Promise<void> => {
    const { isOpen = true } = opts ?? {};

    return setContentWithDesignSystem(
      page,
      `
      <p-modal heading="Some Heading" ${isOpen ? 'open' : ''}>
        Some Content
      </p-modal>`
    );
  };

  const initAdvancedModal = (): Promise<void> => {
    return setContentWithDesignSystem(
      page,
      `
      <p-modal heading="Some Heading">
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

      const closeBtnReal = await selectNode(page, 'p-modal >>> .close p-button-pure >>> button');
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
      // click in each corner based on 1920x800 screen
      await page.mouse.click(5, 5);
      await page.mouse.click(1915, 5);
      await page.mouse.click(5, 795);
      await page.mouse.click(1915, 795);
      await waitForStencilLifecycle(page);

      expect(calls).toBe(4);

      // click in middle should not close modal
      await page.mouse.click(960, 400);
      await waitForStencilLifecycle(page);

      expect(calls).toBe(4);
    });

    it('should not be closable via backdrop when disableBackdropClick is set', async () => {
      const host = await getHost();
      await setProperty(host, 'disableBackdropClick', true);
      await waitForStencilLifecycle(page);

      await page.mouse.click(5, 5);
      await waitForStencilLifecycle(page);

      expect(calls).toBe(0);
    });

    it('should not bubble close event', async () => {
      const body = await selectNode(page, 'body');
      let bodyCalls = 0;
      await addEventListener(body, 'close', () => bodyCalls++);
      await page.mouse.click(5, 5);
      await waitForStencilLifecycle(page);

      expect(calls).toBe(1);
      expect(bodyCalls).toBe(0);
    });
  });

  describe('can be controlled via keyboard', () => {
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

    it('should cycle tab events within modal', async () => {
      await initAdvancedModal();
      const host = await getHost();
      await openModal();
      expect(await getActiveElementTagNameInShadowRoot(host)).toBe('P-BUTTON-PURE', 'initially'); // close button

      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-content-1');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-content-2');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-footer-1');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-footer-2');
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagNameInShadowRoot(host)).toBe('P-BUTTON-PURE', 'finally'); // close button
    });

    it('should reverse cycle tab events within modal', async () => {
      await initAdvancedModal();
      const host = await getHost();
      await openModal();
      expect(await getActiveElementTagNameInShadowRoot(host))
        .withContext('initially')
        .toBe('P-BUTTON-PURE'); // close button

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
      expect(await getActiveElementTagNameInShadowRoot(host))
        .withContext('finally')
        .toBe('P-BUTTON-PURE'); // close button
      await page.keyboard.up('ShiftLeft');
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

    expect(await getModalVisibility())
      .withContext('initial')
      .toBe('hidden');
    expect(await getActiveElementTagName(page)).toBe('BODY');

    await (await selectNode(page, '#btn-open')).click();
    await waitForStencilLifecycle(page);
    await page.waitForTimeout(CSS_TRANSITION_DURATION);

    expect(await getModalVisibility()).toBe('visible');

    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);
    await page.waitForTimeout(CSS_TRANSITION_DURATION); // transition delay for visibility

    expect(await getModalVisibility())
      .withContext('after escape')
      .toBe('hidden');
    expect(await getActiveElementId(page)).toBe('btn-open');
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

  it('should have correct aria-hidden value', async () => {
    await initBasicModal({ isOpen: false });
    const aside = await getModalAside();

    expect(await getAttribute(aside, 'aria-hidden')).toBe('true');

    await openModal();
    await waitForStencilLifecycle(page);

    expect(await getAttribute(aside, 'aria-hidden')).toBe('false');
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initBasicModal();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-modal']).withContext('componentDidLoad: p-modal').toBe(1);
      expect(status.componentDidLoad['p-headline']).withContext('componentDidLoad: p-headline').toBe(1);
      expect(status.componentDidLoad['p-button-pure']).withContext('componentDidLoad: p-button-pure').toBe(1); // has p-icon and p-text

      expect(status.componentDidLoad.all)
        .withContext('componentDidLoad: all | (p-button-pure -> p-text, p-icon), (p-headline -> p-text), p-modal')
        .toBe(6);
      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips after state change', async () => {
      await initBasicModal();
      const host = await getHost();

      await setProperty(host, 'open', false);
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidUpdate['p-modal']).withContext('componentDidUpdate: p-modal').toBe(1);

      expect(status.componentDidLoad.all)
        .withContext('componentDidLoad: all | (p-button-pure -> p-text, p-icon), (p-headline -> p-text), p-modal')
        .toBe(6);
      expect(status.componentDidUpdate.all)
        .withContext('componentDidUpdate: all | p-modal, (p-headline -> p-text)')
        .toBe(3);
    });
  });
});
