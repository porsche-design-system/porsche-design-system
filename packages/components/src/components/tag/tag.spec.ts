import * as getDirectChildHTMLElementUtils from '../../utils/dom/getDirectChildHTMLElement';
import { Tag } from './tag';
import * as warnIfDeprecatedPropValueIsUsed from '../../utils/log/warnIfDeprecatedPropValueIsUsed';

describe('render', () => {
  it('should call getDirectChildHTMLElement() with correct parameters', () => {
    const spy = jest.spyOn(getDirectChildHTMLElementUtils, 'getDirectChildHTMLElement');
    const component = new Tag();
    component.host = document.createElement('p-tag');
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toBeCalledWith(component.host, 'a,button');
  });

  it('should call warnIfDeprecatedPropValueIsUsed() with correct parameters', () => {
    const spy = jest.spyOn(warnIfDeprecatedPropValueIsUsed, 'warnIfDeprecatedPropValueIsUsed');
    const component = new Tag();
    component.host = document.createElement('p-tag');
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toBeCalledWith(component, 'color', {
      'background-default': 'background-base',
      'neutral-contrast-high': 'primary',
      'notification-neutral': 'notification-info-soft',
      'notification-warning': 'notification-warning-soft',
      'notification-success': 'notification-success-soft',
      'notification-error': 'notification-error-soft',
    });
  });
});
