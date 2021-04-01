import { Page } from 'puppeteer';

import type {
  GridDirection,
  GridGutter,
  GridWrap,
} from '@porsche-design-system/components/src/components/layout/grid/grid/grid-utils';
import { getBrowser, getElementStyle, selectNode, setAttribute, setContentWithDesignSystem } from '../helpers';
import { stringify } from '../../../../components/tests/unit/helper';

const JSS_RECALCULATION_DURATION = 40;

describe('grid', () => {
  let page: Page;
  beforeEach(async () => (page = await getBrowser().newPage()));
  afterEach(async () => await page.close());

  type InitOptions = {
    childrenSizes?: number[];
    direction?: GridDirection;
    wrap?: GridWrap;
    gutter?: GridGutter;
    isWrapped?: boolean;
  };

  const initGrid = async (opts?: InitOptions) => {
    const { childrenSizes = [6, 6, 6], direction = 'row', wrap = 'wrap', gutter = { base: 16, s: 24, m: 36 } } =
      opts ?? {};
    const style = `<style type="text/css">
      p-grid-item > p {
      margin: 0;
      padding: 4px 0;
      text-align: center;
      color: white;
      background-color: lightskyblue;
    }

    p-grid ~ p-grid p {
      margin-top: 4px;
    }
    </style>`;
    const content = `${style}<p-grid style="background: deeppink" direction="${direction}" wrap="${wrap}" gutter="${stringify(
      gutter
    ).replace(/"([^"]+)":/g, '$1:')}">
    ${childrenSizes.map((size, index) => `<p-grid-item size="${size}"><p>${index}</p></p-grid-item>`).join('')}
</p-grid>`;

    await setContentWithDesignSystem(page, content);
  };

  const getGrid = () => selectNode(page, 'p-grid');
  const getGridItems = () => selectNode(page, 'p-grid > p-grid-item');

  const getGridMargin = async () => await getElementStyle(await getGrid(), 'margin');
  const getGridItemPadding = async () => await getElementStyle(await getGridItems(), 'padding');

  fdescribe('handleGutterChange()', () => {
    it('should change margin of grid and update padding of children', async () => {
      await initGrid({ gutter: { base: 16 } });
      const grid = await getGrid();
      expect(await getGridMargin()).toBe('0px -8px', 'should have correct initial margin on grid');
      expect(await getGridItemPadding()).toBe('0px 8px', 'should have correct initial padding on grid-item');

      await setAttribute(grid, 'gutter', '{base: 24}');
      await page.waitForTimeout(JSS_RECALCULATION_DURATION);

      expect(await getGridMargin()).toBe('0px -12px', 'should change margin of grid');
      expect(await getGridItemPadding()).toBe('0px 12px', 'should change padding of grid-item');

      await setAttribute(grid, 'gutter', '{base: 36}');
      await page.waitForTimeout(JSS_RECALCULATION_DURATION);

      expect(await getGridMargin()).toBe('0px -18px', 'should change margin of grid');
      expect(await getGridItemPadding()).toBe('0px 18px', 'should change padding of grid-item');
    });

    it('should correctly handle breakpoints', async () => {
      await page.setViewport({
        width: 450,
        height: 600,
      });
      await initGrid();

      expect(await getGridMargin()).toBe('0px -8px', 'should have correct margin on grid with viewport < s');
      expect(await getGridItemPadding()).toBe('0px 8px', 'should have correct padding on grid-item with viewport < s');

      await page.setViewport({
        width: 800,
        height: 600,
      });

      expect(await getGridMargin()).toBe('0px -12px', 'should adjust margin of grid with viewport < m');
      expect(await getGridItemPadding()).toBe('0px 12px', 'should adjust padding of grid-item with viewport < m');

      await page.setViewport({
        width: 1200,
        height: 600,
      });

      expect(await getGridMargin()).toBe('0px -18px', 'should adjust margin of grid with viewport > m');
      expect(await getGridItemPadding()).toBe('0px 18px', 'should adjust padding of grid-item with viewport > m');
    });
  });
});
