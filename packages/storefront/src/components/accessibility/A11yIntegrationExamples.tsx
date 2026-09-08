import type { Framework } from '@porsche-design-system/shared';
import { H2 } from '@/components/common/MdxTypography';
import type { AccessibilityExample, ExamplePayload } from '@/models/accessibilityMeta';
import { resolveFrameworkValues } from '@/models/framework';
import { resolveExamplePayload } from '@/utils/generator/resolveExamplePayload';
import { A11yIntegrationExamplesClient, type ResolvedAccessibilityExample } from './A11yIntegrationExamplesClient';

const resolveFrameworkMarkup = (
  payload: ExamplePayload,
  tag: string,
  key: string,
  side: 'antiPattern' | 'recommended'
): Record<Framework, string> =>
  resolveFrameworkValues(({ framework }) => resolveExamplePayload(payload, framework, { tag, key, side, framework }));

type A11yIntegrationExamplesProps = {
  // Component tag the examples belong to, e.g. `p-button`; only used to identify the source of a
  // resolution failure.
  tag: string;
  examples: Record<string, AccessibilityExample>;
};

/**
 * Resolves every pair's snippet markup on the server — failing the build on an empty or imperative
 * variant — and passes only serializable strings to the client-side framework selector. Snippets
 * carry no scaffolding, so they are color-scheme independent and resolved once per framework.
 */
export const A11yIntegrationExamples = ({ tag, examples }: A11yIntegrationExamplesProps) => {
  const resolvedExamples: ResolvedAccessibilityExample[] = Object.entries(examples).map(
    ([key, { name, antiPattern, recommended }]) => ({
      key,
      name,
      antiPattern: resolveFrameworkMarkup(antiPattern, tag, key, 'antiPattern'),
      recommended: resolveFrameworkMarkup(recommended, tag, key, 'recommended'),
    })
  );

  if (resolvedExamples.length === 0) {
    return null;
  }

  return (
    <>
      <H2>Integration examples</H2>
      <A11yIntegrationExamplesClient examples={resolvedExamples} />
    </>
  );
};
