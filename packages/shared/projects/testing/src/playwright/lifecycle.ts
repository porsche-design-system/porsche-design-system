import type { Page } from '@playwright/test';
import type { TagName } from '@porsche-design-system/shared';

const LIFECYCLE_STATUS_KEY = 'stencilLifecycleStatus';

type LifecycleHook = 'componentWillLoad' | 'componentDidLoad' | 'componentWillUpdate' | 'componentDidUpdate';
type LifecycleStatus = Record<LifecycleHook, Partial<Record<TagName | 'all', number>>>;

// Counts every Stencil lifecycle event per tag name into window[LIFECYCLE_STATUS_KEY], see getLifecycleStatus().
export const getLifecycleTrackingScript = (logStatement = ''): string => `          // initial status
          window['${LIFECYCLE_STATUS_KEY}'] = {
            componentWillLoad: { all: 0 },
            componentDidLoad: { all: 0 },
            componentWillUpdate: { all: 0 },
            componentDidUpdate: { all: 0 }
          };

          const hooks = ['componentWillLoad', 'componentDidLoad', 'componentWillUpdate', 'componentDidUpdate'];
          for (let hook of hooks) {
            window.addEventListener(\`stencil_\${hook}\`, (e) => {
              const eventName = e.type.replace('stencil_', '');
              const tagName = e.composedPath()[0].tagName.toLowerCase();

              if (window['${LIFECYCLE_STATUS_KEY}'][eventName][tagName] === undefined) {
                // to ensure the lifecycle hook is not undefined in our e2e test, we have to initialize it
                for (const hook of hooks) {
                  window['${LIFECYCLE_STATUS_KEY}'][hook][tagName] = 0;
                }
              }

              window['${LIFECYCLE_STATUS_KEY}'][eventName][tagName]++;
              window['${LIFECYCLE_STATUS_KEY}'][eventName].all++;

              // Debug helper
              // console.log(JSON.stringify(window['${LIFECYCLE_STATUS_KEY}']));

              ${logStatement}
            });
          };`;

export const getLifecycleStatus = async (page: Page): Promise<LifecycleStatus> => {
  return await page.evaluate((LIFECYCLE_STATUS_KEY: string) => {
    return (window as unknown as Record<string, LifecycleStatus>)[LIFECYCLE_STATUS_KEY];
  }, LIFECYCLE_STATUS_KEY);
};
