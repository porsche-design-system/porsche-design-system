import type { ColorScheme, Framework, FrameworkMarkup } from '@porsche-design-system/shared';
import { wrapCode } from '@porsche-design-system/story-generator';
import { splitVanillaJsCode } from '@/utils/splitVanillaJsCode';

export const createStackblitzMarkupFromSample = (
  frameworkMarkup: FrameworkMarkup,
  storefrontFramework: Framework,
  storefrontTheme: ColorScheme
): string => {
  let stackblitzMarkup = frameworkMarkup[storefrontFramework] ?? '';

  // Since vanilla-js code samples only consist of the markup and a script tag without the wrapping html page, we need to split it up and build everything together
  if (storefrontFramework === 'vanilla-js') {
    const { markup, script, scriptAttributes } = splitVanillaJsCode(stackblitzMarkup);
    stackblitzMarkup = wrapCode(
      'vanilla-js',
      { markup, script, scriptAttributes },
      { colorScheme: storefrontTheme, output: 'project' }
    );
  }

  return stackblitzMarkup;
};
