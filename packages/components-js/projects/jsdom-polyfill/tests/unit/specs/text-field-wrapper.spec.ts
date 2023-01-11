import { componentsReady } from '@porsche-design-system/components-js';

const getMarkup = (): string => {
  return `<p-text-field-wrapper label="Some label">
  <input type="text" />
</p-text-field-wrapper>`;
};

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup();
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});
