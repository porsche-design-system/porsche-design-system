import type { FrameworkMarkup } from '@porsche-design-system/shared';
import type { A11yNode, ExamplePayload } from '@/models/accessibilityMeta';
import type { StoryState } from '@/models/story';
import { createSnippetMarkup } from '@/utils/generator/createSnippetMarkup';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';
import { renderExampleComments } from '@/utils/generator/renderExampleComments';

type PayloadContext = {
  tag: string;
  key: string;
  side: string;
  framework: string;
};

/** Structural minimum a payload's story must satisfy to be resolvable. */
type GeneratableStory = {
  state?: StoryState<HTMLTagOrComponent>;
  generator: (state?: StoryState<HTMLTagOrComponent>) => A11yNode[];
};

const describeContext = ({ tag, key, side, framework }: PayloadContext, kind: ExamplePayload['kind']): string =>
  `${tag} example "${key}" ${side} (${kind}, ${framework})`;

/**
 * Resolve one accessibility example payload to bare snippet markup for a single framework, validating
 * the result. Throws — rather than skipping or degrading — identifying the component tag, example key,
 * side and framework, so a missing or empty variant fails the build at its exact source instead of
 * shipping silently blank guidance. Used by the storefront page and by the skill generator.
 *
 * A raw multiline string in a story generator is rejected: an imperative pseudo-code block would sit
 * unhighlighted inside otherwise declarative markup and must instead be authored as a cross-framework
 * `ExampleMarkupSample`. Asides belong in an `A11yComment` node, not in a raw string.
 */
export const resolveExamplePayload = <StoryType extends GeneratableStory>(
  payload: ExamplePayload<StoryType>,
  frameworkKey: keyof FrameworkMarkup,
  context: PayloadContext
): string => {
  let markup: string | undefined;

  if (payload.kind === 'story') {
    const generatedStory = payload.story.generator(payload.story.state);
    if (generatedStory.some((item) => typeof item === 'string' && /[\r\n]/.test(item))) {
      throw new Error(`${describeContext(context, payload.kind)} contains an imperative multiline string`);
    }
    const snippet = createSnippetMarkup(renderExampleComments(generatedStory, frameworkKey), payload.story.state);
    markup = snippet[frameworkKey];
  } else {
    markup = payload.example.frameworkMarkup[frameworkKey];
  }

  if (!markup?.trim()) {
    throw new Error(`${describeContext(context, payload.kind)} produced empty markup`);
  }
  return markup.trim();
};
