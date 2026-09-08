import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import userEvent from '@testing-library/user-event';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-tabs-bar');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should have working events', async () => {
  document.body.innerHTML =
    getMarkup('p-tabs-bar') + `<div id="debug">Active Tab: <span>2</span>; Event Counter: <span>0</span>;</div>`;
  await componentsReady();

  const el = document.body.firstElementChild;
  el.addEventListener('update', (e: CustomEvent) => {
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

it('should expose its tablist to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-tabs-bar');
  await componentsReady();

  expect(screen.queryAllByRole('tablist')).toHaveLength(0);
  expect(screen.getAllByShadowRole('tablist')).toHaveLength(1);

  // the tablist lives in the shadow root of the nested p-scroller, one level deeper than p-tabs-bar's own
  const { shadowRoot } = document.querySelector('p-tabs-bar');
  expect(screen.getByShadowRole('tablist')).toBe(
    shadowRoot.querySelector('p-scroller').shadowRoot.querySelector('div.scroll')
  );
});
