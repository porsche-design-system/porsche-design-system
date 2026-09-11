import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { assertDefined } from '@porsche-design-system/shared/testing/assert-defined';
import userEvent from '@testing-library/user-event';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-carousel');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  assertDefined(el);
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should have working events', async () => {
  document.body.innerHTML = getMarkup('p-carousel') + `<div id="debug">Event Counter: <span>0</span></div>`;
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

  // p-carousel renders two navigation buttons and both compute an empty accessible
  // name in jsdom, so they cannot be told apart by name. Take the first one.
  const [button] = screen.getAllByShadowRole('button');
  await userEvent.click(button);
  expect(debugEl.innerHTML).toBe('Event Counter: <span>1</span>');
});

it('should expose its heading to shadow queries before hydration completes', async () => {
  document.body.innerHTML = getMarkup('p-carousel');
  // deliberately no `await componentsReady()`, the point is that findByShadow* retries until Stencil hydrates

  expect(screen.queryAllByText('Some heading')).toHaveLength(0);

  const heading = await screen.findByShadowText('Some heading');
  const shadowRoot = document.querySelector('p-carousel')?.shadowRoot;
  assertDefined(shadowRoot);
  expect(heading).toBe(shadowRoot.querySelector('h2'));
});
