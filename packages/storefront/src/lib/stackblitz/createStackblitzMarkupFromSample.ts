import type { Framework, FrameworkMarkup } from '@porsche-design-system/shared';
import type { StorefrontTheme } from '@/models/theme';
import { getVanillaJsCode } from '@/utils/generator/generateVanillaJsMarkup';
import { splitVanillaJsCode } from '@/utils/splitVanillaJsCode';

export const createStackblitzMarkupFromSample = (
  frameworkMarkup: FrameworkMarkup,
  storefrontFramework: Framework,
  storefrontTheme: StorefrontTheme
): string => {
  let stackblitzMarkup = frameworkMarkup[storefrontFramework] ?? '';

  // Since vanilla-js code samples only consist of the markup and a script tag without the wrapping html page, we need to split it up and build everything together
  if (storefrontFramework === 'vanilla-js') {
    const { markup, script } = splitVanillaJsCode(stackblitzMarkup);
    stackblitzMarkup = getVanillaJsCode(
      { markup: markup, eventHandlers: script },
      { isFullConfig: true, theme: storefrontTheme }
    );
  }

  return stackblitzMarkup;
};
