import { ToastManager, ToastManagerClass } from './toast-manager';
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
    }).toThrowErrorMatchingInlineSnapshot(`"[Porsche Design System] p-toast was rendered multiple times."`);
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
    }).toThrowErrorMatchingInlineSnapshot(`"[Porsche Design System] missing p-toast element."`);
  });

  it('should throw if no text was provided', () => {
    expect(() => {
      toastManager.addMessage({ text: '' });
    }).toThrowErrorMatchingInlineSnapshot(`"[Porsche Design System] p-toast empty text provided to addMessage()."`);
  });

  it('should set message state to info if none was provided', () => {
    toastManager.addMessage({ text: 'Some Message' });
    expect(toastManager['messages'][0]).toEqual({ text: 'Some Message', state: 'info' });
  });

  it('should remove html tags except <br> or <br /> within message', () => {
    toastManager.addMessage({
      text: 'Some Message <br>Some linebreak <br />Some linebreak <button>button</button> <strong>strong</strong> <em>emphasized</em> <i>italic</i>',
    });
    expect(toastManager['messages'][0]).toEqual({
      text: 'Some Message <br>Some linebreak <br>Some linebreak button strong emphasized italic',
      state: 'info',
    });
  });

  it('should force update if first element was added to messages array', () => {
    const spy = jest.spyOn(stencilCore, 'forceUpdate');
    toastManager.addMessage({ text: 'Some Message One' });
    expect(spy).toBeCalledWith(toastElement);

    toastManager.addMessage({ text: 'Some Message One' });
    expect(spy).toBeCalledTimes(1);
    expect(spy).not.toBeCalledTimes(2);
  });

  it('should add messages to messages array', () => {
    toastManager.addMessage({ text: 'Some Message One' });
    expect(toastManager['messages']).toEqual([{ text: 'Some Message One', state: 'info' }]);
  });

  it('should always show the latest message and clear the queue immediately if a new message was added', () => {
    toastManager.addMessage({ text: 'Some Message One' });
    expect(toastManager['messages']).toEqual([{ text: 'Some Message One', state: 'info' }]);

    toastManager.addMessage({ text: 'Some Message Two', state: 'success' });
    expect(dismissCallbackFunction).toBeCalledTimes(1);
    expect(toastManager['messages']).toEqual([{ text: 'Some Message Two', state: 'success' }]);
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

  it('should remove element from array', () => {
    toastManager.addMessage({ text: 'Some Message' });
    toastManager.dismissToastItem();

    expect(toastManager['messages']).toEqual([]);
  });

  it('should call dismissCallbackFunction', () => {
    toastManager.dismissToastItem();
    expect(dismissCallbackFunction).toBeCalledTimes(1);
  });

  it('should trigger force update', () => {
    toastManager.addMessage({ text: 'Some Message' });
    const spy = jest.spyOn(stencilCore, 'forceUpdate');
    toastManager.dismissToastItem();

    expect(spy).toBeCalledWith(toastElement);
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

  it('should return last added element in array', () => {
    toastManager.addMessage({ text: 'Some Message One' });
    toastManager.addMessage({ text: 'Some Message Two' });

    expect(toastManager.getToast()).toEqual({ text: 'Some Message Two', state: 'info' });
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
