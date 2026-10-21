import { type Example, type ExampleId, examples } from '@porsche-design-system/examples';
import { H2 } from '../../elements/Typography';
import { A11yIntegrationExamplesClient, type ResolvedAccessibilityExample } from './A11yIntegrationExamplesClient';

type A11yIntegrationExamplesProps = {
  /** The accessibility examples of the component, by id, in their order. */
  examples: Extract<ExampleId, `components/${string}/accessibility/${string}`>[];
};

const toResolved = (id: ExampleId): ResolvedAccessibilityExample => {
  const example = (examples as Partial<Record<ExampleId, Example>>)[id];
  if (example?.kind !== 'accessibility') {
    throw new Error(`[storefront] "${id}" is not an accessibility example of @porsche-design-system/examples`);
  }
  const { title, antiPattern, recommended } = example;
  return { key: id, name: title, antiPattern, recommended };
};

/**
 * The accessibility examples of a component under their heading. Their snippets are resolved when the catalogue is
 * built – failing on an empty or imperative variant – so only serializable strings reach the client-side framework
 * selector. Snippets carry no scaffolding, so they are color-scheme independent.
 */
export const A11yIntegrationExamples = ({ examples: ids }: A11yIntegrationExamplesProps) => {
  if (ids.length === 0) {
    return null;
  }

  return (
    <>
      <H2>Integration examples</H2>
      <A11yIntegrationExamplesClient examples={ids.map(toResolved)} />
    </>
  );
};
