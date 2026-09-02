import type { Framework, FrameworkMarkup } from '@porsche-design-system/shared';
import { getSkillName, type SkillFramework, type SkillId } from '@porsche-design-system/skills/registry';

export type FrameworkConfiguratorMarkup = {
  [key in Framework]: {
    imports?: string;
    states?: string | undefined; // Can be useState, ref or const
    eventHandlers?: string | undefined; // Can be functions or eventListeners
    markup: string | undefined; // The actual markup
    style?: string | undefined; // The style tag (needs to be separate for vue)
  };
};

export type FrameworkWithNext = Framework | 'next';

/** Every supported framework, in the order code examples offer them. */
export const frameworks = ['vanilla-js', 'angular', 'react', 'vue'] as const satisfies Framework[];

/** Next.js builds on the React package, so it shares everything that is framework- rather than tab-specific. */
export const resolveFramework = (framework: FrameworkWithNext): Framework =>
  framework === 'next' ? 'react' : framework;

/** Suffix the packages and skills of a framework are named after, e.g. `pds-knowledge-js` for Vanilla JS. */
export const frameworkSuffixMap = {
  'vanilla-js': 'js',
  angular: 'angular',
  react: 'react',
  vue: 'vue',
} as const satisfies Record<Framework, SkillFramework>;

export const frameworkNameMap = {
  'vanilla-js': 'Vanilla JS',
  angular: 'Angular',
  react: 'React',
  vue: 'Vue',
  next: 'Next',
} as const satisfies Record<FrameworkWithNext, string>;

export type FrameworkSuffix = (typeof frameworkSuffixMap)[Framework];
export type FrameworkName = (typeof frameworkNameMap)[Framework];

export type FrameworkRenderContext = {
  framework: Framework;
  frameworkName: FrameworkName;
  frameworkSuffix: FrameworkSuffix;
  componentPackageName: `@porsche-design-system/components-${FrameworkSuffix}`;
  componentPackageWindowsPath: `@porsche-design-system\\components-${FrameworkSuffix}`;
  getSkillName: (skill: SkillId) => ReturnType<typeof getSkillName<SkillId, FrameworkSuffix>>;
};

export const getFrameworkRenderContext = (framework: Framework): FrameworkRenderContext => {
  const frameworkSuffix = frameworkSuffixMap[framework];

  return {
    framework,
    frameworkName: frameworkNameMap[framework],
    frameworkSuffix,
    componentPackageName: `@porsche-design-system/components-${frameworkSuffix}`,
    componentPackageWindowsPath: `@porsche-design-system\\components-${frameworkSuffix}`,
    getSkillName: (skill) => getSkillName(skill, frameworkSuffix),
  };
};

export const resolveFrameworkValues = <T>(resolve: (context: FrameworkRenderContext) => T): Record<Framework, T> =>
  Object.fromEntries(
    frameworks.map((framework) => [framework, resolve(getFrameworkRenderContext(framework))])
  ) as Record<Framework, T>;

export const frameworkRenderContextMap = resolveFrameworkValues((context) => context);
