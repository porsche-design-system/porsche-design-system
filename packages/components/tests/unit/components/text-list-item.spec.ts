import * as domUtils from '../../../src/utils/dom';
import { TextListItem } from '../../../src/components/content/text-list/text-list-item/text-list-item';

describe('text-list-item', () => {
  it('should call throwIfParentIsNotOfKind() via connectedCallback', () => {
    const spy = jest.spyOn(domUtils, 'throwIfParentIsNotOfKind');
    const textListItem = new TextListItem();

    expect(spy).toBeCalledTimes(0);

    try {
      textListItem.connectedCallback();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });
});
