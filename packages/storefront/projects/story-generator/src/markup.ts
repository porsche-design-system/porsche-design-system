import type { Framework } from '@porsche-design-system/shared';
import type { ColorScheme } from './colorScheme';
import { createSnippetMarkup } from './createSnippetMarkup';
import type { HTMLTagOrComponent } from './element';
import { generateAngularMarkup, getAngularCode } from './generateAngularMarkup';
import { generateReactMarkup, getReactCode } from './generateReactMarkup';
import { generateVanillaJsMarkup, getVanillaJsCode } from './generateVanillaJsMarkup';
import { generateVueMarkup, getVueCode } from './generateVueMarkup';
import type { Story, StoryState } from './story';

/**
 * What the markup is wrapped in:
 * - `snippet`: the bare markup, without imports, state or a component around it;
 * - `example`: a file of the framework (an HTML document, a React, Angular or Vue component), as shown in a code block;
 * - `project`: like `example`, but a complete Vanilla JS document to run on its own, e.g. on StackBlitz.
 */
export type MarkupOutput = 'snippet' | 'example' | 'project';

export type StoryMarkupOptions = {
  /** The state to generate the markup for; defaults to the story's own state. */
  state?: StoryState<HTMLTagOrComponent>;
  /** The color scheme class of the Vanilla JS document. */
  colorScheme?: ColorScheme;
  output?: MarkupOutput;
};

/** Generates the markup of a story for every framework. */
export const getStoryMarkup = (
  story: Story<HTMLTagOrComponent>,
  { state = story.state, colorScheme = 'scheme-light', output = 'example' }: StoryMarkupOptions = {}
): Record<Framework, string> => {
  const configs = story.generator(state);

  if (output === 'snippet') {
    return createSnippetMarkup(configs, state) as Record<Framework, string>;
  }

  return {
    'vanilla-js': getVanillaJsCode(generateVanillaJsMarkup(configs), {
      isFullConfig: output === 'project',
      theme: colorScheme,
    }),
    angular: getAngularCode(generateAngularMarkup(configs, state ?? {})),
    react: getReactCode(generateReactMarkup(configs, state ?? {})),
    vue: getVueCode(generateVueMarkup(configs, state ?? {})),
  };
};

export type CodeParts = {
  markup: string;
  /** Script that belongs to the markup, e.g. event listeners of a Vanilla JS example. */
  script?: string;
  /** Attributes of the `<script>` element of a Vanilla JS document, e.g. `type="module"`. */
  scriptAttributes?: string;
};

export type WrapCodeOptions = {
  /** The color scheme class of the Vanilla JS document. */
  colorScheme?: ColorScheme;
  output?: Exclude<MarkupOutput, 'snippet'>;
};

/** Wraps markup that isn't generated from a story in a file of the framework, like `getStoryMarkup` does. */
export const wrapCode = (
  framework: Framework,
  { markup, script, scriptAttributes }: CodeParts,
  { colorScheme = 'scheme-light', output = 'example' }: WrapCodeOptions = {}
): string => {
  switch (framework) {
    case 'vanilla-js':
      return getVanillaJsCode(
        { markup, eventHandlers: script },
        { isFullConfig: output === 'project', theme: colorScheme, scriptAttributes }
      );
    case 'angular':
      return getAngularCode({ markup, eventHandlers: script });
    case 'react':
      return getReactCode({ markup, eventHandlers: script });
    case 'vue':
      return getVueCode({ markup, eventHandlers: script });
  }
};
