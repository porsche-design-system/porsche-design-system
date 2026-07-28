'use client';

import { PLinkPure } from '@porsche-design-system/components-react/ssr';
import type { Framework } from '@porsche-design-system/shared';
import Link from 'next/link';
import SyntaxHighlighter, { type SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { FrameworkTabs } from '@/components/common/FrameworkTabs';
import { useStorefrontFramework } from '@/hooks/useStorefrontFramework';
import { frameworkNameMap, frameworks } from '@/models/framework';
import { type FrameworkSnippet, getFrameworkSkillNames } from '@/models/frameworkSkillNames';

const useSelectedFramework = (): Framework => {
  const { storefrontFramework } = useStorefrontFramework();
  return frameworks.includes(storefrontFramework) ? storefrontFramework : frameworks[0];
};

/**
 * Framework selector for prose pages whose commands and skill names differ per framework. Selection
 * is held in the storefront-wide framework context, so every switch and snippet on the page — and
 * the code examples elsewhere in the storefront — stay in sync.
 */
export const FrameworkSwitch = ({ label }: { label: string }) => {
  const { setStorefrontFramework } = useStorefrontFramework();
  const framework = useSelectedFramework();

  return (
    <FrameworkTabs
      className="my-fluid-md"
      frameworks={frameworks}
      framework={framework}
      onFrameworkChange={setStorefrontFramework}
      label={label}
    />
  );
};

/** Inline skill directory name of the selected framework, e.g. `pds-knowledge-react`. */
export const SkillName = ({ prefix = '' }: { prefix?: string }) => {
  const { skillName } = getFrameworkSkillNames(useSelectedFramework());

  return <code>{`${prefix}${skillName}`}</code>;
};

/** Inline package name of the selected framework, e.g. `@porsche-design-system/components-react`. */
export const SkillPackage = () => {
  const { packageName } = getFrameworkSkillNames(useSelectedFramework());

  return <code>{packageName}</code>;
};

/** Link to the Getting Started guide of the selected framework. */
export const FrameworkGettingStartedLink = () => {
  const framework = useSelectedFramework();

  return (
    <PLinkPure icon="none" underline={true}>
      <Link href={`/developing/${framework}/getting-started`}>{frameworkNameMap[framework]} Getting Started guide</Link>
    </PLinkPure>
  );
};

const languageMap = {
  bash: 'bash',
  json: 'json',
  text: 'plaintext',
} satisfies Record<string, SyntaxHighlighterProps['language']>;

type FrameworkCodeProps = {
  language?: keyof typeof languageMap;
  /** Snippet variants built with `resolveFrameworkSnippet`; the selected framework's is rendered. */
  children: FrameworkSnippet;
};

/**
 * Code block whose content depends on the selected framework. Mirrors the markup the MDX `pre`/`code`
 * mapping produces so it is indistinguishable from a regular fenced code block.
 */
export const FrameworkCode = ({ language = 'text', children }: FrameworkCodeProps) => {
  const framework = useSelectedFramework();

  return (
    <pre className="my-fluid-sm" dir="ltr">
      <code
        className="my-fluid-md p-fluid-md max-h-96 overflow-auto rounded-3xl focus-visible:outline-focus outline outline-solid outline-transparent outline-offset-2"
        tabIndex={0}
      >
        <SyntaxHighlighter
          language={languageMap[language]}
          PreTag="div"
          CodeTag="div"
          showLineNumbers={false}
          useInlineStyles={false}
        >
          {children[framework]}
        </SyntaxHighlighter>
      </code>
    </pre>
  );
};
