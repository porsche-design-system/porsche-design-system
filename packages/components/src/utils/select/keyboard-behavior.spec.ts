import { vi } from 'vitest';
import { MultiSelectOption } from '../../components/multi-select/multi-select-option/multi-select-option';
import {
  filterSelectOptions,
  getHighlightedSelectOption,
  getHighlightedSelectOptionIndex,
  getMatchingSelectOptionIndex,
  getNextOptionToHighlight,
  getUpdatedIndex,
  getUsableSelectOptions,
  type Option,
  setHighlightedSelectOption,
  updateHighlightedOption,
} from './keyboard-behavior';

const initOption = (): MultiSelectOption => {
  const component = new MultiSelectOption();
  component.host = document.createElement('p-multi-select-option');
  component.host.attachShadow({ mode: 'open' });

  const optionDiv = document.createElement('div');
  optionDiv.className = 'option';
  component.host.shadowRoot.appendChild(optionDiv);
  return component;
};

type GenerateOptionsParams = {
  amount?: number;
  values?: string[];
  textContents?: string[];
  selectedIndices?: number[];
  highlightedIndex?: number;
  disabledIndex?: number;
  hiddenIndex?: number;
};

const generateOptions = (
  {
    amount = 3,
    values,
    textContents,
    selectedIndices = [],
    highlightedIndex,
    disabledIndex,
    hiddenIndex,
  }: GenerateOptionsParams = {
    amount: 3,
    selectedIndices: [],
  }
): Option[] => {
  return Array.from({ length: amount }, (_, idx) => {
    const component = initOption();
    const host = component.host as Option & { value: string };

    host.value = values?.[idx] ?? `Value ${idx}`;
    host.textContent = textContents?.[idx] ?? `Option ${idx}`;
    host.selected = selectedIndices.includes(idx);
    host.highlighted = highlightedIndex === idx;
    host.disabled = disabledIndex === idx;
    host.hidden = hiddenIndex === idx;
    host.style.display = 'block';
    host.scrollIntoView = vi.fn();

    return host;
  });
};

beforeEach(() => {
  vi.spyOn(global, 'requestAnimationFrame').mockImplementation((cb) => {
    // @ts-expect-error
    cb(); // immediately call the provided callback
    return 0;
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

// getActionFromKey is not tested on purpose
// describe('getActionFromKey()', () => {});

describe('getUpdatedIndex()', () => {
  it('should return -1 if maxIndex is -1', () => {
    const index = getUpdatedIndex(1, -1, 'First');
    expect(index).toBe(-1);
  });
  it('should return 0 if action is First', () => {
    const index = getUpdatedIndex(1, 10, 'First');
    expect(index).toBe(0);
  });
  it('should return maxIndex if action is Last', () => {
    const index = getUpdatedIndex(1, 10, 'Last');
    expect(index).toBe(10);
  });
  it('should return correct previous index if action is Previous', () => {
    const index = getUpdatedIndex(5, 10, 'Previous');
    expect(index).toBe(4);
    const index2 = getUpdatedIndex(0, 10, 'Previous');
    expect(index2).toBe(0);
  });
  it('should return correct next index if action is Next', () => {
    const index = getUpdatedIndex(5, 10, 'Next');
    expect(index).toBe(6);
    const index2 = getUpdatedIndex(10, 10, 'Next');
    expect(index2).toBe(10);
  });
  it('should return correct next index if action is PageUp', () => {
    const index = getUpdatedIndex(20, 20, 'PageUp');
    expect(index).toBe(10);
    const index2 = getUpdatedIndex(8, 20, 'PageUp');
    expect(index2).toBe(0);
  });
  it('should return correct next index if action is PageDown', () => {
    const index = getUpdatedIndex(0, 20, 'PageDown');
    expect(index).toBe(10);
    const index2 = getUpdatedIndex(12, 20, 'PageDown');
    expect(index2).toBe(20);
  });
  it('should return currentIndex as default', () => {
    const index = getUpdatedIndex(5, 20, 'CloseSelect');
    expect(index).toBe(5);
  });
});

describe('getNextOptionToHighlight()', () => {
  it('should return null when no option is usable', () => {
    const options = generateOptions({ amount: 2, disabledIndex: 0, hiddenIndex: 1 });

    const nextOption = getNextOptionToHighlight(options, null, 'CloseSelect');

    expect(nextOption).toBeNull();
  });
  it('should return the next usable option', () => {
    const options = generateOptions({ highlightedIndex: 0 });

    const nextOption = getNextOptionToHighlight(options, options[0], 'Next');

    expect(nextOption).toEqual(options[1]);
  });
  it('should skip unusable options when determining the next one', () => {
    const options = generateOptions({ highlightedIndex: 0, disabledIndex: 1 });

    const nextOption = getNextOptionToHighlight(options, options[0], 'Next');

    expect(nextOption).toEqual(options[2]);
  });
});

describe('updateHighlightedOption()', () => {
  it('should return currently highlighted option and return if new option is equal to current', () => {
    const options = generateOptions({ highlightedIndex: 0 });
    const currentlyhighlightedOption = updateHighlightedOption(options[0], options[0]);

    expect(currentlyhighlightedOption).toEqual(options[0]);

    expect(options[0].highlighted).toBe(true);
    expect(options[1].highlighted).toBe(false);
    expect(options[2].highlighted).toBe(false);
  });

  it('should set highlight to new option when only new option is provided', () => {
    const options = generateOptions();
    const scrollIntoViewSpy = vi.spyOn(options[1], 'scrollIntoView');

    const currentlyhighlightedOption = updateHighlightedOption(null, options[1]);

    expect(currentlyhighlightedOption).toEqual(options[1]);
    expect(options[0].highlighted).toBe(false);
    expect(options[1].highlighted).toBe(true);
    expect(options[2].highlighted).toBe(false);

    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ block: 'nearest' });
  });

  it('should remove highlight from old and set highlight to new option when two options are provided', () => {
    const options = generateOptions({ highlightedIndex: 1 });
    const scrollIntoViewSpy = vi.spyOn(options[1], 'scrollIntoView');

    const currentlyhighlightedOption = updateHighlightedOption(options[0], options[1]);

    expect(currentlyhighlightedOption).toEqual(options[1]);
    expect(options[0].highlighted).toBe(false);
    expect(options[1].highlighted).toBe(true);
    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ block: 'nearest' });
  });

  it('should not call scrollIntoView if scrollIntoView parameter is false', () => {
    const options = generateOptions({ highlightedIndex: 1 });
    options[1].scrollIntoView = vi.fn();

    const currentlyhighlightedOption = updateHighlightedOption(options[0], options[1], false);

    expect(currentlyhighlightedOption).toEqual(options[1]);
    expect(options[0].highlighted).toBe(false);
    expect(options[1].highlighted).toBe(true);
    expect(options[1].scrollIntoView).not.toHaveBeenCalledWith({ block: 'nearest' });
  });
});

