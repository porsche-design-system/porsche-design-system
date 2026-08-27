import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import userEvent from '@testing-library/user-event';
import { getMarkup } from '../helper';
import { vi } from 'vitest';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-tabs');
  expect(await componentsReady()).toBe(4);

  const els = Array.from(document.body.querySelectorAll('p-tabs,p-tabs-item'));
  expect(els.length).toBe(4);
  els.forEach((el) => {
    expect(el.shadowRoot).not.toBeNull();
    expect(el.className).toBe('hydrated');
  });
});

it('should have working events', async () => {
  document.body.innerHTML =
    getMarkup('p-tabs') + `<div id="debug">Current Tab: <span>0</span>; Event Counter: <span>0</span>;</div>`;
  await componentsReady();

  const el = document.body.firstElementChild;
  el.addEventListener('update', (e: CustomEvent) => {
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

// seems to only happen when one of the previous tests is executed
it('should not console.error because of Object.getOwnPropertyDescriptor', async () => {
  const spy = vi.spyOn(global.console, 'error');

  document.body.innerHTML = getMarkup('p-tabs');
  await componentsReady();

  expect(spy).not.toHaveBeenCalled();
});

it('should expose its tab buttons to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-tabs');
  await componentsReady();

  // the fixture also ships two light DOM buttons named "Button 1" and "Button 2", so filter by name
  expect(screen.queryAllByRole('button', { name: 'Some label' })).toHaveLength(0);
  // p-tabs renders its buttons into the LIGHT DOM of the nested p-tabs-bar, which then slots them
  expect(screen.getAllByShadowRole('button', { name: 'Some label' })).toEqual([
    ...document.querySelector('p-tabs').shadowRoot.querySelector('p-tabs-bar').querySelectorAll('button'),
  ]);
});
