export const nativeSelect = document.createElement('select');
nativeSelect.multiple = true;

export const createNativeSelect = (host: HTMLElement, name: string): void => {
  nativeSelect.name = name;
  host.prepend(nativeSelect);
};

// TODO: only update options instead of recreate
export const updateNativeSelectOptions = (multiSelectOptions: HTMLElement[]): void => {
  nativeSelect.innerHTML = '';
  multiSelectOptions.forEach((option) => {
    const selectOption = document.createElement('option');
    updateNativeOption(selectOption, option);
    nativeSelect.appendChild(selectOption);
  });
};

export const updateNativeOption = (nativeOption: HTMLElement, option: HTMLElement): void => {
  (nativeOption as HTMLPMultiSelectOptionElement).value = (option as HTMLPMultiSelectOptionElement).value;
  (nativeOption as HTMLPMultiSelectOptionElement).selected = (option as HTMLPMultiSelectOptionElement).selected;
  nativeOption.textContent = option.textContent;
};
