import { Page } from 'puppeteer';

export const waitForComponentsReady = async (page: Page): Promise<void> => {
  await page.evaluate(() => (window as any).porscheDesignSystem.componentsReady());
};

export const waitForStencilLifecycle = async (page: Page): Promise<void> => {
  await page.waitForTimeout(40); // TODO: remove this once component lifecycles are working as intended
  await page.evaluate(
    (): Promise<any> => {
      (window as any).checkComponentsUpdatedPromise(); // see setContentWithDesignSystem(), need to check if Promise can be resolved initially
      return (window as any).componentsUpdatedPromise; // is resolved by checkComponentsUpdatedPromise() with some delay
    }
  );
};

type Lifecycle =
  | 'stencil_componentWillLoad'
  | 'stencil_componentDidLoad'
  | 'stencil_componentWillUpdate'
  | 'stencil_componentDidUpdate';
export const getLifecycleStatus = async (page: Page, type: Lifecycle): Promise<string[]> => {
  return await page.evaluate((type: Lifecycle) => {
    return window[type];
  }, type);
};
