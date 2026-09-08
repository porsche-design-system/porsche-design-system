import { componentsReady } from '@porsche-design-system/components-js';
import { getMarkup } from '../helper';
import userEvent from '@testing-library/user-event';
import { getByRoleShadowed, screen } from '@porsche-design-system/components-js/testing';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-link-tile-product');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should have working events', async () => {
  document.body.innerHTML = getMarkup('p-link-tile-product') + `<div id="debug">Event Counter: <span>0</span></div>`;
  await componentsReady();

  const el = document.body.firstElementChild;
  el.addEventListener('like', () => {
    debugEl.querySelector('span').innerHTML = '1';
  });

  const debugEl = document.querySelector('#debug');
  expect(debugEl.innerHTML).toBe('Event Counter: <span>0</span>');

  const button = getByRoleShadowed('button');
  await userEvent.click(button);
  expect(debugEl.innerHTML).toBe('Event Counter: <span>1</span>');
});

it('should expose its product link to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-link-tile-product');
  await componentsReady();

  expect(screen.queryAllByRole('link')).toHaveLength(0);
  expect(screen.getAllByShadowRole('link')).toHaveLength(1);

  const { shadowRoot } = document.querySelector('p-link-tile-product');
  expect(screen.getByShadowRole('link')).toBe(shadowRoot.querySelector('a.anchor'));
});
