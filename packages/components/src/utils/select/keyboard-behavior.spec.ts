import {
  getUpdatedIndex,
  filterSelectOptions,
  getUsableSelectOptions,
  Option,
  selectActions,
  setNextSelectOptionHighlighted,
  getMatchingSelectOptionIndex,
  setMatchingSelectOptionHighlighted,
  setHighlightedSelectOption,
  getHighlightedSelectOptionIndex,
  getHighlightedSelectOption,
} from './keyboard-behavior';
import * as keyboardBehaviorUtils from './keyboard-behavior';
import * as stencilUtils from '@stencil/core';

type GenerateOptionsParams = {
  amount?: number;
  values?: string[];
  textContents?: string[];
  selectedIndices?: number[];
  highlightedIndex?: number;
  disabledIndex?: number;
  hiddenIndex?: number;
};

export const generateOptions = (
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
  return Array.from(
    Array(amount),
    (_, idx) =>
      ({
        value: values?.[idx] ? values[idx] : `Value ${idx}`,
        textContent: textContents?.[idx] ? textContents[idx] : `Option ${idx}`,
        selected: selectedIndices.includes(idx),
        highlighted: highlightedIndex === idx,
        disabled: disabledIndex === idx,
        hidden: hiddenIndex === idx,
      }) as unknown as Option
  );
};

// handleDropdownScroll is not tested on purpose
// describe('handleDropdownScroll()', () => {});

// getActionFromKey is not tested on purpose
// describe('getActionFromKey()', () => {});

describe('getUpdatedIndex()', () => {
  it('should return 0 if action is First', () => {
    const index = getUpdatedIndex(1, 10, selectActions.First);
    expect(index).toBe(0);
  });
  it('should return maxIndex if action is Last', () => {
    const index = getUpdatedIndex(1, 10, selectActions.Last);
    expect(index).toBe(10);
  });
  it('should return correct previous index if action is Previous', () => {
    const index = getUpdatedIndex(5, 10, selectActions.Previous);
    expect(index).toBe(4);
    const index2 = getUpdatedIndex(0, 10, selectActions.Previous);
    expect(index2).toBe(0);
  });
  it('should return correct next index if action is Next', () => {
    const index = getUpdatedIndex(5, 10, selectActions.Next);
    expect(index).toBe(6);
    const index2 = getUpdatedIndex(10, 10, selectActions.Next);
    expect(index2).toBe(10);
  });
  it('should return correct next index if action is PageUp', () => {
    const index = getUpdatedIndex(20, 20, selectActions.PageUp);
    expect(index).toBe(10);
    const index2 = getUpdatedIndex(8, 20, selectActions.PageUp);
    expect(index2).toBe(0);
  });
  it('should return correct next index if action is PageDown', () => {
    const index = getUpdatedIndex(0, 20, selectActions.PageDown);
    expect(index).toBe(10);
    const index2 = getUpdatedIndex(12, 20, selectActions.PageDown);
    expect(index2).toBe(20);
  });
  it('should return currentIndex as default', () => {
    const index = getUpdatedIndex(5, 20, selectActions.CloseSelect);
    expect(index).toBe(5);
  });
});

