import type { Page } from 'puppeteer';
import type { Components } from '@porsche-design-system/components';
import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getElementStyle,
  getEventSummary,
  getHTMLAttributes,
  getLifecycleStatus,
  getProperty,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';
import type { SelectOption } from '@porsche-design-system/components/src/components/select/select/select-utils';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-select');
const getSelectValue = async (): Promise<string> => await getProperty(await getHost(), 'value');
const getButton = () => selectNode(page, 'p-select >>> button');
const getButtonText = async (): Promise<string> => getProperty(await getButton(), 'textContent');
const getDropdown = () => selectNode(page, 'p-select >>> .listbox');
const getDropdownDisplay = async (): Promise<string> => await getElementStyle(await getDropdown(), 'display');
const getSelectOption = (n: number) => selectNode(page, `p-select p-select-option:nth-child(${n + 1})`); // First one is native select
const getSelectedSelectOptionProperty = async <K extends keyof SelectOption>(property: K): Promise<SelectOption[K]> =>
  await page.$$eval(
    'p-select p-select-option',
    (options, property) =>
      ((options.find((option: SelectOption) => option.selected) as SelectOption)?.[property] as SelectOption[K]) ??
      undefined,
    property
  );

const getHighlightedSelectOptionProperty = async <K extends keyof SelectOption>(
  property: K
): Promise<SelectOption[K] | undefined> =>
  await page.$$eval(
    'p-select p-select-option',
    (options, property) =>
      ((options.find((option: SelectOption) => option.highlighted) as SelectOption)?.[property] as SelectOption[K]) ??
      undefined,
    property
  );

const getSelectedOptionIndex = async (): Promise<number> =>
  await page.$$eval('p-select p-select-option', (options: SelectOption[]) =>
    options.indexOf(options.find((option: SelectOption) => option.selected))
  );
const getHighlightedOptionIndex = async (): Promise<number> =>
  await page.$$eval('p-select p-select-option', (options: SelectOption[]) =>
    options.filter((option) => !option.hidden).indexOf(options.find((option: SelectOption) => option.highlighted))
  );
const getNativeSelect = () => selectNode(page, 'p-select select');
const getNativeSelectValue = async (): Promise<string> => await getProperty(await getNativeSelect(), 'value');
const getNativeSelectOptions = () => page.$$('p-select select option');
const getNativeSelectInnerHTML = () => page.$eval('p-select select', (el) => el.innerHTML);
const getLabel = () => selectNode(page, 'p-select >>> label');

const labelSlotContent =
  '<span slot="label" id="some-label-id">Some label with a <a href="https://designsystem.porsche.com">link</a>.</span>';
const descriptionSlotContent =
  '<span slot="description" id="some-description-id">Some description with a <a href="https://designsystem.porsche.com">link</a>.</span>';
const messageSlotContent =
  '<span slot="message" id="some-message-id">Some error message with a <a href="https://designsystem.porsche.com">link</a>.</span>';

const setValue = async (value: string) =>
  await page.evaluate((el: HTMLPSelectElement, value) => (el.value = value), await getHost(), value);

// TODO: Test adding hidden, disabled option?
const addOption = async (value: string, textContent?: string) => {
  await page.evaluate(
    (el: HTMLPSelectElement, value, textContent) => {
      const option: any = document.createElement('p-select-option');
      option.value = value;
      option.textContent = textContent;
      el.append(option);
    },
    await getHost(),
    value,
    textContent ? textContent : value
  );
};

const removeLastOption = async () => {
  await page.evaluate((el: HTMLPSelectElement) => el.lastElementChild.remove(), await getHost());
};

const testValues = [
  'Afghanistan',
  'Åland Islands',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia, Plurinational State of',
  'Bonaire, Sint Eustatius and Saba',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Cayman Islands',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos (Keeling) Islands',
  'Colombia',
  'Comoros',
  'Congo',
  'Congo, the Democratic Republic of the',
  'Cook Islands',
  'Costa Rica',
  "Côte d'Ivoire",
  'Croatia',
  'Cuba',
  'Curaçao',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Falkland Islands (Malvinas)',
  'Faroe Islands',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'French Southern Territories',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Heard Island and McDonald Islands',
  'Holy See (Vatican City State',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran, Islamic Republic of',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  "Korea, Democratic People's Republic of",
  'Korea, Republic of',
  'Kuwait',
  'Kyrgyzstan',
];

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

