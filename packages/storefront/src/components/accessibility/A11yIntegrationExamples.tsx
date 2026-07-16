import { PHeading, PText } from '@porsche-design-system/components-react/ssr';
import { A11yCodeSnippet } from '@/components/accessibility/A11yCodeSnippet';
import type { A11yIntegrationExample } from '@/models/a11yIntegrationExample';
import { getA11yIntegrationMarkup } from '@/utils/generator/getA11yIntegrationMarkup';

type A11yIntegrationExamplesProps = {
  examples: A11yIntegrationExample[];
};

export const A11yIntegrationExamples = ({ examples }: A11yIntegrationExamplesProps) => (
  <>
    {examples.map(({ title, anti, recommended }) => (
      <>
        <PHeading tag="h3" size="large" className="mt-fluid-lg mb-fluid-md max-w-(--max-width-prose)">
          {title}
        </PHeading>
        <PText className="my-fluid-sm max-w-(--max-width-prose)">❌ Anti-pattern</PText>
        <A11yCodeSnippet code={getA11yIntegrationMarkup(anti)} />
        <PText className="my-fluid-sm max-w-(--max-width-prose)">✅ Recommended</PText>
        <A11yCodeSnippet code={getA11yIntegrationMarkup(recommended)} />
      </>
    ))}
  </>
);
