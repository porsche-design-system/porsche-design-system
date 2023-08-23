import { componentsReady } from '@porsche-design-system/components-js';
import { getMarkup } from '../helper';
import userEvent from '@testing-library/user-event';
import { getByLabelTextShadowed } from '../../../src/testing';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-pin-code');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should have working events', async () => {
  document.body.innerHTML = getMarkup('p-pin-code') + `<div id="debug">Event Counter: <span>0</span></div>`;
  await componentsReady();

  const el = document.body.firstElementChild;
  el.addEventListener('update', () => {
    debugEl.querySelector('span').innerHTML = '1';
  });

  const debugEl = document.querySelector('#debug');
  expect(debugEl.innerHTML).toBe('Event Counter: <span>0</span>');

  const input = getByLabelTextShadowed('Some label');
  await userEvent.click(input);
  await userEvent.keyboard('1');
  expect(debugEl.innerHTML).toBe('Event Counter: <span>1</span>');
});
