import { componentsReady } from '@porsche-design-system/components-js';
import userEvent from '@testing-library/user-event';
import { getMarkup } from '../helper';
import { expect } from '@playwright/test';
import { getByRoleShadowed } from '@porsche-design-system/components-js/testing';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-flyout-navigation');
  expect(await componentsReady()).toBe(4);

  const els = Array.from(document.body.querySelectorAll('*:not(a)'));
  expect(els.length).toBe(4);
  els.forEach((el) => {
    expect(el.shadowRoot).not.toBeNull();
    expect(el.className).toBe('hydrated');
  });
});

it('should have working events', async () => {
  document.body.innerHTML =
    getMarkup('p-flyout-navigation') +
    `<div id="debug"><span id="active-identifier">Active Identifier: <span>undefined</span>;</span><span id="update-event">Update Event Counter: <span>0</span>;</span><span id="dismiss-event">Dismiss Event Counter: <span>0</span>;</span></div>`;
  await componentsReady();

  const debugEl = document.querySelector('#debug');
  const debugActiveIdentifierEl = document.querySelector('#active-identifier');
  const debugUpdateEventEl = document.querySelector('#update-event');
  const debugDismissEventEl = document.querySelector('#dismiss-event');

  const el = document.body.firstElementChild;
  el.addEventListener('dismiss', () => {
    debugDismissEventEl.querySelector('span').innerHTML = `${
      parseInt(debugDismissEventEl.querySelector('span').innerHTML) + 1
    }`;
  });

  el.addEventListener('update', (e: CustomEvent) => {
    debugActiveIdentifierEl.querySelector('span').innerHTML = e.detail.activeIdentifier;
    debugUpdateEventEl.querySelector('span').innerHTML = `${
      parseInt(debugUpdateEventEl.querySelector('span').innerHTML) + 1
    }`;
  });

  expect(debugEl.innerHTML).toBe(
    '<span id="active-identifier">Active Identifier: <span>undefined</span>;</span><span id="update-event">Update Event Counter: <span>0</span>;</span><span id="dismiss-event">Dismiss Event Counter: <span>0</span>;</span>'
  );

  const dismissButton = getByRoleShadowed('button');
  await userEvent.click(dismissButton);

  expect(debugEl.innerHTML).toBe(
    '<span id="active-identifier">Active Identifier: <span>undefined</span>;</span><span id="update-event">Update Event Counter: <span>0</span>;</span><span id="dismiss-event">Dismiss Event Counter: <span>1</span>;</span>'
  );

  const openSecondaryScrollerButton = getByRoleShadowed('button', { name: 'Button 1' });
  await userEvent.click(openSecondaryScrollerButton);

  expect(debugEl.innerHTML).toBe(
    '<span id="active-identifier">Active Identifier: <span>identifier-1</span>;</span><span id="update-event">Update Event Counter: <span>1</span>;</span><span id="dismiss-event">Dismiss Event Counter: <span>1</span>;</span>'
  );
});
