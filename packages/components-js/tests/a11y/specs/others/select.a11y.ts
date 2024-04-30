import { type Page, test, expect } from '@playwright/test';
import type { Components } from '@porsche-design-system/components/src/components';
import { getHTMLAttributes, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../../helpers';

const getHost = (page: Page) => page.$('p-select');
const getButton = (page: Page) => page.$('p-select button');

type InitOptions = {
  props?: Components.PSelect;
  slots?: {
    label?: string;
    description?: string;
    message?: string;
  };
  options?: {
    values?: string[];
    disabledIndices?: number[];
    isWithinForm?: boolean;
    markupBefore?: string;
    markupAfter?: string;
  };
};

const initSelect = (page: Page, opt?: InitOptions): Promise<void> => {
  const { props = { name: 'options' }, slots, options } = opt || {};
  const {
    values = ['a', 'b', 'c'],
    disabledIndices = [],
    isWithinForm = true,
    markupBefore = '',
    markupAfter = '',
  } = options || {};
  const { label = '', description = '', message = '' } = slots || {};

  const selectOptions = values
    .map((x, idx) => {
      const attrs = [disabledIndices.includes(idx) ? 'disabled' : ''].join(' ');
      return `<p-select-option ${x ? `value="${x}"` : ''} ${attrs}>${x}</p-select-option>`;
    })
    .join('\n');

  const markup = `${markupBefore}
      <p-select ${getHTMLAttributes(props)}>
        ${label}
        ${description}
        ${selectOptions}
        ${message}
      </p-select>
      ${markupAfter}`;

  return setContentWithDesignSystem(page, isWithinForm ? `<form onsubmit="return false;">${markup}</form>` : markup);
};

test.fixme('should expose correct initial accessibility tree and aria properties of button', async ({ page }) => {
  await initSelect(page, { options: { disabledIndices: [1] } });
  const buttonElement = await getButton(page);

  // await expectA11yToMatchSnapshot(page, buttonElement, { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree if option is highlighted', async ({ page }) => {
  await initSelect(page);
  const buttonElement = await getButton(page);

  await buttonElement.press('Space');
  await buttonElement.press('ArrowDown');
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, buttonElement, { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree if option is selected', async ({ page }) => {
  await initSelect(page);
  const buttonElement = await getButton(page);

  await buttonElement.press('Space');
  await buttonElement.press('ArrowDown');
  await buttonElement.press('Enter');
  await waitForStencilLifecycle(page);

  // await expectA11yToMatchSnapshot(page, buttonElement, { interestingOnly: false });
});

test.fixme('should expose correct accessibility tree if description is set', async ({ page }) => {
  await initSelect(page);
  const host = await getHost(page);
  await setProperty(host, 'description', 'Some description');
  await waitForStencilLifecycle(page);
  const buttonElement = await getButton(page);

  // await expectA11yToMatchSnapshot(page, buttonElement);
});

test.fixme('should expose correct accessibility tree in error state', async ({ page }) => {
  await initSelect(page);
  const host = await getHost(page);
  await setProperty(host, 'state', 'error');
  await setProperty(host, 'message', 'Some error message');
  await waitForStencilLifecycle(page);
  const buttonElement = await getButton(page);

  // await expectA11yToMatchSnapshot(page, buttonElement);
});
