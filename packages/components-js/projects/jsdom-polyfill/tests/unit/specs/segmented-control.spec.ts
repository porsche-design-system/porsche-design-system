import { componentsReady } from '@porsche-design-system/components-js';
import userEvent from '@testing-library/user-event';
import { getMarkup } from '../helper';
import { getByRoleShadowed } from '@porsche-design-system/components-js/testing';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-segmented-control');
  expect(await componentsReady()).toBe(3);

  const els = document.body.querySelectorAll('p-segmented-control,p-segmented-control-item');
  expect(els.length).toBe(3);
  els.forEach((el) => {
    expect(el.shadowRoot).not.toBeNull();
    expect(el.className).toBe('hydrated');
  });
});

it('should have working events', async () => {
  document.body.innerHTML =
    getMarkup('p-segmented-control') +
    `<div id="debug">Current Value: <span>1</span>; Event Counter: <span>0</span>;</div>`;
  await componentsReady();

  const el = document.querySelector('p-segmented-control');
  el.addEventListener('change', (e: CustomEvent) => {
    debugEl.querySelector('span').innerHTML = e.detail.value;
    debugEl.querySelector('span:last-child').innerHTML = '1';
  });

  const debugEl = document.querySelector('#debug');
  expect(debugEl.innerHTML).toBe('Current Value: <span>1</span>; Event Counter: <span>0</span>;');

  const button = getByRoleShadowed('button', { name: /Item 2/i });
  await userEvent.click(button);
  expect(debugEl.innerHTML).toBe('Current Value: <span>2</span>; Event Counter: <span>1</span>;');
});
