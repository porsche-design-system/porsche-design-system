import type { FrameworkExampleModule, StoryExampleModule } from '@porsche-design-system/examples/module';
import type { HTMLTagOrComponent } from '@porsche-design-system/story-generator';
import { ComponentExamplePlayground } from '../ComponentExamplePlayground';
import { ConfiguratorPlayground } from './ConfiguratorPlayground';

type ConfiguratorProps = {
  /** The component's default example: `import buttonDefault from '@porsche-design-system/examples/components/button/default'`. */
  example: StoryExampleModule | FrameworkExampleModule;
  /** Shows a framework example's code without its preview. */
  disableDemo?: boolean;
};

/**
 * The configurator page's playground of a component's default example: the configurator with its controls for a story,
 * or the code and preview of a framework example, for a component without a declarative default (e.g. `p-toast`). A
 * server component, which hands the client the stories of this one example.
 */
export const Configurator = ({ example, disableDemo }: ConfiguratorProps) => {
  switch (example.kind) {
    case 'story': {
      const { story, slotStories, controlledStory, controlledSlotStories } = example;
      return (
        <ConfiguratorPlayground
          tagName={example.components[0] as HTMLTagOrComponent}
          story={story}
          slotStories={slotStories}
          controlledStory={controlledStory}
          controlledSlotStories={controlledSlotStories}
        />
      );
    }
    case 'framework': {
      const { Preview } = example;
      return <ComponentExamplePlayground code={example.code}>{!disableDemo && <Preview />}</ComponentExamplePlayground>;
    }
    default:
      throw new Error(`[storefront] "${(example as { id: string }).id}" is no default story or framework example`);
  }
};
