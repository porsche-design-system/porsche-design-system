import * as domUtils from '../../../utils/dom';
import { RadioButtonWrapper } from './radio-button-wrapper';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

describe('componentWillLoad', () => {
  it('should call getHTMLElementAndThrowIfUndefined() with correct parameters', () => {
    const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
    const component = new RadioButtonWrapper();
    try {
      component.componentWillLoad();
    } catch (e) {}

    expect(spy).toBeCalledWith(undefined, 'input[type="radio"]');
  });
});
