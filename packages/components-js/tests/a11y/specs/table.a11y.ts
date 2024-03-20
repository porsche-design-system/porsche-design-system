import { type Page, test, expect } from '@playwright/test';
import { getAttribute, setContentWithDesignSystem, setProperty, waitForStencilLifecycle } from '../helpers';

const getHost = (page: Page) => page.$('p-table');
const getTable = (page: Page) => page.$('p-table .table');
const getFirstTableHeadCell = (page: Page) => page.$('p-table-head-cell:nth-child(1)');

const getFirstTableHeadCellButton = (page: Page) => page.$('p-table-head-cell:nth-child(1) button');
const getSecondTableHeadCell = (page: Page) => page.$('p-table-head-cell:nth-child(2)');
const getThirdTableHeadCell = (page: Page) => page.$('p-table-head-cell:nth-child(3)');
const getCaption = (page: Page) => page.$('p-table .caption');

type InitOptions = {
  columnAmount?: number;
  rowAmount?: number;
  isSortable?: boolean;
  hasSlottedCaption?: boolean;
};

const initTable = (page: Page, opts?: InitOptions): Promise<void> => {
  const { columnAmount = 5, rowAmount = 3, isSortable = false, hasSlottedCaption = false } = opts || {};

  const script = isSortable
    ? `
<script>
  document.querySelectorAll('p-table-head-cell').forEach((el, i) => {
    el.sort = { id: i, active: i === 0, direction: 'asc'};
  })
</script>`
    : '';

  return setContentWithDesignSystem(
    page,
    `
<p-table>
  ${hasSlottedCaption ? '<span slot="caption">Some caption</span>' : ''}
  <p-table-head>
    <p-table-head-row>
      ${Array.from(Array(columnAmount)).map((_, i) => `<p-table-head-cell>Column ${i + 1}</p-table-head-cell>`)}
    </p-table-head-row>
  </p-table-head>
  <p-table-body>
    ${Array.from(Array(rowAmount)).map(
      (_, i) => `
      <p-table-row>
        ${Array.from(Array(columnAmount)).map((_, j) => `<p-table-cell>Row ${i + 1} Cell ${j + 1}</p-table-cell>`)}
      </p-table-row>`
    )}
  </p-table-body>
</p-table>

${script}`
  );
};

test('should expose correct initial accessibility tree', async ({ page }) => {
  await initTable(page);
  const table = await getTable(page);
  const firstTableHeadCell = await getFirstTableHeadCell(page);

  // await expectA11yToMatchSnapshot(page, table, { interestingOnly: false });
  expect(await getAttribute(firstTableHeadCell, 'scope'), 'firstTableHeadCell scope').toBe('col'); // scope can't be detected by the accessibility tree
});

test('should set correct accessibility tree and aria-attribute for caption property', async ({ page }) => {
  // hint: accessibility tree snapshot not useful due to lack of support of table-role in interestingOnly mode.
  await initTable(page);

  const host = await getHost(page);
  const table = await getTable(page);
  expect(await getAttribute(table, 'aria-label'), 'initial aria-label').toBeNull();
  expect(await getAttribute(table, 'aria-labelledby'), 'initial aria-labelledby').toBeNull();

  await setProperty(host, 'caption', 'Some caption');
  await waitForStencilLifecycle(page);

  expect(await getAttribute(table, 'aria-label'), 'final aria-label').toBe('Some caption');
  expect(await getAttribute(table, 'aria-labelledby'), 'final aria-labelledby').toBeNull();

  const caption = await getCaption(page);
  expect(caption, 'slotted caption').toBeNull();
});

test('should set correct accessibility tree and aria-attribute for slotted caption', async ({ page }) => {
  // hint: accessibility tree snapshot not useful due to lack of support of table-role in interestingOnly mode.
  await initTable(page, { hasSlottedCaption: true });
  const table = await getTable(page);

  expect(await getAttribute(table, 'aria-label'), 'initial aria-label').toBeNull();
  expect(await getAttribute(table, 'aria-labelledby'), 'initial aria-labelledby').toBe('caption');

  const caption = await getCaption(page);
  expect(await getAttribute(caption, 'id'), 'caption id').toBe('caption');
});

test('should set correct aria-sort value when sortable', async ({ page }) => {
  await initTable(page, { isSortable: true });

  const host = await getHost(page);
  const firstTableHeadCell = await getFirstTableHeadCell(page);
  const secondTableHeadCell = await getSecondTableHeadCell(page);
  const thirdTableHeadCell = await getThirdTableHeadCell(page);

  expect(await getAttribute(firstTableHeadCell, 'aria-sort'), '1st cell initially').toBe('ascending');
  expect(await getAttribute(secondTableHeadCell, 'aria-sort'), '2nd cell initially').toBeNull();
  expect(await getAttribute(thirdTableHeadCell, 'aria-sort'), '3rd cell initially').toBeNull();

  await host.evaluate((host) => {
    host.querySelectorAll('p-table-head-cell').forEach((el, i) => {
      (el as any).sort = { id: i, active: i === 0, direction: 'desc' };
    });
  });
  await waitForStencilLifecycle(page);

  expect(await getAttribute(firstTableHeadCell, 'aria-sort'), '1st cell after change').toBe('descending');
  expect(await getAttribute(secondTableHeadCell, 'aria-sort'), '2nd cell after change').toBeNull();
  expect(await getAttribute(thirdTableHeadCell, 'aria-sort'), '3rd cell after change').toBeNull();

  await host.evaluate((host) => {
    host.querySelectorAll('p-table-head-cell').forEach((el, i) => {
      (el as any).sort = { id: i, active: i === 1, direction: 'asc' };
    });
  });
  await waitForStencilLifecycle(page);

  expect(await getAttribute(firstTableHeadCell, 'aria-sort'), '1st cell finally').toBeNull();
  expect(await getAttribute(secondTableHeadCell, 'aria-sort'), '2nd cell finally').toBe('ascending');
  expect(await getAttribute(thirdTableHeadCell, 'aria-sort'), '3rd cell finally').toBeNull();
});

test('should set correct aria-sort value when not sortable', async ({ page }) => {
  await initTable(page, { isSortable: false });

  const firstTableHeadCell = await getFirstTableHeadCell(page);
  const secondTableHeadCell = await getSecondTableHeadCell(page);
  const thirdTableHeadCell = await getThirdTableHeadCell(page);

  expect(await getAttribute(firstTableHeadCell, 'aria-sort'), '1st cell').toBeNull();
  expect(await getAttribute(secondTableHeadCell, 'aria-sort'), '2nd cell').toBeNull();
  expect(await getAttribute(thirdTableHeadCell, 'aria-sort'), '3rd cell').toBeNull();
});
