import type { Page } from 'puppeteer';
import type { TagName } from '@porsche-design-system/shared';

export const LIFECYCLE_STATUS_KEY = 'stencilLifecycleStatus';

export const waitForComponentsReady = async (page: Page): Promise<void> => {
  // componentsReady is exposed via index.tsx of react vrt app
  await page.evaluate((): Promise<void> => (window as any).componentsReady());
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
