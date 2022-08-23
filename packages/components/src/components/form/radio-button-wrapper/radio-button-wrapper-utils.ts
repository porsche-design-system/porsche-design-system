export const updateRadioButtonsWithSameName = (name: string): void =>
  document.querySelectorAll(`input[type=radio][name=${name}]`).forEach((radio) => {
    radio.setAttribute('hidden', '');
    radio.removeAttribute('hidden');
  });
