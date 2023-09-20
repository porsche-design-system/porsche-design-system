import { type Page } from '@playwright/test';
import { getInitialStyles } from '@porsche-design-system/components-js/partials';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { type Theme } from '@porsche-design-system/utilities-v2';

// TODO: why are the following constants prefixed with base?
export const baseThemes = ['light', 'dark'] as const;
export const baseSchemes = ['light', 'dark'] as const;
export const baseViewportWidth = 1000;
export const baseViewportWidths = [320, 480, 760, 1300, 1760] as const;

const themeableTagNames = (TAG_NAMES as unknown as TagName[]).filter((el) => getComponentMeta(el).isThemeable);

export const waitForComponentsReady = (page: Page): Promise<number> => {
  return page.evaluate(() => (window as any).porscheDesignSystem.componentsReady());
};

const waitForForcedComponentTheme = async (page: Page, forceComponentTheme: Theme): Promise<void> => {
  await page.evaluate(
    ({ forceComponentTheme, themeableTagNames }) => {
      window.addEventListener('stencil_componentDidUpdate', (e: Event & { target: Element }) => {
        const { target } = e;
        if ((window as any).componentDidUpdateMap.has(target)) {
          (window as any).componentDidUpdateMap.set(target, true);
        }
      });

      const themeableComponents = document.querySelectorAll(themeableTagNames.join());
      (window as any).componentDidUpdateMap = new Map(Array.from(themeableComponents).map((el) => [el, false]));

      // tweak components
      themeableComponents.forEach((el) => el.setAttribute('theme', forceComponentTheme));

      // tweak playground
      document.querySelectorAll('.playground').forEach((el) => {
        el.classList.remove('light', 'dark', 'auto');
        el.classList.add(forceComponentTheme);
      });
    },
    { forceComponentTheme, themeableTagNames }
  );

  await page.waitForFunction(
    () => !Array.from<boolean>((window as any).componentDidUpdateMap.values()).some((didUpdate) => !didUpdate)
  );
};

export type PrefersColorScheme = 'light' | 'dark';
type SetupScenarioOptions = {
  javaScriptDisabled?: boolean;
  forcedColorsEnabled?: boolean;
  prefersColorScheme?: PrefersColorScheme;
  scalePageFontSize?: boolean;
  forceComponentTheme?: Theme;
  emulateMediaPrint?: boolean;
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
    forceComponentTheme,
    emulateMediaPrint,
  }: SetupScenarioOptions = {
    javaScriptDisabled: false,
    forcedColorsEnabled: false,
    prefersColorScheme: undefined,
    scalePageFontSize: false,
    forceComponentTheme: undefined,
    emulateMediaPrint: false,
    ...options,
  };

  if (javaScriptDisabled || forcedColorsEnabled || prefersColorScheme) {
    const cdpSession = await page.context().newCDPSession(page);

    if (javaScriptDisabled) {
      await cdpSession.send('Emulation.setScriptExecutionDisabled', {
        value: javaScriptDisabled,
      });
    }

    // NOTE: 'forced-colors' isn't supported by page.emulateMediaFeatures, yet https://pptr.dev/api/puppeteer.page.emulatemediafeatures
    // also it looks like cdpSession.send() can't be combined with page.emulateMediaFeatures since it affects each other
    // reset or fallback is needed since it is shared across pages, parallel tests are affected by this
    if (forcedColorsEnabled || prefersColorScheme) {
      await cdpSession.send('Emulation.setEmulatedMedia', {
        features: [
          { name: 'forced-colors', value: forcedColorsEnabled ? 'active' : 'none' },
          { name: 'prefers-color-scheme', value: prefersColorScheme || 'light' },
        ],
      });
    }
  }

  await page.setViewportSize({ width: viewportWidth, height: 600 });
  await page.goto(url);
  await waitForComponentsReady(page);

  if (forceComponentTheme) {
    await waitForForcedComponentTheme(page, forceComponentTheme);
  }

  if (scalePageFontSize) {
    await page.evaluate(() => {
      document.querySelector('html').style.fontSize = '200%';
    });
  }

  if (emulateMediaPrint) {
    await page.emulateMedia({ media: 'print' });
  }

  await page.setViewportSize({
    width: viewportWidth,
    height: await page.evaluate(() => document.body.clientHeight),
  });
};

type SetContentWithDesignSystemOptions = {
  injectIntoHead?: string;
  prefersColorScheme?: PrefersColorScheme;
  forceComponentTheme?: Theme;
};

export const setContentWithDesignSystem = async (
  page: Page,
  content: string,
  opts?: SetContentWithDesignSystemOptions
): Promise<void> => {
  const { injectIntoHead, prefersColorScheme, forceComponentTheme }: SetContentWithDesignSystemOptions = {
    injectIntoHead: '',
    prefersColorScheme: undefined,
    forceComponentTheme: undefined,
    ...opts,
  };

  if (prefersColorScheme) {
    const cdpSession = await page.context().newCDPSession(page);
    await cdpSession.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-color-scheme', value: prefersColorScheme || 'light' }],
    });
  }

  const initialStyles = getInitialStyles({ format: 'html' });

  // TODO: is it completely unsupported in playwright? or browser specific?
  // Unsupported media feature: hover
  const initialStylesWithoutMediaQuery = initialStyles
    .replace(/\@media\(hover\:hover\)\{/g, '')
    .replace(
      /a\:hover\{background-color\:rgba\(126,127,130,0.20\)\}\}/g,
      'a:hover{background-color:rgba(126,127,130,0.20)}'
    );

  // get rid of spaces as we do during static VRTs
  content = content.replace(/>(\s)*</g, '><');

  await page.setContent(
    `<!DOCTYPE html>
<html>
  <head>
    <base href="http://localhost:8575"> <!-- NOTE: we need a base tag so that document.baseURI returns something else than "about:blank" -->
    <script type="text/javascript" src="http://localhost:8575/index.js"></script>
    <link rel="stylesheet" href="http://localhost:3001/styles/font-face.min.css">
    <link rel="stylesheet" href="assets/styles.css">
    ${initialStylesWithoutMediaQuery}
    ${injectIntoHead}
  </head>
  <body>
    <div id="app">${content}</div>
    <script type="text/javascript">porscheDesignSystem.load();</script>
  </body>
</html>`
  );
  await waitForComponentsReady(page);

  if (forceComponentTheme) {
    await waitForForcedComponentTheme(page, forceComponentTheme);
  }

  await page.setViewportSize({ width: baseViewportWidth, height: 600 });
};
