let loadingQueueCount = 0;
let resolvePromiseTimeout = null;
let onLoadedPromise: Promise<void>;
let resolveOnLoadedPromise: () => void;

const checkForPromiseResolve = (): void => {
  if (loadingQueueCount === 0) {
    /**
     * we debounce 30ms, because the loader is doing the
     * same for the "hydrated" class
     */
    resolvePromiseTimeout = window.setTimeout(() => {
      resolveOnLoadedPromise();
      createOnLoadedPromise();
    }, 30);
  }
};

const createOnLoadedPromise = (): void => {
  onLoadedPromise = new Promise(resolve => {
    resolveOnLoadedPromise = resolve;
  });
};

createOnLoadedPromise();

/**
 * stencil starts to lazy load a component
 */
window.addEventListener('stencil_componentWillLoad', () => {
  loadingQueueCount++;
  if (resolvePromiseTimeout) {
    window.clearTimeout(resolvePromiseTimeout);
  }
});

/**
 * stencil finished to lazy load a component
 */
window.addEventListener('stencil_componentDidLoad', () => {
  loadingQueueCount--;
  checkForPromiseResolve();
});

export const componentsReady = (): Promise<void> => {
  checkForPromiseResolve();
  return onLoadedPromise;
};
