import type { TabsItemInternalHTMLProps } from '../tabs-item/tabs-item-utils';
import type { Theme } from '../../../types';
import { syncTabsItemsProps } from './tabs-utils';
import * as stencilCore from '@stencil/core';

describe('syncTabsItemsProps()', () => {
  const child1: HTMLPTabsItemElement & TabsItemInternalHTMLProps = document.createElement('div') as any;
  const child2: HTMLPTabsItemElement & TabsItemInternalHTMLProps = document.createElement('div') as any;
  const children = [child1, child2];

  const theme: Theme = 'dark';

  it('should set theme property on every item', () => {
    expect(child1.theme).toBeUndefined();
    expect(child2.theme).toBeUndefined();

    syncTabsItemsProps(children, theme);

    expect(child1.theme).toBe(theme);
    expect(child2.theme).toBe(theme);
  });

  it('should call forceUpdate() on every item', () => {
    const spy = jest.spyOn(stencilCore, 'forceUpdate');

    syncTabsItemsProps(children, theme);

    expect(spy).toBeCalledTimes(2);
    expect(spy.mock.calls[0][0]).toEqual(child1); // toHaveBeenNthCalledWith doesn't work
    expect(spy.mock.calls[1][0]).toEqual(child2);
  });
});
