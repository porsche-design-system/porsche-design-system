import { type Page, expect, test } from '@playwright/test';
import type { Components } from '@porsche-design-system/components';
import {
  getHTMLAttributes,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../../helpers';

const getHost = (page: Page) => page.locator('p-flyout-multilevel');
const getFlyoutMultilevelDialog = (page: Page) => page.locator('p-flyout-multilevel dialog');
const getFlyoutMultilevelContent = (page: Page) => page.locator('p-flyout-multilevel .content').first();

const initBasicFlyoutMultilevel = (
  page: Page,
  flyoutMultilevelProps?: Components.PFlyoutMultilevel,
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

  const flyoutMultilevelItemContent = `
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>`;

  const flyoutMarkup = `
<p-flyout-multilevel ${getHTMLAttributes(flyoutMultilevelProps)}>
  ${[...Array(amount)]
    .map(
      (_, i) =>
        `<p-flyout-multilevel-item identifier="item-${i + 1}">${
          content[i] ? content[i] : flyoutMultilevelItemContent
        }</p-flyout-multilevel-item>`
    )
    .join('\n')}
</p-flyout-multilevel>`;

  return setContentWithDesignSystem(page, [markupBefore, flyoutMarkup, markupAfter].filter(Boolean).join('\n'));
};

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initBasicFlyoutMultilevel(page, { open: true });
  const flyout = getFlyoutMultilevelDialog(page);

  // await expectA11yToMatchSnapshot(page, flyout, { interestingOnly: false });
});

test.fixme('should not expose accessibility tree if flyout is hidden', async ({ page }) => {
  await initBasicFlyoutMultilevel(page, { open: false });
  const flyout = getFlyoutMultilevelDialog(page);

  // await expectA11yToMatchSnapshot(page, flyout);
});

test.fixme('should overwrite aria-label when adding aria prop', async ({ page }) => {
  await initBasicFlyoutMultilevel(page, { open: false, aria: "{'aria-label': 'Some Heading'}" });
  const host = getHost(page);
  const flyoutMultilevelContent = getFlyoutMultilevelContent(page);
  expect(await getProperty(flyoutMultilevelContent, 'ariaLabel')).toBe('Some Heading');

  await setProperty(host, 'aria', "{'aria-label': 'Other Heading'}");
  await waitForStencilLifecycle(page);

  expect(await getProperty(flyoutMultilevelContent, 'ariaLabel')).toBe('Other Heading');
});
