import { getHTMLAttributes, setContentWithDesignSystem } from '../../helpers';
import { type Page, test, expect } from '@playwright/test';
import type { Components } from '@porsche-design-system/components/src/components';

const getRoot = (page: Page) => page.locator('p-link-tile-product .root');
const getWrapper = (page: Page) => page.locator('p-link-tile-product .wrapper');

type InitOptions = {
  props?: Components.PLinkTileProduct;
  slotted?: string;
  options?: {
    markupBefore?: string;
    markupAfter?: string;
  };
};

const initLinkTileProduct = (page: Page, opt?: InitOptions): Promise<void> => {
  const { props = { heading: 'Some product name', price: '1.199,00 €', href: '/' }, slotted = '', options } = opt || {};
  const { markupBefore = '', markupAfter = '' } = options || {};

  const markup = `${markupBefore}
      <p-link-tile-product ${getHTMLAttributes(props)}>
        ${slotted}
      </p-link-tile-product>
      ${markupAfter}`;

  return setContentWithDesignSystem(page, markup);
};

test.fixme('should expose correct initial accessibility tree properties', async ({ page }) => {
  await initLinkTileProduct(page);
  const root = await getRoot(page);

  // await expectA11yToMatchSnapshot(page, root, { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree properties when price original is set', async ({ page }) => {
  await initLinkTileProduct(page, {
    props: { heading: 'Some product name', price: '718,00 €', priceOriginal: '911,00 €' },
  });
  const wrapper = await getWrapper(page);

  // await expectA11yToMatchSnapshot(page, wrapper, { interestingOnly: false });
});
