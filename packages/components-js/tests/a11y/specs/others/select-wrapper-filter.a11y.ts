import { setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';
import { type Page, test, expect } from '@playwright/test';

const getHost = (page: Page) => page.$('p-select-wrapper');

const dropdownSelector = 'p-select-wrapper p-select-wrapper-dropdown';
const filterInputSelector = `${dropdownSelector} input`;

const getDropdownList = (page: Page) => page.$(`${dropdownSelector} [role="listbox"]`);
const getFilterInput = (page: Page) => page.$(filterInputSelector);

type InitOptions = {
  amount?: 3 | 5;
  isNative?: boolean;
  markupBefore?: string;
  disabledIndex?: number;
  selectedIndex?: number;
};

const initSelect = (page: Page, opts?: InitOptions): Promise<void> => {
  const { amount = 3, isNative = false, markupBefore = '', disabledIndex, selectedIndex } = opts || {};

  const options = ['abc', amount === 5 ? 'de' : ''].map((x, idx) => {
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

test.fixme('should expose correct initial accessibility tree and aria properties of filter', async ({ page }) => {
  await initSelect(page, { disabledIndex: 1 });
  const filter = await getFilterInput(page);

  // await expectA11yToMatchSnapshot(page, filter, { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree of option list if filter value has no match', async ({ page }) => {
  await initSelect(page);
  const filterInput = await getFilterInput(page);
  await filterInput.type('d');
  await waitForStencilLifecycle(page);

  const dropDown = await getDropdownList(page);

  // await expectA11yToMatchSnapshot(page, dropDown, { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree if description is set', async ({ page }) => {
  await initSelect(page);
  const host = await getHost(page);
  await setProperty(host, 'description', 'Some description');
  await waitForStencilLifecycle(page);
  const filterInput = await getFilterInput(page);

  // await expectA11yToMatchSnapshot(page, filterInput);
});

test.fixme('should expose correct accessibility tree in error state', async ({ page }) => {
  await initSelect(page);
  const host = await getHost(page);
  await setProperty(host, 'state', 'error');
  await setProperty(host, 'message', 'Some error message');
  await waitForStencilLifecycle(page);
  const filterInput = await getFilterInput(page);

  // await expectA11yToMatchSnapshot(page, filterInput);
});
