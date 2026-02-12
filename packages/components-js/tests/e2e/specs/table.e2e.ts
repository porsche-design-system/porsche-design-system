import type { Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {
  addEventListener,
  getEventSummary,
  getLifecycleStatus,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
} from '../helpers';

const getHost = (page: Page) => page.locator('p-table');
const getFirstTableHeadCell = (page: Page) => page.locator('p-table-head-cell:nth-child(1)');

const getFirstTableHeadCellButton = (page: Page) => page.locator('p-table-head-cell:nth-child(1) button');

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

test.describe('sorting', () => {
  test('should not render sorting button if invalid sort options are provided', async ({ page }) => {
    await initTable(page, { isSortable: true });
    const firstTableHeadCell = getFirstTableHeadCell(page);

    await expect(getFirstTableHeadCellButton(page)).not.toHaveCount(0);

    await firstTableHeadCell.evaluate((el) => {
      (el as any).sort = { some: 'object' };
    });
    await waitForStencilLifecycle(page);

    await expect(getFirstTableHeadCellButton(page)).toHaveCount(0);
  });
});

test.describe('events', () => {
  test('should emit update event on sorting change', async ({ page }) => {
    await initTable(page, { isSortable: true });

    const host = getHost(page);
    await addEventListener(host, 'update');

    const firstTableHeadCellButton = getFirstTableHeadCellButton(page);
    await firstTableHeadCellButton.click();
    expect((await getEventSummary(host, 'update')).counter).toBe(1);

    await firstTableHeadCellButton.click();
    expect((await getEventSummary(host, 'update')).counter).toBe(2);
  });

  test('should not have clickable button when column is not sortable', async ({ page }) => {
    await initTable(page, { isSortable: false });

    const firstTableHeadCellPButtonPure = getFirstTableHeadCellButton(page);
    await expect(firstTableHeadCellPButtonPure).toHaveCount(0);
  });
});

test.describe('lifecycle', () => {
  test('should work without unnecessary round trips on init', async ({ page }) => {
    await initTable(page);
    const status = await getLifecycleStatus(page);

    expect(status.componentDidLoad['p-table'], 'componentDidLoad: p-table').toBe(1);
    expect(status.componentDidLoad['p-scroller'], 'componentDidLoad: p-scroller').toBe(1); // table uses p-scroller
    expect(status.componentDidLoad['p-icon'], 'componentDidLoad: p-icon').toBe(2); // scroller contains 2 p-icons: inside left and right scroll buttons
    expect(status.componentDidLoad['p-button'], 'componentDidLoad: p-button').toBe(2);
    expect(status.componentDidLoad['p-table-head'], 'componentDidLoad: p-table-head').toBe(1);
    expect(status.componentDidLoad['p-table-head-row'], 'componentDidLoad: p-table-head-row').toBe(1);
    expect(status.componentDidLoad['p-table-head-cell'], 'componentDidLoad: p-table-head-cell').toBe(5);
    expect(status.componentDidLoad['p-table-body'], 'componentDidLoad: p-table-body').toBe(1);
    expect(status.componentDidLoad['p-table-row'], 'componentDidLoad: p-table-row').toBe(3);
    expect(status.componentDidLoad['p-table-cell'], 'componentDidLoad: p-table-cell').toBe(15);

    expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(32); // all the components summed up
    expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
  });

  test('should work without unnecessary round trips on p-table-head-cell prop change', async ({ page }) => {
    await initTable(page);
    const initialStatus = await getLifecycleStatus(page);

    expect(initialStatus.componentDidLoad.all, 'initial componentDidLoad: all').toBe(32);
    expect(initialStatus.componentDidUpdate.all, 'initial componentDidUpdate: all').toBe(0);

    const host = getHost(page);
    await host.evaluate((host) => {
      host.querySelectorAll('p-table-head-cell').forEach((el, i) => {
        (el as any).sort = { id: i, active: i === 0, direction: 'asc' };
      });
    });
    await waitForStencilLifecycle(page);

    const status = await getLifecycleStatus(page);

    // after adding sorting to every column (5 columns) we get 5 p-icons extra, so that the component amount increases from 30 to 40
    expect(status.componentDidLoad.all, 'final componentDidLoad: all').toBe(37);
    expect(status.componentDidLoad['p-icon'], 'final componentDidLoad: p-icon').toBe(7); // 2 p-icons inside scroller + 5 p-icons in table head for sorting
    expect(status.componentDidUpdate.all, 'final componentDidUpdate: all').toBe(5); // 5 p-table-head-cells have been updated
    expect(status.componentDidUpdate['p-table-head-cell'], 'final componentDidUpdate: p-table-head-cell').toBe(5);
  });
});
