import * as getDirectChildHTMLElementUtils from '../../../../utils/dom/getDirectChildHTMLElement';
import * as validationUtils from '../../../../utils/validation';
import { TagStatus } from './tag-status';
import { TAG_STATUS_COLORS } from './tag-status-utils';

describe('componentWillRender', () => {
  it('should call getDirectChildHTMLElement() with correct parameters', () => {
    const spy = jest.spyOn(getDirectChildHTMLElementUtils, 'getDirectChildHTMLElement');
    const component = new TagStatus();
    component.host = document.createElement('p-tag-status');
    // pseudo-class selector ':scope>*' is missing in jsdom
    try {
      component.componentWillRender();
    } catch {}

    expect(spy).toBeCalledWith(component.host, 'a,button');
  });

  it('should call throwIfValueIsInvalid() with correct parameters', () => {
    const spy = jest.spyOn(validationUtils, 'throwIfValueIsInvalid');
    const component = new TagStatus();
    component.host = document.createElement('p-tag-status');
    component.host.attachShadow({ mode: 'open' });
    component.color = 'background-default';
    // pseudo-class selector ':scope>*' is missing in jsdom
    try {
      component.componentWillRender();
    } catch {}

    expect(spy).toBeCalledWith('default', TAG_STATUS_COLORS, 'color');
  });
});
