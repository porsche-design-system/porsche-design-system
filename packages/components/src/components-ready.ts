let loadingQueueCount = 0;
let resolvePromiseTimeout: number;
let onLoadedPromise: Promise<void>;
let resolveOnLoadedPromise: () => void;

const checkForPromiseResolve = (): void => {
  console.log('checkForPromiseResolve', loadingQueueCount);
  if (loadingQueueCount === 0) {
    // we debounce 50ms, because the loader is doing the
    // same for the "hydrated" class
    resolvePromiseTimeout = window.setTimeout(() => {
      resolveOnLoadedPromise();
      createOnLoadedPromise();
    }, 50);
  }
};

const createOnLoadedPromise = (): void => {
  console.log('createOnLoadedPromise');
  onLoadedPromise = new Promise((resolve) => {
    resolveOnLoadedPromise = resolve;
  });
};

createOnLoadedPromise();

// stencil starts to lazy load a component
window.addEventListener('stencil_componentWillLoad', () => {
  loadingQueueCount++;
  console.log('stencil_componentWillLoad', loadingQueueCount);
  if (resolvePromiseTimeout) {
    window.clearTimeout(resolvePromiseTimeout);
  }
});

// stencil finished to lazy load a component
window.addEventListener('stencil_componentDidLoad', () => {
  loadingQueueCount--;
  console.log('stencil_componentDidLoad', loadingQueueCount);
  checkForPromiseResolve();
});

export const componentsReady = (): Promise<void> => {
  console.log('componentsReady', loadingQueueCount);
  checkForPromiseResolve();
  return onLoadedPromise;
};
