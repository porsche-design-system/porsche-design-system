import { tagNameMarkup } from '../helper';
import { vi } from 'vitest';
import { componentsReady } from '@porsche-design-system/components-js';

it.each(Object.entries(tagNameMarkup))('should work without console errors for %s', async (tagName, markup) => {
  const spy = vi.spyOn(global.console, 'error');

  document.body.innerHTML = markup;
  await componentsReady();

  expect(spy).not.toHaveBeenCalled();
});