describe('getUsableSelectOptions()', () => {
  it('should return all options when none are hidden or disabled', () => {
    const options = generateOptions();
    const usableOptions = getUsableSelectOptions(options);
    expect(usableOptions).toEqual(options);
  });
  it('should return all options which are not hidden or disabled', () => {
    const options = generateOptions({ disabledIndex: 0, hiddenIndex: 1 });
    const usableOptions = getUsableSelectOptions(options);
    expect(usableOptions).toEqual([options[2]]);
  });
});

describe('filterSelectOptions()', () => {
  it('should return only matching options', () => {
    const options = generateOptions({ textContents: ['a', 'b', 'c', 'd'] });
    const filteredOptions = filterSelectOptions(options, 'a');
    expect(filteredOptions).toEqual([options[0]]);
  });
  it('should return only non hidden or non disabled options', () => {
    const options = generateOptions({ disabledIndex: 0, hiddenIndex: 1 });
    const filteredOptions = filterSelectOptions(options, 'o');
    expect(filteredOptions).toEqual([options[2]]);
  });
});

describe('getMatchingSelectOptionIndex()', () => {
  it('should return correct matching option', () => {
    const options = generateOptions({ textContents: ['a', 'b', 'c'] });
    const matchingOption = getMatchingSelectOptionIndex(options, 'a');
    expect(matchingOption).toBe(options[0]);
  });

  it('should return correct matching option when same key pressed multiple times', () => {
    const options = generateOptions({ textContents: ['a', 'a', 'c'] });

    const matchingOption = getMatchingSelectOptionIndex(options, 'a');
    expect(matchingOption).toBe(options[0]);

    // the caller highlights the match before the next keystroke, which is what shifts the search start
    setHighlightedSelectOption(options[0], true);

    const matchingOption2 = getMatchingSelectOptionIndex(options, 'aa');
    expect(matchingOption2).toBe(options[1]);
  });
});

describe('setHighlightedSelectOption()', () => {
  it('should set option highlighted=true and toggle className', () => {
    const component = initOption();

    setHighlightedSelectOption(component.host as Option, true);
    expect(component.host.highlighted).toBe(true);
    const option = component.host.shadowRoot.querySelector('.option');
    expect(option.classList.contains('option')).toBe(true);
    expect(option.classList.contains('option--highlighted')).toBe(true);
  });

  it('should set option highlighted=false and toggle className', () => {
    const component = initOption();
    component.host.highlighted = true;

    setHighlightedSelectOption(component.host as Option, false);
    expect(component.host.highlighted).toBe(false);
    const option = component.host.shadowRoot.querySelector('.option');
    expect(option.classList.contains('option')).toBe(true);
    expect(option.classList.contains('option--highlighted')).toBe(false);
  });
});
describe('getHighlightedSelectOptionIndex()', () => {
  it('should return correct highlighted select option index', () => {
    const options = generateOptions({ highlightedIndex: 1 });
    expect(getHighlightedSelectOptionIndex(options)).toBe(1);
  });
  it('should return the index within the usable options only', () => {
    const options = generateOptions({ highlightedIndex: 2, disabledIndex: 0 });
    expect(getHighlightedSelectOptionIndex(options)).toBe(1);
  });
  it('should return -1 when no option is highlighted', () => {
    expect(getHighlightedSelectOptionIndex(generateOptions())).toBe(-1);
  });
});
describe('getHighlightedSelectOption()', () => {
  it('should return undefined when no option is highlighted', () => {
    const options = generateOptions();
    const highlightedOption = getHighlightedSelectOption(options);
    expect(highlightedOption).toBeUndefined();
  });
  it('should return highlighted option', () => {
    const options = generateOptions({ highlightedIndex: 1 });
    const highlightedOption = getHighlightedSelectOption(options);
    expect(highlightedOption).toEqual(options[1]);
  });
});
