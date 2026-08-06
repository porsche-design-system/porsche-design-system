import * as partials from '@porsche-design-system/components-react/partials';
import { CodeBlock } from '@/components/common/CodeBlock';
import { H3, P } from '@/components/common/MdxTypography';
import { PartialExample } from '@/components/partials/PartialExample';
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

// Apply some basic formatting to make the output easier readable
const formatPartial = (partial: unknown): string =>
  typeof partial === 'string' ? partial.replace(/(>)/g, '>\n').replace(/(<\/)/g, '\n</') : String(partial);

/** Server component on purpose: partials may only be called at build time. */
export const PartialDocs = ({ name, location, partialCalls }: PartialDocsProps) => {
  const frameworkMarkup: Record<FrameworkWithNext, string> = {
    'vanilla-js': getVanillaJsPartialExample(name, location, partialCalls),
    angular: getAngularPartialExample(name, location, partialCalls),
    react: getReactPartialExample(name, location, partialCalls),
    vue: getVuePartialExample(name, location, partialCalls),
    next: getNextPartialExample(name),
  };

  const partialOutput = partialCalls
    .map(({ comment, params }) => {
      const paramObj = Object.fromEntries(params.map(({ key, value }) => [key, value]));
      const partialResult = (partials as any)[name](paramObj);
      return `${comment ? `// ${comment}\n` : ''}${formatPartial(partialResult)}`;
    })
    .join('\n');

  return (
    <>
      <PartialExample frameworkMarkup={frameworkMarkup} />
      <H3>Output</H3>
      <P>The result of this partial looks like this:</P>
      <CodeBlock className="markup select-none" language="html" label={`${name} partial output`}>
        {partialOutput}
      </CodeBlock>
    </>
  );
};
