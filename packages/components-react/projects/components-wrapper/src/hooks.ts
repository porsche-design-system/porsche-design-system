import type { MutableRefObject } from 'react';
import { useContext, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { PorscheDesignSystemContext } from './provider';
import { getMergedClassName } from './utils';
import type { ToastMessage } from './lib/types';

let skipCheck = false;

/**
 * sets a flag that skips the need for `PorscheDesignSystemProvider` during testing
 * when `process.env.NODE_ENV === 'test'`
 */
export const skipCheckForPorscheDesignSystemProviderDuringTests = (): void => {
  skipCheck = true;
};

export const usePrefix = /*#__PURE__*/ (tagName: string): string => {
  if (process.env.NODE_ENV === 'test' && skipCheck) {
    return tagName;
  } else {
    const { prefix } = useContext(PorscheDesignSystemContext); // eslint-disable-line react-hooks/rules-of-hooks

    if (prefix === undefined) {
      throw new Error('It appears the <PorscheDesignSystemProvider /> is missing. Make sure to wrap your App in it.');
    }

    return prefix ? prefix + '-' + tagName : tagName;
  }
};

export const useEventCallback = /*#__PURE__*/ (
  ref: MutableRefObject<HTMLElement>,
  eventName: string,
  eventHandler: (e: Event) => void
): void => {
  useEffect(() => {
    const { current } = ref;
    if (current && eventHandler) {
      current.addEventListener(eventName, eventHandler);
      return () => current?.removeEventListener(eventName, eventHandler);
    }
  }, [eventHandler]); // eslint-disable-line react-hooks/exhaustive-deps
};

export const useMergedClass = /*#__PURE__*/ (ref: MutableRefObject<HTMLElement>, className: string) => {
  const prevComponentClassName = useRef<string>();
  return useMemo(() => {
    const { current } = ref;
    let newClassName = className;

    if (current) {
      newClassName = getMergedClassName(current.className, prevComponentClassName.current, className);
      // the jsx does not override className when the attribute changes
      current.className = newClassName;
    }
    prevComponentClassName.current = className;
    return newClassName;
  }, [className]); // eslint-disable-line react-hooks/exhaustive-deps
};

export const useBrowserLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const useToastManager = (): { addMessage: (msg: ToastMessage) => void } => {
  const tagName = usePrefix('p-toast');
  // TODO: maybe wrap in useEffect for ref of query selector
  return {
    // TODO: maybe wrap in useCallback
    addMessage: (msg: ToastMessage): void => {
      // TODO: useRef?
      const toast: HTMLElement & {
        componentOnReady: () => Promise<void>;
        addMessage(msg: ToastMessage): Promise<void>;
      } = document.querySelector(tagName);
      toast.componentOnReady().then(() => toast.addMessage(msg));
    },
  };
};
