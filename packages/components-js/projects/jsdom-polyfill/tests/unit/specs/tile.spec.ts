import { componentsReady } from '@porsche-design-system/components-js';
import { assertDefined } from '@porsche-design-system/shared/testing/assert-defined';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-tile');
  expect(await componentsReady()).toBe(2);

  const el = document.body.firstElementChild;
  assertDefined(el);
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});