const initSelect = (opt?: InitOptions): Promise<void> => {
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

it('should render', async () => {
  await initSelect();
  const buttonElement = await getButton();

  expect(await getDropdownDisplay()).toBe('none');

  await buttonElement.click();
  await waitForStencilLifecycle(page);

  expect(await getDropdownDisplay()).toBe('flex');
});

describe('native select', () => {
  it('should be rendered', async () => {
    await initSelect();
    const nativeSelectElement = await getNativeSelect();
    expect(nativeSelectElement).not.toBeNull();
    expect(await nativeSelectElement.evaluate((el: HTMLSelectElement) => el.selectedOptions.length)).toBe(0);
  });

  it('should not be visible', async () => {
    await initSelect();
    const nativeSelectElement = await getNativeSelect();
    expect(await getElementStyle(nativeSelectElement, 'opacity')).toBe('0');
  });

  it('props should be in sync', async () => {
    await initSelect();
    const nativeSelectElement = await getNativeSelect();
    expect(await getAttribute(nativeSelectElement, 'name')).toBe('options');

    const host = await getHost();
    await setProperty(host, 'required', true);
    await setProperty(host, 'disabled', true);

    await waitForStencilLifecycle(page);

    expect(await getProperty(nativeSelectElement, 'required')).toBe(true);
    expect(await getProperty(nativeSelectElement, 'disabled')).toBe(true);

    await setProperty(host, 'required', false);
    await setProperty(host, 'disabled', false);

    await waitForStencilLifecycle(page);

    expect(await getProperty(nativeSelectElement, 'required')).toBe(false);
    expect(await getProperty(nativeSelectElement, 'disabled')).toBe(false);
  });

  it('should be in sync with selected option when selecting option', async () => {
    await initSelect();
    expect(await getNativeSelectValue(), 'initial').toBe('');
    expect(await getNativeSelectInnerHTML(), 'initial').toBe('');

    const buttonElement = await getButton();
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    await (await getSelectOption(1)).click();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after first option selected').toBe('a');
    expect(await getNativeSelectInnerHTML(), 'after first option selected').toBe(
      '<option value="a" selected=""></option>'
    );

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    await (await getSelectOption(2)).click();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after second option selected').toBe('b');
    expect(await getNativeSelectInnerHTML(), 'after second option selected').toBe(
      '<option value="b" selected=""></option>'
    );
  });

  it('should be in sync with selected option initial and when deselecting option', async () => {
    await initSelect({ props: { name: 'options', value: 'a' }, options: { values: ['', 'a'] } });
    expect(await getNativeSelectValue(), 'initial').toBe('a');
    expect(await getNativeSelectInnerHTML(), 'initial').toBe('<option value="a" selected=""></option>');

    const buttonElement = await getButton();
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    await (await getSelectOption(1)).click();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after deselection').toBe('');
    expect(await getNativeSelectInnerHTML(), 'after deselection').toBe('');
  });

  it('should be in sync with selected options when setting value', async () => {
    await initSelect();
    expect(await getNativeSelectValue(), 'initial').toBe('');
    expect(await getNativeSelectInnerHTML(), 'initial').toBe('');

    await setValue('a');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after setting value="a"').toBe('a');
    expect(await getNativeSelectInnerHTML(), 'after setting value="a"').toBe('<option value="a" selected=""></option>');

    await setValue(undefined);
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after setting value undefined').toBe('');
    expect(await getNativeSelectInnerHTML(), 'after setting value undefined').toBe('');
  });

  it('should be in sync with selected options when adding new selected option', async () => {
    await initSelect();

    expect(await getNativeSelectValue(), 'initial').toBe('');
    expect(await getNativeSelectInnerHTML(), 'initial').toBe('');

    await setValue('test');
    await waitForStencilLifecycle(page);
    await addOption('test');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after adding matching option').toBe('test');
    expect(await getNativeSelectInnerHTML(), 'after adding matching option').toBe(
      '<option value="test" selected=""></option>'
    );
  });

  it('should be in sync with selected options when removing selected option', async () => {
    await initSelect();
    await setValue('c');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after adding matching option').toBe('c');
    expect(await getNativeSelectInnerHTML(), 'after adding matching option').toBe(
      '<option value="c" selected=""></option>'
    );

    await removeLastOption();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after removing option').toBe('');
    expect(await getNativeSelectInnerHTML(), 'after removing option').toBe('');
  });

  it('should not be rendered when used without wrapping form', async () => {
    await initSelect({
      options: {
        isWithinForm: false,
      },
    });
    const nativeSelectElement = await getNativeSelect();
    expect(nativeSelectElement).toBeNull();
  });
});

// TODO: Should the update event be emitted when slot changes? e.g. option with current set value is added
describe('Update Event', () => {
  it('should emit update event with correct details when option is selected by click', async () => {
    await initSelect();
    const host = await getHost();
    await addEventListener(host, 'update');

    const buttonElement = await getButton();
    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'before option select').toBe(0);

    const option = await getSelectOption(1);
    await option.click();
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after option select').toBe(1);
    expect((await getEventSummary(host, 'update')).details, 'after option select').toEqual([
      {
        value: 'a',
        name: 'options',
      },
    ]);
    expect((await getEventSummary(host, 'update')).targets, 'after option select').toEqual([
      {
        nodeName: 'P-SELECT',
        nodeValue: null,
        nodeType: 1,
        tagName: 'P-SELECT',
        className: 'hydrated',
        id: '',
      },
    ]);
  });

  it('should emit update event with correct details when option is selected by keyboard', async () => {
    await initSelect();
    const host = await getHost();
    await addEventListener(host, 'update');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'before option select').toBe(0);

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(host, 'update')).counter, 'after option select').toBe(1);
    expect((await getEventSummary(host, 'update')).details, 'after option select').toEqual([
      {
        value: 'a',
        name: 'options',
      },
    ]);
    expect((await getEventSummary(host, 'update')).targets, 'after option select').toEqual([
      {
        nodeName: 'P-SELECT',
        nodeValue: null,
        nodeType: 1,
        tagName: 'P-SELECT',
        className: 'hydrated',
        id: '',
      },
    ]);
  });
});

