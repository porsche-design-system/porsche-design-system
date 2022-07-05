import * as domUtils from '../../../utils/dom';
import { CheckboxWrapper } from './checkbox-wrapper';

jest.mock('../../../utils/dom');
jest.mock('../../../utils/slotted-styles');

describe('componentWillLoad', () => {
  it('should call getHTMLElementAndThrowIfUndefined() with correct parameters', () => {
    const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
    const component = new CheckboxWrapper();
    try {
      component.componentWillLoad();
    } catch (e) {}

    expect(spy).toBeCalledWith(undefined, 'input[type="checkbox"]');
  });
});
