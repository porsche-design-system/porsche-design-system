import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { assertDefined } from '@porsche-design-system/shared/testing/assert-defined';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-link-tile');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  assertDefined(el);
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should expose its nested link to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-link-tile');
  await componentsReady();

  expect(screen.queryAllByRole('link')).toHaveLength(0);
  expect(screen.getAllByShadowRole('link')).toHaveLength(1);

  // the anchor lives in the shadow root of the nested p-link, one level deeper than p-link-tile's own
  const shadowRoot = document.querySelector('p-link-tile')?.shadowRoot;
  assertDefined(shadowRoot);
  const linkShadowRoot = shadowRoot.querySelector('p-link')?.shadowRoot;
  assertDefined(linkShadowRoot);
  expect(screen.getByShadowRole('link')).toBe(linkShadowRoot.querySelector('a.root'));
});
