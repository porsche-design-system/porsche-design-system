import * as stencilCore from '@stencil/core';
import { updateChildren } from './sync';

describe('updateChildren()', () => {
  it('should call forceUpdate() on every child', () => {
    const spy = jest.spyOn(stencilCore, 'forceUpdate');

    const host = document.createElement('p-grid');
    const child1 = document.createElement('p-grid-item');
    child1.id = 'child1';
    const child2 = document.createElement('p-grid-item');
    child2.id = 'child2';
    host.appendChild(child1);
    host.appendChild(child2);

    updateChildren(host);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0][0]).toEqual(child1); // toHaveBeenNthCalledWith doesn't work
    expect(spy.mock.calls[1][0]).toEqual(child2);
  });
});
