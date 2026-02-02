import type { Framework } from '@porsche-design-system/shared';
import type { Story, StoryState } from '@/models/story';
import type { StorefrontColorScheme } from '@/models/theme';
import { generateAngularMarkup, getAngularCode } from '@/utils/generator/generateAngularMarkup';
import { generateReactMarkup, getReactCode } from '@/utils/generator/generateReactMarkup';
import { generateVanillaJsMarkup, getVanillaJsCode } from '@/utils/generator/generateVanillaJsMarkup';
import { generateVueMarkup, getVueCode } from '@/utils/generator/generateVueMarkup';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';

/**
 * Generates the appropriate StackBlitz markup for a given story and framework.
 *
 * @param {Story<HTMLTagOrComponent>} story - The story object containing the component or HTML tag.
 * @param {StoryState<HTMLTagOrComponent>} storyState - The state of the story, used to generate dynamic content.
 * @param {Framework} storefrontFramework - The framework for which the markup should be generated.
 * @param {StorefrontColorScheme} storefrontTheme - The theme to apply, relevant especially for vanilla-js.
 * @returns {string} - The generated markup/code for the specified framework.
 * @throws {Error} - Throws an error if the provided framework is unsupported.
 */
export const createStackblitzMarkupFromStory = (
  story: Story<HTMLTagOrComponent>,
  storyState: StoryState<HTMLTagOrComponent>,
  storefrontFramework: Framework,
  storefrontTheme: StorefrontColorScheme
): string => {
  const generatedStory = story.generator(storyState);

  // Generate the markup from the story and get the code
  switch (storefrontFramework) {
    case 'vanilla-js':
      return getVanillaJsCode(generateVanillaJsMarkup(generatedStory), {
        isFullConfig: true,
        theme: storefrontTheme,
      });
    case 'react':
      return getReactCode(generateReactMarkup(generatedStory, storyState));
    case 'angular':
      return getAngularCode(generateAngularMarkup(generatedStory, storyState));
    case 'vue':
      return getVueCode(generateVueMarkup(generatedStory, storyState));
    default:
      throw new Error(`Unsupported framework: ${storefrontFramework}`);
  }
};
