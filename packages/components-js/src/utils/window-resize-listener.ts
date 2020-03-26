import { throttle } from 'throttle-debounce';

const listeners = new Map();

const handleResize = throttle(500, () => {
  listeners.forEach(callback => {
    callback();
  });
});

export const attachListenerIfNeeded = (): void => {
  if (listeners.size === 1) {
    window.addEventListener('resize', handleResize);
  }
};

export const removeListenerIfNotNeededAnymore = (): void => {
  if (listeners.size < 1) {
    window.removeEventListener('resize', handleResize);
  }
};

export const listenResize = (callback: () => void): () => void => {
  const token = {};
  listeners.set(token, callback);
  attachListenerIfNeeded();
  return (): void => {
    listeners.delete(token);
    removeListenerIfNotNeededAnymore();
  };
};
