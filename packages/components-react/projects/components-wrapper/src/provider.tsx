import type { CSSProperties, PropsWithChildren } from 'react';
import { createContext, useContext, useEffect } from 'react';
import { load } from '@porsche-design-system/components-js';

export { componentsReady } from '@porsche-design-system/components-js';

type Props = { prefix?: string };

const PorscheDesignSystemContext = createContext({ prefix: '' });

export const PorscheDesignSystemProvider = ({ prefix = '', ...props }: PropsWithChildren<Props>): JSX.Element => {
  useEffect(() => {
    load({ prefix });
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

export const useEventCallback = (element: HTMLElement, eventName: string, eventHandler: (e: Event) => void): void => {
  useEffect(() => {
    if (element && eventHandler) {
      element.addEventListener(eventName, eventHandler);
      return () => element.removeEventListener(eventName, eventHandler);
    }
  }, [eventHandler]);
};

export type BaseType = {
  className?: string;
  style?: CSSProperties;
};
