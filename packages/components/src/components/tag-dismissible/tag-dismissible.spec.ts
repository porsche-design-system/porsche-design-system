import { vi } from 'vitest';
import * as warnIfDeprecatedPropValueIsUsed from '../../utils/log/warnIfDeprecatedPropValueIsUsed';
import { TagDismissible } from './tag-dismissible';

describe('render', () => {
  it('should call warnIfDeprecatedPropValueIsUsed() with correct parameters', () => {
    const spy = vi.spyOn(warnIfDeprecatedPropValueIsUsed, 'warnIfDeprecatedPropValueIsUsed');
    const component = new TagDismissible();
    component.host = document.createElement('p-tag-dismissible');
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toHaveBeenCalledWith(component, 'color', {
      'background-default': 'background-base',
    });
  });
});
