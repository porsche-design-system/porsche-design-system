import * as getDirectChildHTMLElementUtils from '../../../../utils/dom/getDirectChildHTMLElement';
import { TagStatus } from './tag-status';

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
});