describe('outside click', () => {
  it('should show dropdown if input is clicked and hide via outside click', async () => {
    await initSelect({ options: { markupBefore: '<p-text>Some Text</p-text>' } });

    const buttonElement = await getButton();
    const text = await selectNode(page, 'p-text');
    expect(await getDropdownDisplay()).toBe('none');

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay()).toBe('flex');

    await text.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after 1st text click').toBe('none');

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after 2nd button click').toBe('flex');

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after 3nd button click').toBe('none');
  });
});

describe('focus', () => {
  it('should focus button when label text is clicked', async () => {
    await initSelect({ props: { name: 'options', label: 'Some Label' } });

    const labelText = await getLabel();
    const buttonElement = await getButton();
    await addEventListener(buttonElement, 'focus');

    expect((await getEventSummary(buttonElement, 'focus')).counter, 'before focus').toBe(0);

    await labelText.click();
    expect((await getEventSummary(buttonElement, 'focus')).counter, 'after focus').toBe(1);
  });

  it('should focus button when tab key is pressed', async () => {
    await initSelect();

    const buttonElement = await getButton();
    await addEventListener(buttonElement, 'focus');

    expect((await getEventSummary(buttonElement, 'focus')).counter).toBe(0);

    await page.keyboard.press('Tab');
    expect((await getEventSummary(buttonElement, 'focus')).counter).toBe(1);
  });

  it('should close dropdown on tab and focus next element', async () => {
    await initSelect({ options: { markupAfter: '<p-button>Some button</p-button>' } });
    const button = await selectNode(page, 'p-button');
    const comboboxEl = await getButton();
    await addEventListener(comboboxEl, 'focus');
    await addEventListener(button, 'focus');

    expect((await getEventSummary(comboboxEl, 'focus')).counter, 'initial focus').toBe(0);

    await page.keyboard.press('Tab');
    expect((await getEventSummary(comboboxEl, 'focus')).counter, 'combobox focus after first tab').toBe(1);
    expect(await getDropdownDisplay(), 'dropdown display after first tab').toBe('none');

    await page.keyboard.press('Space');
    await waitForStencilLifecycle(page);
    expect(await getDropdownDisplay(), 'dropdown display after Space').toBe('flex');

    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);
    expect(await getDropdownDisplay(), 'dropdown display after second tab').toBe('none');
    expect((await getEventSummary(comboboxEl, 'focus')).counter, 'combobox focus after second tab').toBe(1);

    // TODO: Tab should directly go to the next element instead of just closing and selecting an option
    await page.keyboard.press('Tab');
    await waitForStencilLifecycle(page);

    expect((await getEventSummary(button, 'focus')).counter, 'button focus after second tab').toBe(1);
  });
});

