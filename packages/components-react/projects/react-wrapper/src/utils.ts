import type { ForwardedRef, MutableRefObject } from 'react';

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
  if (prevComponentClassNames.length) {
    domClasses = domClasses.filter((x) => !prevComponentClassNames.includes(x));
  }

  // all classes set by component
  const componentClasses = splitToArray(newClassName);

  return componentClasses.concat(domClasses).join(' ');
};

export const syncRef =
  <T extends HTMLElement>(elementRef: MutableRefObject<T | undefined>, ref: ForwardedRef<T>) =>
  (el: T | null): void => {
    // Internal refs use undefined for absence; React forwards null when the element is detached.
    elementRef.current = el ?? undefined;
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref !== null) {
      ref.current = el;
    }
  };

export const skipPorscheDesignSystemCDNRequestsDuringTests = (): void => {
  (window as any).PDS_SKIP_FETCH = true;
};
