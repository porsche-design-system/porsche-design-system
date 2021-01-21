import type { MutableRefObject, PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo } from 'react';
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

let initialComponentClassName: string = '';

export const getMergedClass = (ref: MutableRefObject<HTMLElement>, className: string) =>
  useMemo(() => {
    const { current } = ref;

    if (current) {
      // classes previously set by component
      const initialComponentClassArray = initialComponentClassName.split(' ');

      // all classes not set by component
      const domClassArray = Array.from(ref.current.classList).filter((x) => !initialComponentClassArray.includes(x));

      // all classes set by component
      const componentClassArray = className.split(' ');
      const classArray = domClassArray.concat(componentClassArray).filter((x, i, a) => a.indexOf(x) === i);

      // the react component does not override DOMTokenList when className attribute changes.
      ref.current.classList.remove(...initialComponentClassArray.concat(domClassArray));
      ref.current.classList.add(...classArray);

      initialComponentClassName = className;

      return classArray.join(' ');
    } else {
      initialComponentClassName = className;
      return className;
    }
  }, [className]);