// TODO: Test keyboard behavior with multiple same textContent
// TODO: Test keyboard behavior scrolldown to selected option
// The keyboard behavior is aligned with the w3c suggestion https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
describe('keyboard behavior', () => {
  describe('closed combobox', () => {
    let buttonElement;
    beforeEach(async () => {
      await initSelect();
      buttonElement = await getButton();
      await addEventListener(buttonElement, 'focus');

      expect((await getEventSummary(buttonElement, 'focus')).counter, 'initial focus').toBe(0);

      await page.keyboard.press('Tab');
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after first tab').toBe(1);
      expect(await getDropdownDisplay(), 'initial').toBe('none');
    });

    // Opens the listbox if it is not already displayed without moving focus or changing selection.
    // DOM focus remains on the combobox.
    it('should open the listbox when pressing ArrowDown', async () => {
      await buttonElement.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(-1);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after ArrowDown').toBe(1);
    });
    // Opens the listbox if it is not already displayed without moving focus or changing selection.
    // DOM focus remains on the combobox.
    it('should open the listbox and highlight first option when pressing ArrowUp', async () => {
      await buttonElement.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(-1);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after ArrowUp').toBe(1);
    });
    // Opens the listbox without moving focus or changing selection.
    it('should open the listbox when pressing Enter', async () => {
      await buttonElement.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(-1);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after Enter').toBe(1);
    });
    // Opens the listbox without moving focus or changing selection.
    it('should open the listbox when pressing Space', async () => {
      await buttonElement.press('Space');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(-1);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after Space').toBe(1);
    });
    // Opens the listbox and moves visual focus to the first option.
    it('should open the listbox and move highlight to first option when pressing Home', async () => {
      await buttonElement.press('Home');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(0);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after Home').toBe(1);
    });
    // Opens the listbox and moves visual focus to the last option.
    it('should open the listbox when pressing End', async () => {
      await buttonElement.press('End');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(2);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after End').toBe(1);
    });
    // First opens the listbox if it is not already displayed and then moves visual focus to the first option that matches the typed character.
    // If multiple keys are typed in quick succession, visual focus moves to the first option that matches the full string.
    // If the same character is typed in succession, visual focus cycles among the options starting with that character.
    it('should open the listbox when pressing a printable character', async () => {
      await buttonElement.press('B');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(1);
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after pressing "B"').toBe(1);
    });
  });

  describe('within listbox', () => {
    let buttonElement;
    let buttonAfter;
    beforeEach(async () => {
      await initSelect({ options: { values: testValues, markupAfter: '<p-button>Button</p-button>' } });
      buttonAfter = await selectNode(page, 'p-button');
      await addEventListener(buttonAfter, 'focus');
      buttonElement = await getButton();
      await addEventListener(buttonElement, 'focus');

      expect((await getEventSummary(buttonElement, 'focus')).counter, 'initial focus').toBe(0);

      await page.keyboard.press('Tab');
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after first tab').toBe(1);
      expect(await getDropdownDisplay(), 'initial').toBe('none');
      await buttonElement.press('ArrowDown'); // Open dropdown
      await waitForStencilLifecycle(page);
    });

    // Sets the value to the content of the focused option in the listbox.
    // Closes the listbox.
    // Sets visual focus on the combobox.
    it('should select the option and close the dropdown when pressing Enter on option', async () => {
      await buttonElement.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(0);

      await buttonElement.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getSelectValue()).toBe(testValues[0]);
      expect(await getSelectedOptionIndex()).toBe(0);
      expect(await getDropdownDisplay(), 'initial').toBe('none');
      expect(await getHighlightedOptionIndex()).toBe(0); // Highlighted options stays highlighted even after closing of the dropdown
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after pressing Enter').toBe(1);
      expect(await getActiveElementTagName(page)).toBe('P-SELECT');
      expect(await getActiveElementTagNameInShadowRoot(await getHost())).toBe('BUTTON');
    });
    // Sets the value to the content of the focused option in the listbox.
    // Closes the listbox.
    // Sets visual focus on the combobox.
    it('should select the option and close the dropdown when pressing Space on option', async () => {
      await buttonElement.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(0);

      await buttonElement.press('Enter');
      await waitForStencilLifecycle(page);

      expect(await getSelectValue()).toBe(testValues[0]);
      expect(await getSelectedOptionIndex()).toBe(0);
      expect(await getDropdownDisplay(), 'initial').toBe('none');
      expect(await getHighlightedOptionIndex()).toBe(0); // Highlighted options stays highlighted even after closing of the dropdown
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after pressing Space').toBe(1);
      expect(await getActiveElementTagName(page)).toBe('P-SELECT');
      expect(await getActiveElementTagNameInShadowRoot(await getHost())).toBe('BUTTON');
    });
    // Sets the value to the content of the focused option in the listbox.
    // Closes the listbox.
    // Performs the default action, moving focus to the next focusable element. Note: the native <select> element closes the listbox but does not move focus on tab. This pattern matches the behavior of the other comboboxes rather than the native element in this case.
    it('should select the option, close the dropdown and focus next element when pressing Tab on option', async () => {
      await buttonElement.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('flex');
      expect(await getHighlightedOptionIndex()).toBe(0);
      expect((await getEventSummary(buttonAfter, 'focus')).counter, 'before pressing Tab').toBe(0);

      await buttonElement.press('Tab');
      await waitForStencilLifecycle(page);

      expect(await getSelectValue()).toBe(testValues[0]);
      expect(await getSelectedOptionIndex()).toBe(0);
      expect(await getDropdownDisplay(), 'initial').toBe('none');
      expect(await getHighlightedOptionIndex()).toBe(0); // Highlighted options stays highlighted even after closing of the dropdown
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after pressing Tab').toBe(1);
      expect(await getActiveElementTagName(page)).toBe('P-SELECT');

      // TODO: Tab should directly go to the next element instead of just closing and selecting an option
      await buttonElement.press('Tab');
      await waitForStencilLifecycle(page);

      expect(await getActiveElementTagName(page)).toBe('P-BUTTON');
      expect((await getEventSummary(buttonAfter, 'focus')).counter, 'after pressing Tab').toBe(1);
    });
    // Closes the listbox.
    // Sets visual focus on the combobox.
    it('should close the dropdown when pressing Escape', async () => {
      expect(await getDropdownDisplay(), 'initial').toBe('flex');

      await buttonElement.press('Escape');
      await waitForStencilLifecycle(page);

      expect(await getDropdownDisplay(), 'initial').toBe('none');
      expect((await getEventSummary(buttonElement, 'focus')).counter, 'button focus after pressing Tab').toBe(1);
      expect(await getActiveElementTagName(page)).toBe('P-SELECT');
      expect(await getActiveElementTagNameInShadowRoot(await getHost())).toBe('BUTTON');
    });
    // Moves visual focus to the next option.
    // If visual focus is on the last option, visual focus does not move.
    it('should move highlight to the next option when pressing Down Arrow', async () => {
      await buttonElement.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(0);

      await buttonElement.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(1);

      await buttonElement.press('End');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 1);

      await buttonElement.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 1);
    });
    // Moves visual focus to the previous option.
    // If visual focus is on the first option, visual focus does not move.
    it('should move highlight to the next option when pressing ArrowUp', async () => {
      await buttonElement.press('ArrowDown');
      await buttonElement.press('ArrowDown');
      await buttonElement.press('ArrowDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(2);

      await buttonElement.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(1);

      await buttonElement.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(0);

      await buttonElement.press('ArrowUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(0);
    });
    // Moves visual focus to the first option.
    it('should move highlight to the first option when pressing Home', async () => {
      await buttonElement.press('End');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 1);

      await buttonElement.press('Home');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(0);
    });
    // Moves visual focus to the last option.
    it('should move highlight to the last option when pressing End', async () => {
      await buttonElement.press('End');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 1);

      await buttonElement.press('End');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 1);
    });
    // Jumps visual focus up 10 options (or to first option).
    it('should move highlight up 10 options (or to first option) when pressing PageUp', async () => {
      await buttonElement.press('End');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 1);

      await buttonElement.press('PageUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 11);
    });
    // Jumps visual focus down 10 options (or to last option).
    it('should move highlight down 10 options (or to last option) when pressing PageDown', async () => {
      await buttonElement.press('PageDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(9);

      await buttonElement.press('PageDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(19);

      await buttonElement.press('End');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 1);

      await buttonElement.press('PageUp');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 11);

      await buttonElement.press('PageDown');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedOptionIndex()).toBe(testValues.length - 1);
    });
    // First opens the listbox if it is not already displayed and then moves visual focus to the first option that matches the typed character.
    // If multiple keys are typed in quick succession, visual focus moves to the first option that matches the full string.
    // If the same character is typed in succession, visual focus cycles among the options starting with that character.
    it('should move highlight correctly when pressing printable characters', async () => {
      await buttonElement.press('B');
      await buttonElement.press('e');
      await buttonElement.press('n');
      await waitForStencilLifecycle(page);

      const valueIndex = testValues.indexOf(testValues.find((val) => val.startsWith('Ben')));

      expect(await getHighlightedSelectOptionProperty('textContent')).toBe(testValues[valueIndex]);

      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for searchString timeout
      await buttonElement.press('B');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedSelectOptionProperty('textContent')).toBe(testValues[valueIndex + 1]);

      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for searchString timeout
      await buttonElement.press('B');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedSelectOptionProperty('textContent')).toBe(testValues[valueIndex + 2]);

      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for searchString timeout
      await buttonElement.press('D');
      await buttonElement.press('e');
      await buttonElement.press('n');

      expect(await getHighlightedSelectOptionProperty('textContent')).toBe(
        testValues.find((val) => val.startsWith('Den'))
      );

      await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for searchString timeout
      await buttonElement.press('A');
      await waitForStencilLifecycle(page);

      expect(await getHighlightedSelectOptionProperty('textContent')).toBe(testValues[0]);
    });
  });
  it('should skip disabled option when pressing ArrowUp/ArrowDown', async () => {
    await initSelect({ options: { disabledIndices: [0, 1, 3, 5], values: ['a', 'b', 'c', 'd', 'e', 'f'] } });
    const buttonElement = await getButton();

    expect(await getProperty(await getSelectOption(2), 'disabled'), 'disabled option').toBe(true);

    await buttonElement.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex()).toBe(-1);

    await buttonElement.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex()).toBe(2);

    await buttonElement.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex()).toBe(4);

    await buttonElement.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex()).toBe(4);

    await buttonElement.press('ArrowUp');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex()).toBe(2);

    await buttonElement.press('ArrowUp');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex()).toBe(2);
  });
});

