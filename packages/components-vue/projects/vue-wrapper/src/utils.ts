import { inject } from 'vue';
import type { InjectionKey, Ref } from 'vue';
import type { Theme, ToastMessage } from './lib/types';

export const prefixInjectionKey = Symbol('pdsPrefix') as InjectionKey<string>;
export const themeInjectionKey = Symbol('pdsTheme') as InjectionKey<Ref<Theme>>;

export const usePrefix = (tagName: string): string => {
  const prefix = inject(prefixInjectionKey);

  if (prefix === undefined) {
    throw new Error('It appears the <PorscheDesignSystemProvider /> is missing. Make sure to wrap your App in it.');
  }

  return prefix ? prefix + '-' + tagName : tagName;
};

export const syncProperties = <T extends HTMLElement>(elementRef: Ref<T | undefined>, props: Partial<T>): void => {
  const el = elementRef.value!;
  (Object.keys(props) as (keyof T)[]).forEach((prop) => (el[prop] = (props as T)[prop]));
};

export const addEventListenerToElementRef = <T extends HTMLElement, E extends string>(
  elementRef: Ref<T | undefined>,
  eventName: E,
  emit: (eventName: E, detail: any) => void
): void => {
  elementRef.value!.addEventListener(eventName, (e) => {
    emit(eventName, (e as CustomEvent).detail);
  });
};

export const useToastManager = (): { addMessage: (message: ToastMessage) => void } => {
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
