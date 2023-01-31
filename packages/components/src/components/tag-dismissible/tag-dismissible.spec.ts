import * as TagUtils from '../tag/tag-utils';
import { TagDismissible } from './tag-dismissible';

describe('render', () => {
  it('should call warnIfColorBackgroundDefaultIsUsed() with correct parameters', () => {
    const spy = jest.spyOn(TagUtils, 'warnIfColorBackgroundDefaultIsUsed');
    const component = new TagDismissible();
    component.host = document.createElement('p-tag-dismissible');
    component.color = 'background-default';
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toBeCalledWith(component.host, 'background-default');
  });
});
