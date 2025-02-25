import { CodeBlock } from '@/components/playground/CodeBlock';
import type { PartialLocation, PartialParam, Partials } from '@/models/partials';
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
  params: PartialParam[];
};

export const PartialDocs = ({ name, location, params }: PartialDocsProps) => {
  return (
    <>
      <CodeBlock
        frameworkMarkup={{
          'vanilla-js': getVanillaJsPartialExample(name, location, params),
          angular: getAngularPartialExample(name, location, params),
          react: getReactPartialExample(name, location, params),
          vue: getVuePartialExample(name, location, params),
          next: getNextPartialExample(name),
        }}
      />
      <PHeading tag="h3" size="large" className="mt-lg mb-md max-w-prose">
        Output
      </PHeading>
      {/* @ts-expect-error: Suppress type incompatibility */}
      <SyntaxHighlighter className="markup select-none" language="html" useInlineStyles={false}>
        {params
          .map((param) => `${param.comment ? `// ${param.comment}\n` : ''}${getComponentChunkLinks(param.options)}`)
          .join('\n')}
      </SyntaxHighlighter>
    </>
  );
};
