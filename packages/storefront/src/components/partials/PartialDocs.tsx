import { CodeBlock } from '@/components/playground/CodeBlock';
import type { PartialCall, PartialLocation, Partials } from '@/models/partials';
import { getAngularPartialExample } from '@/utils/partials/getAngularPartialExample';
import { getNextPartialExample } from '@/utils/partials/getNextPartialExample';
import { getReactPartialExample } from '@/utils/partials/getReactPartialExample';
import { getVanillaJsPartialExample } from '@/utils/partials/getVanillaJsPartialExample';
import { getVuePartialExample } from '@/utils/partials/getVuePartialExample';
import { getComponentChunkLinks } from '@porsche-design-system/components-react/partials';
import { PHeading } from '@porsche-design-system/components-react/ssr';
import type React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

type PartialDocsProps = {
  name: Partials;
  location: PartialLocation;
  partialCalls: PartialCall[];
};

export const PartialDocs = ({ name, location, partialCalls }: PartialDocsProps) => {
  return (
    <>
      <CodeBlock
        frameworkMarkup={{
          'vanilla-js': getVanillaJsPartialExample(name, location, partialCalls),
          angular: getAngularPartialExample(name, location, partialCalls),
          react: getReactPartialExample(name, location, partialCalls),
          vue: getVuePartialExample(name, location, partialCalls),
          next: getNextPartialExample(name),
        }}
      />
      {/*// TODO: Heading should be in MD or use shared component */}
      <PHeading tag="h3" size="large" className="mt-lg mb-md max-w-prose">
        Output
      </PHeading>
      {/* @ts-expect-error: Suppress type incompatibility */}
      <SyntaxHighlighter className="markup select-none" language="html" useInlineStyles={false}>
        {partialCalls
          .map(
            (call) =>
              `${call.comment ? `// ${call.comment}\n` : ''}${getComponentChunkLinks(...call.params.map(({ key, value }) => ({ [key]: value })))}`
          )
          .join('\n')}
      </SyntaxHighlighter>
    </>
  );
};
