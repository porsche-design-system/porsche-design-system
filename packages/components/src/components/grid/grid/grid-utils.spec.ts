import type { GridItem } from '../grid-item/grid-item';
import type { GridItemInternalHTMLProps } from '../grid-item/grid-item-utils';
import type { GridGutter } from './grid-utils';
import { syncGridItemsProps } from './grid-utils';
import * as stencilCore from '@stencil/core';

describe('syncGridItemsProps()', () => {
  const host = document.createElement('p-grid');
  const child1: HTMLElement & GridItem & GridItemInternalHTMLProps = document.createElement('div') as any;
  const child2: HTMLElement & GridItem & GridItemInternalHTMLProps = document.createElement('div') as any;
  host.append(child1, child2);

  const gutter: GridGutter = 16;

  it('should set gutter property on every item', () => {
    expect(child1.gutter).toBeUndefined();

    expect(child2.gutter).toBeUndefined();

    syncGridItemsProps(host, gutter);

    expect(child1.gutter).toBe(gutter);

    expect(child2.gutter).toBe(gutter);
  });

  it('should call forceUpdate() on every item', () => {
    const spy = jest.spyOn(stencilCore, 'forceUpdate');

    syncGridItemsProps(host, gutter);

    expect(spy).toBeCalledTimes(2);
    expect(spy.mock.calls[0][0]).toEqual(child1); // toHaveBeenNthCalledWith doesn't work
    expect(spy.mock.calls[1][0]).toEqual(child2);
  });
});
