import {
  type ExpectToMatchSnapshotOptions,
  getAttribute,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../../helpers';
import { type Page, test, expect } from '@playwright/test';

const getHost = (page: Page) => page.locator('p-select-wrapper');

const dropdownSelector = 'p-select-wrapper p-select-wrapper-dropdown';
const selectedClass = 'option--selected';

const getDropdown = (page: Page) => page.locator(dropdownSelector);
const getDropdownCombobox = (page: Page) => page.locator(`${dropdownSelector} [role="combobox"]`);
const getDropdownOption1 = (page: Page) => page.locator(`${dropdownSelector} .option:nth-child(1)`);
const getDropdownOption2 = (page: Page) => page.locator(`${dropdownSelector} .option:nth-child(2)`);
const getSelectedDropdownOption = (page: Page) => page.locator(`${dropdownSelector} .${selectedClass}`);

const getComboboxAriaActiveDescendant = async (page: Page) =>
  getAttribute(await getDropdownCombobox(page), 'aria-activedescendant');
const getSelectedDropdownOptionId = async (page: Page) => getAttribute(await getSelectedDropdownOption(page), 'id');

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

  const options = ['abc', amount === 5 ? 'de' : ''].map((x, idx) => {
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

const opts: ExpectToMatchSnapshotOptions = {
  skipWaitForFunction: true,
};

test.fixme('should expose correct initial accessibility tree', async ({ page }) => {
  await initSelect(page);
  const dropdownCombobox = getDropdownCombobox(page);
  const dropdown = getDropdown(page);

  // await expectA11yToMatchSnapshot(page, dropdownCombobox, { ...opts, interestingOnly: false });
  // await expectA11yToMatchSnapshot(page, dropdown, { ...opts, interestingOnly: true });
});

test.fixme('should expose correct initial accessibility tree in open state', async ({ page }) => {
  await initSelect(page, { disabledIndex: 1 });
  const host = getHost(page);
  const dropdownCombobox = getDropdownCombobox(page);
  const dropdown = getDropdown(page);

  await host.click();
  await waitForStencilLifecycle(page);
  // await expectA11yToMatchSnapshot(page, dropdownCombobox, { ...opts, interestingOnly: false });
  // await expectA11yToMatchSnapshot(page, dropdown, { ...opts, interestingOnly: false });
});

test('should expose correct accessibility tree if rendered with optgroups in open state', async ({ page }) => {
  await setContentWithDesignSystem(
    page,
    `
      <p-select-wrapper label="Some label">
        <select>
          <optgroup label="Some optgroup label 1">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
          </optgroup>
          <optgroup label="Some optgroup label 1">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
          </optgroup>
        </select>
      </p-select-wrapper>`
  );

  const host = getHost(page);
  const dropdown = getDropdown(page);

  await host.click();
  await waitForStencilLifecycle(page);
  // await expectA11yToMatchSnapshot(page, dropdown, { ...opts, interestingOnly: false });
  expect(await getComboboxAriaActiveDescendant(page)).toEqual(await getSelectedDropdownOptionId(page));
});

test.fixme('should expose correct accessibility tree if open/closed', async ({ page }) => {
  await initSelect(page);

  const host = getHost(page);
  const dropdownCombobox = getDropdownCombobox(page);

  // await expectA11yToMatchSnapshot(page, dropdownCombobox, { ...opts, message: 'Initially' });

  await host.click();
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, dropdownCombobox, { ...opts, message: 'After click' });
});

test.fixme(
  'should expose correct accessibility tree on selected custom option on click in open state',
  async ({ page }) => {
    await initSelect(page);

    const host = getHost(page);
    await host.click();
    await waitForStencilLifecycle(page);

    const dropdownOption1 = getDropdownOption1(page);
    const dropdownOption2 = getDropdownOption2(page);
    // await expectA11yToMatchSnapshot(page, dropdownOption1, {
    //   ...opts,
    //   message: 'Initially option A',
    //   interestingOnly: false,
    // });
    // await expectA11yToMatchSnapshot(page, dropdownOption2, {
    //   ...opts,
    //   message: 'Initially option B',
    //   interestingOnly: false,
    // });

    await dropdownOption2.click();
    await waitForStencilLifecycle(page);
    await host.click();
    await waitForStencilLifecycle(page);

    // await expectA11yToMatchSnapshot(page, await getDropdownOption1(), {
    //   ...opts,
    //   message: 'Option A after click',
    //   interestingOnly: false,
    // });
    // await expectA11yToMatchSnapshot(page, await getDropdownOption2(), {
    //   ...opts,
    //   message: 'Option B after click',
    //   interestingOnly: false,
    // });
  }
);

test.fixme('should expose correct accessibility tree if description is set', async ({ page }) => {
  await initSelect(page);
  const host = getHost(page);
  await setProperty(host, 'description', 'Some description');
  await host.click();
  await waitForStencilLifecycle(page);
  const dropdownCombobox = getDropdownCombobox(page);

  // await expectA11yToMatchSnapshot(page, dropdownCombobox, opts);
});

test.fixme('should expose correct accessibility tree in error state', async ({ page }) => {
  await initSelect(page);
  const host = getHost(page);
  await setProperty(host, 'state', 'error');
  await setProperty(host, 'message', 'Some error message');
  await host.click();
  await waitForStencilLifecycle(page);
  const dropdownCombobox = getDropdownCombobox(page);

  // await expectA11yToMatchSnapshot(page, dropdownCombobox, opts);
});
