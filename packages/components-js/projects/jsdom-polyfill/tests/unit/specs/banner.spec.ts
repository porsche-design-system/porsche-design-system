import { componentsReady } from '@porsche-design-system/components-js';
import { getByRoleShadowed, screen } from '@porsche-design-system/components-js/testing';
import userEvent from '@testing-library/user-event';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-banner');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should have working events', async () => {
  document.body.innerHTML = getMarkup('p-banner') + `<div id="debug">Event Counter: <span>0</span></div>`;
  await componentsReady();

  const el = document.body.firstElementChild;
  el.addEventListener('dismiss', () => {
    debugEl.querySelector('span').innerHTML = '1';
  });

  const debugEl = document.querySelector('#debug');
  expect(debugEl.innerHTML).toBe('Event Counter: <span>0</span>');

  // `hidden: true` is required because the banner renders its content inside a Popover API panel
  // (`popover="manual"`), which is treated as hidden in the jsdom environment.
  const button = getByRoleShadowed('button', { name: 'Close banner', hidden: true });
  await userEvent.click(button);
  expect(debugEl.innerHTML).toBe('Event Counter: <span>1</span>');
});

it('should expose its heading to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-banner');
  await componentsReady();

  // text queries do not consult the accessibility tree, so unlike the role query above they need no `hidden: true`
  expect(screen.queryAllByText('Some heading')).toHaveLength(0);
  expect(screen.getAllByShadowText('Some heading')).toHaveLength(1);

  const { shadowRoot } = document.querySelector('p-banner');
  expect(screen.getByShadowText('Some heading')).toBe(shadowRoot.querySelector('h5'));
});
