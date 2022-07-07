import * as getDirectChildHTMLElementUtils from '../../../utils/dom/getDirectChildHTMLElement';
import * as throwIfValueIsInvalidUtils from '../../../utils/validation/throwIfValueIsInvalid';
import { Tag } from './tag';
import { TAG_COLORS } from './tag-utils';

describe('componentWillRender', () => {
  it('should call getDirectChildHTMLElement() with correct parameters', () => {
    const spy = jest.spyOn(getDirectChildHTMLElementUtils, 'getDirectChildHTMLElement');
    const component = new Tag();
    component.host = document.createElement('p-tag');
    component.host.attachShadow({ mode: 'open' });

    component.componentWillRender();

    expect(spy).toBeCalledWith(component.host, 'a,button');
  });

  it('should call throwIfValueIsInvalid() with correct parameters', () => {
    const spy = jest.spyOn(throwIfValueIsInvalidUtils, 'throwIfValueIsInvalid');
    const component = new Tag();
    component.host = document.createElement('p-tag');
    component.host.attachShadow({ mode: 'open' });
    component.color = 'background-default';

    component.componentWillRender();

    expect(spy).toBeCalledWith('background-default', TAG_COLORS, 'color');
  });
});
