import { render } from '@testing-library/react';
import type { ToastMessage } from '../../../projects/components-wrapper/src/public-api';
import {
  PButton,
  PorscheDesignSystemProvider,
  useToastManager,
} from '../../../projects/components-wrapper/src/public-api';
import * as hooks from '../../../projects/components-wrapper/src/hooks';
import {
  skipCheckForPorscheDesignSystemProviderDuringTests,
  useBrowserLayoutEffect,
} from '../../../projects/components-wrapper/src/hooks';
import { useLayoutEffect } from 'react';
import { describeIfSkeletonsActive } from '@porsche-design-system/shared/test-helpers';

describeIfSkeletonsActive('useSkeleton()', () => {
  it('should throw error if usesSkeletons was set to true on provider but partial was not used', () => {
    jest.spyOn(global.console, 'error').mockImplementation(() => {});

    expect(() =>
      render(
        <PorscheDesignSystemProvider usesSkeletons={true}>
          <PButton />
        </PorscheDesignSystemProvider>
      )
    ).toThrowErrorMatchingInlineSnapshot(
      '"It appears you are passing usesSkeletons=true on the <PorscheDesignSystemProvider /> either without using the getInitialStyles() function or without a proper skeletonTagNames array on the getInitialStyles() function."'
    );
  });

  it('should not throw error on usage with partial', () => {
    const styleElement = document.createElement('style');
    styleElement.setAttribute('uses-skeleton', 'true'); // needs to be in sync between partial, useSkeleton() & PorscheDesignSystemProvider
    document.head.appendChild(styleElement);

    expect(() =>
      render(
        <PorscheDesignSystemProvider usesSkeletons={true}>
          <PButton />
        </PorscheDesignSystemProvider>
      )
    ).not.toThrow();
  });

  // TODO: Add missing tests
  xit('should return true', () => {});
  xit('should return false', () => {});
});

// TODO: Add missing tests
xdescribe('usePrefix()', () => {});

describe('skipCheckForPorscheDesignSystemProviderDuringTests()', () => {
  it('should prevent usePrefix() or useSkeleton() to throw exception', () => {
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
