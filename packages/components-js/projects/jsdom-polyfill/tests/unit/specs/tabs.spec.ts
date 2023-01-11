import { componentsReady } from '@porsche-design-system/components-js';
import userEvent from '@testing-library/user-event';

const getMarkup = (): string => {
  return `<p-tabs activeTabIndex="0">
  <p-tabs-item label="Some label">Content 1</p-tabs-item>
  <p-tabs-item label="Some label">Content 2</p-tabs-item>
  <p-tabs-item label="Some label">Content 3</p-tabs-item>
</p-tabs>
<button id="button1" type="button">Button 1</button>
<button id="button2" type="button">Button 2</button>`;
};

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup();
  expect(await componentsReady()).toBe(4);

  const els = Array.from(document.body.querySelectorAll('*')).filter((x) => x.tagName !== 'BUTTON');
  expect(els.length).toBe(4);
  els.forEach((el) => {
    expect(el.shadowRoot).not.toBeNull();
    expect(el.className).toBe('hydrated');
  });
});

it('should have working events', async () => {
  document.body.innerHTML =
    getMarkup() + `<div id="debug">Current Tab: <span>0</span>; Event Counter: <span>0</span>;</div>`;
  await componentsReady();

  const el = document.body.firstElementChild;
  el.addEventListener('tabChange', (e: CustomEvent) => {
    debugEl.querySelector('span').innerHTML = e.detail.activeTabIndex;
    debugEl.querySelector('span:last-child').innerHTML = `${
      parseInt(debugEl.querySelector('span:last-child').innerHTML) + 1
    }`;
  });

  const debugEl = document.querySelector('#debug');
  expect(debugEl.innerHTML).toBe('Current Tab: <span>0</span>; Event Counter: <span>0</span>;');

  const button1 = document.querySelector('#button1');
  button1.addEventListener('click', () => ((el as any).activeTabIndex = 2));
  await userEvent.click(button1);
  expect(debugEl.innerHTML).toBe('Current Tab: <span>2</span>; Event Counter: <span>1</span>;');

  const button2 = document.querySelector('#button2');
  button2.addEventListener('click', () => ((el as any).activeTabIndex = 1));
  await userEvent.click(button2);
  expect(debugEl.innerHTML).toBe('Current Tab: <span>1</span>; Event Counter: <span>2</span>;');
});
