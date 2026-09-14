import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { assertDefined } from '@porsche-design-system/shared/testing/assert-defined';
import userEvent from '@testing-library/user-event';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-pagination');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  assertDefined(el);
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should have working events', async () => {
  document.body.innerHTML =
    getMarkup('p-pagination') + `<div id="debug">Current Page: <span>1</span>; Event Counter: <span>0</span>;</div>`;
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
    span.innerHTML = (e as CustomEvent).detail.page;
    lastSpan.innerHTML = `${parseInt(lastSpan.innerHTML) + 1}`;
  });

  expect(debugEl.innerHTML).toBe('Current Page: <span>1</span>; Event Counter: <span>0</span>;');

  const shadowRoot = el.shadowRoot;
  assertDefined(shadowRoot);
  const [, btn2, btn3] = Array.from(shadowRoot.querySelectorAll('span:not(.ellipsis)')).slice(1, -1); // without prev and next

  await userEvent.click(btn2);
  expect(debugEl.innerHTML).toBe('Current Page: <span>2</span>; Event Counter: <span>1</span>;');

  await userEvent.click(btn3);
  expect(debugEl.innerHTML).toBe('Current Page: <span>3</span>; Event Counter: <span>2</span>;');
});

it('should expose its page buttons to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-pagination');
  await componentsReady();

  expect(screen.queryAllByRole('button')).toHaveLength(0);
  expect(screen.getAllByShadowRole('button')).toHaveLength(8);

  const shadowRoot = document.querySelector('p-pagination')?.shadowRoot;
  assertDefined(shadowRoot);
  expect(screen.getByShadowRole('button', { name: 'Page 2' })).toBe(shadowRoot.querySelector('[aria-label="Page 2"]'));
});
