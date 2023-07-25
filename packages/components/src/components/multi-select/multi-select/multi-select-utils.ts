export const syncNativeSelect = (
  nativeSelect: HTMLSelectElement,
  host: HTMLElement,
  name: string,
  disabled: boolean,
  required: boolean
): void => {
  nativeSelect.multiple = true;
  nativeSelect.name = name;
  nativeSelect.disabled = disabled;
  nativeSelect.required = required;
  nativeSelect.style.opacity = '0';
  nativeSelect.style.display = 'block';
  nativeSelect.style.height = '0px';
  nativeSelect.ariaHidden = 'true';
  if (host.nextElementSibling !== nativeSelect) {
    host.after(nativeSelect);
  }
};

// TODO: only update options instead of recreate
// TODO: only create selected options
export const updateNativeSelectOptions = (
  nativeSelect: HTMLSelectElement,
  multiSelectOptions: HTMLPMultiSelectOptionElement[]
): void => {
  nativeSelect.innerHTML = '';
  multiSelectOptions
    // .filter((option) => option.selected)
    .forEach((option) => {
      const selectOption = createNativeOption(option);
      nativeSelect.appendChild(selectOption);
    });
};

export const createNativeOption = (option: HTMLPMultiSelectOptionElement): HTMLOptionElement => {
  const selectOption = document.createElement('option');
  updateNativeOption(selectOption, option);
  return selectOption;
};

export const updateNativeOption = (nativeOption: HTMLOptionElement, option: HTMLPMultiSelectOptionElement): void => {
  nativeOption.value = option.value;
  nativeOption.selected = option.selected;
  nativeOption.textContent = option.textContent;
};

export const updateMultiSelectOptionsFilterState = (
  searchString: string,
  options: HTMLPMultiSelectOptionElement[]
): void => {
  options.forEach((option) => (option.hidden = !optionIncludesSearchString(option, searchString)));
};

export const optionIncludesSearchString = (option: HTMLPMultiSelectOptionElement, searchString: string): boolean =>
  option.value.toLowerCase().includes(searchString.toLowerCase());

export const hasFilterResults = (options: HTMLPMultiSelectOptionElement[]): boolean =>
  options?.some((item) => !item.hidden);
