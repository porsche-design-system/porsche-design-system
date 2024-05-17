import { TagDismissible } from './tag-dismissible';
import * as warnIfDeprecatedPropValueIsUsed from '../../utils/log/warnIfDeprecatedPropValueIsUsed';

describe('render', () => {
  it('should call warnIfDeprecatedPropValueIsUsed() with correct parameters', () => {
    const spy = jest.spyOn(warnIfDeprecatedPropValueIsUsed, 'warnIfDeprecatedPropValueIsUsed');
    const component = new TagDismissible();
    component.host = document.createElement('p-tag-dismissible');
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toHaveBeenCalledWith(component, 'color', {
      'background-default': 'background-base',
    });
  });
});
