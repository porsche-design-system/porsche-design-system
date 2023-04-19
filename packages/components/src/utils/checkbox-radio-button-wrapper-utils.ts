export const changeHandler = ({ target }: Event & { target: HTMLInputElement }): void =>
  // workaround for Safari >= 15.5 -> attribute 'checked' is only set as property and not as attribute, this leads to rendering issues with keyboard navigation
  document.querySelectorAll(`input[type=${target.type}][name=${target.name}]`).forEach((el: HTMLInputElement) => {
    el.style.display = 'none';
    el.style.display = '';
  });

export const addChangeListener = (el: HTMLInputElement): void => {
  el.addEventListener('change', changeHandler);
};
