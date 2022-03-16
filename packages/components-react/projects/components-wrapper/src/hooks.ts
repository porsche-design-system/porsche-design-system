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

export const useSkeletons = /*#__PURE__*/ (): boolean => {
  if (process.env.NODE_ENV === 'test' && skipCheck) {
    return false;
  } else {
    const { usesSkeletons } = useContext(PorscheDesignSystemContext); // eslint-disable-line react-hooks/rules-of-hooks

    if (usesSkeletons === undefined) {
      throw new Error('It appears the <PorscheDesignSystemProvider /> is missing. Make sure to wrap your App in it.');
    }

    return usesSkeletons;
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
    if (!className) {
      return undefined;
    }
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

  return {
    addMessage: (message: ToastMessage): void => {
      const toast = document.querySelector(tagName) as HTMLElement & { addMessage: (message: ToastMessage) => void };
      customElements.whenDefined(tagName).then(() => toast.addMessage(message));
    },
  };
};
