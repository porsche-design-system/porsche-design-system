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

    expect(spy).toBeCalledWith(component.host, 'color', {
      'notification-neutral': 'notification-info',
      'neutral-contrast-high': 'primary',
      'background-default': 'background-base',
    });
  });
});
