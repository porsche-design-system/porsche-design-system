import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { assertDefined } from '@porsche-design-system/shared/testing/assert-defined';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-input-url');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  assertDefined(el);
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should expose its label to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-input-url');
  await componentsReady();

  expect(screen.queryAllByLabelText('Some label')).toHaveLength(0);
  expect(screen.getAllByShadowLabelText('Some label')).toHaveLength(1);

  const shadowRoot = document.querySelector('p-input-url')?.shadowRoot;
  assertDefined(shadowRoot);
  expect(screen.getByShadowLabelText('Some label')).toBe(shadowRoot.querySelector('input'));
});
