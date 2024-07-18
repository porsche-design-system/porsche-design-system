'use client';

import type { MutableRefObject } from 'react';
import { useContext, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { type ComponentDefaults, PorscheDesignSystemContext } from './provider';
import { getMergedClassName } from './utils';
import type { Theme, ToastMessage } from './lib/types';

let skipCheck = false;

/**
 * sets a flag that skips the need for `PorscheDesignSystemProvider` during testing
 * when `process.env.NODE_ENV === 'test'`
 */
export const skipCheckForPorscheDesignSystemProviderDuringTests = (): void => {
  skipCheck = true;
};

export const usePrefix = (tagName: string): string => {
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

// TODO: unit tests missing
export const useTheme = (): Theme => {
  if (process.env.NODE_ENV === 'test' && skipCheck) {
    return 'light';
  } else {
    return useContext(PorscheDesignSystemContext).theme; // eslint-disable-line react-hooks/rules-of-hooks
  }
};

// TODO: adjust wrapper generator to use this
export const useDefaultProps = <Key extends keyof ComponentDefaults>(component: Key): ComponentDefaults[Key] => {
  if (process.env.NODE_ENV === 'test' && skipCheck) {
    return {};
  } else {
    return useContext(PorscheDesignSystemContext).components?.[component]; // eslint-disable-line react-hooks/rules-of-hooks
  }
};

export const useEventCallback = (
  ref: MutableRefObject<HTMLElement | undefined>,
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

export const useMergedClass = (ref: MutableRefObject<HTMLElement | undefined>, className?: string) => {
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
      const toast = document.body.querySelector(tagName) as HTMLElement & {
        addMessage: (message: ToastMessage) => void;
      };
      customElements.whenDefined(tagName).then(() => toast.addMessage(message));
    },
  };
};
