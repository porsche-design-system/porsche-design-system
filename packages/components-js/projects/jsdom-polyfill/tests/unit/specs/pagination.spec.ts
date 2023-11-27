import { componentsReady } from '@porsche-design-system/components-js';
import userEvent from '@testing-library/user-event';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-pagination');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should have working events', async () => {
  document.body.innerHTML =
    getMarkup('p-pagination') + `<div id="debug">Current Page: <span>1</span>; Event Counter: <span>0</span>;</div>`;
  await componentsReady();

  const el = document.body.firstElementChild;
  el.addEventListener('update', (e: CustomEvent) => {
    debugEl.querySelector('span').innerHTML = e.detail.page;
    debugEl.querySelector('span:last-child').innerHTML = `${
      parseInt(debugEl.querySelector('span:last-child').innerHTML) + 1
    }`;
  });

  const debugEl = document.querySelector('#debug');
  expect(debugEl.innerHTML).toBe('Current Page: <span>1</span>; Event Counter: <span>0</span>;');

  const [, btn2, btn3] = Array.from(el.shadowRoot.querySelectorAll('span:not(.ellipsis)')).slice(1, -1); // without prev and next;

  await userEvent.click(btn2);
  expect(debugEl.innerHTML).toBe('Current Page: <span>2</span>; Event Counter: <span>1</span>;');

  await userEvent.click(btn3);
  expect(debugEl.innerHTML).toBe('Current Page: <span>3</span>; Event Counter: <span>2</span>;');
});
