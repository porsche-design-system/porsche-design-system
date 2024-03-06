import {
  expectA11yToMatchSnapshot,
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
const filterInputSelector = `${dropdownSelector} >>> input`;

const getDropdownList = () => selectNode(page, `${dropdownSelector} >>> [role="listbox"]`);
const getFilterInput = () => selectNode(page, filterInputSelector);

type InitOptions = {
  amount?: 3 | 5;
  isNative?: boolean;
  markupBefore?: string;
  disabledIndex?: number;
  selectedIndex?: number;
};

const initSelect = (opts?: InitOptions): Promise<void> => {
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

describe('accessibility', () => {
  it('should expose correct initial accessibility tree and aria properties of filter', async () => {
    await initSelect({ disabledIndex: 1 });
    const filter = await getFilterInput();

    await expectA11yToMatchSnapshot(page, filter, { interestingOnly: false });
  });

  it('should expose correct accessibility tree of option list if filter value has no match', async () => {
    await initSelect();
    const filterInput = await getFilterInput();
    await filterInput.type('d');
    await waitForStencilLifecycle(page);

    const dropDown = await getDropdownList();

    await expectA11yToMatchSnapshot(page, dropDown, { interestingOnly: false });
  });

  it('should expose correct accessibility tree if description is set', async () => {
    await initSelect();
    const host = await getHost();
    await setProperty(host, 'description', 'Some description');
    await waitForStencilLifecycle(page);
    const filterInput = await getFilterInput();

    await expectA11yToMatchSnapshot(page, filterInput);
  });

  it('should expose correct accessibility tree in error state', async () => {
    await initSelect();
    const host = await getHost();
    await setProperty(host, 'state', 'error');
    await setProperty(host, 'message', 'Some error message');
    await waitForStencilLifecycle(page);
    const filterInput = await getFilterInput();

    await expectA11yToMatchSnapshot(page, filterInput);
  });
});
