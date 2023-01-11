import { componentsReady } from '@porsche-design-system/components-js';

const getMarkup = (): string => {
  return `<p-table caption="Some caption">
  <p-table-head>
    <p-table-head-row>
      <p-table-head-cell>Col 1</p-table-headCell>
    </p-table-head-row>
  </p-table-head>
  <p-table-body>
    <p-table-row>
      <p-table-cell>Cell 1</p-table-cell>
    </p-table-row>
  </p-table-body>
</p-table>`;
};

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup();
  expect(await componentsReady()).toBe(7);

  const els = document.body.querySelectorAll('*');
  expect(els.length).toBe(7);
  els.forEach((el) => {
    expect(el.shadowRoot).not.toBeNull();
    expect(el.className).toBe('hydrated');
  });
});
