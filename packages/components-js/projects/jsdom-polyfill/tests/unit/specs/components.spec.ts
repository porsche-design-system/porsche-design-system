import { tagNameMarkup } from '../helper';
import { vi } from 'vitest';
import { componentsReady } from '@porsche-design-system/components-js';

it.each(Object.entries(tagNameMarkup))('should work without console errors for %s', async (tagName, markup) => {
  const spy = vi.spyOn(global.console, 'error');
  const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

  document.body.innerHTML = markup;
  await componentsReady();
  if (tagName === 'p-display') {
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('[Porsche Design System'),
      'component p-display is deprecated and will be removed with next major release.',
      'Please use p-heading component instead.',
      expect.any(HTMLElement)
    );
  } else {
    expect(warnSpy).not.toHaveBeenCalled();
  }
  warnSpy.mockRestore();

  expect(spy).not.toHaveBeenCalled();
});
