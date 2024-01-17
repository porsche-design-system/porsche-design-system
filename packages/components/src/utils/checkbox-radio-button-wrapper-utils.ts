export const changeHandler = ({ target }: Event & { target: HTMLInputElement }): void => {
  // workaround for Safari >= 15.5 rendering issues
  // Checkbox/radio-button change is not rendered immediately if checkbox/radio-button or its label is still hovered.
  // The same bug appears on keyboard navigation.

  // name attribute must be wrapped in quotes to allow exotic name values
  document.querySelectorAll(`input[type=${target.type}][name="${target.name}"]`).forEach((el: HTMLInputElement) => {
    el.style.display = 'none';
    el.style.display = '';
  });
};

export const addChangeListener = (el: HTMLInputElement): void => {
  el.addEventListener('change', changeHandler);
};
