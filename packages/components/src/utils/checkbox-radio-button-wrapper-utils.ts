export const changeHandler = ({ target }: Event & { target: HTMLInputElement }): void => {
  // workaround for Safari >= 15.5 -> attribute 'checked' is only set as property and not as attribute, this leads to rendering issues with keyboard navigation
  // name attribute must be wrapped in quotes to allow exotic name values
  document.querySelectorAll(`input[type=${target.type}][name="${target.name}"]`).forEach((el: HTMLInputElement) => {
    el.style.display = 'none';
    el.style.display = '';
    // TODO: about the described safari issue from above, why not just set the attribute like this?
    //  -> It seems to be not enough to toggle an attribute without changing the attribute's value
    // el.toggleAttribute('checked', el === target);
  });
};

export const addChangeListener = (el: HTMLInputElement): void => {
  el.addEventListener('change', changeHandler);
};
