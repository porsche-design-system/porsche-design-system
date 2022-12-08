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
