import { vi } from 'vitest';
import * as getDirectChildHTMLElementUtils from '../../utils/dom/getDirectChildHTMLElement';
import * as warnIfDeprecatedPropValueIsUsed from '../../utils/log/warnIfDeprecatedPropValueIsUsed';
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

  it('should call warnIfDeprecatedPropValueIsUsed() with correct parameters', () => {
    const spy = vi.spyOn(warnIfDeprecatedPropValueIsUsed, 'warnIfDeprecatedPropValueIsUsed');
    const component = new Tag();
    component.host = document.createElement('p-tag');
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toHaveBeenCalledWith(component, 'color', {
      'background-default': 'background-base',
      'neutral-contrast-high': 'primary',
      'notification-neutral': 'notification-info-soft',
      'notification-warning': 'notification-warning-soft',
      'notification-success': 'notification-success-soft',
      'notification-error': 'notification-error-soft',
    });
  });
});
