import type { Page } from 'puppeteer';
import type { Components } from '@porsche-design-system/components/src/components';
import {
  expectA11yToMatchSnapshot,
  getHTMLAttributes,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-multi-select');
const getInput = () => selectNode(page, 'p-multi-select >>> input');
const getDropdown = () => selectNode(page, 'p-multi-select >>> .listbox');
const getAssertiveText = async () => await selectNode(page, 'span[aria-live="assertive"]');

type InitOptions = {
  props?: Components.PMultiSelect;
  slots?: {
    label?: string;
    description?: string;
    message?: string;
  };
  options?: {
    amount?: 3 | 5;
    disabledIndex?: number;
    isWithinForm?: boolean;
    markupBefore?: string;
    markupAfter?: string;
  };
};

const initMultiSelect = (opt?: InitOptions): Promise<void> => {
  const { props = { name: 'name' }, slots, options } = opt || {};
  const { amount = 3, disabledIndex, isWithinForm = true, markupBefore = '', markupAfter = '' } = options || {};
  const { label = '', description = '', message = '' } = slots || {};

  const selectOptions = [...'abc', ...(amount === 5 ? 'de' : '')]
    .map((x, idx) => {
      const attrs = [disabledIndex === idx ? 'disabled' : ''].join(' ');
      return `<p-multi-select-option value="${x}" ${attrs}>Option ${x.toUpperCase()}</p-multi-select-option>`;
    })
    .join('\n');

  const markup = `${markupBefore}
      <p-multi-select ${getHTMLAttributes(props)}>
        ${label}
        ${description}
        ${selectOptions}
        ${message}
      </p-multi-select>
      ${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

describe('accessibility', () => {
  it('should expose correct initial accessibility tree and aria properties of filter', async () => {
    await initMultiSelect({ options: { disabledIndex: 1 } });
    const inputElement = await getInput();

    await expectA11yToMatchSnapshot(page, inputElement, { interestingOnly: false });
  });

  it('should expose correct accessibility tree of option list if filter value has no match', async () => {
    await initMultiSelect();
    const inputElement = await getInput();
    await inputElement.type('d');
    await waitForStencilLifecycle(page);

    const dropDown = await getDropdown();
    const assertiveText = await getAssertiveText();

    await expectA11yToMatchSnapshot(page, dropDown, { interestingOnly: false });
  });

  it('should expose correct accessibility tree if option is highlighted', async () => {
    await initMultiSelect();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    const inputElement = await getInput();
    const assertiveText = await getAssertiveText();

    await expectA11yToMatchSnapshot(page, inputElement, { interestingOnly: false });
    await expectA11yToMatchSnapshot(page, assertiveText, { interestingOnly: false });
  });

  it('should expose correct accessibility tree if option is selected', async () => {
    await initMultiSelect();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    const inputElement = await getInput();
    const assertiveText = await getAssertiveText();

    await expectA11yToMatchSnapshot(page, inputElement, { interestingOnly: false });
    await expectA11yToMatchSnapshot(page, assertiveText, { interestingOnly: false });
  });

  it('should expose correct accessibility tree if description is set', async () => {
    await initMultiSelect();
    const host = await getHost();
    await setProperty(host, 'description', 'Some description');
    await waitForStencilLifecycle(page);
    const inputElement = await getInput();

    await expectA11yToMatchSnapshot(page, inputElement);
  });

  it('should expose correct accessibility tree in error state', async () => {
    await initMultiSelect();
    const host = await getHost();
    await setProperty(host, 'state', 'error');
    await setProperty(host, 'message', 'Some error message');
    await waitForStencilLifecycle(page);
    const inputElement = await getInput();

    await expectA11yToMatchSnapshot(page, inputElement);
  });
});
