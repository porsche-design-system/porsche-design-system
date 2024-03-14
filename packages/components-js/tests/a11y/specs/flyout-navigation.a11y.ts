import {
  getHTMLAttributes,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import { type Page, test, expect } from '@playwright/test';
import type { Components } from '@porsche-design-system/components';

const getHost = (page: Page) => page.$('p-flyout-navigation');
const getFlyoutNavigationDialog = (page: Page) => page.$('p-flyout-navigation dialog');
const getFlyoutNavigationContent = (page: Page) => page.$('p-flyout-navigation .content');

const initBasicFlyoutNavigation = (
  page: Page,
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

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initBasicFlyoutNavigation(page, { open: true });
  const flyout = await getFlyoutNavigationDialog(page);

  // await expectA11yToMatchSnapshot(page, flyout, { interestingOnly: false });
});

test.fixme('should not expose accessibility tree if flyout is hidden', async ({ page }) => {
  await initBasicFlyoutNavigation(page, { open: false });
  const flyout = await getFlyoutNavigationDialog(page);

  // await expectA11yToMatchSnapshot(page, flyout);
});

test('should overwrite aria-label when adding aria prop', async ({ page }) => {
  await initBasicFlyoutNavigation(page, { open: false, aria: "{'aria-label': 'Some Heading'}" });
  const host = await getHost(page);
  const flyoutContent = await getFlyoutNavigationContent(page);
  expect(await getProperty(flyoutContent, 'ariaLabel')).toBe('Some Heading');

  await setProperty(host, 'aria', "{'aria-label': 'Other Heading'}");
  await waitForStencilLifecycle(page);

  expect(await getProperty(flyoutContent, 'ariaLabel')).toBe('Other Heading');
});
