import {
  expectA11yToMatchSnapshot,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const initLinkSocial = (opts?: { useSlottedAnchor?: boolean }): Promise<void> => {
  const { useSlottedAnchor = false } = opts || {};

  return setContentWithDesignSystem(
    page,
    `
    <p-link-social onclick="return false;" ${!useSlottedAnchor ? 'href="#"' : ''} icon="logo-facebook">
      ${useSlottedAnchor ? '<a onclick="return false;" href="">' : ''}
      Some label
      ${useSlottedAnchor ? '</a>' : ''}
    </p-link-social>`
  );
};

const getHost = () => selectNode(page, 'p-link-social');
const getLink = () => selectNode(page, 'p-link-social >>> a');
const getIcon = () => selectNode(page, 'p-link-social >>> p-icon >>> svg');

describe('accessibility', () => {
  it('should expose correct initial accessibility tree properties', async () => {
    await initLinkSocial();
    const link = await getLink();
    const icon = await getIcon();

    await expectA11yToMatchSnapshot(page, link);
    await expectA11yToMatchSnapshot(page, icon, { interestingOnly: false });
  });

  it('should expose correct accessibility name if label is hidden', async () => {
    await initLinkSocial();
    const host = await getHost();
    const link = await getLink();
    await setProperty(host, 'hide-label', 'true');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, link);
  });
});
