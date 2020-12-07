import { Page } from 'puppeteer';

export const waitForComponentsReady = async (page: Page): Promise<void> => {
  await page.evaluate(() => (window as any).porscheDesignSystem.componentsReady());
};

export const waitForStencilLifecycle = async (page: Page): Promise<void> => {
  await page.waitForTimeout(40); // TODO: remove this once component lifecycles are working as intended
  await page.evaluate(
    (): Promise<any> => {
      (window as any).checkComponentsUpdatedPromise();
      return (window as any).componentsUpdatedPromise;
    }
  );
};
