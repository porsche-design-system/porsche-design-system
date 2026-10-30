import { componentsReady } from '@porsche-design-system/components-js';
import { assertDefined } from '@porsche-design-system/testing/assert-defined';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  document.body.innerHTML = getMarkup('p-display');
  expect(await componentsReady()).toBe(1);
  expect(warnSpy).toHaveBeenCalledWith(
    expect.stringContaining('[Porsche Design System'),
    'component p-display is deprecated and will be removed with next major release.',
    'Please use p-heading component instead.',
    expect.any(HTMLElement)
  );

  const el = document.body.firstElementChild;
  assertDefined(el);
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});
