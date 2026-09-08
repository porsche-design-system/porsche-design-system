import { type Page } from '@playwright/test';

export const waitForComponentsReady = async (page: Page): Promise<number> => {
  await page.waitForFunction(async () => (await (window as any).porscheDesignSystem.componentsReady()) > 0);
  return page.evaluate(() => (window as any).porscheDesignSystem.componentsReady());
};

export const waitForComponentsReadyWithinIFrames = async (page: Page): Promise<void> => {
  return page.evaluate(() => (window as any).porscheDesignSystem.waitForComponentsReadyWithinIFrames());
};

export type PrefersColorScheme = 'light' | 'dark';
type SetupScenarioOptions = {
  javaScriptDisabled?: boolean;
  forcedColorsEnabled?: boolean;
  prefersColorScheme?: PrefersColorScheme;
  scalePageFontSize?: boolean;
  emulateMediaPrint?: boolean;
  forcePseudoState?: 'focus' | 'hover';
};

export const setupScenario = async (
  page: Page,
  url: string,
  viewportWidth: number,
  options?: SetupScenarioOptions
): Promise<void> => {
  const {
    javaScriptDisabled,
    forcedColorsEnabled,
    prefersColorScheme,
    scalePageFontSize,
    forcePseudoState,
  }: SetupScenarioOptions = {
    javaScriptDisabled: false,
    forcedColorsEnabled: false,
    prefersColorScheme: undefined,
    scalePageFontSize: false,
    forcePseudoState: undefined,
    ...options,
  };
  if (javaScriptDisabled) {
    const cdpSession = await page.context().newCDPSession(page);
    await cdpSession.send('Emulation.setScriptExecutionDisabled', {
      value: javaScriptDisabled,
    });
  }

  if (forcedColorsEnabled || prefersColorScheme) {
    await page.emulateMedia({
      forcedColors: forcedColorsEnabled ? 'active' : 'none',
      colorScheme: prefersColorScheme || 'light',
    });
  }

  if (scalePageFontSize) {
    const cdpSession = await page.context().newCDPSession(page);
    await cdpSession.send('Page.setFontSizes', {
      fontSizes: {
        standard: 32,
        fixed: 48,
      },
    });
  }

  await page.setViewportSize({ width: viewportWidth, height: 600 });

  await page.goto(url);

  // we need to have the full document height containing all iframes, otherwise iframes might get loaded lazy,
  // which causes componentsReadyWithinIFrames() to never resolve
  await page.setViewportSize({
    width: viewportWidth,
    height: await page.evaluate(() => document.body.clientHeight),
  });

  await waitForComponentsReady(page);
  await waitForComponentsReadyWithinIFrames(page);

  if (forcePseudoState) {
    const client = await page.context().newCDPSession(page);

    await client.send('DOM.enable');
    await client.send('CSS.enable');

    // For hover, we target all elements; for focus, only focusable elements
    const selectors =
      forcePseudoState === 'focus'
        ? [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
            'summary',
          ]
        : ['*'];

    async function forcePseudoStateInDocument(docNodeId: number): Promise<void> {
      for (const selector of selectors) {
        try {
          const { nodeIds } = await client.send('DOM.querySelectorAll', {
            nodeId: docNodeId,
            selector: selector,
          });

          for (const foundNodeId of nodeIds) {
            try {
              await client.send('CSS.forcePseudoState', {
                nodeId: foundNodeId,
                forcedPseudoClasses:
                  forcePseudoState === 'focus'
                    ? ['focus', 'focus-visible']
                    : forcePseudoState === 'hover'
                      ? ['hover']
                      : [],
              });
            } catch (e) {
              // Element might not support pseudo-states
            }
          }
        } catch (e) {
          // Selector might not be valid in this context
        }
      }
    }

    async function traverseAndForcePseudoState(node: any): Promise<void> {
      if (!node) {
        return;
      }

      if (node.nodeId) {
        await forcePseudoStateInDocument(node.nodeId);
      }

      // Handle content documents (iframes)
      if (node.contentDocument) {
        await traverseAndForcePseudoState(node.contentDocument);
      }

      // Traverse shadow roots
      if (node.shadowRoots) {
        for (const shadowRoot of node.shadowRoots) {
          await traverseAndForcePseudoState(shadowRoot);
        }
      }

      // Traverse children
      if (node.children) {
        for (const child of node.children) {
          await traverseAndForcePseudoState(child);
        }
      }
    }

    const { root } = await client.send('DOM.getDocument', { depth: -1, pierce: true });
    await traverseAndForcePseudoState(root);
  }

  // PDS components have bootstrapped in the meantime which might have changed the document height
  await page.setViewportSize({
    width: viewportWidth,
    height: await page.evaluate(() => document.body.clientHeight), // TODO: why dynamic based on content here but fixed 600 everywhere else?
  });
};
