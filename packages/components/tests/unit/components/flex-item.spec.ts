import * as domUtils from '../../../src/utils/dom';
import { FlexItem } from '../../../src/components/layout/flex/flex-item/flex-item';

describe('flex-item', () => {
  it('should call throwIfParentIsNotOfKind() via connectedCallback', () => {
    const spy = jest.spyOn(domUtils, 'throwIfParentIsNotOfKind');
    const flexItem = new FlexItem();

    expect(spy).toBeCalledTimes(0);

    try {
      flexItem.connectedCallback();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });
});
