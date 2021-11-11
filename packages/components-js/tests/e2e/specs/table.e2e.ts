import { Page } from 'puppeteer';
import {
  addEventListener,
  expectA11yToMatchSnapshot,
  getAttribute,
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
    page = await browser.newPage();
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

      expect(await getScrollIndicator(), 'initially').toBeNull();

      await makeTableOverflow();

      expect(await getScrollIndicator(), 'finally').not.toBeNull();
    });

    it('should disappear when scrolled to the very right', async () => {
      await initTable();
      await makeTableOverflow();

      expect(await getScrollIndicator(), 'initially').not.toBeNull();

      const scrollArea = await getScrollArea();
      await scrollArea.evaluate((el) => (el.scrollLeft = 2000));
      await waitForStencilLifecycle(page);

      expect(await getScrollIndicator(), 'finally').toBeNull();
    });

    it('should scroll table on click', async () => {
      await initTable();
      await makeTableOverflow();

      const scrollArea = await getScrollArea();
      const getScrollLeft = () => scrollArea.evaluate((el) => el.scrollLeft);

      const initialScrollLeft = await getScrollLeft();
      expect(initialScrollLeft, 'initially').toBe(0);

      const scrollButton = await getScrollButton();
      await scrollButton.click();
      await page.waitForTimeout(SCROLL_DURATION);

      const scrollLeftAfterClick = await getScrollLeft();
      expect(scrollLeftAfterClick, 'after click').toBeGreaterThan(0);
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

      expect(status.componentDidLoad['p-table'], 'componentDidLoad: p-table').toBe(1);
      expect(status.componentDidLoad['p-table-head'], 'componentDidLoad: p-table-head').toBe(1);
      expect(status.componentDidLoad['p-table-head-row'], 'componentDidLoad: p-table-head-row').toBe(1);
      expect(status.componentDidLoad['p-table-head-cell'], 'componentDidLoad: p-table-head-cell').toBe(5);
      expect(status.componentDidLoad['p-table-body'], 'componentDidLoad: p-table-body').toBe(1);
      expect(status.componentDidLoad['p-table-row'], 'componentDidLoad: p-table-row').toBe(3);
      expect(status.componentDidLoad['p-table-cell'], 'componentDidLoad: p-table-cell').toBe(15);

      expect(status.componentDidLoad.all, 'componentDidLoad: all').toBe(27);
      expect(status.componentDidUpdate.all, 'componentDidUpdate: all').toBe(0);
    });

    it('should work without unnecessary round trips on p-table-head-cell prop change', async () => {
      await initTable();
      const initialStatus = await getLifecycleStatus(page);

      expect(initialStatus.componentDidLoad.all, 'initial componentDidLoad: all').toBe(27);
      expect(initialStatus.componentDidUpdate.all, 'initial componentDidUpdate: all').toBe(0);

      const host = await getHost();
      await host.evaluate((host) => {
        host.querySelectorAll('p-table-head-cell').forEach((el, i) => {
          (el as any).sort = { id: i, active: i === 0, direction: 'asc' };
        });
      });
      await waitForStencilLifecycle(page);

      const status = await getLifecycleStatus(page);

      expect(status.componentDidLoad.all, 'final componentDidLoad: all').toBe(32);
      expect(status.componentDidLoad['p-icon'], 'final componentDidLoad: p-icon').toBe(5);
      expect(status.componentDidUpdate.all, 'final componentDidUpdate: all').toBe(5);
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

    it('should expose correct accessibility tree of scroll area', async () => {
      await initTable({ hasSlottedCaption: true });
      const host = await getHost();
      const scrollArea = await getScrollArea();

      expect(await getAttribute(scrollArea, 'tabindex'), 'initial: tabindex').toBeNull();
      expect(await getAttribute(scrollArea, 'role'), 'initial: role').toBeNull();
      expect(await getAttribute(scrollArea, 'aria-label'), 'initial: aria-label').toBeNull();
      expect(await getAttribute(scrollArea, 'aria-labelledby'), 'initial: aria-labelledby').toBeNull();

      await makeTableOverflow();

      await expectA11yToMatchSnapshot(page, scrollArea, { message: 'Overflow with caption as property' });
      expect(await getAttribute(scrollArea, 'tabindex'), 'after overflow: tabindex').toBe('0');
      expect(await getAttribute(scrollArea, 'aria-label'), 'after overflow: aria-label').toBeNull();

      await setProperty(host, 'caption', 'Some caption');
      await waitForStencilLifecycle(page);

      await expectA11yToMatchSnapshot(page, scrollArea, { message: 'Overflow with caption as slot' });
      expect(await getAttribute(scrollArea, 'aria-labelledby'), 'after caption: aria-labelledby').toBeNull();
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
});
