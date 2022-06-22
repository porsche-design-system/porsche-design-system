import * as throwIfValueIsInvalidUtils from '../../../utils/validation/throwIfValueIsInvalid';
import { TagDismissible } from './tag-dismissible';
import { TAG_DISMISSIBLE_COLORS } from './tag-dismissible-utils';

describe('componentWillRender', () => {
  it('should call throwIfValueIsInvalid() with correct parameters', () => {
    const spy = jest.spyOn(throwIfValueIsInvalidUtils, 'throwIfValueIsInvalid');
    const component = new TagDismissible();
    component.host = document.createElement('p-tag-dismissible');
    component.host.attachShadow({ mode: 'open' });
    component.color = 'background-default';
    component.componentWillRender();

    expect(spy).toBeCalledWith('background-default', TAG_DISMISSIBLE_COLORS, 'color');
  });
});
