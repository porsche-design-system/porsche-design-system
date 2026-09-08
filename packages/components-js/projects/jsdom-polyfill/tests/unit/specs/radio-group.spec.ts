import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-radio-group');
  expect(await componentsReady()).toBe(4);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should expose its radio inputs to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-radio-group');
  await componentsReady();

  expect(screen.queryAllByRole('radio')).toHaveLength(0);
  // all three options carry the same accessible name, so compare the whole list instead of filtering by name
  expect(screen.getAllByShadowRole('radio')).toEqual(
    [...document.querySelectorAll('p-radio-group-option')].map((option) => option.shadowRoot.querySelector('input'))
  );
});
