import type { MutableRefObject, PropsWithChildren } from 'react';
import { createContext, useContext, useEffect } from 'react';
import { load } from '@porsche-design-system/components-js';

const PorscheDesignSystemContext = createContext({ prefix: undefined });

type Props = { prefix?: string };

export const PorscheDesignSystemProvider = ({ prefix = '', ...props }: PropsWithChildren<Props>): JSX.Element => {
  useEffect(() => {
    load({ prefix });
    // TODO: maybe add prefix to deps array in case it changes
  }, []);

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
