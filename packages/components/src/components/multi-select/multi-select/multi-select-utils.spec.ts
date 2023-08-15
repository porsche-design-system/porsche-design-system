type HTMLPMultiSelectOptionElement = {
  disabled?: boolean;
  selected?: boolean;
  value: string;
};

export const generateMultiSelectOptions = (
  amount: number,
  selectedIndex?: number,
  highlightedIndex?: number,
  disabledIndex?: number,
  hiddenIndex?: number
): HTMLPMultiSelectOptionElement[] => {
  return Array.from(Array(amount)).map<HTMLPMultiSelectOptionElement>((_, idx) => ({
    value: `Value ${idx + 1}`,
    selected: selectedIndex === idx,
    highlighted: highlightedIndex === idx,
    disabled: disabledIndex === idx,
    hidden: hiddenIndex === idx,
  }));
};

describe('updateMultiSelectOptionsFilterState()', () => {
  it('should update MultiSelectOptions hidden state', () => {
    // const multiSelectOptions = generateMultiSelectOptions(5);
  });
});
