import { expectA11yToMatchSnapshot, selectNode, setContentWithDesignSystem } from '../helpers';
import type { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getRoot = () => selectNode(page, 'p-link-tile-model-signature >>> .root');

const initLinkTileModelSignature = (opts?: { useSlottedAnchor?: boolean }): Promise<void> => {
  const { useSlottedAnchor = false } = opts || {};

  const primaryAttrs = useSlottedAnchor ? '' : ' href="https://porsche.com/"';
  const primaryChild = useSlottedAnchor ? '<a href="https://porsche.com/">Some label</a>' : 'Some label';

  return setContentWithDesignSystem(
    page,
    `<p-link-tile-model-signature heading="Some heading">
  <img src="'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAABlBMVEUAAAD2vP9xXLiUAAAAAXRSTlMAQObYZgAAABxJREFUGNNjYOBgYGBhYKAZ/R8MDsD4Q5amkz8ASp4PtTYYQZIAAAAASUVORK5CYII='" alt="Some image label" />
  <p-link slot="primary"${primaryAttrs}>${primaryChild}</p-link>
  <p-link slot="secondary" href="#">Some label</p-link>
</p-link-tile-model-signature>`
  );
};

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initLinkTileModelSignature();
    const root = await getRoot();

    await expectA11yToMatchSnapshot(page, root, { interestingOnly: false });
  });
});
