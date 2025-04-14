import { type Page, expect, test } from '@playwright/test';
import type { Components } from '@porsche-design-system/components';
import {
  getHTMLAttributes,
  getProperty,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../../helpers';

const getHost = (page: Page) => page.locator('p-drilldown');
const getDrilldownDialog = (page: Page) => page.locator('p-drilldown dialog');
const getDrilldownContent = (page: Page) => page.locator('p-drilldown .content').first();

const initBasicDrilldown = (
  page: Page,
  drilldownProps?: Components.PDrilldown,
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

  const drilldownItemContent = `
      <h3>Some heading</h3>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>
      <a href="#some-anchor">Some anchor</a>`;

  const flyoutMarkup = `
<p-drilldown ${getHTMLAttributes(drilldownProps)}>
  ${[...Array(amount)]
    .map(
      (_, i) =>
        `<p-drilldown-item identifier="item-${i + 1}">${
          content[i] ? content[i] : drilldownItemContent
        }</p-drilldown-item>`
    )
    .join('\n')}
</p-drilldown>`;

  return setContentWithDesignSystem(page, [markupBefore, flyoutMarkup, markupAfter].filter(Boolean).join('\n'));
};

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initBasicDrilldown(page, { open: true });
  const flyout = getDrilldownDialog(page);

  // await expectA11yToMatchSnapshot(page, flyout, { interestingOnly: false });
});

test.fixme('should not expose accessibility tree if flyout is hidden', async ({ page }) => {
  await initBasicDrilldown(page, { open: false });
  const flyout = getDrilldownDialog(page);

  // await expectA11yToMatchSnapshot(page, flyout);
});

test.fixme('should overwrite aria-label when adding aria prop', async ({ page }) => {
  await initBasicDrilldown(page, { open: false, aria: "{'aria-label': 'Some Heading'}" });
  const host = getHost(page);
  const drilldownContent = getDrilldownContent(page);
  expect(await getProperty(drilldownContent, 'ariaLabel')).toBe('Some Heading');

  await setProperty(host, 'aria', "{'aria-label': 'Other Heading'}");
  await waitForStencilLifecycle(page);

  expect(await getProperty(drilldownContent, 'ariaLabel')).toBe('Other Heading');
});
