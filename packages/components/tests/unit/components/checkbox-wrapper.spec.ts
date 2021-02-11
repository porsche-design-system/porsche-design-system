import * as functions from '../../../src/utils/dom';
import { CheckboxWrapper } from '../../../src/components/form/checkbox-wrapper/checkbox-wrapper';

describe('checkbox-wrapper', () => {
  it('should call function getHTMLElementAndThrowIfUndefined', () => {
    const spy = jest.spyOn(functions, 'getHTMLElementAndThrowIfUndefined');
    const checkbox = new CheckboxWrapper();
    try {
      checkbox.connectedCallback();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });
});
