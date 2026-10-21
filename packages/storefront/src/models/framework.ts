import {
  FRAMEWORKS,
  type Framework,
  type FrameworkName,
  type FrameworkSuffix,
  frameworkNameMap,
  frameworkSuffixMap,
  getWrapperPackageName,
  type WrapperPackageName,
} from '@porsche-design-system/shared';
import { getSkillName, type SkillId } from '@porsche-design-system/skills/registry';

/** Next.js is offered as a tab variant of React where a page has Next.js specific content. */
export const FRAMEWORKS_WITH_NEXT = [...FRAMEWORKS, 'next'] as const;
export type FrameworkWithNext = (typeof FRAMEWORKS_WITH_NEXT)[number];

export const isFrameworkWithNext = (value: unknown): value is FrameworkWithNext =>
  FRAMEWORKS_WITH_NEXT.includes(value as FrameworkWithNext);

export const frameworkWithNextNameMap = {
  ...frameworkNameMap,
  next: 'Next',
} as const satisfies Record<FrameworkWithNext, string>;

/** Next.js builds on the React package, so it shares everything that is framework- rather than tab-specific. */
export const resolveFramework = (framework: FrameworkWithNext): Framework =>
  framework === 'next' ? 'react' : framework;

export type FrameworkRenderContext = {
  framework: Framework;
  frameworkName: FrameworkName;
  frameworkSuffix: FrameworkSuffix;
  componentPackageName: WrapperPackageName;
  componentPackageWindowsPath: `@porsche-design-system\\components-${FrameworkSuffix}`;
  getSkillName: (skill: SkillId) => ReturnType<typeof getSkillName<SkillId, Framework>>;
};

export const getFrameworkRenderContext = (framework: Framework): FrameworkRenderContext => {
  const frameworkSuffix = frameworkSuffixMap[framework];

  return {
    framework,
    frameworkName: frameworkNameMap[framework],
    frameworkSuffix,
    componentPackageName: getWrapperPackageName(framework),
    componentPackageWindowsPath: `@porsche-design-system\\components-${frameworkSuffix}`,
    getSkillName: (skill) => getSkillName(skill, framework),
  };
};

export const resolveFrameworkValues = <T>(resolve: (context: FrameworkRenderContext) => T): Record<Framework, T> =>
  Object.fromEntries(
    FRAMEWORKS.map((framework) => [framework, resolve(getFrameworkRenderContext(framework))])
  ) as Record<Framework, T>;
