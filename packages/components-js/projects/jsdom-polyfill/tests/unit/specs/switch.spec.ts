import { componentsReady } from '@porsche-design-system/components-js';
import { getByRoleShadowed, screen } from '@porsche-design-system/components-js/testing';
import { assertDefined } from '@porsche-design-system/shared/testing/assert-defined';
import userEvent from '@testing-library/user-event';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-switch');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  assertDefined(el);
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should have working events', async () => {
  document.body.innerHTML =
    getMarkup('p-switch') + `<div id="debug">Checked: <span>false</span>; Event Counter: <span>0</span>;</div>`;
  await componentsReady();

  const el = document.body.firstElementChild;
  assertDefined(el);
  const debugEl = document.querySelector('#debug');
  assertDefined(debugEl);

  el.addEventListener('update', (e) => {
    const span = debugEl.querySelector('span');
    assertDefined(span);
    const lastSpan = debugEl.querySelector('span:last-child');
    assertDefined(lastSpan);
    (el as any).checked = (e as CustomEvent).detail.checked;
    span.innerHTML = (e as CustomEvent).detail.checked;
    lastSpan.innerHTML = `${parseInt(lastSpan.innerHTML) + 1}`;
  });

  expect(debugEl.innerHTML).toBe('Checked: <span>false</span>; Event Counter: <span>0</span>;');

  const button = getByRoleShadowed('switch');
  await userEvent.click(button);
  expect(debugEl.innerHTML).toBe('Checked: <span>true</span>; Event Counter: <span>1</span>;');

  await userEvent.click(button);
  expect(debugEl.innerHTML).toBe('Checked: <span>false</span>; Event Counter: <span>2</span>;');
});

it('should expose its switch to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-switch');
  await componentsReady();

  expect(screen.queryAllByRole('switch')).toHaveLength(0);
  expect(screen.getAllByShadowRole('switch')).toHaveLength(1);

  const shadowRoot = document.querySelector('p-switch')?.shadowRoot;
  assertDefined(shadowRoot);
  expect(screen.getByShadowRole('switch')).toBe(shadowRoot.querySelector('button#x'));
});
