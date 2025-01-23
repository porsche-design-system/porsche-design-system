import { type Page, expect, test } from '@playwright/test';
import { viewportWidthXL } from '@porsche-design-system/shared/testing/playwright.vrt';
import { openAllSelect, setContentWithDesignSystem, setNativePopoversToAllowMultipleOpen } from '../../helpers';

const component = 'select-wrapper';

const scenario = async (page: Page): Promise<void> => {
  const getSelectWrapper = (direction: string, filter: string): string => {
    return `<p-select-wrapper label="Direction ${direction}" dropdown-direction=${direction} filter=${filter}>
      <select name="some-name">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
        <option value="d">Option D</option>
        <option value="e">Option E</option>
        <option value="f">Option F</option>
        <option value="g">Option G</option>
        <option value="h">Option H</option>
        <option value="i">Option I</option>
        <option value="j">Option J</option>
        <option value="k">Option K</option>
      </select>
    </p-select-wrapper>`;
  };

  const markup = () =>
    `<p-table caption="select wrapper" style="padding-bottom: 500px;">
      <p-table-head>
        <p-table-head-row>
          <p-table-head-cell>
            ${getSelectWrapper('down', 'false')}
          </p-table-head-cell>
        </p-table-head-row>
      </p-table-head>
    </p-table>
    <p-table caption="select wrapper" style="padding-top: 500px">
      <p-table-head>
        <p-table-head-row>
          <p-table-head-cell>
            ${getSelectWrapper('up', 'false')}
          </p-table-head-cell>
        </p-table-head-row>
      </p-table-head>
    </p-table>
    <p-table caption="select wrapper" style="padding-bottom: 500px">
      <p-table-head>
        <p-table-head-row>
          <p-table-head-cell>
            ${getSelectWrapper('down', 'true')}
          </p-table-head-cell>
        </p-table-head-row>
      </p-table-head>
    </p-table>
    <p-table caption="select wrapper" style="padding-top: 500px">
      <p-table-head>
        <p-table-head-row>
          <p-table-head-cell>
            ${getSelectWrapper('up', 'true')}
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

  await page.setViewportSize({ width: viewportWidthXL, height: 2500 });
  await setNativePopoversToAllowMultipleOpen(page, 'p-select-wrapper');
  await openAllSelect(page, 'p-select-wrapper', true);
};

// executed in Chrome only
test.describe(component, () => {
  test.skip(({ browserName }) => browserName !== 'chromium');

  test(`should have no visual regression on select-wrapper within table component for viewport ${viewportWidthXL}`, async ({
    page,
  }) => {
    await scenario(page);
    await expect(page.locator('#app')).toHaveScreenshot(`${component}-${viewportWidthXL}-overview-within-table.png`);
  });
});
