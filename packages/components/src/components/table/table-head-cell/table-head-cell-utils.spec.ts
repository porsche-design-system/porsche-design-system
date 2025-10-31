import { vi } from 'vitest';
import type { AriaAttributes } from '../../../types';
import type { Direction, TableHeadCellSort } from '../table/table-utils';
import * as tableUtils from './table-head-cell-utils';

describe('isDirectionAsc()', () => {
  it('should return true for "asc"', () => {
    expect(tableUtils.isDirectionAsc('asc')).toBe(true);
  });

  it('should return false for "desc"', () => {
    expect(tableUtils.isDirectionAsc('desc')).toBe(false);
  });
});

describe('toggleDirection()', () => {
  it('should return "asc" for "desc"', () => {
    expect(tableUtils.toggleDirection('asc')).toBe('desc');
  });

  it('should return "desc" for "asc"', () => {
    expect(tableUtils.toggleDirection('desc')).toBe('asc');
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
    expect(tableUtils.getAriaSort(params)).toBe(result);
  });
});

describe('createSortedEventInitDictDetail()', () => {
  const activeSort: TableHeadCellSort = { id: '1', active: true, direction: 'asc' };
  const inactiveSort: TableHeadCellSort = { id: '1', active: false, direction: 'asc' };

  it('should call toggleDirection() when active', () => {
    const spy = vi.spyOn(tableUtils.internalTHCell, 'toggleDirection');
    tableUtils.createSortedEventInitDictDetail(activeSort);
    expect(spy).toHaveBeenCalledWith('asc');
  });

  it('should not call toggleDirection() when not active', () => {
    const spy = vi.spyOn(tableUtils.internalTHCell, 'toggleDirection');
    tableUtils.createSortedEventInitDictDetail(inactiveSort);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should return correct eventInitDict when active', () => {
    expect(tableUtils.createSortedEventInitDictDetail(activeSort)).toEqual({
      bubbles: true,
      detail: { id: '1', active: true, direction: 'desc' },
    });
  });

  it('should return correct eventInitDict when not active', () => {
    expect(tableUtils.createSortedEventInitDictDetail(inactiveSort)).toEqual({
      bubbles: true,
      detail: { id: '1', active: true, direction: 'asc' },
    });
  });
});

describe('isSortable()', () => {
  const data: [boolean, Direction, boolean][] = [
    [undefined, undefined, false],
    [undefined, 'asc', false],
    [undefined, 'desc', false],
    [false, undefined, false],
    [true, undefined, false],
    [false, 'asc', true],
    [false, 'desc', true],
    [true, 'asc', true],
    [true, 'desc', true],
  ];
  it.each(data)('should for active: %s and direction: %s return %s', (active, direction, result) => {
    expect(tableUtils.isSortable(active, direction)).toBe(result);
  });
});
