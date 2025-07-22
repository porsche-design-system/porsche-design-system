import { CodeBlock } from '@/components/playground/CodeBlock';
import type { PartialCall, PartialLocation, Partials } from '@/models/partials';
import { getAngularPartialExample } from '@/utils/partials/getAngularPartialExample';
import { getNextPartialExample } from '@/utils/partials/getNextPartialExample';
import { getReactPartialExample } from '@/utils/partials/getReactPartialExample';
import { getVanillaJsPartialExample } from '@/utils/partials/getVanillaJsPartialExample';
import { getVuePartialExample } from '@/utils/partials/getVuePartialExample';
import type React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { H3, P } from '../../../mdx-components';

type PartialDocsProps = {
  name: Partials;
  location: PartialLocation;
  partialCalls: PartialCall[];
};

export const PartialDocs = ({ name, location, partialCalls }: PartialDocsProps) => {
  // Apply some basic formatting to make the output easier readable
  const formatPartial = (partial: unknown): string => {
    if (typeof partial === 'string') {
      return partial.replace(/(>)/g, '>\n').replace(/(<\/)/g, '\n</');
    }
    return String(partial);
  };

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
      <H3>Output</H3>
      <P>The result of this partial looks like this:</P>
      <SyntaxHighlighter
        className="markup select-none"
        language="html"
        useInlineStyles={false}
        codeTagProps={{ tabIndex: 0 }}
      >
        {partialCalls
          .map(({ comment, params }) => {
            const paramObj = Object.fromEntries(params.map(({ key, value }) => [key, value]));
            const partialResult = require('@porsche-design-system/components-react/partials')[name](paramObj);
            return `${comment ? `// ${comment}\n` : ''}${formatPartial(partialResult)}`;
          })
          .join('\n')}
      </SyntaxHighlighter>
    </>
  );
};
