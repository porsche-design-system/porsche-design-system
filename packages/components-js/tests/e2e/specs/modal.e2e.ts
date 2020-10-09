import { getBrowser, selectNode, setContentWithDesignSystem } from '../helpers';
import { Page } from 'puppeteer';

describe('modal', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
  });
  afterEach(async () => await page.close());

  const getModalHost = () => selectNode(page, 'p-modal');
  const getModal = () => selectNode(page, 'p-modal >>> .p-modal');
  const getModalHeader = () => selectNode(page, 'p-modal >>> .p-modal__header');
  const getModalFooter = () => selectNode(page, 'p-modal >>> .p-modal__footer');
  const getModalCloseButton = () => selectNode(page, 'p-modal >>> .p-modal__close p-button-pure');

  it('should render', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <p-modal heading="Some Heading" open>
        Some Content
        <p-modal-footer>Some Footer</p-modal-footer>
      </p-modal>`
    );
    expect(await getModal()).not.toBeNull();
  });

  describe('can be closed', () => {
    it('should be closable via x button', async () => {});
    it('should be closable via esc key', async () => {});
    it('should be closable via backdrop', async () => {});
  });

  describe('can be controlled via keyboard', () => {
    it('should focus first focusable element', async () => {});
    it('should focus close button when there is no focusable content element', async () => {});
    it('should focus nothing when there is no focusable element', async () => {});
    it('should cycle tab events within modal', async () => {});
  });
});
