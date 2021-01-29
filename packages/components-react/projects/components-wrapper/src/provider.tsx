import type { ForwardedRef, MutableRefObject, PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import { load } from '@porsche-design-system/components-js';

const PorscheDesignSystemContext = createContext({ prefix: undefined });

type Props = { prefix?: string };

export const PorscheDesignSystemProvider = ({ prefix = '', ...props }: PropsWithChildren<Props>): JSX.Element => {
  useEffect(() => {
    load({ prefix });
  }, [prefix]);

  return <PorscheDesignSystemContext.Provider value={{ prefix }} {...props} />;
};

export const usePrefix = (tagName: string): string => {
  const { prefix } = useContext(PorscheDesignSystemContext);

  if (prefix === undefined) {
    throw new Error('It appears the <PorscheDesignSystemProvider /> is missing. Make sure to wrap your App in it.');
  }

  return prefix ? `${prefix}-${tagName}` : tagName;
};

export const useEventCallback = (
  ref: MutableRefObject<HTMLElement>,
  eventName: string,
  eventHandler: (e: Event) => void,
): void => {
  useEffect(() => {
    const { current } = ref;
    if (current && eventHandler) {
      current.addEventListener(eventName, eventHandler);
      return () => current?.removeEventListener(eventName, eventHandler);
    }
  }, [eventHandler]);
};

export const jsonStringify = (value: any) => (typeof value === 'object' ? JSON.stringify(value) : value);

const splitToArray = (str: string) => str.split(' ').filter((str) => str);

export const getMergedClassName = (
  domClassName: string,
  oldClassName: string = '',
  newClassName: string = ''
): string => {
  // classes previously set by component
  const prevComponentClassNames = splitToArray(oldClassName);

  // all classes not set by component -> to keep hydrated class and other classes set on host element
  // (usually dom-manipulated class additions would be lost on rerender)
  let domClasses = splitToArray(domClassName);
  if (prevComponentClassNames.length > 0) {
    domClasses = domClasses.filter((x) => !prevComponentClassNames.includes(x));
  }

  // all classes set by component
  const componentClasses = splitToArray(newClassName);

  return componentClasses.concat(domClasses).join(' ');
};

export const useMergedClass = (ref: MutableRefObject<HTMLElement>, className: string) => {
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
  }, [className]);
};

export const syncRef = (ref: ForwardedRef<HTMLElement>, elementRef: MutableRefObject<HTMLElement>) => (
  el: HTMLElement
): void => {
  elementRef.current = el;
  if (typeof ref === 'function') {
    ref(el);
  } else if (ref !== null) {
    ref.current = el;
  }
};
