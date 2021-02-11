import * as functions from '../../../src/utils/dom';
import { SelectWrapper } from '../../../src/components/form/select-wrapper/select-wrapper';

describe('should call function', () => {
  it('getHTMLElementAndThrowIfUndefined', () => {
    const spy = jest.spyOn(functions, 'getHTMLElementAndThrowIfUndefined');
    const select = new SelectWrapper();
    try {
      select.connectedCallback();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });
});
