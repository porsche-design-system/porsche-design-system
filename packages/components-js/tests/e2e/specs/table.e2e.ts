import { Page } from 'puppeteer';
import {
  addEventListener,
  getAttribute,
  getBrowser,
  getLifecycleStatus,
  getProperty,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  setProperty,
  waitForEventSerialization,
  waitForStencilLifecycle,
} from '../helpers';

const SCROLL_DURATION = 205; // with 20 steps and an interval of 10, we get 200ms plus 5ms for safety

describe('table', () => {
  let page: Page;
  beforeEach(async () => {
    page = await getBrowser().newPage();
    await initAddEventListener(page);
  });
  afterEach(async () => await page.close());

  const getHost = () => selectNode(page, 'p-table');
  const getTable = () => selectNode(page, 'p-table >>> .table');
  const getTableHead = () => selectNode(page, 'p-table-head');
  const getTableHeadRow = () => selectNode(page, 'p-table-head-row');
  const getFirstTableHeadCell = () => selectNode(page, 'p-table-head-cell:nth-child(1)');
  const getFirstTableHeadCellButton = () => selectNode(page, 'p-table-head-cell:nth-child(1) >>> button');
  const getSecondTableHeadCell = () => selectNode(page, 'p-table-head-cell:nth-child(2)');
  const getThirdTableHeadCell = () => selectNode(page, 'p-table-head-cell:nth-child(3)');
  const getTableBody = () => selectNode(page, 'p-table-body');
  const getFirstTableRow = () => selectNode(page, 'p-table-row:nth-child(1)');
  const getFirstTableRowCell = () => selectNode(page, 'p-table-row:nth-child(1) p-table-cell:nth-child(1)');
  const getCaption = () => selectNode(page, 'p-table >>> .caption');
  const getScrollArea = () => selectNode(page, 'p-table >>> .scroll-area');
  const getScrollIndicator = () => selectNode(page, 'p-table >>> .scroll-indicator');
  const getScrollButton = () => selectNode(page, 'p-table >>> .scroll-button');

  type InitOptions = {
    columnAmount?: number;
    rowAmount?: number;
    isSortable?: boolean;
    hasSlottedCaption?: boolean;
  };

  const initTable = (opts?: InitOptions): Promise<void> => {
    const { columnAmount = 5, rowAmount = 3, isSortable = false, hasSlottedCaption = false } = opts ?? {};

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

  describe('scroll button', () => {
    it('should have type="button" attribute', async () => {
      await initTable();
      await makeTableOverflow();

      expect(await getProperty(await getScrollButton(), 'type')).toBe('button');
    });

    it("should be visible when table's content is overflowing", async () => {
      await initTable();

      expect(await getScrollIndicator())
        .withContext('initially')
        .toBeNull();

      await makeTableOverflow();

      expect(await getScrollIndicator())
        .withContext('finally')
        .not.toBeNull();
    });

    it('should disappear when scrolled to the very right', async () => {
      await initTable();
      await makeTableOverflow();

      expect(await getScrollIndicator())
        .withContext('initially')
        .not.toBeNull();

      const scrollArea = await getScrollArea();
      await scrollArea.evaluate((el) => (el.scrollLeft = 2000));
      await waitForStencilLifecycle(page);

      expect(await getScrollIndicator())
        .withContext('finally')
        .toBeNull();
    });

    it('should scroll table on click', async () => {
      await initTable();
      await makeTableOverflow();

      const scrollArea = await getScrollArea();
      const getScrollLeft = () => scrollArea.evaluate((el) => el.scrollLeft);

      const initialScrollLeft = await getScrollLeft();
      expect(initialScrollLeft).withContext('initially').toBe(0);

      const scrollButton = await getScrollButton();
      await scrollButton.click();
      await page.waitForTimeout(SCROLL_DURATION);

      const scrollLeftAfterClick = await getScrollLeft();
      expect(scrollLeftAfterClick).withContext('after click').toBeGreaterThan(0);
    });
  });

  describe('accessibility', () => {
    it('should set correct role and scope on table components', async () => {
      await initTable();

      const table = await getTable();
      const tableHead = await getTableHead();
      const tableHeadRow = await getTableHeadRow();
      const firstTableHeadCell = await getFirstTableHeadCell();
      const tableBody = await getTableBody();
      const firstTableRow = await getFirstTableRow();
      const firstTableRowCell = await getFirstTableRowCell();

      expect(await getAttribute(table, 'role'))
        .withContext('table')
        .toBe('table');
      expect(await getAttribute(tableHead, 'role'))
        .withContext('tableHead')
        .toBe('rowgroup');
      expect(await getAttribute(tableHeadRow, 'role'))
        .withContext('tableHeadRow')
        .toBe('row');
      expect(await getAttribute(firstTableHeadCell, 'role'))
        .withContext('firstTableHeadCell role')
        .toBe('columnheader');
      expect(await getAttribute(firstTableHeadCell, 'scope'))
        .withContext('firstTableHeadCell scope')
        .toBe('col');
      expect(await getAttribute(tableBody, 'role'))
        .withContext('tableBody')
        .toBe('rowgroup');
      expect(await getAttribute(firstTableRow, 'role'))
        .withContext('firstTableRow')
        .toBe('row');
      expect(await getAttribute(firstTableRowCell, 'role'))
        .withContext('firstTableRowCell')
        .toBe('cell');
    });

    describe('caption', () => {
      it('should set correct aria-label for caption property', async () => {
        await initTable();

        const host = await getHost();
        const table = await getTable();
        expect(await getAttribute(table, 'aria-label'))
          .withContext('initial aria-label')
          .toBeNull();
        expect(await getAttribute(table, 'aria-labelledby'))
          .withContext('initial aria-labelledby')
          .toBeNull();

        await setProperty(host, 'caption', 'Some caption');
        await waitForStencilLifecycle(page);

        expect(await getAttribute(table, 'aria-label'))
          .withContext('final aria-label')
          .toBe('Some caption');
        expect(await getAttribute(table, 'aria-labelledby'))
          .withContext('final aria-labelledby')
          .toBeNull();

        const caption = await getCaption();
        expect(caption).withContext('slotted caption').toBeNull();
      });

      it('should set correct aria-labelledby for slotted caption', async () => {
        await initTable({ hasSlottedCaption: true });
        const table = await getTable();

        expect(await getAttribute(table, 'aria-label'))
          .withContext('initial aria-label')
          .toBeNull();
        expect(await getAttribute(table, 'aria-labelledby'))
          .withContext('initial aria-labelledby')
          .toBe('caption');

        const caption = await getCaption();
        expect(await getAttribute(caption, 'id'))
          .withContext('caption id')
          .toBe('caption');
      });
    });

    describe('scroll area', () => {
      it('should be tabbable if scrollable', async () => {
        await initTable({ hasSlottedCaption: true });

        const host = await getHost();
        const scrollArea = await getScrollArea();

        expect(await getAttribute(scrollArea, 'tabindex'))
          .withContext('initial: tabindex')
          .toBeNull();
        expect(await getAttribute(scrollArea, 'role'))
          .withContext('initial: role')
          .toBeNull();
        expect(await getAttribute(scrollArea, 'aria-label'))
          .withContext('initial: aria-label')
          .toBeNull();
        expect(await getAttribute(scrollArea, 'aria-labelledby'))
          .withContext('initial: aria-labelledby')
          .toBeNull();

        await makeTableOverflow();

        expect(await getAttribute(scrollArea, 'tabindex'))
          .withContext('after overflow: tabindex')
          .toBe('0');
        expect(await getAttribute(scrollArea, 'role'))
          .withContext('after overflow: role')
          .toBe('region');
        expect(await getAttribute(scrollArea, 'aria-label'))
          .withContext('after overflow: aria-label')
          .toBeNull();
        expect(await getAttribute(scrollArea, 'aria-labelledby'))
          .withContext('after overflow: aria-labelledby')
          .toBe('caption');

        await setProperty(host, 'caption', 'Some caption');
        await waitForStencilLifecycle(page);

        expect(await getAttribute(scrollArea, 'tabindex'))
          .withContext('after caption: tabindex')
          .toBe('0');
        expect(await getAttribute(scrollArea, 'role'))
          .withContext('after caption: role')
          .toBe('region');
        expect(await getAttribute(scrollArea, 'aria-label'))
          .withContext('after caption: aria-label')
          .toBe('Some caption');
        expect(await getAttribute(scrollArea, 'aria-labelledby'))
          .withContext('after caption: aria-labelledby')
          .toBeNull();
      });
    });

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

      it('should set correct aria-sort value when sortable', async () => {
        await initTable({ isSortable: true });

        const host = await getHost();
        const firstTableHeadCell = await getFirstTableHeadCell();
        const secondTableHeadCell = await getSecondTableHeadCell();
        const thirdTableHeadCell = await getThirdTableHeadCell();

        expect(await getAttribute(firstTableHeadCell, 'aria-sort'))
          .withContext('1st cell initially')
          .toBe('ascending');
        expect(await getAttribute(secondTableHeadCell, 'aria-sort'))
          .withContext('2nd cell initially')
          .toBeNull();
        expect(await getAttribute(thirdTableHeadCell, 'aria-sort'))
          .withContext('3rd cell initially')
          .toBeNull();

        await host.evaluate((host) => {
          host.querySelectorAll('p-table-head-cell').forEach((el, i) => {
            (el as any).sort = { id: i, active: i === 0, direction: 'desc' };
          });
        });
        await waitForStencilLifecycle(page);

        expect(await getAttribute(firstTableHeadCell, 'aria-sort'))
          .withContext('1st cell after change')
          .toBe('descending');
        expect(await getAttribute(secondTableHeadCell, 'aria-sort'))
          .withContext('2nd cell after change')
          .toBeNull();
        expect(await getAttribute(thirdTableHeadCell, 'aria-sort'))
          .withContext('3rd cell after change')
          .toBeNull();

        await host.evaluate((host) => {
          host.querySelectorAll('p-table-head-cell').forEach((el, i) => {
            (el as any).sort = { id: i, active: i === 1, direction: 'asc' };
          });
        });
        await waitForStencilLifecycle(page);

        expect(await getAttribute(firstTableHeadCell, 'aria-sort'))
          .withContext('1st cell finally')
          .toBeNull();
        expect(await getAttribute(secondTableHeadCell, 'aria-sort'))
          .withContext('2nd cell finally')
          .toBe('ascending');
        expect(await getAttribute(thirdTableHeadCell, 'aria-sort'))
          .withContext('3rd cell finally')
          .toBeNull();
      });

      it('should set correct aria-sort value when not sortable', async () => {
        await initTable({ isSortable: false });

        const firstTableHeadCell = await getFirstTableHeadCell();
        const secondTableHeadCell = await getSecondTableHeadCell();
        const thirdTableHeadCell = await getThirdTableHeadCell();

        expect(await getAttribute(firstTableHeadCell, 'aria-sort'))
          .withContext('1st cell')
          .toBeNull();
        expect(await getAttribute(secondTableHeadCell, 'aria-sort'))
          .withContext('2nd cell')
          .toBeNull();
        expect(await getAttribute(thirdTableHeadCell, 'aria-sort'))
          .withContext('3rd cell')
          .toBeNull();
      });
    });
  });

  describe('events', () => {
    it('should emit event on sorting change', async () => {
      await initTable({ isSortable: true });

      let eventCounter = 0;
      const host = await getHost();
      await addEventListener(host, 'sortingChange', () => eventCounter++);

      const firstTableHeadCellButton = await getFirstTableHeadCellButton();
      await firstTableHeadCellButton.click();
      await waitForEventSerialization(page);
      await waitForEventSerialization(page); // 🙈
      expect(eventCounter).toBe(1);

      await firstTableHeadCellButton.click();
      await waitForEventSerialization(page);
      await waitForEventSerialization(page); // 🙈
      expect(eventCounter).toBe(2);
    });

    it('should not have clickable button when column is not sortable', async () => {
      await initTable({ isSortable: false });

      const firstTableHeadCellButton = await getFirstTableHeadCellButton();
      expect(firstTableHeadCellButton).toBeNull();
    });
  });

  describe('lifecycle', () => {
    it('should work without unnecessary round trips on init', async () => {
      await initTable();
      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad['p-table']).withContext('componentDidLoad: p-table').toBe(1);
      expect(status.componentDidLoad['p-table-head']).withContext('componentDidLoad: p-table-head').toBe(1);
      expect(status.componentDidLoad['p-table-head-row']).withContext('componentDidLoad: p-table-head-row').toBe(1);
      expect(status.componentDidLoad['p-table-head-cell']).withContext('componentDidLoad: p-table-head-cell').toBe(5);
      expect(status.componentDidLoad['p-table-body']).withContext('componentDidLoad: p-table-body').toBe(1);
      expect(status.componentDidLoad['p-table-row']).withContext('componentDidLoad: p-table-row').toBe(3);
      expect(status.componentDidLoad['p-table-cell']).withContext('componentDidLoad: p-table-cell').toBe(15);

      expect(status.componentDidLoad.all).withContext('componentDidLoad: all').toBe(27);
      expect(status.componentDidUpdate.all).withContext('componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips on p-table-head-cell prop change', async () => {
      await initTable();
      const initialStatus = await getLifecycleStatus(page);

      expect(initialStatus.componentDidLoad.all).withContext('initial componentDidLoad: all').toBe(27);
      expect(initialStatus.componentDidUpdate.all).withContext('initial componentDidUpdate: all').toBe(0);

      const host = await getHost();
      await host.evaluate((host) => {
        host.querySelectorAll('p-table-head-cell').forEach((el, i) => {
          (el as any).sort = { id: i, active: i === 0, direction: 'asc' };
        });
      });
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad.all).withContext('final componentDidLoad: all').toBe(32);
      expect(status.componentDidLoad['p-icon']).withContext('final componentDidLoad: p-icon').toBe(5);
      expect(status.componentDidUpdate.all).withContext('final componentDidUpdate: all').toBe(5);
      expect(status.componentDidUpdate['p-table-head-cell'])
        .withContext('final componentDidUpdate: p-table-head-cell')
        .toBe(5);
    });
  });
});
