import { throttle } from 'throttle-debounce';

const listeners = new Map();

const onResize = throttle(500, () => {
  listeners.forEach((callback) => {
    callback();
  });
});

export const attachListenerIfNeeded = (): void => {
  if (listeners.size === 1) {
    window.addEventListener('resize', onResize);
  }
};

export const removeListenerIfNotNeededAnymore = (): void => {
  if (listeners.size < 1) {
    window.removeEventListener('resize', onResize);
  }
};

// TODO: use ResizeObserver, https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
export const listenResize = (callback: () => void): (() => void) => {
  const token = {};
  listeners.set(token, callback);
  attachListenerIfNeeded();
  return (): void => {
    listeners.delete(token);
    removeListenerIfNotNeededAnymore();
  };
};
