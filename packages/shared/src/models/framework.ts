/**
 * The one framework vocabulary of the repository. A framework is identified by its `Framework` key everywhere (the
 * Storefront, the examples, the Markdown and the skills); its name and suffix are looked up here instead of being
 * mapped again per package.
 */

/** Every framework a wrapper package is published for, in the order the Storefront offers them. */
export const FRAMEWORKS = ['vanilla-js', 'angular', 'react', 'vue'] as const;
export type Framework = (typeof FRAMEWORKS)[number];
export type FrameworkMarkup = { [key in Framework]?: string };

export const isFramework = (value: unknown): value is Framework => FRAMEWORKS.includes(value as Framework);

export const frameworkNameMap = {
  'vanilla-js': 'Vanilla JS',
  angular: 'Angular',
  react: 'React',
  vue: 'Vue',
} as const satisfies Record<Framework, string>;

export type FrameworkName<TFramework extends Framework = Framework> = (typeof frameworkNameMap)[TFramework];

/** Suffix the wrapper package and the skills of a framework are named after, e.g. `pds-knowledge-js` for Vanilla JS. */
export const frameworkSuffixMap = {
  'vanilla-js': 'js',
  angular: 'angular',
  react: 'react',
  vue: 'vue',
} as const satisfies Record<Framework, string>;

export type FrameworkSuffix<TFramework extends Framework = Framework> = (typeof frameworkSuffixMap)[TFramework];

export type WrapperPackageName<TFramework extends Framework = Framework> =
  `@porsche-design-system/components-${FrameworkSuffix<TFramework>}`;

export const getWrapperPackageName = <TFramework extends Framework>(
  framework: TFramework
): WrapperPackageName<TFramework> => `@porsche-design-system/components-${frameworkSuffixMap[framework]}`;
