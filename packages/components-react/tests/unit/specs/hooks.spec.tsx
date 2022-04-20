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
import { describeSkipSkeletons } from '@porsche-design-system/shared/testing';

describeSkipSkeletons('useSkeleton()', () => {
  it('should throw error if usesSkeletons was set to true on provider but partial was not used or used without skeletonsTagNames', () => {
    expect(
      render(
        <PorscheDesignSystemProvider usesSkeletons={true}>
          <PButton />
        </PorscheDesignSystemProvider>
      )
    ).toThrow(
      'It appears you are passing usesSkeletons=true on the <PorscheDesignSystemProvider /> either without using the getInitialStyles() function or without a proper skeletonTagNames array on the getInitialStyles() function.'
    );
  });

  it('should not throw error on correct usage', () => {
    const mockInitialStylePartial = document.createElement('style');
    mockInitialStylePartial.setAttribute('uses-skeleton', 'true');
    document.head.appendChild(mockInitialStylePartial);

    expect(
      render(
        <PorscheDesignSystemProvider usesSkeletons={true}>
          <PButton />
        </PorscheDesignSystemProvider>
      )
    ).not.toThrow();
  });
});

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
      const addMessageMock = jest.fn();
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
