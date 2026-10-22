import type { ExampleModule } from '@porsche-design-system/examples/module';
import { Fragment, type ReactNode } from 'react';
import { type ExampleHeadingProps, getExampleHeading } from '@/utils/exampleHeading';
import { getExampleMediaPath, getExampleUrl, toDeployedExample } from '@/utils/examples';
import { getBasePath } from '@/utils/getBasePath';
import { H2, H3, P } from '../../elements/Typography';
import { ComponentExamplePlayground } from '../../playground/ComponentExamplePlayground';
import { ComponentStory } from '../../playground/ComponentStory';
import type { BackgroundColor } from '../../playground/Playground';
import { WebsiteViewer } from '../WebsiteViewer/WebsiteViewer';

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

type ExampleProps = ExampleHeadingProps & {
  /** The example, imported by its id: `import form from '@porsche-design-system/examples/components/button/form'`. */
  example: ExampleModule;
  /** The background of a story's or framework example's preview. */
  backgroundColor?: BackgroundColor;
};

/**
 * An example of `@porsche-design-system/examples`: its title as a heading, its description and its preview – a story or
 * a framework example with its code, a pattern or template framed with its project. Accessibility examples are rendered
 * by `A11yIntegrationExamples`. A server component: the page imports the examples it shows, so it loads their stories
 * and previews only, and this hands a client component the one example it renders.
 */
export const Example = ({ example, level, heading, backgroundColor }: ExampleProps) => {
  const exampleHeading = getExampleHeading({ level, heading }, example.title);
  const Level = exampleHeading?.level === 3 ? H3 : H2;
  const title = exampleHeading && <Level>{exampleHeading.text}</Level>;

  switch (example.kind) {
    case 'story': {
      const { Description, story } = example;
      return (
        <Blocks
          blocks={[
            title,
            Description && <Description />,
            <ComponentStory story={story} backgroundColor={backgroundColor} />,
          ]}
        />
      );
    }
    case 'framework': {
      const { Description, Preview } = example;
      return (
        <Blocks
          blocks={[
            title,
            Description && <Description />,
            <ComponentExamplePlayground code={example.code} backgroundColor={backgroundColor}>
              <Preview />
            </ComponentExamplePlayground>,
          ]}
        />
      );
    }
    case 'pattern':
    case 'template': {
      const basePath = getBasePath();
      const page = toDeployedExample(example, basePath);
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
    default:
      throw new Error(
        `[storefront] "${example.id}" is an accessibility example; render it with <A11yIntegrationExamples>`
      );
  }
};
