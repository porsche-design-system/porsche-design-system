import { render } from '@testing-library/react';
import * as React from 'react';
import { useLayoutEffect } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as hooks from '../../../src/hooks';
import {
  internalHooks,
  skipCheckForPorscheDesignSystemProviderDuringTests,
  useBrowserLayoutEffect,
  usePrefix,
} from '../../../src/hooks';
import { PorscheDesignSystemContext } from '../../../src/provider';
import { PButton, type ToastMessage, useToastManager } from '../../../src/public-api';

// mock useContext() for the whole test-suite
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: vi.fn(),
  };
});

describe('skipCheckForPorscheDesignSystemProviderDuringTests()', () => {
  it('should prevent usePrefix() to throw exception', () => {
    const spy = vi.spyOn(global.console, 'error').mockImplementation(() => {});
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

describe('usePrefix()', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return passed parameter if process.env.NODE_ENV is set to "test" and skipCheck is true', () => {
    process.env = { ...originalEnv, NODE_ENV: 'test' };
    skipCheckForPorscheDesignSystemProviderDuringTests();
    const tagName = 'p-text';

    expect(usePrefix(tagName)).toBe(tagName);
  });

  it('should return passed parameter if process.env.NODE_ENV is set to "test" and skipCheck is false', () => {
    process.env = { ...originalEnv, NODE_ENV: 'test' };
    const tagName = 'p-text';

    expect(usePrefix(tagName)).toBe(tagName);
  });

  describe('process.env.NODE_ENV !== "test"', () => {
    beforeEach(() => {
      process.env = { ...originalEnv, NODE_ENV: 'development' };
    });

    it('should call useContext() with correct parameter', () => {
      vi.spyOn(React, 'useContext').mockReturnValue({ prefix: '' });
      usePrefix('p-text');

      expect(React.useContext).toHaveBeenCalledWith(PorscheDesignSystemContext);
    });

    it('should return prefixed tagName', () => {
      const prefix = 'my-prefix';
      vi.spyOn(React, 'useContext').mockReturnValue({ prefix });
      const tagName = 'p-text';

      expect(usePrefix(tagName)).toBe(prefix + '-' + tagName);
    });

    it('should throw error if useContext() returns undefined', () => {
      vi.spyOn(global.console, 'error').mockImplementation(() => {});
      vi.spyOn(React, 'useContext').mockReturnValue(undefined);

      expect(() => usePrefix('p-text')).toThrow();
    });
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
    const spy = vi.spyOn(hooks.internalHooks, 'usePrefix');
    useToastManager();
    expect(spy).toHaveBeenCalledWith('p-toast');
  });

  it('should provide addMessage()', () => {
    expect(useToastManager()).toEqual({ addMessage: expect.anything() });
  });

  describe('addMessage()', () => {
    it('should call addMessage() on toast element', async () => {
      const toastElement = document.createElement('p-toast') as HTMLElement & {
        addMessage(message: ToastMessage): void;
      };
      const addMessageMock = vi.fn();
      toastElement.addMessage = addMessageMock;
      document.body.appendChild(toastElement);
      customElements.define('p-toast', class PToast extends HTMLElement {});

      const { addMessage } = useToastManager();
      const message: ToastMessage = { text: 'Test', state: 'success' };
      addMessage(message);

      // wait for customElements.whenDefined to be resolved
      await new Promise((resolve) => setTimeout(resolve));

      expect(addMessageMock).toHaveBeenCalledWith(message);
    });
  });
});