describe('selection', () => {
  it('should add valid selection on Enter', async () => {
    await initSelect();

    const buttonElement = await getButton();

    await buttonElement.type('B');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty('textContent')).toBe('b');

    await buttonElement.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after first option selected').toBe('b');
    expect(await getNativeSelectInnerHTML(), 'after first option selected').toBe(
      '<option value="b" selected=""></option>'
    );
    expect(await getSelectValue(), 'after first option selected').toBe('b');
    expect(await getSelectedSelectOptionProperty('value'), 'after first option selected').toEqual('b');
    expect(await getButtonText()).toBe('b');

    await page.keyboard.press('Space'); // Open dropdown again
    await waitForStencilLifecycle(page);
    expect(await getHighlightedSelectOptionProperty('textContent')).toBe('b');

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty('textContent')).toBe('c');

    await buttonElement.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after first option selected').toBe('c');
    expect(await getNativeSelectInnerHTML(), 'after first option selected').toBe(
      '<option value="c" selected=""></option>'
    );
    expect(await getSelectValue(), 'after first option selected').toBe('c');
    expect(await getSelectedSelectOptionProperty('value'), 'after first option selected').toEqual('c');
    expect(await getButtonText()).toBe('c');
  });

  it('should add valid selection on Space', async () => {
    await initSelect();

    const buttonElement = await getButton();

    await buttonElement.type('B');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty('textContent')).toBe('b');

    await buttonElement.press('Space');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after first option selected').toBe('b');
    expect(await getNativeSelectInnerHTML(), 'after first option selected').toBe(
      '<option value="b" selected=""></option>'
    );
    expect(await getSelectValue(), 'after first option selected').toBe('b');
    expect(await getSelectedSelectOptionProperty('value'), 'after first option selected').toEqual('b');
    expect(await getButtonText()).toBe('b');

    await page.keyboard.press('Space'); // Open dropdown again
    await waitForStencilLifecycle(page);
    expect(await getHighlightedSelectOptionProperty('textContent')).toBe('b');

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty('textContent')).toBe('c');

    await buttonElement.press('Space');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after first option selected').toBe('c');
    expect(await getNativeSelectInnerHTML(), 'after first option selected').toBe(
      '<option value="c" selected=""></option>'
    );
    expect(await getSelectValue(), 'after first option selected').toBe('c');
    expect(await getSelectedSelectOptionProperty('value'), 'after first option selected').toEqual('c');
    expect(await getButtonText()).toBe('c');
  });

  it('should add valid selection on Tab', async () => {
    await initSelect();

    const buttonElement = await getButton();

    await buttonElement.type('B');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty('textContent')).toBe('b');

    await buttonElement.press('Tab');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after first option selected').toBe('b');
    expect(await getNativeSelectInnerHTML(), 'after first option selected').toBe(
      '<option value="b" selected=""></option>'
    );
    expect(await getSelectValue(), 'after first option selected').toBe('b');
    expect(await getSelectedSelectOptionProperty('value'), 'after first option selected').toEqual('b');
    expect(await getButtonText()).toBe('b');

    await page.keyboard.press('Space'); // Open dropdown again
    await waitForStencilLifecycle(page);
    expect(await getHighlightedSelectOptionProperty('textContent')).toBe('b');

    await page.keyboard.press('ArrowDown');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty('textContent')).toBe('c');

    await buttonElement.press('Tab');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after first option selected').toBe('c');
    expect(await getNativeSelectInnerHTML(), 'after first option selected').toBe(
      '<option value="c" selected=""></option>'
    );
    expect(await getSelectValue(), 'after first option selected').toBe('c');
    expect(await getSelectedSelectOptionProperty('value'), 'after first option selected').toEqual('c');
    expect(await getButtonText()).toBe('c');
  });

  it('should reset selection on enter empty selection', async () => {
    await initSelect({ options: { values: ['', 'a', 'b', 'c'] } });

    const buttonElement = await getButton();

    await buttonElement.type('B');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty('textContent')).toBe('b');

    await buttonElement.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after first option selected').toBe('b');
    expect(await getNativeSelectInnerHTML(), 'after first option selected').toBe(
      '<option value="b" selected=""></option>'
    );
    expect(await getSelectValue(), 'after first option selected').toBe('b');
    expect(await getSelectedSelectOptionProperty('value'), 'after first option selected').toEqual('b');
    expect(await getButtonText()).toBe('b');

    await page.keyboard.press('Space'); // Open dropdown again
    await page.keyboard.press('PageUp');
    await waitForStencilLifecycle(page);

    expect(await getHighlightedSelectOptionProperty('textContent')).toBe('');

    await buttonElement.press('Enter');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after first option selected').toBe('');
    expect(await getNativeSelectInnerHTML(), 'after first option selected').toBe('');
    expect(await getSelectValue(), 'after first option selected').toBeUndefined();
    expect(await getSelectedSelectOptionProperty('value'), 'after first option selected').toBeUndefined();
    expect(await getButtonText()).toBe('');
  });

  it('should add valid selection on Click', async () => {
    await initSelect();
    const buttonElement = await getButton();

    await buttonElement.click(); // Open dropdown
    await waitForStencilLifecycle(page);

    expect(await getHighlightedOptionIndex()).toBe(-1); // No option highlighted

    const option = await getSelectOption(1);
    await option.click();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after first option selected').toBe('a');
    expect(await getNativeSelectInnerHTML(), 'after first option selected').toBe(
      '<option value="a" selected=""></option>'
    );
    expect(await getSelectValue(), 'after first option selected').toBe('a');
    expect(await getSelectedSelectOptionProperty('value'), 'after first option selected').toEqual('a');
    expect(await getButtonText()).toBe('a');

    await buttonElement.click(); // Open dropdown again
    await waitForStencilLifecycle(page);

    // TODO: Do we want to set highlight on the option when selecting with click
    expect(await getHighlightedOptionIndex()).toBe(-1); // No option highlighted

    const option2 = await getSelectOption(3);
    await option2.click();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after first option selected').toBe('c');
    expect(await getNativeSelectInnerHTML(), 'after first option selected').toBe(
      '<option value="c" selected=""></option>'
    );
    expect(await getSelectValue(), 'after first option selected').toBe('c');
    expect(await getSelectedSelectOptionProperty('value'), 'after first option selected').toEqual('c');
    expect(await getButtonText()).toBe('c');
  });

  it('should not select disabled option on Click', async () => {
    await initSelect({ options: { disabledIndices: [0] } });
    const buttonElement = await getButton();

    await buttonElement.click(); // Open dropdown
    await waitForStencilLifecycle(page);

    const option = await getSelectOption(1);
    await option.click();
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after first option selected').toBe('');
    expect(await getNativeSelectInnerHTML(), 'after first option selected').toBe('');
    expect(await getSelectValue(), 'after first option selected').toBeUndefined();
    expect(await getSelectedSelectOptionProperty('value'), 'after first option selected').toBeUndefined();
    expect(await getButtonText()).toBe('');
  });

  it('should select empty option when setting value to undefined', async () => {
    await initSelect({ props: { name: 'options', value: 'a' }, options: { values: ['', 'a', 'b', 'c'] } });

    expect(await getSelectedOptionIndex()).toBe(1);
    expect(await getNativeSelectValue(), 'initial').toBe('a');
    expect(await getNativeSelectInnerHTML(), 'initial').toBe('<option value="a" selected=""></option>');
    expect(await getSelectValue(), 'initial').toBe('a');
    expect(await getSelectedSelectOptionProperty('value'), 'initial').toEqual('a');
    expect(await getButtonText()).toBe('a');

    await setValue(undefined);

    expect(await getSelectedOptionIndex()).toBe(0);
    expect(await getNativeSelectValue(), 'after setting value to undefined').toBe('');
    expect(await getNativeSelectInnerHTML(), 'after setting value to undefined').toBe('');
    expect(await getSelectValue(), 'initial').toBeUndefined();
    expect(await getSelectedSelectOptionProperty('value'), 'after setting value to undefined').toBeUndefined();
    expect(await getButtonText()).toBe('');
  });

  it('should reset selection when value is set to undefined and no empty option provided', async () => {
    await initSelect({ props: { name: 'options', value: 'a' } });

    expect(await getSelectedOptionIndex()).toBe(0);
    expect(await getNativeSelectValue(), 'initial').toBe('a');
    expect(await getNativeSelectInnerHTML(), 'initial').toBe('<option value="a" selected=""></option>');
    expect(await getSelectValue(), 'initial').toBe('a');
    expect(await getSelectedSelectOptionProperty('value'), 'initial').toEqual('a');
    expect(await getButtonText()).toBe('a');

    await setValue(undefined);

    expect(await getSelectedOptionIndex()).toBe(-1);
    expect(await getNativeSelectValue(), 'after setting value to undefined').toBe('');
    expect(await getNativeSelectInnerHTML(), 'after setting value to undefined').toBe('');
    expect(await getSelectValue(), 'initial').toBeUndefined();
    expect(await getSelectedSelectOptionProperty('value'), 'after setting value to undefined').toBeUndefined();
    expect(await getButtonText()).toBe('');
  });
});

