import { Page } from 'puppeteer';

export const waitForComponentsReady = async (page: Page): Promise<void> => {
  await page.evaluate(() => (window as any).porscheDesignSystem.componentsReady());
};

export const waitForStencilLifecycle = async (page: Page): Promise<void> => {
  await page.evaluate(
    (): Promise<any> => {
      (window as any).checkComponentsUpdatedPromise();
      return (window as any).componentsUpdatedPromise;
    }
  );
};
