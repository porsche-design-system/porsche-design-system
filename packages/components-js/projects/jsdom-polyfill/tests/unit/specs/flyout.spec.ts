import { componentsReady } from '@porsche-design-system/components-js';
import { getByRoleShadowed, screen } from '@porsche-design-system/components-js/testing';
import userEvent from '@testing-library/user-event';
import { getMarkup } from '../helper';
import { Components } from '@porsche-design-system/components';
import { vi } from 'vitest';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-flyout');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should have working events', async () => {
  document.body.innerHTML = getMarkup('p-flyout') + `<div id="debug">Event Counter: <span>0</span></div>`;
  await componentsReady();

  const el = document.body.firstElementChild;
  el.addEventListener('dismiss', () => {
    debugEl.querySelector('span').innerHTML = '1';
  });

  const debugEl = document.querySelector('#debug');
  expect(debugEl.innerHTML).toBe('Event Counter: <span>0</span>');

  const button = getByRoleShadowed('button');
  await userEvent.click(button);
  expect(debugEl.innerHTML).toBe('Event Counter: <span>1</span>');
});

it('should work without errors when using header slot', async () => {
  const spy = vi.spyOn(global.console, 'error');

  document.body.innerHTML = '<p-flyout><div slot="header">Some header</div></p-flyout>';
  await componentsReady();

  expect(spy).not.toHaveBeenCalled();
});

it('should expose its dismiss button to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-flyout');
  await componentsReady();

  expect(screen.queryAllByRole('button')).toHaveLength(0);
  expect(screen.getAllByShadowRole('button')).toHaveLength(1);

  const { shadowRoot } = document.querySelector('p-flyout');
  expect(screen.getByShadowRole('button')).toBe(shadowRoot.querySelector('button.dismiss'));
});