describe('click events', () => {
  it('should open dropdown on mouseclick and close dropdown on 2nd click', async () => {
    await initSelect();
    const buttonElement = await getButton();

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after click').toBe('flex');
    expect(await getHighlightedOptionIndex(), 'for highlighted option').toBe(-1);

    await buttonElement.click();
    await waitForStencilLifecycle(page);

    expect(await getDropdownDisplay(), 'after second click').toBe('none');
    expect(await getHighlightedOptionIndex(), 'for highlighted option').toBe(-1);
  });

  describe('disabled', () => {
    it('should have not-allowed cursor', async () => {
      await initSelect({ props: { name: 'options', disabled: true } });
      expect(await getElementStyle(await getButton(), 'cursor')).toBe('not-allowed');
    });

    it('should not be able to open or interact', async () => {
      await initSelect({
        props: { name: 'options', disabled: true },
        options: { markupAfter: '<p-button>Button</p-button>' },
      });
      const button = await selectNode(page, 'p-button');

      await addEventListener(button, 'focus');
      expect((await getEventSummary(button, 'focus')).counter, 'before focus').toBe(0);

      await page.keyboard.press('Tab');
      expect((await getEventSummary(button, 'focus')).counter, 'before focus').toBe(1);
    });
  });
});

describe('slots', () => {
  it('should update when selected option is added', async () => {
    await initSelect();
    expect(await getSelectValue()).toBeUndefined();

    await setValue('d');
    await waitForStencilLifecycle(page);
    expect(await getSelectValue()).toBe('d');
    expect(await getNativeSelectValue(), 'after setting value').toBe('');

    await addOption('d', 'd');
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after option added').toBe('d');
    expect(await getNativeSelectInnerHTML(), 'after option added').toBe('<option value="d" selected=""></option>');
    expect(await getSelectValue(), 'after option added').toBe('d');
    expect(await getSelectedSelectOptionProperty('value'), 'after option added').toEqual('d');
    expect(await getButtonText()).toBe('d');
  });

  it('should update when selected option is removed', async () => {
    await initSelect({ props: { value: 'c' } });
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'initial').toBe('c');
    expect(await getNativeSelectInnerHTML(), 'initial').toBe('<option value="c" selected=""></option>');
    expect(await getSelectValue(), 'initial').toBe('c');
    expect(await getSelectedSelectOptionProperty('value'), 'initial').toEqual('c');
    expect(await getButtonText()).toBe('c');

    await page.evaluate(
      (el) => {
        el.lastElementChild.remove();
      },
      await getHost()
    );
    await waitForStencilLifecycle(page);

    expect(await getNativeSelectValue(), 'after option selected removed').toBe('');
    expect(await getNativeSelectInnerHTML(), 'after option selected removed').toBe('');
    expect(await getSelectValue(), 'after option selected removed').toBe('c');
    expect(await getSelectedSelectOptionProperty('value'), 'after option selected removed').toBeUndefined();
    expect(await getButtonText()).toBe('');
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initSelect();
    const buttonElement = await getButton();
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-select'], 'componentDidLoad: p-select').toBe(1);
    expect(status1.componentDidLoad['p-select-option'], 'componentDidLoad: p-select-option').toBe(3);
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // arrow down

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);

    await buttonElement.click();
    await waitForStencilLifecycle(page);
    const status2 = await getLifecycleStatus(page);
    expect(status2.componentDidUpdate['p-select'], 'componentDidUpdate: p-select').toBe(1);
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);
  });

  it('should work without unnecessary round trips when selecting option', async () => {
    await initSelect();
    const buttonElement = await getButton();

    await buttonElement.click();
    await waitForStencilLifecycle(page);
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-select'], 'componentDidLoad: p-select').toBe(1);
    expect(status1.componentDidLoad['p-select-option'], 'componentDidLoad: p-select-option').toBe(3);
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // arrow down

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(5);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);

    const option1 = await getSelectOption(1);
    await option1.click();
    await waitForStencilLifecycle(page);

    const status2 = await getLifecycleStatus(page);
    expect(status2.componentDidUpdate['p-select-option'], 'componentDidUpdate: p-select-option').toBe(1);
    expect(status2.componentDidUpdate['p-select'], 'componentDidUpdate: p-select').toBe(2);
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(1); // checkmark icon
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(3);
  });

  it('should work without unnecessary round trips on selection change by click', async () => {
    await initSelect({ props: { value: 'a' } });
    const buttonElement = await getButton();

    await buttonElement.click();
    await waitForStencilLifecycle(page);
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-select'], 'componentDidLoad: p-select').toBe(1);
    expect(status1.componentDidLoad['p-select-option'], 'componentDidLoad: p-select-option').toBe(3);
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // arrow down and checkmark icon

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(6);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);

    const option1 = await getSelectOption(2);
    await option1.click();
    await waitForStencilLifecycle(page);

    const status2 = await getLifecycleStatus(page);
    expect(status2.componentDidUpdate['p-select-option'], 'componentDidUpdate: p-select-option').toBe(2);
    expect(status2.componentDidUpdate['p-select'], 'componentDidUpdate: p-select').toBe(2);
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(4);
  });

  it('should work without unnecessary round trips on selection change by keyboard', async () => {
    await initSelect({ props: { value: 'a' } });
    const buttonElement = await getButton();

    await buttonElement.press('Space'); // Open dropdown
    await waitForStencilLifecycle(page);
    const status1 = await getLifecycleStatus(page);

    expect(status1.componentDidLoad['p-select'], 'componentDidLoad: p-select').toBe(1);
    expect(status1.componentDidLoad['p-select-option'], 'componentDidLoad: p-select-option').toBe(3);
    expect(status1.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // arrow down and checkmark icon

    expect(status1.componentDidLoad.all, 'componentDidLoad: all').toBe(6);
    expect(status1.componentDidUpdate.all, 'componentDidUpdate: all').toBe(1);

    await buttonElement.press('ArrowDown');
    await buttonElement.press('Enter');
    await waitForStencilLifecycle(page);

    const status2 = await getLifecycleStatus(page);
    expect(status2.componentDidUpdate['p-select-option'], 'componentDidUpdate: p-select-option').toBe(2);
    expect(status2.componentDidUpdate['p-select'], 'componentDidUpdate: p-select').toBe(2);
    expect(status2.componentDidUpdate.all, 'componentDidUpdate: all').toBe(4);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree and aria properties of button', async () => {
    await initSelect({ options: { disabledIndices: [1] } });
    const buttonElement = await getButton();

    await expectA11yToMatchSnapshot(page, buttonElement, { interestingOnly: false });
  });

  it('should expose correct accessibility tree if option is highlighted', async () => {
    await initSelect();
    const buttonElement = await getButton();

    await buttonElement.press('Space');
    await buttonElement.press('ArrowDown');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, buttonElement, { interestingOnly: false });
  });

  it('should expose correct accessibility tree if option is selected', async () => {
    await initSelect();
    const buttonElement = await getButton();

    await buttonElement.press('Space');
    await buttonElement.press('ArrowDown');
    await buttonElement.press('Enter');
    await waitForStencilLifecycle(page);

    await expectA11yToMatchSnapshot(page, buttonElement, { interestingOnly: false });
  });

  it('should expose correct accessibility tree if description is set', async () => {
    await initSelect();
    const host = await getHost();
    await setProperty(host, 'description', 'Some description');
    await waitForStencilLifecycle(page);
    const buttonElement = await getButton();

    await expectA11yToMatchSnapshot(page, buttonElement);
  });

  it('should expose correct accessibility tree in error state', async () => {
    await initSelect();
    const host = await getHost();
    await setProperty(host, 'state', 'error');
    await setProperty(host, 'message', 'Some error message');
    await waitForStencilLifecycle(page);
    const buttonElement = await getButton();

    await expectA11yToMatchSnapshot(page, buttonElement);
  });
});
