import { throttle } from 'throttle-debounce';

const listeners = new Map();

const handleResize = throttle(500, () => {
  listeners.forEach(callback => {
    callback();
  });
});

function attachListenerIfNeeded() {
  if (listeners.size === 1) {
    window.addEventListener('resize', handleResize);
  }
}

function removeListenerIfNotNeededAnymore() {
  if (listeners.size < 1) {
    window.removeEventListener('resize', handleResize);
  }
}

export function listenResize(callback: () => void) {
  const token = {};
  listeners.set(token, callback);
  attachListenerIfNeeded();
  return () => {
    listeners.delete(token);
    removeListenerIfNotNeededAnymore();
  };
}
