import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { assertDefined } from '@porsche-design-system/shared/testing/assert-defined';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-spinner');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  assertDefined(el);
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should expose its alert to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-spinner');
  await componentsReady();

  expect(screen.queryAllByRole('alert')).toHaveLength(0);
  expect(screen.getAllByShadowRole('alert')).toHaveLength(1);

  const shadowRoot = document.querySelector('p-spinner')?.shadowRoot;
  assertDefined(shadowRoot);
  expect(screen.getByShadowRole('alert')).toBe(shadowRoot.querySelector('div'));
});
