import { type Page, expect, test } from '@playwright/test';
import { viewportWidthXL } from '@porsche-design-system/shared/testing/playwright.vrt';
import { openAllSelect, setContentWithDesignSystem, setNativePopoversToAllowMultipleOpen } from '../../helpers';

const component = 'multi-select';

const scenario = async (page: Page): Promise<void> => {
  const getMultiSelect = (direction: string): string => {
    return `<p-multi-select name="some-name" label="Direction ${direction}" dropdown-direction=${direction}>
      <p-multi-select-option value="a">Option A</p-multi-select-option>
      <p-multi-select-option value="b">Option B</p-multi-select-option>
      <p-multi-select-option value="c">Option C</p-multi-select-option>
      <p-multi-select-option value="d">Option D</p-multi-select-option>
      <p-multi-select-option value="e">Option E</p-multi-select-option>
      <p-multi-select-option value="f">Option F</p-multi-select-option>
      <p-multi-select-option value="g">Option G</p-multi-select-option>
      <p-multi-select-option value="h">Option H</p-multi-select-option>
      <p-multi-select-option value="i">Option I</p-multi-select-option>
      <p-multi-select-option value="j">Option J</p-multi-select-option>
      <p-multi-select-option value="k">Option K</p-multi-select-option>
    </p-multi-select>`;
  };

  const markup = () =>
    `<p-table caption="multi-select within table" style="padding-bottom: 500px;">
      <p-table-head>
        <p-table-head-row>
          <p-table-head-cell>
            ${getMultiSelect('down')}
          </p-table-head-cell>
        </p-table-head-row>
      </p-table-head>
    </p-table>
    <p-table caption="multi-select within table" style="padding-top: 500px">
      <p-table-head>
        <p-table-head-row>
          <p-table-head-cell>
            ${getMultiSelect('up')}
          </p-table-head-cell>
        </p-table-head-row>
      </p-table-head>
    </p-table>`;

  await setContentWithDesignSystem(page, markup());

  // Override listeners to avoid native popovers being closed
  await page.evaluate(() => {
    window.addEventListener('resize', (e) => e.stopImmediatePropagation(), true);
    window.addEventListener('scroll', (e) => e.stopImmediatePropagation(), true);
  });

  await page.setViewportSize({ width: viewportWidthXL, height: 1500 });
  await setNativePopoversToAllowMultipleOpen(page, 'p-multi-select');
  await openAllSelect(page, 'p-multi-select', false);
};

// executed in Chrome only
test.describe(component, () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression on multi-select within table component for viewport ${viewportWidthXL}`, async ({
    page,
  }) => {
    await scenario(page);
    await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthXL}-overview-within-table.png`);
  });
});
