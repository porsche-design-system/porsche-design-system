import { inject, provide } from 'vue';
import type { InjectionKey } from 'vue';
import { load } from '@porsche-design-system/components-js';

const prefixInjectionKey = Symbol('pdsPrefix') as InjectionKey<'pdsPrefix'>;

export const usePrefix = (tagName: string): string => {
  if (process.env.NODE_ENV === 'test') {
    return tagName;
  } else {
    const prefix = inject(prefixInjectionKey);

    if (prefix === undefined) {
      throw new Error('It appears the porscheDesignSystemProvider hook is missing. Make sure to use it.');
    }

    return prefix ? prefix + '-' + tagName : tagName;
  }
};

export const porscheDesignSystemProvider = (prefix: string = ''): void => {
  load({ prefix });
  provide(prefixInjectionKey, prefix);
};

export const syncProperties = <T extends object>(elementRef: T & Partial<HTMLElement>, props: T): void => {
  (Object.keys(props) as (keyof T)[]).forEach((prop) => (elementRef[prop] = props[prop]));
};

export const addEventListenerToElementRef = <T extends Partial<HTMLElement>, E extends string>(
  elementRef: T,
  eventName: E,
  emit: (eventName: E, detail: any) => void
): void => {
  elementRef.addEventListener(eventName, (e) => {
    emit(eventName, (e as CustomEvent).detail);
  });
};
