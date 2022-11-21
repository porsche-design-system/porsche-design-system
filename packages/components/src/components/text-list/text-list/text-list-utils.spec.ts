import type { TextListItem } from '../text-list-item/text-list-item';
import type { TextListItemInternalHTMLProps } from '../text-list-item/text-list-item-utils';
import type { ListType, OrderType } from './text-list-utils';
import { syncTextListItemsProps } from './text-list-utils';
import * as stencilCore from '@stencil/core';

describe('syncTextListItemsProps()', () => {
  const host = document.createElement('p-text-list');
  const child1: HTMLElement & TextListItem & TextListItemInternalHTMLProps = document.createElement('div') as any;
  const child2: HTMLElement & TextListItem & TextListItemInternalHTMLProps = document.createElement('div') as any;
  host.append(child1, child2);

  const listType: ListType = 'ordered';
  const orderType: OrderType = 'numbered';

  it('should set listType and orderType property on every item', () => {
    expect(child1.listType).toBeUndefined();
    expect(child1.orderType).toBeUndefined();

    expect(child2.listType).toBeUndefined();
    expect(child2.orderType).toBeUndefined();

    syncTextListItemsProps(host, listType, orderType);

    expect(child1.listType).toBe(listType);
    expect(child1.orderType).toBe(orderType);

    expect(child2.listType).toBe(listType);
    expect(child2.orderType).toBe(orderType);
  });

  it('should call forceUpdate() on every item', () => {
    const spy = jest.spyOn(stencilCore, 'forceUpdate');

    syncTextListItemsProps(host, listType, orderType);

    expect(spy).toBeCalledTimes(2);
    expect(spy.mock.calls[0][0]).toEqual(child1); // toHaveBeenNthCalledWith doesn't work
    expect(spy.mock.calls[1][0]).toEqual(child2);
  });
});
