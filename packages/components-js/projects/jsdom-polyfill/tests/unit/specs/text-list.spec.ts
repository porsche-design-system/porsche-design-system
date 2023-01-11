import { componentsReady } from '@porsche-design-system/components-js';

const getMarkup = (): string => {
  return `<p-text-list>
  <p-text-list-item>Some text</p-text-list-item>
</p-text-list>`;
};

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup();
  expect(await componentsReady()).toBe(2);

  const els = document.body.querySelectorAll('*');
  expect(els.length).toBe(2);
  els.forEach((el) => {
    expect(el.shadowRoot).not.toBeNull();
    expect(el.className).toBe('hydrated');
  });
});
