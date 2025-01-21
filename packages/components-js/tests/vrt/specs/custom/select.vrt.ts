import { type Page, expect, test } from '@playwright/test';
import { viewportWidthXL } from '@porsche-design-system/shared/testing/playwright.vrt';
import { openAllSelect, setContentWithDesignSystem, setNativePopoversToAllowMultipleOpen } from '../../helpers';

const component = 'select';

const scenario = async (page: Page): Promise<void> => {
  const getSelect = (direction: string): string => {
    return `<p-select name="some-name" label="Direction ${direction}" dropdown-direction=${direction}>
      <p-select-option value="a">Option A</p-select-option>
      <p-select-option value="b">Option B</p-select-option>
      <p-select-option value="c">Option C</p-select-option>
      <p-select-option value="d">Option D</p-select-option>
      <p-select-option value="e">Option E</p-select-option>
      <p-select-option value="f">Option F</p-select-option>
      <p-select-option value="g">Option G</p-select-option>
      <p-select-option value="h">Option H</p-select-option>
      <p-select-option value="i">Option I</p-select-option>
      <p-select-option value="j">Option J</p-select-option>
      <p-select-option value="k">Option K</p-select-option>
    </p-select>`;
  };

  const markup = () =>
    `<p-table caption="select within table" style="padding-bottom: 500px;">
      <p-table-head>
        <p-table-head-row>
          <p-table-head-cell>
            ${getSelect('down')}
          </p-table-head-cell>
        </p-table-head-row>
      </p-table-head>
    </p-table>
    <p-table caption="select within table" style="padding-top: 500px">
      <p-table-head>
        <p-table-head-row>
          <p-table-head-cell>
            ${getSelect('up')}
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
  await setNativePopoversToAllowMultipleOpen(page, 'p-select');
  await openAllSelect(page, 'p-select', false);
};

// executed in Chrome only
test.describe(component, () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression on select within table component for viewport ${viewportWidthXL}`, async ({
    page,
  }) => {
    await scenario(page);
    await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthXL}-overview-within-table.png`);
  });
});
