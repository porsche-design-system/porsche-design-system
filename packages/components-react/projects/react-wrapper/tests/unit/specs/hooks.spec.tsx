import { render } from '@testing-library/react';
import type { ToastMessage } from '../../../src/public-api';
import { PButton, useToastManager } from '../../../src/public-api';
import * as hooks from '../../../src/hooks';
import { skipCheckForPorscheDesignSystemProviderDuringTests, useBrowserLayoutEffect } from '../../../src/hooks';
import { useLayoutEffect } from 'react';

// TODO: Add missing tests
xdescribe('usePrefix()', () => {});

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
