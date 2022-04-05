export const addEventListener = (
  el: HTMLElement,
  type: string,
  listener: () => void,
  options?: boolean | AddEventListenerOptions
): void => el.addEventListener(type, listener, options);

export const removeEventListener = (
  el: HTMLElement,
  type: string,
  listener: () => void,
  options?: boolean | EventListenerOptions
): void => el.removeEventListener(type, listener, options);
