import { componentsReady } from '@porsche-design-system/components-js';

const getMarkup = (): string => {
  return `<p-textarea-wrapper label="Some label">
  <textarea />
</p-textarea-wrapper>`;
};

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup();
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});
