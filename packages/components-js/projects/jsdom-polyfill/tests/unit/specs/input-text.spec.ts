import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-input-text');
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});

it('should expose its label to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-input-text');
  await componentsReady();

  expect(screen.queryAllByLabelText('Some label')).toHaveLength(0);
  expect(screen.getAllByShadowLabelText('Some label')).toHaveLength(1);

  const { shadowRoot } = document.querySelector('p-input-text');
  expect(screen.getByShadowLabelText('Some label')).toBe(shadowRoot.querySelector('input'));
});

it('should match both the host and the shadow input by placeholder', async () => {
  document.body.innerHTML = `<p-input-text name="some-name" label="Some label" placeholder="Some placeholder"></p-input-text>`;
  await componentsReady();

  // the `placeholder` prop reflects onto the host as an attribute, so the plain query already finds the host
  const host = document.querySelector('p-input-text');
  expect(screen.queryAllByPlaceholderText('Some placeholder')).toEqual([host]);

  // the shadow query finds the host AND the real input, which means the single-element variant throws
  expect(screen.getAllByShadowPlaceholderText('Some placeholder')).toEqual([
    host,
    host.shadowRoot.querySelector('input'),
  ]);
  expect(() => screen.getByShadowPlaceholderText('Some placeholder')).toThrow(/multiple/i);
});

it('should expose the shadow input value to shadow queries', async () => {
  document.body.innerHTML = `<p-input-text name="some-name" label="Some label" value="Some value"></p-input-text>`;
  await componentsReady();

  expect(screen.queryAllByDisplayValue('Some value')).toHaveLength(0);
  expect(screen.getAllByShadowDisplayValue('Some value')).toHaveLength(1);

  const { shadowRoot } = document.querySelector('p-input-text');
  expect(screen.getByShadowDisplayValue('Some value')).toBe(shadowRoot.querySelector('input'));
});
