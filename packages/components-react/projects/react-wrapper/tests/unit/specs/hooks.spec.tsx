import { render } from '@testing-library/react';
import type { ToastMessage } from '../../../src/public-api';
import { PButton, useToastManager } from '../../../src/public-api';
import * as hooks from '../../../src/hooks';
import {
  skipCheckForPorscheDesignSystemProviderDuringTests,
  useBrowserLayoutEffect,
  usePrefix,
} from '../../../src/hooks';
import { useLayoutEffect } from 'react';
import * as React from 'react';

fdescribe('usePrefix()', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
  });

  // TODO: should we test all variations of NODE_ENV? also skipCheck etc.?
  it('should return passed tagName if process.env.NODE_ENV is set to "test" and skipCheck is true', () => {
    process.env = { ...originalEnv, NODE_ENV: 'test' };
    skipCheckForPorscheDesignSystemProviderDuringTests();
    const tagName = 'p-text';

    jest.spyOn(hooks, 'getPrefixFromUseContext').mockReturnValue('my-prefix');

    expect(usePrefix(tagName)).toBe(tagName);
  });

  describe('process.env.NODE_ENV !== "test"', () => {
    beforeEach(() => {
      process.env = { ...originalEnv, NODE_ENV: 'development' };
    });

    const tagName = 'p-text';

    // TODO: how to test getPrefixFromUseContext?
    it('should call getPrefixFromUseContext()', () => {
      const spy = jest.spyOn(hooks, 'getPrefixFromUseContext').mockReturnValue('');

      usePrefix(tagName);
      expect(spy).toBeCalledWith();
    });

    it('should throw error if prefix is undefined', () => {
      jest.spyOn(hooks, 'getPrefixFromUseContext').mockReturnValue(undefined);
      let error;

      try {
        usePrefix(tagName);
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
    });

    it('should return tagName if no prefix is set', () => {
      jest.spyOn(hooks, 'getPrefixFromUseContext').mockReturnValue('');

      expect(usePrefix(tagName)).toBe(tagName);
    });

    it('should return prefixed tagName if prefix is set', () => {
      const prefixMock = 'my-prefix'
      const anotherPrefixMock = 'another-prefix'

      jest.spyOn(hooks, 'getPrefixFromUseContext').mockReturnValue(prefixMock);
      expect(usePrefix(tagName)).toBe(prefixMock + '-' + tagName);

      jest.spyOn(hooks, 'getPrefixFromUseContext').mockReturnValue(anotherPrefixMock);
      expect(usePrefix(tagName)).toBe(anotherPrefixMock + '-' + tagName);
    });
  });
});

describe('skipCheckForPorscheDesignSystemProviderDuringTests()', () => {
  it('should prevent usePrefix() to throw exception', () => {
    const spy = jest.spyOn(global.console, 'error').mockImplementation(() => {});
    let error1, error2;

    try {
      render(<PButton />);
    } catch (e) {
      error1 = e;
    }
    expect(error1).toBeDefined();

    skipCheckForPorscheDesignSystemProviderDuringTests();

    try {
      render(<PButton />);
    } catch (e) {
      error2 = e;
    }
    expect(error2).not.toBeDefined();

    spy.mockRestore();
  });
});

describe('useBrowserLayoutEffect()', () => {
  it('should be an alias for useLayoutEffect in browser', () => {
    expect(typeof global.window).toBe('object');
    expect(typeof global.document).toBe('object');
    expect(useBrowserLayoutEffect).toEqual(useLayoutEffect);
  });
});

describe('useToastManager()', () => {
  it('should call usePrefix()', () => {
    const spy = jest.spyOn(hooks, 'usePrefix');
    useToastManager();
    expect(spy).toBeCalledWith('p-toast');
  });

  it('should provide addMessage()', () => {
    expect(useToastManager()).toEqual({ addMessage: expect.anything() });
  });

  describe('addMessage()', () => {
    it('should call addMessage() on toast element', async () => {
      const toastElement = document.createElement('p-toast') as HTMLElement & {
        addMessage(message: ToastMessage): void;
      };
      const addMessageMock = jest.fn();
      toastElement.addMessage = addMessageMock;
      document.body.appendChild(toastElement);
      customElements.define('p-toast', class PToast extends HTMLElement {});

      const { addMessage } = useToastManager();
      const message: ToastMessage = { text: 'Test', state: 'success' };
      addMessage(message);

      // wait for customElements.whenDefined to be resolved
      await new Promise((resolve) => setTimeout(resolve));

      expect(addMessageMock).toBeCalledWith(message);
    });
  });
});
