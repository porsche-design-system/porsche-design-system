import { type Page } from '@playwright/test';
import {
  getInitialStyles,
  getComponentChunkLinks,
  getIconLinks,
  getFontFaceStylesheet,
  getFontLinks,
} from '@porsche-design-system/components-js/partials';
import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { type Theme } from '@porsche-design-system/utilities-v2';
import { COMPONENT_CHUNK_NAMES } from '../../../../projects/components-wrapper';
import { ICON_NAMES } from '@porsche-design-system/assets';

// TODO: why are the following constants prefixed with base?
export const baseThemes = ['light', 'dark'] as const;
export const baseSchemes = ['light', 'dark'] as const;
export const baseViewportWidth = 1000;
export const baseViewportWidths = [320, 480, 760, 1300, 1760] as const;

const themeableTagNames = (TAG_NAMES as unknown as TagName[]).filter(
  (tagName) => getComponentMeta(tagName).isThemeable
);

const isOrContainsPIcon = (tagName: TagName): boolean => {
  return tagName === 'p-icon' || getComponentMeta(tagName).nestedComponents?.some(isOrContainsPIcon);
};
// const iconChildTagNames = (TAG_NAMES as unknown as TagName[]).filter(isOrContainsPIcon);

export const waitForComponentsReady = async (page: Page): Promise<number> => {
  // this solves a race condition where the html page with the pds markup is loaded async and componentsReady()
  // is called before the markup is initialized, it can resolve early with 0
  await page.waitForFunction(async () => (await (window as any).porscheDesignSystem.componentsReady()) > 0);

  // remove loading="lazy" from icon img elements which might otherwise be missing when a screenshot or pdf is created
  /* const iconUrls = await page.evaluate((iconChildTagNames) => {
    const elementsWithIcons = Array.from(document.querySelectorAll(iconChildTagNames.join(',')));
    const removeIconLazyLoading = (el: HTMLElement): string[] =>
      el.tagName === 'P-ICON' // optional chaining is needed for toast which does not contain `img` element for unknown reasons 🤷‍
        ? (el.shadowRoot.querySelector('img')?.removeAttribute('loading'), [el.shadowRoot.querySelector('img')?.src])
        : Array.from(el.shadowRoot.querySelectorAll(iconChildTagNames.join(',')))
            .map(removeIconLazyLoading)
            .flat();

    return elementsWithIcons.map(removeIconLazyLoading).flat();
  }, iconChildTagNames);

  // NOTE: there is no guarantee that all svg or png assets are already loaded, request interception and something like
  await Promise.all(iconUrls.map((url) => page.waitForResponse(url)) might be a stable solution*/
  return page.evaluate(() => (window as any).porscheDesignSystem.componentsReady());
};

export const waitForComponentsReadyWithinIFrames = async (page: Page): Promise<void> => {
  return page.evaluate(() => (window as any).porscheDesignSystem.waitForComponentsReadyWithinIFrames());
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

      const themeableElements = Array.from(
        document.querySelectorAll<HTMLElement & { theme: Theme }>(themeableTagNames.join())
      );

      // initialize map to detect theme change via stencil_componentDidUpdate event
      (window as any).componentDidUpdateMap = new Map(
        themeableElements.map((el) => [el, el.theme === forceComponentTheme])
      );

      // tweak components
      themeableElements.forEach((el) => {
        el.theme = forceComponentTheme;
      });

      // tweak playgrounds
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
export type Dir = 'ltr' | 'rtl' | 'auto';
type SetupScenarioOptions = {
  javaScriptDisabled?: boolean;
  forcedColorsEnabled?: boolean;
  prefersColorScheme?: PrefersColorScheme;
  scalePageFontSize?: boolean;
  forceComponentTheme?: Theme;
  forceDirMode?: Dir;
  emulateMediaPrint?: boolean;
  revertAutoFocus?: boolean;
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
    forceDirMode,
    revertAutoFocus,
  }: SetupScenarioOptions = {
    javaScriptDisabled: false,
    forcedColorsEnabled: false,
    prefersColorScheme: undefined,
    scalePageFontSize: false,
    forceComponentTheme: undefined,
    forceDirMode: undefined,
    revertAutoFocus: false,
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

  const searchParams = new URLSearchParams();
  if (forceComponentTheme) {
    searchParams.append('theme', forceComponentTheme);
  }
  if (forceDirMode) {
    searchParams.append('dir', forceDirMode);
  }
  const finalUrl = `${url}?${searchParams.toString()}`;
  await page.goto(finalUrl);

  // we need to have the full document height containing all iframes, otherwise iframes might get loaded lazy,
  // which causes componentsReadyWithinIFrames() to never resolve
  await page.setViewportSize({
    width: viewportWidth,
    height: await page.evaluate(() => document.body.clientHeight),
  });

  await waitForComponentsReady(page);
  await waitForComponentsReadyWithinIFrames(page);

  await page.setViewportSize({
    width: viewportWidth,
    height: await page.evaluate(() => document.body.clientHeight), // TODO: why dynamic based on content here but fixed 600 everywhere else?
  });

  if (revertAutoFocus) {
    await page.mouse.click(0, 0); // click top left corner of the page to remove focus
  }
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
    await page.emulateMedia({ colorScheme: prefersColorScheme || 'light' });
  }

  // get rid of spaces as we do during static VRTs
  content = content.replace(/>(\s)*</g, '><');

  const localhost = 'http://localhost:3001';
  const headPartials = [
    getInitialStyles(),
    getComponentChunkLinks({ components: [...COMPONENT_CHUNK_NAMES] }),
    getIconLinks({ icons: [...ICON_NAMES] }),
    // TODO: we should provide inline styles instead for getFontFaceStylesheet(), which is recommended by Lighthouse and we could replace cdn urls by localhost
    // getFontFaceStylesheet(),
    '<link rel="stylesheet" href="http://localhost:3001/styles/font-face.min.css">',
    getFontLinks({ weights: ['regular', 'semi-bold', 'bold'] }),
  ]
    .join('')
    .replace(/https:\/\/cdn\.ui\.porsche\.com?(?:\/porsche-design-system)?/g, localhost);

  // TODO: using getLoaderScript() partial to initialize PDS would be much nicer.
  //  But how to expose componentsReady then `window.porscheDesignSystem.componentsReady = componentsReady;`?
  // const bodyPartials = [getLoaderScript()]
  // .join('')
  // .replace(/"https:\/\/cdn\.ui\.porsche\."\+\("cn"===window\[t\]\?"cn":"com"\)/g, `"${localhost}"`);

  await page.setContent(`<!DOCTYPE html>
<html>
  <head>
    <base href="http://localhost:8575"> <!-- NOTE: we need a base tag so that document.baseURI returns something else than "about:blank" -->
    <script type="text/javascript" src="http://localhost:8575/index.js"></script>
    <link rel="stylesheet" href="assets/styles.css">
    ${headPartials}
    ${injectIntoHead}
  </head>
  <body>
    <div id="app">${content}</div>
    <script type="text/javascript">porscheDesignSystem.load();</script>
  </body>
</html>`);
  await waitForComponentsReady(page);

  if (forceComponentTheme) {
    await waitForForcedComponentTheme(page, forceComponentTheme);
  }

  await page.setViewportSize({ width: baseViewportWidth, height: 600 });
};
