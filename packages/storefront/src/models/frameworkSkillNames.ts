import type { Framework } from '@porsche-design-system/shared';
import { frameworks } from '@/models/framework';

/** Suffix the packages and skills are named after, e.g. `pds-knowledge-js` for Vanilla JS. */
const frameworkSuffixMap: Record<Framework, string> = {
  'vanilla-js': 'js',
  angular: 'angular',
  react: 'react',
  vue: 'vue',
};

export type FrameworkSkillNames = {
  /** Suffix the packages and skills are named after, e.g. `react`; Vanilla JS resolves to `js`. */
  frameworkSuffix: string;
  /** npm package of the framework, e.g. `@porsche-design-system/components-react`. */
  packageName: string;
  /** Package as a Windows path segment, e.g. `@porsche-design-system\components-react`. */
  packageWindowsPath: string;
  /** Knowledge skill directory of the framework, e.g. `pds-knowledge-react`. */
  skillName: string;
};

export const getFrameworkSkillNames = (framework: Framework): FrameworkSkillNames => {
  const frameworkSuffix = frameworkSuffixMap[framework];
  const packageName = `@porsche-design-system/components-${frameworkSuffix}`;

  return {
    frameworkSuffix,
    packageName,
    packageWindowsPath: packageName.replace('/', '\\'),
    skillName: `pds-knowledge-${frameworkSuffix}`,
  };
};

export type FrameworkSnippet = Record<Framework, string>;

/**
 * Builds a documentation snippet for every framework from one template, so pages interpolate the
 * names directly instead of substituting placeholder tokens — a misspelled name is a build error
 * rather than literal text in the rendered snippet.
 *
 * Resolving all frameworks up front keeps the result a plain string map, which is what a server
 * rendered MDX page can hand to the client component that renders the selected variant.
 */
export const resolveFrameworkSnippet = (build: (names: FrameworkSkillNames) => string): FrameworkSnippet =>
  Object.fromEntries(
    frameworks.map((framework) => [framework, build(getFrameworkSkillNames(framework))])
  ) as FrameworkSnippet;
