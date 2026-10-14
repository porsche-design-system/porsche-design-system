import { componentsReady } from '@porsche-design-system/components-js';
import { getByTextShadowed } from '@porsche-design-system/components-js/testing';
import { assertDefined } from '@porsche-design-system/shared/testing/assert-defined';
import userEvent from '@testing-library/user-event';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-accordion');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  assertDefined(el);
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should have working events', async () => {
  document.body.innerHTML = getMarkup('p-accordion') + `<div id="debug">Event Counter: <span>0</span></div>`;
  await componentsReady();

  const el = document.body.firstElementChild;
  assertDefined(el);
  const debugEl = document.querySelector('#debug');
  assertDefined(debugEl);

  el.addEventListener('update', () => {
    const span = debugEl.querySelector('span');
    assertDefined(span);
    span.innerHTML = '1';
  });

  expect(debugEl.innerHTML).toBe('Event Counter: <span>0</span>');

  const summary = getByTextShadowed('Some summary');
  await userEvent.click(summary);
  expect(debugEl.innerHTML).toBe('Event Counter: <span>1</span>');
});
