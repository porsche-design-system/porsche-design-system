import { componentsReady } from '@porsche-design-system/components-js';
import userEvent from '@testing-library/user-event';

const getMarkup = (): string => {
  return `<p-tabs-bar activeTabIndex="2">
  <button id="button1">Some label</button>
  <button id="button2">Some label</button>
  <button id="button3">Some label</button>
</p-tabs-bar>`;
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
    getMarkup() + `<div id="debug">Active Tab: <span>2</span>; Event Counter: <span>0</span>;</div>`;
  await componentsReady();

  const el = document.body.firstElementChild;
  el.addEventListener('tabChange', (e: CustomEvent) => {
    debugEl.querySelector('span').innerHTML = e.detail.activeTabIndex;
    debugEl.querySelector('span:last-child').innerHTML = `${
      parseInt(debugEl.querySelector('span:last-child').innerHTML) + 1
    }`;
  });

  const debugEl = document.querySelector('#debug');
  expect(debugEl.innerHTML).toBe('Active Tab: <span>2</span>; Event Counter: <span>0</span>;');

  const button1 = document.querySelector('#button1');
  button1.addEventListener('click', () => ((el as any).activeTabIndex = 0));
  await userEvent.click(button1);
  expect(debugEl.innerHTML).toBe('Active Tab: <span>0</span>; Event Counter: <span>1</span>;');

  const button2 = document.querySelector('#button2');
  button2.addEventListener('click', () => ((el as any).activeTabIndex = 1));
  await userEvent.click(button2);
  expect(debugEl.innerHTML).toBe('Active Tab: <span>1</span>; Event Counter: <span>2</span>;');

  const button3 = document.querySelector('#button3');
  button3.addEventListener('click', () => ((el as any).activeTabIndex = 2));
  await userEvent.click(button3);
  expect(debugEl.innerHTML).toBe('Active Tab: <span>2</span>; Event Counter: <span>3</span>;');
});
