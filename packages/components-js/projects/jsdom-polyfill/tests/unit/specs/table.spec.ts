import { componentsReady } from '@porsche-design-system/components-js';
import { screen } from '@porsche-design-system/components-js/testing';
import { getMarkup } from '../helper';

it('should have initialized shadow dom', async () => {
  document.body.innerHTML = getMarkup('p-table');
  expect(await componentsReady()).toBe(7);

  const els = document.body.querySelectorAll(
    'p-table,p-table-head,p-table-body,p-table-head-row,p-table-row,p-table-head-cell,p-table-cell'
  );
  expect(els.length).toBe(7);
  els.forEach((el) => {
    expect(el.shadowRoot).not.toBeNull();
    expect(el.className).toBe('hydrated');
  });
});

it('should expose its table to shadow queries', async () => {
  document.body.innerHTML = getMarkup('p-table');
  await componentsReady();

  expect(screen.queryAllByRole('table')).toHaveLength(0);
  expect(screen.getAllByShadowRole('table')).toHaveLength(1);

  const { shadowRoot } = document.querySelector('p-table');
  expect(screen.getByShadowRole('table', { name: 'Some caption' })).toBe(shadowRoot.querySelector('div.table'));
});
