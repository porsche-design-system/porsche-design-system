import { vi } from 'vitest';
import * as dialogUtils from '../../utils/dialog/dialog';
import * as warnIfAriaAndHeadingPropsAreUndefined from '../../utils/log/warnIfAriaAndHeadingPropsAreUndefined';
import * as setScrollLockUtils from '../../utils/setScrollLock';
import { Sheet } from './sheet';

vi.mock('../../utils/dom');

let component: Sheet;

beforeEach(() => {
  component = new Sheet();
  component.host = document.createElement('p-sheet');
  component.host.attachShadow({ mode: 'open' });
  component['dialog'] = document.createElement('dialog');
});

describe('componentWillRender', () => {
  it('should call setScrollLock() with correct parameters if dialog is open', () => {
    const utilsSpy = vi.spyOn(setScrollLockUtils, 'setScrollLock');
    component.open = true;
    component.componentWillRender();

    expect(utilsSpy).toHaveBeenCalledWith(true);
  });

  it('should call setScrollLock() with correct parameters if dialog is not open', () => {
    const utilsSpy = vi.spyOn(setScrollLockUtils, 'setScrollLock');
    component.open = false;
    component.componentWillRender();

    expect(utilsSpy).toHaveBeenCalledWith(false);
  });
});

describe('componentDidRender', () => {
  it('should call showDialog() with correct parameters when open', () => {
    const showDialogSpy = vi.spyOn(dialogUtils, 'showDialog').mockReturnValueOnce();
    component.open = true;
    component.componentDidRender();

    expect(showDialogSpy).toHaveBeenCalledWith(component['dialog'], component['scroller']);
  });

  it('should not call showDialog() when closed', () => {
    const showDialogSpy = vi.spyOn(dialogUtils, 'showDialog').mockReturnValueOnce();
    component.open = false;
    component.componentDidRender();

    expect(showDialogSpy).not.toHaveBeenCalled();
  });
});

describe('disconnectedCallback', () => {
  it('should call setScrollLock() with correct parameters', () => {
    const utilsSpy = vi.spyOn(setScrollLockUtils, 'setScrollLock');
    component.open = true;
    component.disconnectedCallback(); // component gets removed from dom

    expect(utilsSpy).toHaveBeenCalledWith(false);
  });
});

describe('render', () => {
  beforeEach(() => {
    vi.spyOn(global.console, 'warn').mockImplementation(() => {});
  });

  it('should call warnIfAriaAndHeadingPropsAreUndefined() with correct parameters when open="true"', () => {
    const warnIfAriaAndHeadingPropsAreUndefinedSpy = vi.spyOn(
      warnIfAriaAndHeadingPropsAreUndefined,
      'warnIfAriaAndHeadingPropsAreUndefined'
    );
    component.open = true;
    component.aria = {};
    component.render();

    expect(warnIfAriaAndHeadingPropsAreUndefinedSpy).toHaveBeenCalledWith(component.host, undefined, component.aria);
  });

  it('should not call warnIfAriaAndHeadingPropsAreUndefined() when open="false"', () => {
    const warnIfAriaAndHeadingPropsAreUndefinedSpy = vi.spyOn(
      warnIfAriaAndHeadingPropsAreUndefined,
      'warnIfAriaAndHeadingPropsAreUndefined'
    );
    component.open = false;
    component.render();

    expect(warnIfAriaAndHeadingPropsAreUndefinedSpy).not.toHaveBeenCalled();
  });
});

describe('dismissDialog', () => {
  it('should emit dismiss event', () => {
    const emitMock = vi.fn();
    component.dismiss = { emit: emitMock } as any;
    component['dismissDialog']();

    expect(emitMock).toHaveBeenCalledWith();
  });
});

