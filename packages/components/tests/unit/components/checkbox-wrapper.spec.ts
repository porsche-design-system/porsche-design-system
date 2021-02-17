import * as domUtils from '../../../src/utils/dom';
import { CheckboxWrapper } from '../../../src/components/form/checkbox-wrapper/checkbox-wrapper';

describe('checkbox-wrapper', () => {
  it('should call getHTMLElementAndThrowIfUndefined() via connectedCallback', () => {
    const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
    const checkbox = new CheckboxWrapper();
    try {
      checkbox.componentWillLoad();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });
});
