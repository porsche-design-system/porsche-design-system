import { vi } from 'vitest';
import * as getDirectChildHTMLElementUtils from '../../utils/dom/getDirectChildHTMLElement';
import { Tag } from './tag';

describe('render', () => {
  it('should call getDirectChildHTMLElement() with correct parameters', () => {
    const spy = vi.spyOn(getDirectChildHTMLElementUtils, 'getDirectChildHTMLElement');
    const component = new Tag();
    component.host = document.createElement('p-tag');
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toHaveBeenCalledWith(component.host, 'a,button');
  });
});
