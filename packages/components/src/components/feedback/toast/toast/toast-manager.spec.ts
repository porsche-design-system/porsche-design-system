import { ToastManager, ToastManagerClass } from './toast-manager';
import { ToastState } from './toast-utils';
import * as stencilCore from '@stencil/core';

let toastManager: ToastManager;
const dismissCallbackFunction = jest.fn();

beforeEach(() => {
  toastManager = new ToastManagerClass();
});

describe('register()', () => {
  const toastElement = document.createElement('p-toast');

  it('should throw if toastEl is already defined', () => {
    expect(() => {
      toastManager.register(toastElement, dismissCallbackFunction);
    }).not.toThrow();

    expect(() => {
      toastManager.register(toastElement, dismissCallbackFunction);
    }).toThrowErrorMatchingInlineSnapshot('"<p-toast> was rendered multiple times."');
  });

  it('should set private members', () => {
    toastManager.register(toastElement, dismissCallbackFunction);
    expect(toastManager['toastEl']).toBeDefined();
    expect(toastManager['onDismissCallback']).toBe(dismissCallbackFunction);
  });
});

describe('addMessage()', () => {
  const toastElement = document.createElement('p-toast');
  beforeEach(() => {
    toastManager.register(toastElement, dismissCallbackFunction);
  });

  it('should throw if no toastEl reference is set', () => {
    toastManager.unregister();
    expect(() => {
      toastManager.addMessage({ text: 'Some Message' });
    }).toThrowErrorMatchingInlineSnapshot('"Missing <p-toast> element."');
  });

  it('should throw if no text was provided', () => {
    expect(() => {
      toastManager.addMessage({ text: '' });
    }).toThrowErrorMatchingInlineSnapshot('"Empty text provided to addMessage."');
  });

  it('should set message state to neutral if none was provided', () => {
    toastManager.addMessage({ text: 'Some Message' });
    expect(toastManager['messages'][0]).toEqual({ text: 'Some Message', state: 'neutral' });
  });

  it('should throw if an invalid message state was provided', () => {
    expect(() => {
      toastManager.addMessage({ text: 'Some Message', state: 'wonky' as ToastState });
    }).toThrowErrorMatchingSnapshot();
  });

  it('should add messages to messages array', () => {
    toastManager.addMessage({ text: 'Some Message One' });
    toastManager.addMessage({ text: 'Some Message Two', state: 'success' });
    expect(toastManager['messages']).toEqual([
      { text: 'Some Message One', state: 'neutral' },
      { text: 'Some Message Two', state: 'success' },
    ]);
  });

  it('should force update if first element was added to messages array', () => {
    const spy = jest.spyOn(stencilCore, 'forceUpdate');
    toastManager.addMessage({ text: 'Some Message One' });
    expect(spy).toHaveBeenCalledWith(toastElement);

    toastManager.addMessage({ text: 'Some Message One' });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).not.toHaveBeenCalledTimes(2);
  });
});

describe('dismissToastItem()', () => {
  const toastElement = document.createElement('p-toast');
  const dismissCallbackFunction = jest.fn();

  beforeEach(() => {
    toastManager.register(toastElement, dismissCallbackFunction);
  });

  it('should remove timeout', () => {
    toastManager.addMessage({ text: 'Some Message One' });
    toastManager.dismissToastItem();
    expect(toastManager['timeout']).toBeNull();
  });

  it('should remove first element in array', () => {
    toastManager.addMessage({ text: 'Some Message One' });
    toastManager.addMessage({ text: 'Some Message Two' });
    toastManager.dismissToastItem();

    expect(toastManager['messages']).toEqual([{ text: 'Some Message Two', state: 'neutral' }]);
  });

  it('should call dismissCallbackFunction', () => {
    toastManager.dismissToastItem();
    expect(dismissCallbackFunction).toHaveBeenCalledTimes(1);
  });

  it('should trigger force update', () => {
    toastManager.addMessage({ text: 'Some Message' });
    const spy = jest.spyOn(stencilCore, 'forceUpdate');
    toastManager.dismissToastItem();

    expect(spy).toHaveBeenCalledWith(toastElement);
  });

  it('should not have error when called without message', () => {
    expect(() => toastManager.dismissToastItem()).not.toThrowError();
  });
});

describe('getToast()', () => {
  beforeEach(() => {
    const toastElement = document.createElement('p-toast');
    toastManager.register(toastElement, dismissCallbackFunction);
  });

  it('should return first element in array', () => {
    toastManager.addMessage({ text: 'Some Message One' });
    toastManager.addMessage({ text: 'Some Message Two' });

    expect(toastManager.getToast()).toEqual({ text: 'Some Message One', state: 'neutral' });
  });

  it('should return undefined if array is empty', () => {
    expect(toastManager.getToast()).toBeUndefined();
  });

  it('should call startTimeout()', () => {
    const spy = jest.spyOn(toastManager, 'startTimeout');
    toastManager.getToast();

    expect(spy).toBeCalledTimes(1);
  });
});

describe('startTimeout()', () => {
  const toastElement = document.createElement('p-toast');
  beforeEach(() => {
    toastManager.register(toastElement, dismissCallbackFunction);
  });

  it('should set a timeout and visible className if message is available', () => {
    toastManager.addMessage({ text: 'Some Message One' });
    toastManager.startTimeout();
    expect(toastManager['timeout']).toBeDefined();
  });

  it('should not set a timeout if no messages are available', () => {
    toastManager.startTimeout();
    expect(toastManager['timeout']).toBeUndefined();
  });
});

describe('unregister()', () => {
  it('should remove toastEl reference, remove messages and clear timeout', () => {
    const toastElement = document.createElement('p-toast');
    toastManager.register(toastElement, dismissCallbackFunction);
    toastManager.addMessage({ text: 'Some Message' });
    toastManager.unregister();

    expect(toastManager['toastEl']).toBeNull();
    expect(toastManager['messages']).toEqual([]);
    expect(toastManager['timeout']).toBeNull();
  });
});
