import type { FrameworkMarkup } from '@porsche-design-system/shared';
import type { StoryState } from '@/models/story';
import { generateAngularMarkup } from '@/utils/generator/generateAngularMarkup';
import { generateReactMarkup } from '@/utils/generator/generateReactMarkup';
import { generateVanillaJsMarkup } from '@/utils/generator/generateVanillaJsMarkup';
import { generateVueMarkup } from '@/utils/generator/generateVueMarkup';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

/**
 * Generates bare markup for all supported frameworks — the same element configs as
 * `createFrameworkMarkup`, but without the runnable-file scaffolding (HTML document, React/Angular
 * component shell, Vue SFC blocks) that the `get*Code` helpers add.
 *
 * Used for accessibility anti-pattern/recommended pairs, where the two sides must be diffable at a
 * glance: scaffolding is identical on both sides, so it is pure noise that buries the difference.
 * Because no scaffolding is emitted, the output is also color-scheme independent.
 */
export const createSnippetMarkup = (
  config: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
  storyState: StoryState<HTMLTagOrComponent> | undefined
): FrameworkMarkup => ({
  'vanilla-js': generateVanillaJsMarkup(config, 0).markup ?? '',
  react: generateReactMarkup(config, storyState ?? {}, 0).markup ?? '',
  angular: generateAngularMarkup(config, storyState ?? {}, 0).markup ?? '',
  vue: generateVueMarkup(config, storyState ?? {}, 0).markup ?? '',
});
