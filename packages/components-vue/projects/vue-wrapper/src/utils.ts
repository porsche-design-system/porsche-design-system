import { inject } from 'vue';
import type { InjectionKey } from 'vue';

export const prefixInjectionKey = Symbol('pdsPrefix') as InjectionKey<'pdsPrefix'>;

export const getPrefixedTagName = (tagName: string): string => {
  const prefix = inject(prefixInjectionKey);

  if (prefix === undefined) {
    throw new Error('It appears the <PorscheDesignSystemProvider /> is missing. Make sure to wrap your App in it.');
  }

  return prefix ? prefix + '-' + tagName : tagName;
};

export const syncProperties = <T extends HTMLElement>(elementRef: T, props: Partial<T>): void => {
  (Object.keys(props) as (keyof T)[]).forEach((prop) => (elementRef[prop] = (props as T)[prop]));
};

export const addEventListenerToElementRef = <T extends HTMLElement, E extends string>(
  elementRef: T,
  eventName: E,
  emit: (eventName: E, detail: any) => void
): void => {
  elementRef.addEventListener(eventName, (e) => {
    emit(eventName, (e as CustomEvent).detail);
  });
};
