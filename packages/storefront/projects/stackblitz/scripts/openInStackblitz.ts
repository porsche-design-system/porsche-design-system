import type { Framework } from '@porsche-design-system/shared';
// TODO: Move to shared
import type { StorefrontTheme } from '@porsche-design-system/storefront/src/models/theme';
import sdk from '@stackblitz/sdk';
import type { ProjectFiles } from '@stackblitz/sdk/typings/interfaces';
import { angularBundle, reactBundle, vanillaJsBundle, vueBundle } from '../generated/bundle';

const frameworkBundleMap: Record<Framework, ProjectFiles> = {
  'vanilla-js': vanillaJsBundle,
  angular: angularBundle,
  vue: vueBundle,
  react: reactBundle,
};

const frameworkComponentMap: Record<Framework, string> = {
  'vanilla-js': 'index.html',
  angular: 'src/app/app.component.ts',
  vue: 'src/components/Example.vue',
  react: 'src/Example.tsx',
};

export const openInStackblitz = (framework: Framework, markup: string, theme: StorefrontTheme) => {
  const getFrameworkFiles = (framework: Framework): ProjectFiles => {
    switch (framework) {
      case 'angular':
        return {
          ...frameworkBundleMap[framework],
          'src/index.html': frameworkBundleMap[framework]['src/index.html'].replace(
            '<html lang="en">',
            `<html lang="en" class="${theme}">`
          ),
          'src/main.ts': frameworkBundleMap[framework]['src/main.ts'].replace(
            /(PorscheDesignSystemModule\.load\(\{ theme: ')auto(' }\))/,
            `$1${theme}$2`
          ),
        };
      case 'react':
        return {
          ...frameworkBundleMap[framework],
          'index.html': frameworkBundleMap[framework]['index.html'].replace(
            '<html lang="en">',
            `<html lang="en" class="${theme}">`
          ),
          'src/main.tsx': frameworkBundleMap[framework]['src/main.tsx'].replace(
            /(<PorscheDesignSystemProvider theme=\{')auto('}>)/,
            `$1${theme}$2`
          ),
        };
      case 'vue':
        return {
          ...frameworkBundleMap[framework],
          'index.html': frameworkBundleMap[framework]['index.html'].replace(
            '<html lang="en">',
            `<html lang="en" class="${theme}">`
          ),
          'src/App.vue': frameworkBundleMap[framework]['src/App.vue'].replace(
            /(<PorscheDesignSystemProvider :theme="')auto('">)/,
            `$1${theme}$2`
          ),
        };
      case 'vanilla-js':
        return frameworkBundleMap[framework];
      default:
        return frameworkBundleMap[framework];
    }
  };

  sdk.openProject(
    {
      files: {
        ...getFrameworkFiles(framework),
        [frameworkComponentMap[framework]]: markup,
      },
      template: 'node',
      title: 'Porsche Design System sandbox',
      description: 'Porsche Design System component example',
    },
    {
      openFile: frameworkComponentMap[framework],
    }
  );
};
