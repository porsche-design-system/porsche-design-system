import * as validationUtils from '../../../../utils/validation';
import { TagDismissible } from './tag-dismissible';
import { TAG_DISMISSIBLE_COLOR } from './tag-dismissible-utils';

describe('componentWillRender', () => {
  it('should call throwIfValueIsInvalid() with correct parameters', () => {
    const spy = jest.spyOn(validationUtils, 'throwIfValueIsInvalid');
    const component = new TagDismissible();
    component.host = document.createElement('p-tag-dismissible');
    component.host.attachShadow({ mode: 'open' });
    component.color = 'default';
    component.componentWillRender();

    expect(spy).toBeCalledWith('default', TAG_DISMISSIBLE_COLOR, 'color');
  });
});
