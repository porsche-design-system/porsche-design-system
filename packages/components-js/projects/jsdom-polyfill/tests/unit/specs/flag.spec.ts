import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { assertDefined } from '@porsche-design-system/shared/testing/assert-defined';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-flag');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  assertDefined(el);
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should expose the aria label as shadow alt text', async () => {
  // not getMarkup('p-flag'), because without an aria label the shadow img renders alt="" and is unqueryable
  document.body.innerHTML = `<p-flag aria='{"aria-label":"Some flag"}'></p-flag>`;
  await componentsReady();

  expect(screen.queryAllByAltText('Some flag')).toHaveLength(0);
  expect(screen.getAllByShadowAltText('Some flag')).toHaveLength(1);

  const shadowRoot = document.querySelector('p-flag')?.shadowRoot;
  assertDefined(shadowRoot);
  expect(screen.getByShadowAltText('Some flag')).toBe(shadowRoot.querySelector('img'));
});
