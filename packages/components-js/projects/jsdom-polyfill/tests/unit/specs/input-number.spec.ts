import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-input-number');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should expose its label to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-input-number');
  await componentsReady();

  expect(screen.queryAllByLabelText('Some label')).toHaveLength(0);
  expect(screen.getAllByShadowLabelText('Some label')).toHaveLength(1);

  const { shadowRoot } = document.querySelector('p-input-number');
  expect(screen.getByShadowLabelText('Some label')).toBe(shadowRoot.querySelector('input'));
});
