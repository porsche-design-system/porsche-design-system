import type { Page } from 'puppeteer';
import type { TagName } from '@porsche-design-system/shared';

export const LIFECYCLE_STATUS_KEY = 'stencilLifecycleStatus';

export const waitForComponentsReady = (page: Page): Promise<number> => {
  // componentsReady is exposed via index.tsx of react vrt app
  return page.evaluate(() => (window as any).componentsReady());
};

type LifecycleStatus = {
  [key in LifecycleHook]: { [key in TagName | 'all']?: number };
};

type LifecycleHook = 'componentWillLoad' | 'componentDidLoad' | 'componentWillUpdate' | 'componentDidUpdate';

export const getLifecycleStatus = async (page: Page): Promise<LifecycleStatus> => {
  return await page.evaluate((LIFECYCLE_STATUS_KEY: string) => {
    return (window as any)[LIFECYCLE_STATUS_KEY];
  }, LIFECYCLE_STATUS_KEY);
};

export const trackLifecycleStatus = async (page: Page): Promise<void> => {
  await page.evaluate(() => {
    const script = document.createElement('script');
    script.text = `
      const LIFECYCLE_STATUS_KEY = 'stencilLifecycleStatus';

      // initial status
      window[LIFECYCLE_STATUS_KEY] = {
        componentWillLoad: { all: 0 },
        componentDidLoad: { all: 0 },
        componentWillUpdate: { all: 0 },
        componentDidUpdate: { all: 0 },
      };

      const hooks = ['componentWillLoad', 'componentDidLoad', 'componentWillUpdate', 'componentDidUpdate'];
      for (let hook of hooks) {
        window.addEventListener(\`stencil_\${hook}\`, (e) => {
          const eventName = e.type.replace('stencil_', '');
          const tagName = e.composedPath()[0].tagName.toLowerCase();

          if (window[LIFECYCLE_STATUS_KEY][eventName][tagName] === undefined) {
            // to ensure the lifecycle hook is not undefined in our e2e test, we have to initialize it
            for (const hook of hooks) {
              window[LIFECYCLE_STATUS_KEY][hook][tagName] = 0;
            }
          }

          window[LIFECYCLE_STATUS_KEY][eventName][tagName]++;
          window[LIFECYCLE_STATUS_KEY][eventName].all++;

        });
      }`;
    document.body.appendChild(script);
  });
};
