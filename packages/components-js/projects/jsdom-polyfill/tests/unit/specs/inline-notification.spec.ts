import { componentsReady } from '@porsche-design-system/components-js';
import { getByRoleShadowed } from '@porsche-design-system/components-js/testing';
import userEvent from '@testing-library/user-event';

const getMarkup = (): string => {
  return `<p-inline-notification heading="Some banner title" action-label="Retry">
  Some banner description.
</p-inline-notification>`;
};

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup();
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should have working events', async () => {
  document.body.innerHTML =
    getMarkup() + `<div id="debug">Action Event Counter: <span>0</span>; Close Event Counter: <span>0</span>;</div>`;
  await componentsReady();

  const el = document.body.firstElementChild;
  el.addEventListener('action', () => {
    debugEl.querySelector('span').innerHTML = '1';
  });
  el.addEventListener('dismiss', () => {
    debugEl.querySelector('span:last-child').innerHTML = '1';
  });

  const debugEl = document.querySelector('#debug');
  expect(debugEl.innerHTML).toBe('Action Event Counter: <span>0</span>; Close Event Counter: <span>0</span>;');

  const actionButton = getByRoleShadowed('button');
  const closeButton = getByRoleShadowed('button', { name: /close/i });

  await userEvent.click(actionButton);
  expect(debugEl.innerHTML).toBe('Action Event Counter: <span>1</span>; Close Event Counter: <span>0</span>;');

  await userEvent.click(closeButton);
  expect(debugEl.innerHTML).toBe('Action Event Counter: <span>1</span>; Close Event Counter: <span>1</span>;');
});
