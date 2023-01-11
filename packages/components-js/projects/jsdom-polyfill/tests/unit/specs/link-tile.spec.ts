import { componentsReady } from '@porsche-design-system/components-js';

const getMarkup = (): string => {
  return `<p-link-tile href="#" label="Some label" description="Some description" aspectRatio="4:3">
  <img src="">
</p-link-tile>`;
};

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup();
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});
