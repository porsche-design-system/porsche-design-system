import { type Page } from '@playwright/test';
import { getInitialStyles } from '@porsche-design-system/components-js/partials';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { type Theme } from '@porsche-design-system/utilities-v2';

export const baseThemes = ['light', 'dark'] as const;
export const baseSchemes = ['light', 'dark'] as const;
export const baseViewportWidth = 1000;
export const baseViewportWidths = [320, 480, 760, 1300, 1760] as const;

export const waitForComponentsReady = (page: Page): Promise<number> => {
  return page.evaluate(() => (window as any).porscheDesignSystem.componentsReady());
};

export type PrefersColorScheme = 'light' | 'dark';
type Options = {
  javaScriptDisabled?: boolean;
  forcedColorsEnabled?: boolean;
  prefersColorScheme?: PrefersColorScheme;
  scalePageFontSize?: boolean;
  forceComponentTheme?: Theme;
};

export const setupScenario = async (
  page: Page,
  url: string,
  viewportWidth: number,
  options?: Options
): Promise<void> => {
  const {
    javaScriptDisabled,
    forcedColorsEnabled,
    prefersColorScheme,
    scalePageFontSize,
    forceComponentTheme,
  }: Options = {
    javaScriptDisabled: false,
    forcedColorsEnabled: false,
    prefersColorScheme: undefined,
    scalePageFontSize: false,
    forceComponentTheme: undefined,
    ...options,
  };
  const themeableComponents: TagName[] = TAG_NAMES.filter((el) => getComponentMeta(el).isThemeable);

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
    await page.evaluate(
      ({ forceComponentTheme, themeableComponents }) => {
        document
          .querySelectorAll(themeableComponents.join())
          .forEach((el) => el.setAttribute('theme', forceComponentTheme));
        document.querySelectorAll('.playground').forEach((el) => {
          el.classList.remove('light', 'dark', 'auto');
          el.classList.add(forceComponentTheme);
        });
      },
      { forceComponentTheme, themeableComponents }
    );
    await waitForComponentsReady(page);
  }

  if (scalePageFontSize) {
    await page.evaluate(() => {
      document.querySelector('html').style.fontSize = '200%';
    });
  }

  await page.setViewportSize({
    width: viewportWidth,
    height: await page.evaluate(() => document.body.clientHeight),
  });
};

type Options2 = {
  injectIntoHead?: string;
  prefersColorScheme?: PrefersColorScheme;
  forceComponentTheme?: Theme;
};

export const setContentWithDesignSystem = async (page: Page, content: string, opts?: Options2): Promise<void> => {
  const { injectIntoHead, prefersColorScheme, forceComponentTheme }: Options2 = {
    injectIntoHead: '',
    prefersColorScheme: undefined,
    forceComponentTheme: undefined,
    ...opts,
  };
  const themeableComponents: TagName[] = TAG_NAMES.filter((el) => getComponentMeta(el).isThemeable);

  if (prefersColorScheme) {
    const cdpSession = await page.context().newCDPSession(page);
    await cdpSession.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-color-scheme', value: prefersColorScheme || 'light' }],
    });
  }

  const initialStyles = getInitialStyles({ format: 'html' });
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
        <script type="text/javascript">porscheDesignSystem.load();</script>
        <div id="app">${content}</div>
      </body>
    </html>`
  );
  await waitForComponentsReady(page);

  if (forceComponentTheme) {
    await page.evaluate(
      ({ forceComponentTheme, themeableComponents }) => {
        document
          .querySelectorAll(themeableComponents.join())
          .forEach((el) => el.setAttribute('theme', forceComponentTheme));
        document.querySelectorAll('.playground').forEach((el) => {
          el.classList.remove('light', 'dark', 'auto');
          el.classList.add(forceComponentTheme);
        });
      },
      { forceComponentTheme, themeableComponents }
    );
    await waitForComponentsReady(page);
  }

  await page.setViewportSize({ width: baseViewportWidth, height: 600 });
};
