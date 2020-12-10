import { Page } from 'puppeteer';
import { TagName } from '@porsche-design-system/components/src/tags';

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

type Lifecycle = 'componentWillLoad' | 'componentDidLoad' | 'componentWillUpdate' | 'componentDidUpdate';
export const getLifecycleStatus = async (
  page: Page,
  type: Lifecycle,
  element: TagName = undefined
): Promise<number> => {
  return await page.evaluate(
    (opts: { type: Lifecycle; element: TagName }) => {
      if (opts.element === undefined) {
        return window[`stencil_${opts.type}`].length;
      }
      return window[`stencil_${opts.type}`].filter((v) => v == opts.element).length;
    },
    { type, element }
  );
};
