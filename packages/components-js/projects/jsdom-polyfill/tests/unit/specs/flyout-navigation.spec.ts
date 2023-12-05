import { componentsReady } from '@porsche-design-system/components-js';
import userEvent from '@testing-library/user-event';
import { getMarkup } from '../helper';
import { expect } from '@playwright/test';
import { getByRoleShadowed } from '@porsche-design-system/components-js/testing';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-flyout-navigation');
  expect(await componentsReady()).toBe(4);

  const els = Array.from(document.body.querySelectorAll('*'));
  expect(els.length).toBe(4);
  els.forEach((el) => {
    expect(el.shadowRoot).not.toBeNull();
    expect(el.className).toBe('hydrated');
  });
});

it('should have working events', async () => {
  document.body.innerHTML =
    getMarkup('p-flyout-navigation') +
    `<div id="debug">Active Identifier: <span>undefined</span>; Event Counter: <span>0</span>;</div>`;
  await componentsReady();

  const debugEl = document.querySelector('#debug');

  const el = document.body.firstElementChild;
  el.addEventListener('dismiss', () => {
    debugEl.querySelector('span:last-child').innerHTML = `${
      parseInt(debugEl.querySelector('span:last-child').innerHTML) + 1
    }`;
  });

  el.addEventListener('update', (e: CustomEvent) => {
    debugEl.querySelector('span').innerHTML = e.detail.activeIdentifier;
    debugEl.querySelector('span:last-child').innerHTML = `${
      parseInt(debugEl.querySelector('span:last-child').innerHTML) + 1
    }`;
  });

  expect(debugEl.innerHTML).toBe('Active Identifier: <span>undefined</span>; Event Counter: <span>0</span>;');

  const dismissButton = getByRoleShadowed('button');
  await userEvent.click(dismissButton);

  expect(debugEl.innerHTML).toBe('Active Identifier: <span>undefined</span>; Event Counter: <span>1</span>;');

  // TODO: update event test is missing
  // const openSecondaryScrollerButton = getByRoleShadowed('button');
  // console.log(openSecondaryScrollerButton);
  // await userEvent.click(openSecondaryScrollerButton);

  // expect(debugEl.innerHTML).toBe('Current Identifier: <span>identifier-1</span>; Event Counter: <span>1</span>;');
});
