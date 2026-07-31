'use client';

import * as partials from '@porsche-design-system/components-react/partials';
import { CodeBlock, type CodeLanguage } from '@/components/common/CodeBlock';
import { FrameworkTabs } from '@/components/common/FrameworkTabs';
import { H3, P } from '@/components/common/MdxTypography';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import type { FrameworkWithNext } from '@/models/framework';
import type { PartialCall, PartialLocation, Partials } from '@/models/partials';
import { getAngularPartialExample } from '@/utils/partials/getAngularPartialExample';
import { getNextPartialExample } from '@/utils/partials/getNextPartialExample';
import { getReactPartialExample } from '@/utils/partials/getReactPartialExample';
import { getVanillaJsPartialExample } from '@/utils/partials/getVanillaJsPartialExample';
import { getVuePartialExample } from '@/utils/partials/getVuePartialExample';

type PartialDocsProps = {
  name: Partials;
  location: PartialLocation;
  partialCalls: PartialCall[];
};

const frameworkLanguageMap = {
  'vanilla-js': 'javascript',
  angular: 'typescript',
  react: 'typescript',
  vue: 'typescript',
  next: 'typescript',
} as const satisfies Record<FrameworkWithNext, CodeLanguage>;

export const PartialDocs = ({ name, location, partialCalls }: PartialDocsProps) => {
  const { storefrontFramework } = useStorefrontFramework();

  // Apply some basic formatting to make the output easier readable
  const formatPartial = (partial: unknown): string => {
    if (typeof partial === 'string') {
      return partial.replace(/(>)/g, '>\n').replace(/(<\/)/g, '\n</');
    }
    return String(partial);
  };

  const frameworkMarkup: Record<FrameworkWithNext, string> = {
    'vanilla-js': getVanillaJsPartialExample(name, location, partialCalls),
    angular: getAngularPartialExample(name, location, partialCalls),
    react: getReactPartialExample(name, location, partialCalls),
    vue: getVuePartialExample(name, location, partialCalls),
    next: getNextPartialExample(name),
  };

  return (
    <>
      <div className="m-static-md flex gap-fluid-sm justify-between flex-col md:flex-row">
        <FrameworkTabs next={true} label="Select the JavaScript framework for code preview" />
      </div>
      <CodeBlock className="markup" language={frameworkLanguageMap[storefrontFramework]}>
        {frameworkMarkup[storefrontFramework]}
      </CodeBlock>
      <H3>Output</H3>
      <P>The result of this partial looks like this:</P>
      <CodeBlock className="markup select-none" language="html" label={`${name} partial output`}>
        {partialCalls
          .map(({ comment, params }) => {
            const paramObj = Object.fromEntries(params.map(({ key, value }) => [key, value]));
            const partialResult = (partials as any)[name](paramObj);
            return `${comment ? `// ${comment}\n` : ''}${formatPartial(partialResult)}`;
          })
          .join('\n')}
      </CodeBlock>
    </>
  );
};
