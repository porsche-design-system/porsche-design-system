import { componentsReady } from '@porsche-design-system/components-js';
import { getByRoleShadowed, screen } from '@porsche-design-system/components-js/testing';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-popover');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should be opened on click and closed on second click', async () => {
  document.body.innerHTML = getMarkup('p-popover');
  await componentsReady();

  const el = document.body.firstElementChild;
  const button = getByRoleShadowed('button');

  await userEvent.click(button);
  await waitFor(() => expect(el.shadowRoot.querySelector('[popover]')).not.toBeNull());

  await userEvent.click(button);
  await waitFor(() => expect(el.shadowRoot.querySelector('[popover]')).not.toBeNull());
});

it('should emit dismiss event in controlled mode on Escape', async () => {
  // Controlled mode: `open` is set and the consumer owns visibility via a slotted `button`; dismissal only emits
  // `dismiss` (the panel stays open because the consumer hasn't flipped `open` yet).
  document.body.innerHTML = `<p-popover open>
    <button slot="button">Some Button</button>
    Some Popover Content
  </p-popover>`;
  await componentsReady();

  const el = document.body.firstElementChild;
  const dismiss = vi.fn();
  el.addEventListener('dismiss', dismiss);

  // panel is open initially because `open` is set
  await waitFor(() => expect(el.shadowRoot.querySelector('[popover]').hasAttribute('inert')).toBe(false));

  await userEvent.keyboard('{Escape}');

  expect(dismiss).toHaveBeenCalledTimes(1);
  // panel stays open because the consumer owns `open` and hasn't updated it yet
  expect(el.shadowRoot.querySelector('[popover]').hasAttribute('inert')).toBe(false);
});

it('should emit dismiss event in controlled mode on outside click', async () => {
  document.body.innerHTML = `<p-popover open>
    <button slot="button">Some Button</button>
    Some Popover Content
  </p-popover>`;
  await componentsReady();

  const el = document.body.firstElementChild;
  const dismiss = vi.fn();
  el.addEventListener('dismiss', dismiss);

  await waitFor(() => expect(el.shadowRoot.querySelector('[popover]').hasAttribute('inert')).toBe(false));

  await userEvent.click(document.body);

  expect(dismiss).toHaveBeenCalledTimes(1);
  // panel stays open because the consumer owns `open` and hasn't updated it yet
  expect(el.shadowRoot.querySelector('[popover]').hasAttribute('inert')).toBe(false);
});

it('should expose its toggle button to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-popover');
  await componentsReady();

  expect(screen.queryAllByRole('button')).toHaveLength(0);
  expect(screen.getAllByShadowRole('button')).toHaveLength(1);

  const { shadowRoot } = document.querySelector('p-popover');
  expect(screen.getByShadowRole('button')).toBe(shadowRoot.querySelector('button[aria-label="More information"]'));
});

