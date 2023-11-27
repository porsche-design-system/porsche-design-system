import type { Page } from 'puppeteer';
import type { TagName } from '@porsche-design-system/shared';
import { LIFECYCLE_STATUS_KEY } from './puppeteer-helper';

export const waitForComponentsReady = (page: Page): Promise<number> => {
  return page.evaluate(() => (window as any).porscheDesignSystem.componentsReady());
};

export const waitForStencilLifecycle = async (page: Page): Promise<void> => {
  await page.evaluate((): Promise<number> => {
    (window as any).checkComponentsUpdatedPromise(); // see setContentWithDesignSystem(), need to check if Promise can be resolved initially
    return (window as any).componentsUpdatedPromise; // is resolved by checkComponentsUpdatedPromise() with some delay
  });
};

type LifecycleHook = 'componentWillLoad' | 'componentDidLoad' | 'componentWillUpdate' | 'componentDidUpdate';
type LifecycleStatus = Record<LifecycleHook, Partial<Record<TagName | 'all', number>>>;

export const getLifecycleStatus = async (page: Page): Promise<LifecycleStatus> => {
  return await page.evaluate((LIFECYCLE_STATUS_KEY: string) => {
    return window[LIFECYCLE_STATUS_KEY];
  }, LIFECYCLE_STATUS_KEY);
};
