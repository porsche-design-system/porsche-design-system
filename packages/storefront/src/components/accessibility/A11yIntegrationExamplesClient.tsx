'use client';

import { PText } from '@porsche-design-system/components-react/ssr';
import type { Framework } from '@porsche-design-system/shared';
import { A11yCodeSnippet } from '@/components/accessibility/A11yCodeSnippet';
import { FrameworkTabs } from '@/components/common/FrameworkTabs';
import { H3 } from '@/components/common/MdxTypography';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';

export type CompleteFrameworkMarkup = Record<Framework, string>;

export type ResolvedAccessibilityExample = {
  key: string;
  name: string;
  antiPattern: CompleteFrameworkMarkup;
  recommended: CompleteFrameworkMarkup;
};

/**
 * One framework selector per pair: the anti-pattern and its recommendation are a single teaching
 * unit and must always be read in the same framework. Selection is held in the storefront-wide
 * framework context, so every code block on the page stays in sync.
 */
const A11yExamplePair = ({ name, antiPattern, recommended }: Omit<ResolvedAccessibilityExample, 'key'>) => {
  const { framework } = useStorefrontFramework();

  return (
    <section>
      <H3>{name}</H3>
      <FrameworkTabs
        className="my-fluid-md"
        label={`Select the JavaScript framework for the "${name}" code examples`}
      />
      <PText className="my-fluid-sm max-w-(--max-width-prose)">❌ Anti-pattern</PText>
      <A11yCodeSnippet code={antiPattern[framework]} framework={framework} label={`${name}, anti-pattern`} />
      <PText className="my-fluid-sm max-w-(--max-width-prose)">✅ Recommended</PText>
      <A11yCodeSnippet code={recommended[framework]} framework={framework} label={`${name}, recommended`} />
    </section>
  );
};

export const A11yIntegrationExamplesClient = ({ examples }: { examples: ResolvedAccessibilityExample[] }) =>
  examples.map(({ key, ...example }) => <A11yExamplePair key={key} {...example} />);
