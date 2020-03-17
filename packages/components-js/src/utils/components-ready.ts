let loadingQueueCount = 0;
let resolvePromiseTimeout = null;
let onLoadedPromise: Promise<void>;
let resolveOnLoadedPromise: () => void;

function checkForPromiseResolve() {
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
}

function createOnLoadedPromise() {
  onLoadedPromise = new Promise(resolve => {
    resolveOnLoadedPromise = resolve;
  });
}

createOnLoadedPromise();

/**
 * stencil starts to lazy load a component
 */
window.addEventListener('stencil_componentWillLoad', () => {
  console.log('stencil_componentWillLoad');
  loadingQueueCount++;
  if (resolvePromiseTimeout) {
    window.clearTimeout(resolvePromiseTimeout);
  }
});

/**
 * stencil finished to lazy load a component
 */
window.addEventListener('stencil_componentDidLoad', () => {
  console.log('stencil_componentDidLoad');
  loadingQueueCount--;
  checkForPromiseResolve();
});

export function componentsReady(): Promise<void> {
  console.log('componentsReady');
  checkForPromiseResolve();
  return onLoadedPromise;
}
