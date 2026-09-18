import { componentsReady } from '@porsche-design-system/components-js';
import { assertDefined } from '@porsche-design-system/shared/testing/assert-defined';
import { getMarkup } from '../helper';
import userEvent from '@testing-library/user-event';
import { getByTextShadowed, screen } from '@porsche-design-system/components-js/testing';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-select');
  expect(await componentsReady()).toBe(4); // select itself + 3 select-options

  const el = document.body.firstElementChild;
  assertDefined(el);
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should have working events', async () => {
  document.body.innerHTML = getMarkup('p-select') + `<div id="debug">Event Counter: <span>0</span></div>`;
  await componentsReady();

  const select = document.querySelector('p-select');
  assertDefined(select);
  const debugEl = document.querySelector('#debug');
  assertDefined(debugEl);

  select.addEventListener('change', () => {
    const span = debugEl.querySelector('span');
    assertDefined(span);
    span.innerHTML = '1';
  });

  expect(debugEl.innerHTML).toBe('Event Counter: <span>0</span>');

  const button = await getByTextShadowed('Option C');
  await userEvent.click(button);
  expect(debugEl.innerHTML).toBe('Event Counter: <span>1</span>');
});

it('should expose its combobox to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-select');
  await componentsReady();

  expect(screen.queryAllByRole('combobox')).toHaveLength(0);
  expect(screen.getAllByShadowRole('combobox')).toHaveLength(1);

  const shadowRoot = document.querySelector('p-select')?.shadowRoot;
  assertDefined(shadowRoot);
  expect(screen.getByShadowRole('combobox')).toBe(shadowRoot.querySelector('button#button'));
});
