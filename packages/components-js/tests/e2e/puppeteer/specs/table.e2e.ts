import type { Page } from 'puppeteer';
import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getAttribute,
  getEventSummary,
  getLifecycleStatus,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForStencilLifecycle,
} from '../helpers';

let page: Page;
beforeEach(async () => (page = await browser.newPage()));
afterEach(async () => await page.close());

const getHost = () => selectNode(page, 'p-table');
const getTable = () => selectNode(page, 'p-table >>> .table');
const getFirstTableHeadCell = () => selectNode(page, 'p-table-head-cell:nth-child(1)');

const getFirstTableHeadCellButton = () => selectNode(page, 'p-table-head-cell:nth-child(1) >>> button');
const getSecondTableHeadCell = () => selectNode(page, 'p-table-head-cell:nth-child(2)');
const getThirdTableHeadCell = () => selectNode(page, 'p-table-head-cell:nth-child(3)');
const getCaption = () => selectNode(page, 'p-table >>> .caption');

type InitOptions = {
  columnAmount?: number;
  rowAmount?: number;
  isSortable?: boolean;
  hasSlottedCaption?: boolean;
};

const initTable = (opts?: InitOptions): Promise<void> => {
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

const makeTableOverflow = async () => {
  const firstTableHeadCell = await getFirstTableHeadCell();
  await firstTableHeadCell.evaluate((el) => {
    (el as HTMLElement).style.minWidth = '2000px';
  });
  await waitForStencilLifecycle(page);
};

describe('sorting', () => {
  it('should not render sorting button if invalid sort options are provided', async () => {
    await initTable({ isSortable: true });
    const firstTableHeadCell = await getFirstTableHeadCell();

    expect(await getFirstTableHeadCellButton()).not.toBeNull();

    await firstTableHeadCell.evaluate((el) => {
      (el as any).sort = { some: 'object' };
    });
    await waitForStencilLifecycle(page);

    expect(await getFirstTableHeadCellButton()).toBeNull();
  });
});

describe('events', () => {
  it('should emit event on sorting change', async () => {
    await initTable({ isSortable: true });

    const host = await getHost();
    await addEventListener(host, 'sortingChange');

    const firstTableHeadCellButton = await getFirstTableHeadCellButton();
    await firstTableHeadCellButton.click();
    expect((await getEventSummary(host, 'sortingChange')).counter).toBe(1);

    await firstTableHeadCellButton.click();
    expect((await getEventSummary(host, 'sortingChange')).counter).toBe(2);
  });

  it('should not have clickable button when column is not sortable', async () => {
    await initTable({ isSortable: false });

    const firstTableHeadCellPButtonPure = await getFirstTableHeadCellButton();
    expect(firstTableHeadCellPButtonPure).toBeNull();
  });

  it('should emit both sortingChange and update event', async () => {
    await initTable({ isSortable: true });
    const host = await getHost();

    await addEventListener(host, 'sortingChange');
    await addEventListener(host, 'update');
    expect((await getEventSummary(host, 'sortingChange')).counter).toBe(0);
    expect((await getEventSummary(host, 'update')).counter).toBe(0);

    const firstTableHeadCellButton = await getFirstTableHeadCellButton();
    await firstTableHeadCellButton.click();
    expect((await getEventSummary(host, 'sortingChange')).counter).toBe(1);
    expect((await getEventSummary(host, 'update')).counter).toBe(1);
  });
});

describe('lifecycle', () => {
  it('should work without unnecessary round trips on init', async () => {
    await initTable();
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-table'], 'componentDidLoad: p-table').toBe(1);
    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1); // table uses p-scroller
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // scroller contains 2 p-icons: inside left and right scroll buttons
    expect(status.componentDidLoad['p-table-head'], 'componentDidLoad: p-table-head').toBe(1);
    expect(status.componentDidLoad['p-table-head-row'], 'componentDidLoad: p-table-head-row').toBe(1);
    expect(status.componentDidLoad['p-table-head-cell'], 'componentDidLoad: p-table-head-cell').toBe(5);
    expect(status.componentDidLoad['p-table-body'], 'componentDidLoad: p-table-body').toBe(1);
    expect(status.componentDidLoad['p-table-row'], 'componentDidLoad: p-table-row').toBe(3);
    expect(status.componentDidLoad['p-table-cell'], 'componentDidLoad: p-table-cell').toBe(15);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(30); // all the components summed up
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  it('should work without unnecessary round trips on p-table-head-cell prop change', async () => {
    await initTable();
    const initialStatus = await getLifecycleStatus(page);

    expect(initialStatus.componentDidLoad.all, 'initial componentDidLoad: all').toBe(30);
    expect(initialStatus.componentDidUpdate.all, 'initial componentDidUpdate: all').toBe(0);

    const host = await getHost();
    await host.evaluate((host) => {
      host.querySelectorAll('p-table-head-cell').forEach((el, i) => {
        (el as any).sort = { id: i, active: i === 0, direction: 'asc' };
      });
    });
    await waitForStencilLifecycle(page);

    const status = await getLifecycleStatus(page);

    // after adding sorting to every column (5 columns) we get 5 p-icons extra, so that the component amount increases from 30 to 40
    expect(status.componentDidLoad.all, 'final componentDidLoad: all').toBe(35);
    expect(status.componentDidLoad['p-icon'], 'final componentDidLoad: p-icon').toBe(7); // 2 p-icons inside scroller + 5 p-icons in table head for sorting
    expect(status.componentDidUpdate.all, 'final componentDidUpdate: all').toBe(5); // 5 p-table-head-cells have been updated
    expect(status.componentDidUpdate['p-table-head-cell'], 'final componentDidUpdate: p-table-head-cell').toBe(5);
  });
});

describe('accessibility', () => {
  it('should expose correct initial accessibility tree', async () => {
    await initTable();
    const table = await getTable();
    const firstTableHeadCell = await getFirstTableHeadCell();

    await expectA11yToMatchSnapshot(page, table, { interestingOnly: false });
    expect(await getAttribute(firstTableHeadCell, 'scope'), 'firstTableHeadCell scope').toBe('col'); // scope can't be detected by the accessibility tree
  });

  it('should set correct accessibility tree and aria-attribute for caption property', async () => {
    // hint: accessibility tree snapshot not useful due to lack of support of table-role in interestingOnly mode.
    await initTable();

    const host = await getHost();
    const table = await getTable();
    expect(await getAttribute(table, 'aria-label'), 'initial aria-label').toBeNull();
    expect(await getAttribute(table, 'aria-labelledby'), 'initial aria-labelledby').toBeNull();

    await setProperty(host, 'caption', 'Some caption');
    await waitForStencilLifecycle(page);

    expect(await getAttribute(table, 'aria-label'), 'final aria-label').toBe('Some caption');
    expect(await getAttribute(table, 'aria-labelledby'), 'final aria-labelledby').toBeNull();

    const caption = await getCaption();
    expect(caption, 'slotted caption').toBeNull();
  });

  it('should set correct accessibility tree and aria-attribute for slotted caption', async () => {
    // hint: accessibility tree snapshot not useful due to lack of support of table-role in interestingOnly mode.
    await initTable({ hasSlottedCaption: true });
    const table = await getTable();

    expect(await getAttribute(table, 'aria-label'), 'initial aria-label').toBeNull();
    expect(await getAttribute(table, 'aria-labelledby'), 'initial aria-labelledby').toBe('caption');

    const caption = await getCaption();
    expect(await getAttribute(caption, 'id'), 'caption id').toBe('caption');
  });

  it('should set correct aria-sort value when sortable', async () => {
    await initTable({ isSortable: true });

    const host = await getHost();
    const firstTableHeadCell = await getFirstTableHeadCell();
    const secondTableHeadCell = await getSecondTableHeadCell();
    const thirdTableHeadCell = await getThirdTableHeadCell();

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

  it('should set correct aria-sort value when not sortable', async () => {
    await initTable({ isSortable: false });

    const firstTableHeadCell = await getFirstTableHeadCell();
    const secondTableHeadCell = await getSecondTableHeadCell();
    const thirdTableHeadCell = await getThirdTableHeadCell();

    expect(await getAttribute(firstTableHeadCell, 'aria-sort'), '1st cell').toBeNull();
    expect(await getAttribute(secondTableHeadCell, 'aria-sort'), '2nd cell').toBeNull();
    expect(await getAttribute(thirdTableHeadCell, 'aria-sort'), '3rd cell').toBeNull();
  });
});
