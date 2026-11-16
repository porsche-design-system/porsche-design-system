import type { Frame, Page } from '@playwright/test';

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

// Pages that load the components through the loader partial have no `componentsReady()`, so this polls the DOM.
// At least one `p-*` element is required, so a frame whose document has not loaded yet cannot pass.
export const waitForComponentsHydrated = async (page: Page | Frame): Promise<void> => {
  await page.waitForFunction(() => {
    const pdsElements = Array.from(document.querySelectorAll('*')).filter((element) =>
      element.tagName.startsWith('P-')
    );
    return (
      pdsElements.length > 0 &&
      document.querySelectorAll(':not(:defined)').length === 0 &&
      pdsElements.every((element) => element.classList.contains('hydrated'))
    );
  });
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
