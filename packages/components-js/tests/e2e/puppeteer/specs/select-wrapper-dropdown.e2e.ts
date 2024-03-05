import {
  expectA11yToMatchSnapshot,
  ExpectToMatchSnapshotOptions,
  getAttribute,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { Page } from 'puppeteer';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-select-wrapper');

const dropdownSelector = 'p-select-wrapper >>> p-select-wrapper-dropdown';
const selectedClass = 'option--selected';

const getDropdown = () => selectNode(page, dropdownSelector);
const getDropdownCombobox = () => selectNode(page, `${dropdownSelector} >>> [role="combobox"]`);
const getDropdownOption1 = () => selectNode(page, `${dropdownSelector} >>> .option:nth-child(1)`);
const getDropdownOption2 = () => selectNode(page, `${dropdownSelector} >>> .option:nth-child(2)`);
const getSelectedDropdownOption = () => selectNode(page, `${dropdownSelector} >>> .${selectedClass}`);

const getComboboxAriaActiveDescendant = async () => getAttribute(await getDropdownCombobox(), 'aria-activedescendant');
const getSelectedDropdownOptionId = async () => getAttribute(await getSelectedDropdownOption(), 'id');

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

const initSelect = (opts?: InitOptions): Promise<void> => {
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

describe('accessibility', () => {
  const opts: ExpectToMatchSnapshotOptions = {
    skipWaitForFunction: true,
  };

  it('should expose correct initial accessibility tree', async () => {
    await initSelect();
    const dropdownCombobox = await getDropdownCombobox();
    const dropdown = await getDropdown();

    await expectA11yToMatchSnapshot(page, dropdownCombobox, { ...opts, interestingOnly: false });
    await expectA11yToMatchSnapshot(page, dropdown, { ...opts, interestingOnly: true });
  });

  it('should expose correct initial accessibility tree in open state', async () => {
    await initSelect({ disabledIndex: 1 });
    const host = await getHost();
    const dropdownCombobox = await getDropdownCombobox();
    const dropdown = await getDropdown();

    await host.click();
    await waitForStencilLifecycle(page);
    await expectA11yToMatchSnapshot(page, dropdownCombobox, { ...opts, interestingOnly: false });
    await expectA11yToMatchSnapshot(page, dropdown, { ...opts, interestingOnly: false });
  });

  it('should expose correct accessibility tree if rendered with optgroups in open state', async () => {
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

    const host = await getHost();
    const dropdown = await getDropdown();

    await host.click();
    await waitForStencilLifecycle(page);
    await expectA11yToMatchSnapshot(page, dropdown, { ...opts, interestingOnly: false });
    expect(await getComboboxAriaActiveDescendant()).toEqual(await getSelectedDropdownOptionId());
  });

  it('should expose correct accessibility tree if open/closed', async () => {
    await initSelect();

    const host = await getHost();
    const dropdownCombobox = await getDropdownCombobox();

    await expectA11yToMatchSnapshot(page, dropdownCombobox, { ...opts, message: 'Initially' });

    await host.click();
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, dropdownCombobox, { ...opts, message: 'After click' });
  });

  it('should expose correct accessibility tree on selected custom option on click in open state', async () => {
    await initSelect();

    const host = await getHost();
    await host.click();
    await waitForStencilLifecycle(page);

    const dropdownOption1 = await getDropdownOption1();
    const dropdownOption2 = await getDropdownOption2();
    await expectA11yToMatchSnapshot(page, dropdownOption1, {
      ...opts,
      message: 'Initially option A',
      interestingOnly: false,
    });
    await expectA11yToMatchSnapshot(page, dropdownOption2, {
      ...opts,
      message: 'Initially option B',
      interestingOnly: false,
    });

    await dropdownOption2.click();
    await waitForStencilLifecycle(page);
    await host.click();
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, await getDropdownOption1(), {
      ...opts,
      message: 'Option A after click',
      interestingOnly: false,
    });
    await expectA11yToMatchSnapshot(page, await getDropdownOption2(), {
      ...opts,
      message: 'Option B after click',
      interestingOnly: false,
    });
  });

  it('should expose correct accessibility tree if description is set', async () => {
    await initSelect();
    const host = await getHost();
    await setProperty(host, 'description', 'Some description');
    await host.click();
    await waitForStencilLifecycle(page);
    const dropdownCombobox = await getDropdownCombobox();

    await expectA11yToMatchSnapshot(page, dropdownCombobox, opts);
  });

  it('should expose correct accessibility tree in error state', async () => {
    await initSelect();
    const host = await getHost();
    await setProperty(host, 'state', 'error');
    await setProperty(host, 'message', 'Some error message');
    await host.click();
    await waitForStencilLifecycle(page);
    const dropdownCombobox = await getDropdownCombobox();

    await expectA11yToMatchSnapshot(page, dropdownCombobox, opts);
  });
});
