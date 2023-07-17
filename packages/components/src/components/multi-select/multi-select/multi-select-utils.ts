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
  nativeSelect.hidden = true;
  if (!host.querySelector('SELECT')) {
    host.prepend(nativeSelect);
  }
};

// TODO: only update options instead of recreate
export const updateNativeSelectOptions = (
  nativeSelect: HTMLSelectElement,
  multiSelectOptions: HTMLPMultiSelectOptionElement[]
): void => {
  nativeSelect.innerHTML = '';
  multiSelectOptions.forEach((option) => {
    const selectOption = document.createElement('option');
    updateNativeOption(selectOption, option);
    nativeSelect.appendChild(selectOption);
  });
};

export const updateNativeOption = (nativeOption: HTMLOptionElement, option: HTMLPMultiSelectOptionElement): void => {
  nativeOption.value = option.value;
  nativeOption.selected = option.selected;
  nativeOption.textContent = option.textContent;
};

export const updateMultiSelectOptions = (searchString: string, options: HTMLPMultiSelectOptionElement[]): void => {
  options.forEach((option) => (option.style.display = optionIncludesSearchString(option, searchString) ? '' : 'none'));
};

export const optionIncludesSearchString = (option: HTMLPMultiSelectOptionElement, searchString: string): boolean =>
  option.value.toLowerCase().includes(searchString.toLowerCase());
