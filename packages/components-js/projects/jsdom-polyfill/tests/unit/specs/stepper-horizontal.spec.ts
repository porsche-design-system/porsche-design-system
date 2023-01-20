import { componentsReady } from '@porsche-design-system/components-js';
import userEvent from '@testing-library/user-event';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-stepper-horizontal');
  expect(await componentsReady()).toBe(4);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should have working events', async () => {
  document.body.innerHTML =
    getMarkup('p-stepper-horizontal') +
    `<div id="debug">Current Value: <span>2</span>; Event Counter: <span>0</span>;</div>`;
  await componentsReady();

  const el = document.body.firstElementChild;
  el.addEventListener('stepChange', (e: CustomEvent) => {
    debugEl.querySelector('span').innerHTML = e.detail.activeStepIndex;
    debugEl.querySelector('span:last-child').innerHTML = `${
      parseInt(debugEl.querySelector('span:last-child').innerHTML) + 1
    }`;
  });

  const debugEl = document.querySelector('#debug');
  expect(debugEl.innerHTML).toBe('Current Value: <span>2</span>; Event Counter: <span>0</span>;');

  const step1 = document.querySelector('p-stepper-horizontal-item');
  await userEvent.click(step1);
  expect(debugEl.innerHTML).toBe('Current Value: <span>0</span>; Event Counter: <span>1</span>;');

  const step2 = document.querySelector('p-stepper-horizontal-item:nth-child(2)');
  await userEvent.click(step2);
  expect(debugEl.innerHTML).toBe('Current Value: <span>1</span>; Event Counter: <span>2</span>;');
});
