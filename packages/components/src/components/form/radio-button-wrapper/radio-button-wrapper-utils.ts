export const changeHandler = ({ target }: Event): void =>
  // workaround for Safari >= 15.5 which stopped re-rendering slotted input type radio upon removing checked attribute
  document.querySelectorAll(`input[type=radio][name=${(target as HTMLInputElement).name}]`).forEach((radio) => {
    radio.setAttribute('hidden', '');
    radio.removeAttribute('hidden');
  });

export const addChangeListener = (el: HTMLInputElement): void => {
  el.addEventListener('change', changeHandler);
};
