import { componentsReady } from '@porsche-design-system/components-js';
import { getMarkup } from '../helper';
import userEvent from '@testing-library/user-event';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-multi-select');
  expect(await componentsReady()).toBe(4); // multi-select itself + 3 multi-select-options

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should have working events', async () => {
  document.body.innerHTML = getMarkup('p-multi-select') + `<div id="debug">Event Counter: <span>0</span></div>`;
  await componentsReady();

  const multiSelect = document.querySelector('p-multi-select');
  multiSelect.addEventListener('update', () => {
    debugEl.querySelector('span').innerHTML = '1';
  });

  const debugEl = document.querySelector('#debug');
  expect(debugEl.innerHTML).toBe('Event Counter: <span>0</span>');

  const button = document.querySelector('p-multi-select-option:last-child').shadowRoot.querySelector('div.option');
  await userEvent.click(button);
  expect(debugEl.innerHTML).toBe('Event Counter: <span>1</span>');
});
