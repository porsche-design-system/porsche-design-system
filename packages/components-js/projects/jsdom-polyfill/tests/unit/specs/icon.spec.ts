import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-icon');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should expose the aria label as shadow alt text', async () => {
  // not getMarkup('p-icon'), because without an aria label the shadow img renders alt="" and is unqueryable
  document.body.innerHTML = `<p-icon aria='{"aria-label":"Some icon"}'></p-icon>`;
  await componentsReady();

  expect(screen.queryAllByAltText('Some icon')).toHaveLength(0);
  expect(screen.getAllByShadowAltText('Some icon')).toHaveLength(1);

  const { shadowRoot } = document.querySelector('p-icon');
  expect(screen.getByShadowAltText('Some icon')).toBe(shadowRoot.querySelector('img'));
});
