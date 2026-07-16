import type { StoryState } from '@/models/story';
import type { ElementConfig, HTMLTagOrComponent } from '@/utils/generator/generator';

/** Allows host-level aria-* attributes used in accessibility anti-pattern examples. */
export type A11yHostAttributes = {
  [Attribute in `aria-${string}`]?: string | boolean;
} & {
  role?: string;
};

export type A11yElementConfig<T extends HTMLTagOrComponent> = Omit<ElementConfig<T>, 'properties'> & {
  properties?: ElementConfig<T>['properties'] & A11yHostAttributes & Record<string, unknown>;
};

/** Story whose markup is generated at render time. */
export type A11yIntegrationMarkup = {
  name?: string;
  state?: StoryState<HTMLTagOrComponent>;
  generator: (
    state?: StoryState<HTMLTagOrComponent>
  ) => (string | A11yElementConfig<HTMLTagOrComponent> | undefined)[];
};

export type A11yIntegrationExample = {
  title: string;
  anti: A11yIntegrationMarkup;
  recommended: A11yIntegrationMarkup;
};
