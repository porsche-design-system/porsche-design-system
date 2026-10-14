import { componentsReady } from '@porsche-design-system/components-js';
import { getByRoleShadowed, screen } from '@porsche-design-system/components-js/testing';
import { assertDefined } from '@porsche-design-system/shared/testing/assert-defined';
import userEvent from '@testing-library/user-event';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-modal');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  assertDefined(el);
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should have working events', async () => {
  document.body.innerHTML = getMarkup('p-modal') + `<div id="debug">Event Counter: <span>0</span></div>`;
  await componentsReady();

  const el = document.body.firstElementChild;
  assertDefined(el);
  const debugEl = document.querySelector('#debug');
  assertDefined(debugEl);

  el.addEventListener('dismiss', () => {
    const span = debugEl.querySelector('span');
    assertDefined(span);
    span.innerHTML = '1';
  });

  expect(debugEl.innerHTML).toBe('Event Counter: <span>0</span>');

  const button = getByRoleShadowed('button');
  await userEvent.click(button);
  expect(debugEl.innerHTML).toBe('Event Counter: <span>1</span>');
});

it('should expose its dismiss button to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-modal');
  await componentsReady();

  expect(screen.queryAllByRole('button')).toHaveLength(0);
  expect(screen.getAllByShadowRole('button')).toHaveLength(1);

  const shadowRoot = document.querySelector('p-modal')?.shadowRoot;
  assertDefined(shadowRoot);
  expect(screen.getByShadowRole('button')).toBe(shadowRoot.querySelector('button.dismiss'));
});
