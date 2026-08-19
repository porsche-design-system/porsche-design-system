import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-model-signature');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should expose its model image to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-model-signature');
  await componentsReady();

  // the alt text is the `model` prop, which defaults to '911'
  expect(screen.queryAllByAltText('911')).toHaveLength(0);
  expect(screen.getAllByShadowAltText('911')).toHaveLength(1);

  const { shadowRoot } = document.querySelector('p-model-signature');
  expect(screen.getByShadowAltText('911')).toBe(shadowRoot.querySelector('img'));
});
