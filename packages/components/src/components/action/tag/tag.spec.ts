import * as getDirectChildHTMLElementUtils from '../../../utils/dom/getDirectChildHTMLElement';
import { Tag } from './tag';

describe('componentWillRender', () => {
  it('should call getDirectChildHTMLElement() with correct parameters', () => {
    const spy = jest.spyOn(getDirectChildHTMLElementUtils, 'getDirectChildHTMLElement');
    const component = new Tag();
    component.host = document.createElement('p-tag');
    component.host.attachShadow({ mode: 'open' });

    component.componentWillRender();

    expect(spy).toBeCalledWith(component.host, 'a,button');
  });
});
