import {
  getHTMLAttributes,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../../helpers';
import { type Page, test, expect } from '@playwright/test';
import type { Components } from '@porsche-design-system/components';

const getHost = (page: Page) => page.$('p-flyout-multilevel');
const getFlyoutMultilevelDialog = (page: Page) => page.$('p-flyout-multilevel dialog');
const getFlyoutMultilevelContent = (page: Page) => page.$('p-flyout-multilevel .content');

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
  const flyout = await getFlyoutMultilevelDialog(page);

  // await expectA11yToMatchSnapshot(page, flyout, { interestingOnly: false });
});

test.fixme('should not expose accessibility tree if flyout is hidden', async ({ page }) => {
  await initBasicFlyoutMultilevel(page, { open: false });
  const flyout = await getFlyoutMultilevelDialog(page);

  // await expectA11yToMatchSnapshot(page, flyout);
});

test('should overwrite aria-label when adding aria prop', async ({ page }) => {
  await initBasicFlyoutMultilevel(page, { open: false, aria: "{'aria-label': 'Some Heading'}" });
  const host = await getHost(page);
  const flyoutMultilevelContent = await getFlyoutMultilevelContent(page);
  expect(await getProperty(flyoutMultilevelContent, 'ariaLabel')).toBe('Some Heading');

  await setProperty(host, 'aria', "{'aria-label': 'Other Heading'}");
  await waitForStencilLifecycle(page);

  expect(await getProperty(flyoutMultilevelContent, 'ariaLabel')).toBe('Other Heading');
});
