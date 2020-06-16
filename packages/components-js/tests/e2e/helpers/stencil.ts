import { Page } from 'puppeteer';

export const waitForStencilLifecycle = async (page: Page): Promise<void> => {
  await page.evaluate(async (): Promise<void> => {
    let updatingQueueCount = 0;
    let resolvePromiseOnDidUpdateAll: () => void;
    let resolvePromiseTimeout = null;

    const checkForPromiseResolve = (): void => {
      console.log(`checkForPromiseResolve`);
      if (updatingQueueCount === 0) {
        resolvePromiseTimeout = window.setTimeout(() => {
          console.log('timeout');
          console.log(`removeEventListener`);
          window.removeEventListener('stencil_componentWillUpdate', stencilComponentWillUpdate);
          window.removeEventListener('stencil_componentDidUpdate', stencilComponentDidUpdate);
          console.log(`resolveOnLoadedPromise`);
          resolvePromiseOnDidUpdateAll();
        }, 30);
      }
    };

    const stencilComponentWillUpdate = () => {
      console.log(`stencilComponentWillUpdate`);
      updatingQueueCount++;
      if (resolvePromiseTimeout) window.clearTimeout(resolvePromiseTimeout);
    }

    const stencilComponentDidUpdate = () => {
      console.log(`stencilComponentDidUpdate`);
      updatingQueueCount--;
      checkForPromiseResolve();
    }

    console.log(`addEventListener`);
    window.addEventListener('stencil_componentWillUpdate', stencilComponentWillUpdate);
    window.addEventListener('stencil_componentDidUpdate', stencilComponentDidUpdate);

    checkForPromiseResolve();

    await new Promise(resolve => resolvePromiseOnDidUpdateAll = resolve);
  });
};
