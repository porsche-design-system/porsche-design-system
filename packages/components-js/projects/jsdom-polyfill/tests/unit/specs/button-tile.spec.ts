import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { assertDefined } from '@porsche-design-system/shared/testing/assert-defined';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-button-tile');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  assertDefined(el);
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should expose its nested button to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-button-tile');
  await componentsReady();

  expect(screen.queryAllByRole('button')).toHaveLength(0);
  expect(screen.getAllByShadowRole('button')).toHaveLength(1);

  // the button lives in the shadow root of the nested p-button, one level deeper than p-button-tile's own
  const shadowRoot = document.querySelector('p-button-tile')?.shadowRoot;
  assertDefined(shadowRoot);
  const buttonShadowRoot = shadowRoot.querySelector('p-button')?.shadowRoot;
  assertDefined(buttonShadowRoot);
  expect(screen.getByShadowRole('button')).toBe(buttonShadowRoot.querySelector('button.root'));
});
