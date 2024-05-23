import { Flyout } from './flyout';
import * as setScrollLockUtils from '../../utils/setScrollLock';
import * as domUtils from '../../utils/dom';

jest.mock('../../utils/dom');

let component: Flyout;

beforeEach(() => {
  component = new Flyout();
  component.host = document.createElement('p-flyout');
  component.host.attachShadow({ mode: 'open' });
});

describe('componentWillRender', () => {
  beforeEach(() => {
    jest.spyOn(domUtils, 'getShadowRootHTMLElement').mockImplementation(() => document.createElement('slot'));

    const slotElement = document.createElement('slot');
    const slotNodeList = document.createElement('div').appendChild(slotElement).parentNode.querySelectorAll('slot');

    jest.spyOn(domUtils, 'getShadowRootHTMLElements').mockImplementation(() => slotNodeList);
  });

  it('should call setScrollLock() with correct parameters if flyout is open', () => {
    const utilsSpy = jest.spyOn(setScrollLockUtils, 'setScrollLock');
    component.open = true;
    component.componentWillRender();

    expect(utilsSpy).toHaveBeenCalledWith(true);
  });

  it('should call setScrollLock() with correct parameters if flyout is not open', () => {
    const utilsSpy = jest.spyOn(setScrollLockUtils, 'setScrollLock');
    component.componentWillRender();

    expect(utilsSpy).toHaveBeenCalledWith(false);
  });
});

describe('disconnectedCallback', () => {
  it('should call setScrollLock() with correct parameters', () => {
    const utilsSpy = jest.spyOn(setScrollLockUtils, 'setScrollLock');
    component.disconnectedCallback();

    expect(utilsSpy).toHaveBeenCalledWith(false);
  });
});
