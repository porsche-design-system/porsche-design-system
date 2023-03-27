import type { FormState } from '../../utils/form/form-state';

export type RadioButtonWrapperState = FormState;

export const changeHandler = ({ target }: Event): void =>
  // workaround for Safari >= 15.5 -> attribute 'checked' is only set as property and not as attribute, this leads to rendering issues with keyboard navigation
  document
    .querySelectorAll(`input[type=radio][name=${(target as HTMLInputElement).name}]`)
    .forEach((radio: HTMLInputElement) => {
      radio.style.display = 'none';
      radio.style.display = '';
    });

export const addChangeListener = (el: HTMLInputElement): void => {
  el.addEventListener('change', changeHandler);
};
