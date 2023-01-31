import * as getDirectChildHTMLElementUtils from '../../utils/dom/getDirectChildHTMLElement';
import { Tag } from './tag';
import * as TagUtils from './tag-utils';

describe('render', () => {
  it('should call getDirectChildHTMLElement() with correct parameters', () => {
    const spy = jest.spyOn(getDirectChildHTMLElementUtils, 'getDirectChildHTMLElement');
    const component = new Tag();
    component.host = document.createElement('p-tag');
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toBeCalledWith(component.host, 'a,button');
  });

  it('should call warnIfColorNotificationNeutralIsUsed() with correct parameters', () => {
    const spy = jest.spyOn(TagUtils, 'warnIfColorNotificationNeutralIsUsed');
    const component = new Tag();
    component.host = document.createElement('p-tag');
    component.color = 'notification-neutral';
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toBeCalledWith(component.host, 'notification-neutral');
  });

  it('should call warnIfColorNeutralContrastHighIsUsed() with correct parameters', () => {
    const spy = jest.spyOn(TagUtils, 'warnIfColorNeutralContrastHighIsUsed');
    const component = new Tag();
    component.host = document.createElement('p-tag');
    component.color = 'neutral-contrast-high';
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toBeCalledWith(component.host, 'neutral-contrast-high');
  });

  it('should call warnIfColorBackgroundDefaultIsUsed() with correct parameters', () => {
    const spy = jest.spyOn(TagUtils, 'warnIfColorBackgroundDefaultIsUsed');
    const component = new Tag();
    component.host = document.createElement('p-tag');
    component.color = 'background-default';
    component.host.attachShadow({ mode: 'open' });

    component.render();

    expect(spy).toBeCalledWith(component.host, 'background-default');
  });
});
