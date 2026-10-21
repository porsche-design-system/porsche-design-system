import type { Example as ExampleData } from '@porsche-design-system/examples';
import type { HTMLTagOrComponent, SlotStories, Story } from '@porsche-design-system/story-generator';
import { type ComponentType, Fragment, type ReactNode } from 'react';
import { getExample, getExampleMediaPath, getExampleUrl } from '@/utils/examples';
import { getBasePath } from '@/utils/getBasePath';
import { H2, H3, P } from '../../elements/Typography';
import { ComponentExamplePlayground } from '../../playground/ComponentExamplePlayground';
import { ComponentStory } from '../../playground/ComponentStory';
import type { BackgroundColor } from '../../playground/Playground';
import { A11yIntegrationExamplesClient } from '../A11yIntegrationExamples/A11yIntegrationExamplesClient';
import { WebsiteViewer } from '../WebsiteViewer/WebsiteViewer';

/**
 * An example as `@porsche-design-system/examples/<id>` exports it: its data, and what renders it – a story example's
 * stories, a framework example's live preview, and the description of either.
 */
export type ExampleModule = ExampleData & {
  story?: Story<HTMLTagOrComponent>;
  slotStories?: SlotStories<HTMLTagOrComponent>;
  controlledStory?: Story<HTMLTagOrComponent>;
  controlledSlotStories?: SlotStories<HTMLTagOrComponent>;
  Preview?: ComponentType;
  Description?: ComponentType;
};

/**
 * The blocks of an example as MDX renders blocks of a page, a line break between each, so the markup stays that of the
 * MDX the component replaced.
 */
const Blocks = ({ blocks }: { blocks: ReactNode[] }) =>
  blocks.filter(Boolean).map((block, index) => (
    <Fragment key={index}>
      {index > 0 && '\n'}
      {block}
    </Fragment>
  ));

type ExampleProps = {
  /** The example, imported by its id: `import form from '@porsche-design-system/examples/components/button/form'`. */
  example: ExampleModule;
  /** The level of its heading: 3 for an example that belongs to the one before it. */
  level?: 2 | 3;
  /**
   * Its heading where the page names it apart from its title, e.g. "Inline" for "Feedback: Inline", or `false` where
   * the page's own heading names it, as on a page of one example.
   */
  heading?: string | false;
  /** The background of a story's or framework example's preview. */
  backgroundColor?: BackgroundColor;
  /** Shows a framework example's code without its preview. */
  disableDemo?: boolean;
};

/**
 * An example of `@porsche-design-system/examples`, whatever its kind: its title as a heading, its description and its
 * preview – a story or a framework example with its code, a pattern or template framed with its project, an
 * accessibility example as its pair of snippets. A server component: the page imports the examples it shows, so it
 * loads their stories and previews only, and this hands a client component the one example it renders.
 */
export const Example = ({ example, level = 2, heading, backgroundColor, disableDemo }: ExampleProps) => {
  const Level = level === 3 ? H3 : H2;
  const title = heading !== false && <Level>{heading ?? example.title}</Level>;
  const { Description, Preview, story } = example;

  switch (example.kind) {
    case 'story':
      if (!story) {
        throw new Error(`[storefront] the story example "${example.id}" has no story`);
      }
      return (
        <Blocks
          blocks={[
            title,
            Description && <Description />,
            <ComponentStory story={story} backgroundColor={backgroundColor} />,
          ]}
        />
      );
    case 'framework':
      return (
        <Blocks
          blocks={[
            title,
            Description && <Description />,
            <ComponentExamplePlayground code={example.code} backgroundColor={backgroundColor}>
              {!disableDemo && Preview && <Preview />}
            </ComponentExamplePlayground>,
          ]}
        />
      );
    case 'pattern':
    case 'template': {
      const basePath = getBasePath();
      const page = getExample(example.id, basePath);
      return (
        <Blocks
          blocks={[
            title,
            // Description and viewer were one block of the page before, so no line break between them.
            <>
              <P>{page.description}</P>
              <WebsiteViewer
                example={page}
                src={getExampleUrl(page, basePath)}
                mediaPath={getExampleMediaPath(basePath)}
              />
            </>,
          ]}
        />
      );
    }
    case 'accessibility':
      return (
        <A11yIntegrationExamplesClient
          examples={[
            {
              key: example.id,
              name: example.title,
              antiPattern: example.antiPattern,
              recommended: example.recommended,
            },
          ]}
        />
      );
  }
};
