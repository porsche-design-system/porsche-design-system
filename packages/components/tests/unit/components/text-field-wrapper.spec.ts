import * as domUtils from '../../../src/utils/dom';
import { TextFieldWrapper } from '../../../src/components/form/text-field-wrapper/text-field-wrapper';

describe('text-field-wrapper', () => {
  it('should call getHTMLElementAndThrowIfUndefined() via componentWillLoad', () => {
    const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
    const textField = new TextFieldWrapper();
    try {
      textField.componentWillLoad();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });
});