describe('setNextSelectOptionHighlighted()', () => {
  it('should call correct functions to set the next option highlighted', () => {
    const options = generateOptions();
    const listElement = document.createElement('ul');

    const getHighlightedSelectOptionIndexSpy = jest
      .spyOn(keyboardBehaviorUtils, 'getHighlightedSelectOptionIndex')
      .mockReturnValueOnce(-1);
    const getUsableSelectOptionsSpy = jest
      .spyOn(keyboardBehaviorUtils, 'getUsableSelectOptions')
      .mockReturnValueOnce(options);
    const setHighlightedSelectOptionSpy = jest.spyOn(keyboardBehaviorUtils, 'setHighlightedSelectOption');
    const handleSelectDropdownScroll = jest.spyOn(keyboardBehaviorUtils, 'handleSelectDropdownScroll');

    options.forEach((option) => {
      expect(option.highlighted).toBeFalsy();
    });

    setNextSelectOptionHighlighted(listElement, options, 1);
    expect(getHighlightedSelectOptionIndexSpy).toHaveBeenCalledWith(options);
    expect(getUsableSelectOptionsSpy).toHaveBeenCalledWith(options);
    expect(setHighlightedSelectOptionSpy).toHaveBeenCalledWith(options[1], true);
    expect(handleSelectDropdownScroll).toHaveBeenCalledWith(listElement, options[1]);
  });
  it('should call setHighlightedSelectOption() twice when highlighted option exists', () => {
    const options = generateOptions();
    const listElement = document.createElement('ul');

    const getHighlightedSelectOptionIndexSpy = jest
      .spyOn(keyboardBehaviorUtils, 'getHighlightedSelectOptionIndex')
      .mockReturnValueOnce(2);
    const getUsableSelectOptionsSpy = jest
      .spyOn(keyboardBehaviorUtils, 'getUsableSelectOptions')
      .mockReturnValueOnce(options);
    const setHighlightedSelectOptionSpy = jest.spyOn(keyboardBehaviorUtils, 'setHighlightedSelectOption');
    const handleSelectDropdownScroll = jest.spyOn(keyboardBehaviorUtils, 'handleSelectDropdownScroll');

    options.forEach((option) => {
      expect(option.highlighted).toBeFalsy();
    });

    setNextSelectOptionHighlighted(listElement, options, 1);
    expect(getHighlightedSelectOptionIndexSpy).toHaveBeenCalledWith(options);
    expect(getUsableSelectOptionsSpy).toHaveBeenCalledWith(options);
    expect(setHighlightedSelectOptionSpy).toHaveBeenCalledWith(options[1], true);
    expect(setHighlightedSelectOptionSpy).toHaveBeenCalledWith(options[2], false);
    expect(handleSelectDropdownScroll).toHaveBeenCalledWith(listElement, options[1]);
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
    const getUsableSelectOptionsSpy = jest.spyOn(keyboardBehaviorUtils, 'getUsableSelectOptions');
    const options = generateOptions({ textContents: ['a', 'b', 'c', 'd'] });
    const filteredOptions = filterSelectOptions(options, 'a');
    expect(getUsableSelectOptionsSpy).toHaveBeenCalledWith(options);
    expect(filteredOptions).toEqual([options[0]]);
  });
  it('should return only non hidden or non disabled options', () => {
    const getUsableSelectOptionsSpy = jest.spyOn(keyboardBehaviorUtils, 'getUsableSelectOptions');
    const options = generateOptions({ disabledIndex: 0, hiddenIndex: 1 });
    const filteredOptions = filterSelectOptions(options, 'o');
    expect(getUsableSelectOptionsSpy).toHaveBeenCalledWith(options);
    expect(filteredOptions).toEqual([options[2]]);
  });
});

describe('getMatchingSelectOptionIndex()', () => {
  it('should return correct matching index', () => {
    const options = generateOptions({ textContents: ['a', 'b', 'c'] });
    const getHighlightedSelectOptionIndexSpy = jest
      .spyOn(keyboardBehaviorUtils, 'getHighlightedSelectOptionIndex')
      .mockReturnValueOnce(-1);
    const filterSelectOptionsSpy = jest
      .spyOn(keyboardBehaviorUtils, 'filterSelectOptions')
      .mockReturnValueOnce(options);
    const matchingOptionIndex = getMatchingSelectOptionIndex(options, 'a');
    expect(getHighlightedSelectOptionIndexSpy).toHaveBeenCalledWith(options);
    expect(filterSelectOptionsSpy).toHaveBeenCalledWith(options, 'a');
    expect(matchingOptionIndex).toBe(0);
  });

  it('should return correct matching index when same key pressed multiple times', () => {
    const options = generateOptions({ textContents: ['a', 'a', 'c'] });
    const getHighlightedSelectOptionIndexSpy = jest
      .spyOn(keyboardBehaviorUtils, 'getHighlightedSelectOptionIndex')
      .mockReturnValueOnce(-1)
      .mockReturnValueOnce(0);
    const filterSelectOptionsSpy = jest
      .spyOn(keyboardBehaviorUtils, 'filterSelectOptions')
      .mockReturnValueOnce(options);

    const matchingOptionIndex = getMatchingSelectOptionIndex(options, 'a');
    expect(getHighlightedSelectOptionIndexSpy).toHaveBeenCalledWith(options);
    expect(filterSelectOptionsSpy).toHaveBeenCalledTimes(1);
    expect(matchingOptionIndex).toBe(0);

    const matchingOptionIndex2 = getMatchingSelectOptionIndex(options, 'aa');
    expect(getHighlightedSelectOptionIndexSpy).toHaveBeenCalledWith(options);
    expect(filterSelectOptionsSpy).toHaveBeenCalledTimes(3);
    expect(matchingOptionIndex2).toBe(1);
  });
});

