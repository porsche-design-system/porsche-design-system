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
  it('should call setScrollLock() with correct parameters if flyout is open', () => {
    const utilsSpy = jest.spyOn(setScrollLockUtils, 'setScrollLock');
    component.open = true;
    component.componentWillRender();

    expect(utilsSpy).toHaveBeenCalledWith(true);
  });

  it('should call setScrollLock() with correct parameters if flyout is not open', () => {
    const utilsSpy = jest.spyOn(setScrollLockUtils, 'setScrollLock');
    component.open = false;
    component.componentWillRender();

    expect(utilsSpy).toHaveBeenCalledWith(false);
  });
});

describe('render', () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'warn').mockImplementation();
  });

  it('should call hasNamedSlot() with correct parameters', () => {
    const hasNamedSlotSpy = jest.spyOn(domUtils, 'hasNamedSlot');
    const header = document.createElement('header');
    header.slot = 'heading';
    component.host.appendChild(header);
    component.render();

    expect(hasNamedSlotSpy).toHaveBeenNthCalledWith(1, component.host, 'header');
    expect(hasNamedSlotSpy).toHaveBeenNthCalledWith(2, component.host, 'footer');
    expect(hasNamedSlotSpy).toHaveBeenNthCalledWith(3, component.host, 'sub-footer');
    expect(hasNamedSlotSpy).toHaveBeenCalledTimes(3);
  });
});

describe('disconnectedCallback', () => {
  it('should call setScrollLock() with correct parameters', () => {
    const utilsSpy = jest.spyOn(setScrollLockUtils, 'setScrollLock');
    component.open = true;
    component.disconnectedCallback(); // component gets removed from dom

    expect(utilsSpy).toHaveBeenCalledWith(false);
  });
});
