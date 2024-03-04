import {
  expectA11yToMatchSnapshot,
  getHTMLAttributes,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';
import type { Components } from '@porsche-design-system/components';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-flyout-navigation');
const getFlyoutNavigationDialog = () => selectNode(page, 'p-flyout-navigation >>> dialog');
const getFlyoutNavigationContent = () => selectNode(page, 'p-flyout-navigation >>> .content');

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

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initBasicFlyoutNavigation({ open: true });
    const flyout = await getFlyoutNavigationDialog();

    await expectA11yToMatchSnapshot(page, flyout, { interestingOnly: false });
  });

  it('should not expose accessibility tree if flyout is hidden', async () => {
    await initBasicFlyoutNavigation({ open: false });
    const flyout = await getFlyoutNavigationDialog();

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
