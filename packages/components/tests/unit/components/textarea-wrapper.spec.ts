import * as domUtils from '../../../src/utils/dom';
import { TextareaWrapper } from '../../../src/components/form/textarea-wrapper/textarea-wrapper';

describe('textarea-wrapper', () => {
  it('should call getHTMLElementAndThrowIfUndefined() via connectedCallback', () => {
    const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
    const textarea = new TextareaWrapper();
    try {
      textarea.connectedCallback();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });
});
