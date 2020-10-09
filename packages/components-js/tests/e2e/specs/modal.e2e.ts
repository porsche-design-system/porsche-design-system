import {
  addEventListener,
  getActiveElementTagNameInShadowRoot,
  getBrowser,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle
} from '../helpers';
import { Page } from 'puppeteer';

describe('modal', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
  });
  afterEach(async () => await page.close());

  const getModalHost = () => selectNode(page, 'p-modal');
  const getModal = () => selectNode(page, 'p-modal >>> .p-modal');
  const getModalCloseButton = () => selectNode(page, 'p-modal >>> .p-modal__close p-button-pure');

  const initBasicModal = ({ isOpen }: { isOpen: boolean } = { isOpen: true }) =>
    setContentWithDesignSystem(
      page,
      `
      <p-modal heading="Some Heading" ${isOpen ? 'open' : ''}>
        Some Content
        <p-modal-footer>Some Footer</p-modal-footer>
      </p-modal>`
    );

  const openModal = async () => (await getModalHost()).evaluate((el) => el.setAttribute('open', ''));

  it('should render', async () => {
    await initBasicModal();
    expect(await getModal()).not.toBeNull();
  });

  describe('can be closed', () => {
    let calls = 0;

    beforeEach(async () => {
      calls = 0;
      await initBasicModal();
      await initAddEventListener(page);
      await addEventListener(await getModalHost(), 'close', () => calls++);
    });

    it('should be closable via x button', async () => {
      const closeBtn = await getModalCloseButton();
      expect(closeBtn).not.toBeNull();

      await closeBtn.click();
      await waitForStencilLifecycle(page);

      expect(calls).toBe(1);
    });

    it('should be closable via esc key', async () => {
      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(calls).toBe(1);
    });

    it('should not be closable via esc key when disableEscapeKey is set', async () => {
      const host = await getModalHost();
      await host.evaluate((el) => el.setAttribute('disable-escape-key', ''));
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
      await (await getModalHost()).evaluate((el) => el.setAttribute('disable-backdrop-click', ''));
      await page.mouse.click(5, 5);
      await waitForStencilLifecycle(page);

      expect(calls).toBe(0);
    });

    it('should not bubble close event', async () => {
      let bodyCalls = 0;
      await addEventListener(await selectNode(page, 'body'), 'close', () => bodyCalls++);
      await page.mouse.click(5, 5);
      await waitForStencilLifecycle(page);

      expect(calls).toBe(1);
      expect(bodyCalls).toBe(0);
    });
  });

  describe('can be controlled via keyboard', () => {
    beforeEach(async () => {
      await initBasicModal({ isOpen: false });
      await openModal();
    });

    it('should focus first focusable element', async () => {});

    it('should focus close button when there is no focusable content element', async () => {
      const activeElementTagName = await getActiveElementTagNameInShadowRoot(await getModalHost());
      expect(activeElementTagName).toBe('P-BUTTON-PURE');
    });

    it('should focus nothing when there is no focusable element', async () => {});

    it('should cycle tab events within modal', async () => {});
  });
});
