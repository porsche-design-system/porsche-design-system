import { devices, expect, test } from '@playwright/test';
import { Page } from 'playwright';
import { setContentWithDesignSystem } from '../helpers';

const dropdownSelector = 'p-select-wrapper p-select-wrapper-dropdown';

const getDropdown = (page: Page) => page.$(dropdownSelector);

type InitOptions = {
  amount?: 3 | 5;
  isNative?: boolean;
  dropdownDirection?: 'up' | 'down';
  markupBefore?: string;
  disabledIndex?: number;
  selectedIndex?: number;
  hiddenIndex?: number;
  beginUnique?: boolean;
};

// TODO: Create a shared init fn for select-wrapper-dropdown
const initSelect = (page: Page, opts?: InitOptions): Promise<void> => {
  const {
    amount = 3,
    isNative = false,
    dropdownDirection,
    markupBefore = '',
    disabledIndex,
    selectedIndex,
    hiddenIndex,
    beginUnique,
  } = opts || {};

  const options = [...'abc', ...(amount === 5 ? 'de' : '')].map((x, idx) => {
    const attrs = [
      disabledIndex === idx ? 'disabled' : '',
      selectedIndex === idx ? 'selected' : '',
      hiddenIndex === idx ? 'hidden' : '',
    ].join(' ');

    const val = x.toUpperCase();
    return `<option value="${x}" ${attrs}>${beginUnique ? `${val} Option` : `Option ${val}`}</option>`;
  });

  const attrs = [
    isNative !== undefined && `native="${isNative}"`,
    dropdownDirection && `dropdown-direction="${dropdownDirection}"`,
  ]
    .filter((x) => x)
    .join(' ');

  return setContentWithDesignSystem(
    page,
    `${markupBefore}
    <p-select-wrapper label="Some label" ${attrs}>
      <select>
        ${options}
      </select>
    </p-select-wrapper>`
  );
};

test.use({
  ...devices['iPhone X'],
});

test('should not render dropdown if touch support is detected', async ({ page }) => {
  await initSelect(page);

  const dropdown = await getDropdown(page);
  expect(dropdown).toBeNull();
});

test('should not render dropdown if touch support is detected and native is set to false', async ({ page }) => {
  await initSelect(page, { isNative: false });

  const dropdown = await getDropdown(page);
  expect(dropdown).toBeNull();
});
