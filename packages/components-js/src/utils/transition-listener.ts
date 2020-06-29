import { throttle } from 'throttle-debounce';

/**
 * Listens to the end of a CSS transition and calls a throttled callback and calls
 * the callback once initially.
 * @param tag
 * @param transitionProperty
 * @param callback
 * @returns void
 */
export const transitionListener = (tag: HTMLElement, transitionProperty: string, callback: () => void): number => {
  return window.requestAnimationFrame(() => {
    tag.addEventListener(
      'transitionend',
      throttle(50, (e) => {
        if (e.propertyName === transitionProperty) {
          console.log('requestAnimationFrame transitionend');
          callback();
        }
      })
    );

    callback();
  });
};
