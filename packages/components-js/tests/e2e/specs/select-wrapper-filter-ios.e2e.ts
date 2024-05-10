import { devices, expect, test } from '@playwright/test';
import { Page } from 'playwright';
import { setContentWithDesignSystem, skipInBrowsers } from '../helpers';

const dropdownSelector = 'p-select-wrapper p-select-wrapper-dropdown';

const getDropdown = (page: Page) => page.$(dropdownSelector);

// TODO: Create a shared init fn for select-wrapper filter
const initSelect = (page: Page, opts?: InitOptions): Promise<void> => {
  const { amount = 3, isNative = false, markupBefore = '', disabledIndex, selectedIndex } = opts || {};

  const options = [...'abc', ...(amount === 5 ? 'de' : '')].map((x, idx) => {
    const attrs = [disabledIndex === idx ? 'disabled' : '', selectedIndex === idx ? 'selected' : ''].join(' ');
    return `<option value="${x}" ${attrs}>Option ${x.toUpperCase()}</option>`;
  });

  return setContentWithDesignSystem(
    page,
    `${markupBefore}
    <p-select-wrapper label="Some label" filter="true" ${isNative ? 'native="true"' : ''}>
      <select>
        ${options}
      </select>
    </p-select-wrapper>`
  );
};

test.use({
  ...devices['iPhone X'],
});

skipInBrowsers(['firefox', 'webkit', 'chromium']);

test('should render dropdown if touch support is detected', async ({ page }) => {
  await initSelect(page);

  const dropdown = await getDropdown(page);
  expect(dropdown).not.toBeNull();
});