describe('setMatchingSelectOptionHighlighted()', () => {
  it('should call setNextSelectOptionHighlighted() when matching index found', () => {
    const options = generateOptions();
    const listElement = document.createElement('ul');
    const getMatchingSelectOptionIndexSpy = jest
      .spyOn(keyboardBehaviorUtils, 'getMatchingSelectOptionIndex')
      .mockReturnValueOnce(2);
    const setNextSelectOptionHighlightedSpy = jest.spyOn(keyboardBehaviorUtils, 'setNextSelectOptionHighlighted');
    setMatchingSelectOptionHighlighted(listElement, options, 'a');
    expect(getMatchingSelectOptionIndexSpy).toHaveBeenCalledWith(options, 'a');
    expect(setNextSelectOptionHighlightedSpy).toHaveBeenCalledWith(listElement, options, 2);
  });

  it('should not call setNextSelectOptionHighlighted() when matching index not found', () => {
    const options = generateOptions();
    const listElement = document.createElement('ul');
    const getMatchingSelectOptionIndexSpy = jest
      .spyOn(keyboardBehaviorUtils, 'getMatchingSelectOptionIndex')
      .mockReturnValueOnce(-1);
    const setNextSelectOptionHighlightedSpy = jest.spyOn(keyboardBehaviorUtils, 'setNextSelectOptionHighlighted');
    setMatchingSelectOptionHighlighted(listElement, options, 'a');
    expect(getMatchingSelectOptionIndexSpy).toHaveBeenCalledWith(options, 'a');
    expect(setNextSelectOptionHighlightedSpy).not.toBeCalled();
  });
});
describe('setHighlightedSelectOption()', () => {
  it('should set option highlighted=true and call forceUpdate', () => {
    const forceUpdateSpy = jest.spyOn(stencilUtils, 'forceUpdate');
    const option = { highlighted: false } as Option;
    setHighlightedSelectOption(option, true);
    expect(forceUpdateSpy).toHaveBeenCalledTimes(1);
    expect(option.highlighted).toBe(true);
  });

  it('should set option highlighted=false and call forceUpdate', () => {
    const forceUpdateSpy = jest.spyOn(stencilUtils, 'forceUpdate');
    const option = { highlighted: true } as Option;
    setHighlightedSelectOption(option, false);
    expect(forceUpdateSpy).toHaveBeenCalledTimes(1);
    expect(option.highlighted).toBe(false);
  });
});
describe('getHighlightedSelectOptionIndex()', () => {
  it('should return correct highlighted select option index', () => {
    const options = generateOptions();
    const getUsableSelectOptionsSpy = jest
      .spyOn(keyboardBehaviorUtils, 'getUsableSelectOptions')
      .mockReturnValueOnce(options);
    const getHighlightedSelectOptionSpy = jest
      .spyOn(keyboardBehaviorUtils, 'getHighlightedSelectOption')
      .mockReturnValueOnce(options[1]);

    const highlightedOptionIndex = getHighlightedSelectOptionIndex(options);
    expect(getUsableSelectOptionsSpy).toHaveBeenCalledWith(options);
    expect(getHighlightedSelectOptionSpy).toHaveBeenCalledWith(options);
    expect(highlightedOptionIndex).toBe(1);
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
