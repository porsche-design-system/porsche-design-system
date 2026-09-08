import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
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
  el.addEventListener('change', () => {
    debugEl.querySelector('span').innerHTML = '1';
  });

  const debugEl = document.querySelector('#debug');
  expect(debugEl.innerHTML).toBe('Event Counter: <span>0</span>');

  const input = getByLabelTextShadowed('1-4');
  await userEvent.click(input);
  await userEvent.keyboard('1');
  expect(debugEl.innerHTML).toBe('Event Counter: <span>1</span>');
});

it('should expose its pin inputs to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-pin-code');
  await componentsReady();

  expect(screen.queryAllByRole('textbox')).toHaveLength(0);
  expect(screen.getAllByShadowRole('textbox')).toHaveLength(4);

  const { shadowRoot } = document.querySelector('p-pin-code');
  expect(screen.getByShadowRole('textbox', { name: '1-4' })).toBe(shadowRoot.querySelector('input#current-input'));
});
