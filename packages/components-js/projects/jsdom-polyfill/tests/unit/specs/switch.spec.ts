import { componentsReady } from '@porsche-design-system/components-js';
import { getByRoleShadowed } from '@porsche-design-system/components-js/testing';
import userEvent from '@testing-library/user-event';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-switch');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should have working events', async () => {
  document.body.innerHTML =
    getMarkup('p-switch') + `<div id="debug">Checked: <span>false</span>; Event Counter: <span>0</span>;</div>`;
  await componentsReady();

  const el = document.body.firstElementChild;
  el.addEventListener('switchChange', (e: CustomEvent) => {
    (el as any).checked = e.detail.checked;
    debugEl.querySelector('span').innerHTML = e.detail.checked;
    debugEl.querySelector('span:last-child').innerHTML = `${
      parseInt(debugEl.querySelector('span:last-child').innerHTML) + 1
    }`;
  });

  const debugEl = document.querySelector('#debug');
  expect(debugEl.innerHTML).toBe('Checked: <span>false</span>; Event Counter: <span>0</span>;');

  const button = getByRoleShadowed('switch');
  await userEvent.click(button);
  expect(debugEl.innerHTML).toBe('Checked: <span>true</span>; Event Counter: <span>1</span>;');

  await userEvent.click(button);
  expect(debugEl.innerHTML).toBe('Checked: <span>false</span>; Event Counter: <span>2</span>;');
});
