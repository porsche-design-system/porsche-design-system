/* eslint-disable no-console */

let hasRegisteredEventListeners = false;
let taskCount = 0;
let timeout: number;
let resolvePromise: () => void;

const createPromise = (): Promise<void> => {
  console.log('createPromise');
  return new Promise((resolve) => {
    resolvePromise = resolve;
  });
};

let onLoadedPromise = createPromise();

const checkForPromiseResolve = (): void => {
  if (taskCount === 0) {
    // we debounce 50ms, because the loader is doing the
    // same for the "hydrated" class
    timeout = window.setTimeout(() => {
      resolvePromise();
      onLoadedPromise = createPromise();
      console.log('resolvedPromise');
    }, 50);
  }
};

const increaseCount = (): void => {
  taskCount++;
  if (timeout) {
    window.clearTimeout(timeout);
  }
};

const decreaseCount = (): void => {
  taskCount--;
  checkForPromiseResolve();
};

const registerStencilEventListeners = (): void => {
  if (!hasRegisteredEventListeners) {
    ['componentWillLoad', 'componentDidLoad', 'componentWillUpdate', 'componentDidUpdate'].forEach((event) => {
      const handler = event.includes('Will') ? increaseCount : decreaseCount;
      window.addEventListener(
        `stencil_${event}`,
        // for production
        // handler
        // for debugging
        (e) => {
          handler();
          console.log((e.target as any).tagName.toLowerCase(), e.type, taskCount);
        }
      );
    });

    hasRegisteredEventListeners = true;
  }
};

export const componentsReady = (): Promise<void> => {
  console.log('componentsReady', taskCount);
  registerStencilEventListeners();
  checkForPromiseResolve();
  return onLoadedPromise;
};
