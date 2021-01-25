import type { MutableRefObject, PropsWithChildren } from 'react';
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

export const useMergedClass = (ref: MutableRefObject<HTMLElement>, className: string) => {
  const prevComponentClassName = useRef<string>();
  return useMemo(() => {
    const { current } = ref;

    if (current) {
      // classes previously set by component
      const prevComponentClassNameArray = prevComponentClassName.current.split(' ');

      // all classes not set by component
      const domClassArray = Array.from(current.classList).filter((x) => !prevComponentClassNameArray.includes(x));

      // all classes set by component
      const componentClassArray = className.split(' ');

      // the react component does not override DOMTokenList when className attribute changes.
      current.classList.remove(...prevComponentClassNameArray);
      current.classList.add(...componentClassArray);

      prevComponentClassName.current = className;

      const classArray = domClassArray.concat(componentClassArray);
      return classArray.join(' ');
    } else {
      prevComponentClassName.current = className;
      return className;
    }
  }, [className]);
};
