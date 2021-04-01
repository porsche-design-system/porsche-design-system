import * as domUtils from '../../../src/utils/dom';
import { GridItem } from '../../../src/components/layout/grid/grid-item/grid-item';

describe('grid-item', () => {
  it('should call throwIfParentIsNotOfKind() via connectedCallback', () => {
    const spy = jest.spyOn(domUtils, 'throwIfParentIsNotOfKind');
    const gridItem = new GridItem();

    expect(spy).toBeCalledTimes(0);

    try {
      gridItem.connectedCallback();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });
});
