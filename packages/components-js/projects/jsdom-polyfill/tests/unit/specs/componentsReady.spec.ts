import { componentsReady } from '@porsche-design-system/components-js';
import { getByRoleShadowed } from '@porsche-design-system/components-js/testing';
import userEvent from '@testing-library/user-event';

const getMarkup = (): string => {
  return `<p-button>Button 1</p-button>`;
};

it('should return 0 when nothing is rendered', async () => {
  document.body.innerHTML = '';
  expect(await componentsReady()).toBe(0);
});

it('should return 1 after component is rendered initially', async () => {
  document.body.innerHTML = getMarkup();
  expect(document.body.innerHTML).toEqual('<p-button>Button 1</p-button>');

  expect(await componentsReady()).toBe(1);
  expect(document.body.innerHTML).toEqual('<p-button class="hydrated">Button 1</p-button>');
});

it('should return 2 after button is clicked', async () => {
  document.body.innerHTML = getMarkup();
  expect(await componentsReady()).toBe(1);

  const scriptEl = document.createElement('script');
  scriptEl.textContent = `
document.querySelector('p-button').addEventListener('click', () => {
  const el = document.createElement('p-button');
  el.innerText = 'Button 2';
  document.body.append(el);
});`;
  document.body.append(scriptEl);

  const button = getByRoleShadowed('button');
  await userEvent.click(button);

  expect(await componentsReady()).toBe(2);
});
