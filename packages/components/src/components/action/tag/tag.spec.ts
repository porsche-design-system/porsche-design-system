import * as getDirectChildHTMLElementUtils from '../../../utils/dom/getDirectChildHTMLElement';
import * as validationUtils from '../../../utils/validation';
import { Tag } from './tag';
import { TAG_COLORS } from './tag-utils';

describe('componentWillRender', () => {
  it('should call getDirectChildHTMLElement() with correct parameters', () => {
    const spy = jest.spyOn(getDirectChildHTMLElementUtils, 'getDirectChildHTMLElement');
    const component = new Tag();
    component.host = document.createElement('p-tag');
    // pseudo-class selector ':scope>*' is missing in jsdom
    try {
      component.componentWillRender();
    } catch {}

    expect(spy).toBeCalledWith(component.host, 'a,button');
  });

  it('should call throwIfValueIsInvalid() with correct parameters', () => {
    const spy = jest.spyOn(validationUtils, 'throwIfValueIsInvalid');
    const component = new Tag();
    component.host = document.createElement('p-tag');
    component.host.attachShadow({ mode: 'open' });
    component.color = 'background-default';
    // pseudo-class selector ':scope>*' is missing in jsdom
    try {
      component.componentWillRender();
    } catch {}

    expect(spy).toBeCalledWith('background-default', TAG_COLORS, 'color');
  });
});
