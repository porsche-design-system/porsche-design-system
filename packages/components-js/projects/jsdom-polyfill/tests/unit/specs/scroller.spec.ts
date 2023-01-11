import { componentsReady } from '@porsche-design-system/components-js';

const getMarkup = (): string => {
  return `<p-scroller>
  <button>Some Button</button>
  <button>Some Button</button>
  <button>Some Button</button>
  <button>Some Button</button>
</p-scroller>`;
};

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup();
  expect(await componentsReady()).toBe(1);

  const el = document.body.firstElementChild;
  expect(el.shadowRoot).not.toBeNull();
  expect(el.className).toBe('hydrated');
});
