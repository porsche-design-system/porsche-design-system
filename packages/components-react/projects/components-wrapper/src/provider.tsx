import { load } from '@porsche-design-system/components-js';
import { createContext, MutableRefObject, PropsWithChildren, useContext, useEffect } from 'react';
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

export const useEventCallback = (
  element: MutableRefObject<HTMLElement>,
  eventName: string,
  eventHandler: (e: Event) => void
): void => {
  useEffect(() => {
    if (element.current && eventHandler) {
      element.current.addEventListener(eventName, eventHandler);
      return () => element.current.removeEventListener(eventName, eventHandler);
    }
  }, [eventHandler]);
};

export const jsonStringify = JSON.stringify;
