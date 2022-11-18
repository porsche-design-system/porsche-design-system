import type { TabsItem } from '../tabs-item/tabs-item';
import type { TabsItemInternalHTMLProps } from '../tabs-item/tabs-item-utils';
import type { ThemeExtendedElectric } from '../../../types';
import { syncTabsItemsProps } from './tabs-utils';
import * as stencilCore from '@stencil/core';

describe('syncTabsItemsProps()', () => {
  const host = document.createElement('p-tabs');
  const child1: HTMLElement & TabsItem & TabsItemInternalHTMLProps = document.createElement('div') as any;
  const child2: HTMLElement & TabsItem & TabsItemInternalHTMLProps = document.createElement('div') as any;
  host.append(child1, child2);

  const theme: ThemeExtendedElectric = 'dark';

  it('should set theme property on every item', () => {
    expect(child1.theme).toBeUndefined();

    expect(child2.theme).toBeUndefined();

    syncTabsItemsProps(host, theme);

    expect(child1.theme).toBe(theme);

    expect(child2.theme).toBe(theme);
  });

  it('should call forceUpdate() on every item', () => {
    const spy = jest.spyOn(stencilCore, 'forceUpdate');

    syncTabsItemsProps(host, theme);

    expect(spy).toBeCalledTimes(2);
    expect(spy.mock.calls[0][0]).toEqual(child1); // toHaveBeenNthCalledWith doesn't work
    expect(spy.mock.calls[1][0]).toEqual(child2);
  });
});
