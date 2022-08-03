import { convertMarkup } from '@/utils/formatting';
import { themeDark, themeLight } from '@porsche-design-system/utilities-v2';
import { openVanillaJS } from '@/utils/stackblitz/openVanillaJs';
import { openReact } from '@/utils/stackblitz/openReact';
import { openAngular } from '@/utils/stackblitz/openAngular';
import { pascalCase } from 'change-case';
import type { Framework, Theme, ColorScheme } from '@/models';
import type { HeadSorting, HeadAdvanced, DataAdvanced, DataBasic, DataSorting } from '@porsche-design-system/shared';

export type FrameworksWithoutShared = Exclude<Framework, 'shared'>;

type TableHead = { headBasic?: string[]; headSorting?: HeadSorting[]; headAdvanced?: HeadAdvanced[] };
type TableData = { dataBasic?: DataBasic[]; dataSorting?: DataSorting[]; dataAdvanced?: DataAdvanced[] };

export type SharedTableMarkup = TableHead & TableData;

export type StackBlitzFrameworkOpts = Omit<OpenInStackBlitzOpts, 'framework' | 'theme' | 'colorScheme'> & {
  title: string;
  description: string;
  bodyStyles: string;
  reactComponentsToImport?: string;
};

type OpenInStackBlitzOpts = {
  markup: string;
  framework: FrameworksWithoutShared;
  theme: Theme;
  hasFrameworkMarkup: boolean;
  colorScheme: ColorScheme;
  sharedTableMarkup?: SharedTableMarkup;
  additionalDependencies?: string[];
};

export const getBackgroundColor = (theme: Theme, colorScheme: ColorScheme): string => {
  const backgroundBase = themeLight.background.base;
  const backgroundSurface = themeLight.background.surface;
  const darkBackgroundBase = themeDark.background.base;
  const darkBackgroundSurface = themeDark.background.surface;
  const isThemeDark = theme === 'dark';

  let backgroundColor;

  if (colorScheme === 'surface') {
    backgroundColor = isThemeDark ? darkBackgroundSurface : backgroundSurface;
  } else {
    backgroundColor = isThemeDark ? darkBackgroundBase : backgroundBase;
  }

  return backgroundColor;
};

export const getStackBlitzMarkup = (
  hasFrameworkMarkup: boolean,
  markup: string,
  framework: FrameworksWithoutShared
): string => (hasFrameworkMarkup ? markup : convertMarkup(markup, framework));

export const openInStackBlitz = (props: OpenInStackBlitzOpts): void => {
  const { markup, framework, theme, hasFrameworkMarkup, sharedTableMarkup, additionalDependencies, colorScheme } =
    props;

  // Extract to helper and unit test?
  const pdsComponents = Array.from(markup.matchAll(/<([P|p-][\w-]*)/g) ?? []).map(([, x]) => x);
  const reactComponentsToImport = pdsComponents.map((x) => pascalCase(x)).join(', ');

  const openProps: StackBlitzFrameworkOpts = {
    markup: getStackBlitzMarkup(hasFrameworkMarkup, markup, framework),
    hasFrameworkMarkup,
    title: `Porsche Design System ${framework} sandbox`,
    description: `${pdsComponents[0]} component example`,
    bodyStyles: `body { background: ${getBackgroundColor(theme, colorScheme)}; }`,
    sharedTableMarkup,
    additionalDependencies,
  };

  switch (framework) {
    case 'angular':
      return openAngular(openProps);
    case 'react':
      return openReact({
        ...openProps,
        reactComponentsToImport,
      });
    default:
      return openVanillaJS(openProps);
  }
};

export type DependenciesMap = { [key: string]: { [key: string]: string } };

export const getAdditionalDependencies = (
  additionalDependencies: string[],
  dependenciesMap: DependenciesMap
): { [key: string]: string } =>
  additionalDependencies
    .map((dep) => dependenciesMap[dep])
    .reduce((result, current) => Object.assign(result, current), {});

export const replaceSharedTableImports = (markup: string, sharedTableMarkup: SharedTableMarkup): string =>
  markup.replace(
    /import { (?:[A-z]+,* )+} from '@porsche-design-system\/shared';/,
    `
            ${transformSharedTableMarkup(sharedTableMarkup)}
`
  );

export const transformSharedTableMarkup = (sharedTableMarkup: SharedTableMarkup): string =>
  Object.entries(sharedTableMarkup)
    .map(([key, value]) => `const ${key} = ${JSON.stringify(value)};`)
    .join('\n');
