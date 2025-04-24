import type { StorefrontTheme } from '@/models/theme';
import { getVanillaJsCode } from '@/utils/generator/generateVanillaJsMarkup';
import { patchThemeIntoVanillaJsMarkup } from '@/utils/patchThemeIntoVanillaJsMarkup';
import { splitVanillaJsCode } from '@/utils/splitVanillaJsCode';
import type { Framework, FrameworkMarkup } from '@porsche-design-system/shared';

export const createStackblitzMarkupFromSample = (
  frameworkMarkup: FrameworkMarkup,
  storefrontFramework: Framework,
  storefrontTheme: StorefrontTheme
): string => {
  let stackblitzMarkup = frameworkMarkup[storefrontFramework] ?? '';

  // Since vanilla-js code samples only consist of the markup and a script tag without the wrapping html page, we need to split it up and build everything together
  if (storefrontFramework === 'vanilla-js') {
    const { markup, script } = splitVanillaJsCode(stackblitzMarkup);
    const themedMarkup = patchThemeIntoVanillaJsMarkup(markup, storefrontTheme);
    stackblitzMarkup = getVanillaJsCode(
      { markup: themedMarkup, eventHandlers: script },
      { isFullConfig: true, theme: storefrontTheme }
    );
  }

  return stackblitzMarkup;
};
