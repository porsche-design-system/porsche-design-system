import * as domUtils from '../../../src/utils/dom';
import { SelectWrapper } from '../../../src/components/form/select-wrapper/select-wrapper';

describe('select-wrapper', () => {
  it('should call getHTMLElementAndThrowIfUndefined() via connectedCallback', () => {
    const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
    const select = new SelectWrapper();
    try {
      select.connectedCallback();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });
});
