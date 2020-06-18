import { Page } from 'puppeteer';

export const waitForStencilLifecycle = async (page: Page): Promise<void> => {
  await page.evaluate(async (): Promise<void> => {
    let updatingQueueCount = 0;
    let resolvePromiseOnDidUpdateAll: () => void;
    let resolvePromiseTimeout = null;

    const checkForPromiseResolve = (): void => {
      if (updatingQueueCount === 0) {
        resolvePromiseTimeout = window.setTimeout(() => {
          window.removeEventListener('stencil_componentWillUpdate', stencilComponentWillUpdate);
          window.removeEventListener('stencil_componentDidUpdate', stencilComponentDidUpdate);
          resolvePromiseOnDidUpdateAll();
        }, 40);
      }
    };

    const stencilComponentWillUpdate = () => {
      updatingQueueCount++;
      if (resolvePromiseTimeout) window.clearTimeout(resolvePromiseTimeout);
    }

    const stencilComponentDidUpdate = () => {
      updatingQueueCount--;
      checkForPromiseResolve();
    }

    window.addEventListener('stencil_componentWillUpdate', stencilComponentWillUpdate);
    window.addEventListener('stencil_componentDidUpdate', stencilComponentDidUpdate);

    checkForPromiseResolve();

    await new Promise(resolve => resolvePromiseOnDidUpdateAll = resolve);
  });
};
