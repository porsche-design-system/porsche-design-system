import { moduleCache } from '@stencil/core/dist/client';

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
 * decorate get method of stencil moduleCache to know when
 * stencil starts to lazy load a missing component
 */
moduleCache.get = (origGet => (...args) => {
  const module = origGet.call(moduleCache, ...args);
  if (!module) {
    /**
     * module not found, so stencil is going to load it
     */
    loadingQueueCount++;
    if (resolvePromiseTimeout) {
      window.clearTimeout(resolvePromiseTimeout);
    }
  }
  return module;
})(moduleCache.get);

/**
 * decorate set method of stencil moduleCache to know when
 * stencil finished to lazy load a missing component
 */
moduleCache.set = (origSet => (...args) => {
  loadingQueueCount--;
  checkForPromiseResolve();
  return origSet.call(moduleCache, ...args);
})(moduleCache.set);

export function componentsReady(): Promise<void> {
  checkForPromiseResolve();
  return onLoadedPromise;
}
