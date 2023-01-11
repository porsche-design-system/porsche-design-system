import { componentsReady } from '@porsche-design-system/components-js';
import userEvent from '@testing-library/user-event';

const getMarkup = (): string => {
  return `<p-segmented-control value="1">
  <p-segmented-control-item value="1">Item 1</p-segmented-control-item>
  <p-segmented-control-item value="2">Item 2</p-segmented-control-item>
</p-segmented-control>`;
};

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup();
  expect(await componentsReady()).toBe(3);

  const els = document.body.querySelectorAll('*');
  expect(els.length).toBe(3);
  els.forEach((el) => {
    expect(el.shadowRoot).not.toBeNull();
    expect(el.className).toBe('hydrated');
  });
});

it('should have working events', async () => {
  document.body.innerHTML =
    getMarkup() + `<div id="debug">Current Value: <span>1</span>; Event Counter: <span>0</span>;</div>`;
  await componentsReady();

  const el = document.body.firstElementChild;
  el.addEventListener('segmentedControlChange', (e: CustomEvent) => {
    debugEl.querySelector('span').innerHTML = e.detail.value;
    debugEl.querySelector('span:last-child').innerHTML = '1';
  });

  const debugEl = document.querySelector('#debug');
  expect(debugEl.innerHTML).toBe('Current Value: <span>1</span>; Event Counter: <span>0</span>;');

  const button = document.querySelector('p-segmented-control-item:last-child');
  await userEvent.click(button);
  expect(debugEl.innerHTML).toBe('Current Value: <span>2</span>; Event Counter: <span>1</span>;');
});
