import { componentsReady } from '@porsche-design-system/components-js';
import { assertDefined } from '@porsche-design-system/shared/testing/assert-defined';
import userEvent from '@testing-library/user-event';
import { getMarkup } from '../helper';
import { getByRoleShadowed, screen } from '@porsche-design-system/components-js/testing';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-segmented-control');
  expect(await componentsReady()).toBe(3);

  const els = document.body.querySelectorAll('p-segmented-control,p-segmented-control-item');
  expect(els.length).toBe(3);
  els.forEach((el) => {
    expect(el.shadowRoot).not.toBeNull();
    expect(el.className).toBe('hydrated');
  });
});

it('should have working events', async () => {
  document.body.innerHTML =
    getMarkup('p-segmented-control') +
    `<div id="debug">Current Value: <span>1</span>; Event Counter: <span>0</span>;</div>`;
  await componentsReady();

  const el = document.querySelector('p-segmented-control');
  assertDefined(el);
  const debugEl = document.querySelector('#debug');
  assertDefined(debugEl);

  el.addEventListener('change', (e: CustomEvent) => {
    const span = debugEl.querySelector('span');
    assertDefined(span);
    const lastSpan = debugEl.querySelector('span:last-child');
    assertDefined(lastSpan);
    span.innerHTML = e.detail.value;
    lastSpan.innerHTML = '1';
  });

  expect(debugEl.innerHTML).toBe('Current Value: <span>1</span>; Event Counter: <span>0</span>;');

  const button = getByRoleShadowed('button', { name: /Item 2/i });
  await userEvent.click(button);
  expect(debugEl.innerHTML).toBe('Current Value: <span>2</span>; Event Counter: <span>1</span>;');
});

it('should expose its item buttons to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-segmented-control');
  await componentsReady();

  expect(screen.queryAllByRole('button')).toHaveLength(0);
  // each button sits in the shadow root of its own light DOM item, so compare the whole list
  expect(screen.getAllByShadowRole('button')).toEqual(
    [...document.querySelectorAll('p-segmented-control-item')].map((item) => {
      const shadowRoot = item.shadowRoot;
      assertDefined(shadowRoot);
      return shadowRoot.querySelector('button');
    })
  );
});
