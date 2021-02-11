import * as functions from '../../../src/utils/dom';
import { TextFieldWrapper } from '../../../src/components/form/text-field-wrapper/text-field-wrapper';

describe('should call function', () => {
  it('getHTMLElementAndThrowIfUndefined', () => {
    const spy = jest.spyOn(functions, 'getHTMLElementAndThrowIfUndefined');
    const textField = new TextFieldWrapper();
    try {
      textField.connectedCallback();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });
});
