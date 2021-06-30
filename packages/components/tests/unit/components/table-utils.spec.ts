import {
  createSortedEventInitDictDetail,
  getAriaSort,
  getSlottedCss,
  getTableCss,
  isDirectionAsc,
  TABLE_COMPONENTS,
  TableHeadCellSort,
  toggleDirection,
} from '../../../src/components/layout/table/table-utils';
import * as tableUtils from '../../../src/components/layout/table/table-utils';
import { AriaAttributes } from 'react';

describe('isDirectionAsc()', () => {
  it('should return true for "asc"', () => {
    expect(isDirectionAsc('asc')).toBe(true);
  });

  it('should return false for "desc"', () => {
    expect(isDirectionAsc('desc')).toBe(false);
  });
});

describe('toggleDirection()', () => {
  it('should return "asc" for "desc"', () => {
    expect(toggleDirection('asc')).toBe('desc');
  });

  it('should return "desc" for "asc"', () => {
    expect(toggleDirection('desc')).toBe('asc');
  });
});

describe('getAriaSort()', () => {
  const data: [TableHeadCellSort, AriaAttributes['aria-sort']][] = [
    [{ id: 'some-id', active: false, direction: 'asc' }, null],
    [{ id: 'some-id', active: false, direction: 'desc' }, null],
    [{ id: 'some-id', active: true, direction: 'asc' }, 'ascending'],
    [{ id: 'some-id', active: true, direction: 'desc' }, 'descending'],
    [undefined, null],
    [{} as TableHeadCellSort, null],
  ];
  it.each(data)('should for %s return %s', (params, result) => {
    expect(getAriaSort(params)).toBe(result);
  });
});

describe('getSlottedCss()', () => {
  it('should return correct css', () => {
    const host = document.createElement('p-table');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });

  it('should return correct css with prefix', () => {
    const host = document.createElement('prefixed-p-table');
    expect(getSlottedCss(host)).toMatchSnapshot();
  });
});

describe('getTableCss()', () => {
  it.each(TABLE_COMPONENTS.map((component) => `p-${component}`))(
    'should return correct css for component: %s',
    (tableComponent) => {
      const host = document.createElement(tableComponent);
      expect(getTableCss(host)).toMatchSnapshot();
    }
  );

  it.each(TABLE_COMPONENTS.map((component) => `prefixed-p-${component}`))(
    'should return correct css for component with prefix: %s',
    (tableComponent) => {
      const host = document.createElement(tableComponent);
      expect(getTableCss(host)).toMatchSnapshot();
    }
  );
});

describe('createSortedEventInitDictDetail()', () => {
  const activeSort: TableHeadCellSort = { id: '1', active: true, direction: 'asc' };
  const inactiveSort: TableHeadCellSort = { id: '1', active: false, direction: 'asc' };

  it('should call toggleDirection()', () => {
    const spy = jest.spyOn(tableUtils, 'toggleDirection');
    createSortedEventInitDictDetail(activeSort);
    expect(spy).toBeCalledWith('asc');
  });

  it('should return correct eventInitDict when active', () => {
    expect(createSortedEventInitDictDetail(activeSort)).toEqual({
      bubbles: true,
      detail: { id: '1', active: true, direction: 'desc' },
    });
  });

  it('should return correct eventInitDict when not active', () => {
    expect(createSortedEventInitDictDetail(inactiveSort)).toEqual({
      bubbles: true,
      detail: { id: '1', active: true, direction: 'desc' },
    });
  });
});
