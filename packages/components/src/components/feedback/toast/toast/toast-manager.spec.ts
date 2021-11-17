import { ToastManager, ToastManagerClass } from './toast-manager';
import { ToastState } from './toast-utils';
import * as stencilCore from '@stencil/core';
let toastManager: ToastManager;

beforeEach(() => {
  toastManager = new ToastManagerClass();
});

describe('register()', () => {
  const toastElement = document.createElement('p-toast');

  it('should throw if toastEl is already defined', () => {
    expect(() => {
      toastManager.register(toastElement);
    }).not.toThrow();

    expect(() => {
      toastManager.register(toastElement);
    }).toThrowErrorMatchingInlineSnapshot('"<p-toast> was rendered multiple times."');
  });

  it('should return toast manager instance', () => {
    expect(toastManager.register(toastElement)).toEqual(toastManager);
    expect(toastManager['toastEl']).toBeDefined();
  });
});

describe('addMessage()', () => {
  const toastElement = document.createElement('p-toast');
  beforeEach(() => {
    toastManager.register(toastElement);
  });

  it('should throw if no toastEl reference is set', () => {
    toastManager.unregister();
    expect(() => {
      toastManager.addMessage({ message: 'Some Message' });
    }).toThrowErrorMatchingInlineSnapshot('"Missing <p-toast> element."');
  });

  it('should set message state to neutral if none was provided', () => {
    toastManager.addMessage({ message: 'Some Message' });
    expect(toastManager['messages'][0]).toEqual({ message: 'Some Message', state: 'neutral' });
  });

  it('should throw if an invalid message state was provided', () => {
    expect(() => {
      toastManager.addMessage({ message: 'Some Message', state: 'wonky' as ToastState });
    }).toThrowErrorMatchingSnapshot();
  });

  it('should add messages to messages array', () => {
    toastManager.addMessage({ message: 'Some Message One' });
    toastManager.addMessage({ message: 'Some Message Two', state: 'success' });
    expect(toastManager['messages']).toEqual([
      { message: 'Some Message One', state: 'neutral' },
      { message: 'Some Message Two', state: 'success' },
    ]);
  });

  it('should force update if first element was added to messages array', () => {
    const spy = jest.spyOn(stencilCore, 'forceUpdate');
    toastManager.addMessage({ message: 'Some Message One' });
    expect(spy).toHaveBeenCalledWith(toastElement);

    toastManager.addMessage({ message: 'Some Message One' });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).not.toHaveBeenCalledTimes(2);
  });
});

describe('dismissToastItem()', () => {
  const toastElement = document.createElement('p-toast');
  beforeEach(() => {
    toastManager.register(toastElement);
  });

  it('should remove timeout', () => {
    toastManager.addMessage({ message: 'Some Message One' });
    toastManager.dismissToastItem();
    expect(toastManager['timeout']).toBeNull();
  });

  it('should remove first element in array', () => {
    toastManager.addMessage({ message: 'Some Message One' });
    toastManager.addMessage({ message: 'Some Message Two' });
    toastManager.dismissToastItem();

    expect(toastManager['messages']).toEqual([{ message: 'Some Message Two', state: 'neutral' }]);
  });

  it('should trigger force update', () => {
    toastManager.addMessage({ message: 'Some Message' });
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
    toastManager.register(toastElement);
  });

  it('should return first element in array', () => {
    toastManager.addMessage({ message: 'Some Message One' });
    toastManager.addMessage({ message: 'Some Message Two' });

    expect(toastManager.getToast()).toEqual({ message: 'Some Message One', state: 'neutral' });
  });

  it('should return undefined if array is empty', () => {
    expect(toastManager.getToast()).toBeUndefined();
  });
});

describe('startTimeout()', () => {
  const toastElement = document.createElement('p-toast');
  beforeEach(() => {
    toastManager.register(toastElement);
  });

  it('should set a timeout if message is available', () => {
    toastManager.addMessage({ message: 'Some Message One' });
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
    toastManager.register(toastElement);
    toastManager.addMessage({ message: 'Some Message' });
    toastManager.unregister();

    expect(toastManager['toastEl']).toBeNull();
    expect(toastManager['messages']).toEqual([]);
    expect(toastManager['timeout']).toBeNull();
  });
});
