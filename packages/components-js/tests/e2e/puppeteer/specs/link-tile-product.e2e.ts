import { expectA11yToMatchSnapshot, getHTMLAttributes, selectNode, setContentWithDesignSystem } from '../helpers';
import type { Page } from 'puppeteer';
import type { Components } from '@porsche-design-system/components/src/components';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getRoot = () => selectNode(page, 'p-link-tile-product >>> .root');
const getWrapper = () => selectNode(page, 'p-link-tile-product >>> .wrapper');

type InitOptions = {
  props?: Components.PLinkTileProduct;
  slotted?: string;
  options?: {
    markupBefore?: string;
    markupAfter?: string;
  };
};

const initLinkTileProduct = (opt?: InitOptions): Promise<void> => {
  const { props = { heading: 'Some product name', price: '1.199,00 €', href: '/' }, slotted = '', options } = opt || {};
  const { markupBefore = '', markupAfter = '' } = options || {};

  const markup = `${markupBefore}
      <p-link-tile-product ${getHTMLAttributes(props)}>
        ${slotted}
      </p-link-tile-product>
      ${markupAfter}`;

  return setContentWithDesignSystem(page, markup);
};

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initLinkTileProduct();
    const root = await getRoot();

    await expectA11yToMatchSnapshot(page, root, { interestingOnly: false });
  });

  it('should expose correct accessibility tree properties when price original is set', async () => {
    await initLinkTileProduct({
      props: { heading: 'Some product name', price: '718,00 €', priceOriginal: '911,00 €' },
    });
    const wrapper = await getWrapper();

    await expectA11yToMatchSnapshot(page, wrapper, { interestingOnly: false });
  });
});
