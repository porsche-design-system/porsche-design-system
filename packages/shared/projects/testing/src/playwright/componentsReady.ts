import type { Page } from '@playwright/test';

// The framework demo apps expose `componentsReady` on `window`; the components-js demo app only on its
// `porscheDesignSystem` global.
type ComponentsReadySource = 'window' | 'porscheDesignSystem';

type WaitForComponentsReadyOptions = {
  source?: ComponentsReadySource;
  // polls until more than 0 components are ready, for pages that load their markup asynchronously
  atLeastOne?: boolean;
};

export const waitForComponentsReady = async (
  page: Page,
  { source = 'window', atLeastOne = false }: WaitForComponentsReadyOptions = {}
): Promise<number> => {
  if (atLeastOne) {
    await page.waitForFunction(
      async (src) => (await (src === 'window' ? (window as any) : (window as any).porscheDesignSystem).componentsReady()) > 0,
      source
    );
  }
  return page.evaluate(
    (src) => (src === 'window' ? (window as any) : (window as any).porscheDesignSystem).componentsReady(),
    source
  );
};

type GotoOptions = {
  source?: ComponentsReadySource;
  delayAfterReady?: number;
};

export const goto = async (page: Page, url: string, { source, delayAfterReady = 0 }: GotoOptions = {}): Promise<void> => {
  await page.goto(url);
  await waitForComponentsReady(page, { source });
  if (delayAfterReady > 0) {
    await new Promise((resolve) => setTimeout(resolve, delayAfterReady));
  }
};
