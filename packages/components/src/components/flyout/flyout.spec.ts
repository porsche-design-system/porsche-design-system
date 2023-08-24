import { Flyout } from './flyout';
import * as focusTrapUtils from '../../utils/focusTrap';
import * as scrollLock from '../../utils/scrollLock';
import * as domUtils from '../../utils/dom';
import { FirstAndLastFocusableElement } from '../../utils/focusTrap';

jest.mock('../../utils/dom');

let component: Flyout;

beforeEach(() => {
  component = new Flyout();
  component.host = document.createElement('p-flyout');
  component.host.attachShadow({ mode: 'open' });
  component['closeBtn'] = document.createElement('button');
});

describe('componentDidLoad', () => {
  const focusableElements: FirstAndLastFocusableElement = [
    document.createElement('button'),
    document.createElement('button'),
  ];

  beforeEach(() => {
    jest.spyOn(focusTrapUtils, 'getFirstAndLastFocusableElement').mockImplementation(() => focusableElements);
    jest.spyOn(domUtils, 'getShadowRootHTMLElement').mockImplementation(() => document.createElement('slot'));
  });

  it('should call setFocusTrap() with correct parameters if flyout is open', () => {
    const utilsSpy = jest.spyOn(focusTrapUtils, 'setFocusTrap');
    component.open = true;
    component.componentDidLoad();

    expect(utilsSpy).toBeCalledWith(component.host, true, component['dismissBtn'], component['dismissFlyout']);
  });

  it('should call setScrollLock() with correct parameters if flyout is open', () => {
    const utilsSpy = jest.spyOn(scrollLock, 'setScrollLock');
    component.open = true;
    component.componentDidLoad();

    expect(utilsSpy).toBeCalledWith(true);
  });

  it('should not call setScrollLock() if flyout is not open', () => {
    const utilsSpy = jest.spyOn(scrollLock, 'setScrollLock');
    component.componentDidLoad();

    expect(utilsSpy).not.toBeCalled();
  });
});

describe('disconnectedCallback', () => {
  it('should call setFocusTrap() with correct parameters', () => {
    const utilsSpy = jest.spyOn(focusTrapUtils, 'setFocusTrap');
    component.disconnectedCallback();

    expect(utilsSpy).toBeCalledWith(component.host, false);
  });

  it('should call setScrollLock() with correct parameters', () => {
    const utilsSpy = jest.spyOn(scrollLock, 'setScrollLock');
    component.disconnectedCallback();

    expect(utilsSpy).toBeCalledWith(false);
  });
});
