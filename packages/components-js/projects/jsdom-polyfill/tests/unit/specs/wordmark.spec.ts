import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-wordmark');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should expose its brand text to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-wordmark');
  await componentsReady();

  expect(screen.queryAllByText('Porsche')).toHaveLength(0);
  expect(screen.getAllByShadowText('Porsche')).toHaveLength(1);

  // the wordmark is an inline SVG, so the accessible text lives in its <title>
  const { shadowRoot } = document.querySelector('p-wordmark');
  expect(screen.getByShadowText('Porsche')).toBe(shadowRoot.querySelector('title'));
});
