import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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

describe('body scroll lock', () => {
  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('should lock body scrolling while open', () => {
    component.open = true;
    component.componentWillRender();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should unlock body scrolling when closed', () => {
    component.open = true;
    component.componentWillRender();
    component.open = false;
    component.componentWillRender();
    expect(document.body.style.overflow).toBe('');
  });

  it('should unlock body scrolling when removed from the DOM while open', () => {
    component.open = true;
    component.componentWillRender();
    component.disconnectedCallback();
    expect(document.body.style.overflow).toBe('');
  });
});

describe('native dialog control', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  const stubDialog = (): HTMLDialogElement => {
    const dialog = component['dialog'];
    dialog.showModal = vi.fn(() => {
      dialog.open = true;
    });
    dialog.close = vi.fn(() => {
      dialog.open = false;
    });
    dialog.focus = vi.fn();
    component['scroller'] = document.createElement('div');
    component['scroller'].scrollTo = vi.fn();
    return dialog;
  };

  it('should show the native dialog exactly once while open', () => {
    const dialog = stubDialog();
    component.open = true;

    component.componentDidRender();
    component.componentDidRender();

    expect(dialog.showModal).toHaveBeenCalledTimes(1);
  });

  it('should close the native dialog when open becomes false', () => {
    vi.useFakeTimers();
    const dialog = stubDialog();
    component.open = true;
    component.componentDidRender();
    component.open = false;

    component.componentDidRender();
    vi.runAllTimers();

    expect(dialog.close).toHaveBeenCalledTimes(1);
  });
});

