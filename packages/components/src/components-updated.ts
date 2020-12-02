/* eslint-disable no-console */

let taskCount = 0;
let timeout: number;
let promiseResolve: () => void;

const checkPromiseResolve = (): void => {
  console.log('checkPromiseResolve');
  if (taskCount === 0) {
    timeout = window.setTimeout(() => {
      promiseResolve();
      console.log('––> resolvedPromise');
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
  checkPromiseResolve();
};

export const componentsUpdated = (): Promise<void> => {
  console.log('componentsUpdated');
  return new Promise<void>((resolve) => {
    promiseResolve = resolve;
  });
};

const registerStencilEventListeners = (): void => {
  ['componentWillUpdate', 'componentDidUpdate'].forEach((event) => {
    window.addEventListener(`stencil_${event}`, (e: CustomEvent) => {
      if (isEventInStencilNamespace(e)) {
        if (event.includes('Will')) {
          increaseCount();
        } else {
          decreaseCount();
        }
      }
    });
  });
};

const isEventInStencilNamespace = (e: CustomEvent): boolean => e.detail.namespace === 'porsche-design-system';

registerStencilEventListeners();
