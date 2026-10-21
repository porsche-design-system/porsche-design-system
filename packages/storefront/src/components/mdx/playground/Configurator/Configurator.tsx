import type { HTMLTagOrComponent } from '@porsche-design-system/story-generator';
import type { ExampleModule } from '../../examples/Example/Example';
import { ComponentExamplePlayground } from '../ComponentExamplePlayground';
import { ConfiguratorPlayground } from './ConfiguratorPlayground';

type ConfiguratorProps = {
  /** The component's default example: `import buttonDefault from '@porsche-design-system/examples/components/button/default'`. */
  example: ExampleModule;
  /** Shows a framework example's code without its preview. */
  disableDemo?: boolean;
};

/**
 * The configurator page's playground of a component's default example: the configurator with its controls for a story,
 * or the code and preview of a framework example, for a component without a declarative default (e.g. `p-toast`). A
 * server component, which hands the client the stories of this one example.
 */
export const Configurator = ({ example, disableDemo }: ConfiguratorProps) => {
  const { story, slotStories, controlledStory, controlledSlotStories, Preview } = example;

  if (example.kind === 'framework') {
    return (
      <ComponentExamplePlayground code={example.code}>
        {!disableDemo && Preview && <Preview />}
      </ComponentExamplePlayground>
    );
  }
  if (example.kind !== 'story' || !story) {
    throw new Error(`[storefront] "${example.id}" is no default story or framework example`);
  }

  return (
    <ConfiguratorPlayground
      tagName={`p-${example.id.split('/')[1]}` as HTMLTagOrComponent}
      story={story}
      slotStories={slotStories}
      controlledStory={controlledStory}
      controlledSlotStories={controlledSlotStories}
    />
  );
};
