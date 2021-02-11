import * as functions from '../../../src/utils/dom';
import { TextareaWrapper } from '../../../src/components/form/textarea-wrapper/textarea-wrapper';

describe('should call function', () => {
  it('getHTMLElementAndThrowIfUndefined', () => {
    const spy = jest.spyOn(functions, 'getHTMLElementAndThrowIfUndefined');
    const textarea = new TextareaWrapper();
    try {
      textarea.connectedCallback();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });
});
