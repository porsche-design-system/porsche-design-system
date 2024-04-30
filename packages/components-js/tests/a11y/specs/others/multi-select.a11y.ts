import { type Page, test, expect } from '@playwright/test';
import type { Components } from '@porsche-design-system/components/src/components';
import { getHTMLAttributes, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';

const getHost = (page: Page) => page.$('p-multi-select');
const getInput = (page: Page) => page.$('p-multi-select input');
const getDropdown = (page: Page) => page.$('p-multi-select .listbox');
const getAssertiveText = (page: Page) => page.$('span[aria-live="assertive"]');

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

const initMultiSelect = (page: Page, opt?: InitOptions): Promise<void> => {
  const { props = { name: 'name' }, slots, options } = opt || {};
  const { amount = 3, disabledIndex, isWithinForm = true, markupBefore = '', markupAfter = '' } = options || {};
  const { label = '', description = '', message = '' } = slots || {};

  const selectOptions = ['abc', amount === 5 ? 'de' : '']
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

test.fixme('should expose correct initial accessibility tree and aria properties of filter', async ({ page }) => {
  await initMultiSelect(page, { options: { disabledIndex: 1 } });
  const inputElement = await getInput(page);

  // await expectA11yToMatchSnapshot(page, inputElement, { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree of option list if filter value has no match', async ({ page }) => {
  await initMultiSelect(page);
  const inputElement = await getInput(page);
  await inputElement.type('d');
  await waitForStencilLifecycle(page);

  const dropDown = await getDropdown(page);
  const assertiveText = await getAssertiveText(page);

  // await expectA11yToMatchSnapshot(page, dropDown, { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree if option is highlighted', async ({ page }) => {
  await initMultiSelect(page);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowDown');
  await waitForStencilLifecycle(page);

  const inputElement = await getInput(page);
  const assertiveText = await getAssertiveText(page);

  // await expectA11yToMatchSnapshot(page, inputElement, { interestingOnly: false });
  // await expectA11yToMatchSnapshot(page, assertiveText, { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree if option is selected', async ({ page }) => {
  await initMultiSelect(page);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await waitForStencilLifecycle(page);

  const inputElement = await getInput(page);
  const assertiveText = await getAssertiveText(page);

  // await expectA11yToMatchSnapshot(page, inputElement, { interestingOnly: false });
  // await expectA11yToMatchSnapshot(page, assertiveText, { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree if description is set', async ({ page }) => {
  await initMultiSelect(page);
  const host = await getHost(page);
  await setProperty(host, 'description', 'Some description');
  await waitForStencilLifecycle(page);
  const inputElement = await getInput(page);

  // await expectA11yToMatchSnapshot(page, inputElement);
});

test.fixme('should expose correct accessibility tree in error state', async ({ page }) => {
  await initMultiSelect(page);
  const host = await getHost(page);
  await setProperty(host, 'state', 'error');
  await setProperty(host, 'message', 'Some error message');
  await waitForStencilLifecycle(page);
  const inputElement = await getInput(page);

  // await expectA11yToMatchSnapshot(page, inputElement);
});
