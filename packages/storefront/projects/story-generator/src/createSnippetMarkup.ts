import type { FrameworkMarkup } from '@porsche-design-system/shared';
import type { ElementConfig, HTMLTagOrComponent } from './element';
import { generateAngularMarkup } from './generateAngularMarkup';
import { generateReactMarkup } from './generateReactMarkup';
import { generateVanillaJsMarkup } from './generateVanillaJsMarkup';
import { generateVueMarkup } from './generateVueMarkup';
import type { StoryState } from './story';

/**
 * Generates bare markup for all supported frameworks — the same element configs as
 * `getStoryMarkup` with `output: 'example'`, but without the runnable-file scaffolding (HTML document, React/Angular
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
