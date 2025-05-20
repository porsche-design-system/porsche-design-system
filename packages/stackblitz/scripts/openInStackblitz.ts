// TODO: Move to shared
import type { StorefrontTheme } from '@porsche-design-system/storefront/src/models/theme';
import sdk from '@stackblitz/sdk';
import type { ProjectFiles } from '@stackblitz/sdk/typings/interfaces';
import type { Framework } from 'shared/src';
import { angularBundle, vanillaJsBundle } from '../generated/bundle';

const frameworkBundleMap: Record<Framework, ProjectFiles> = {
  'vanilla-js': vanillaJsBundle,
  angular: angularBundle,
  vue: { file: '' },
  react: { file: '' },
};

const frameworkComponentMap: Record<Framework, string> = {
  'vanilla-js': 'index.js',
  angular: 'src/app/app.component.ts',
  vue: 'main.js',
  react: 'index.js',
};

export const openInStackblitz2 = (framework: Framework, markup: string, theme: StorefrontTheme) => {
  sdk.openProject({
    files: {
      ...(framework === 'angular'
        ? {
            ...frameworkBundleMap[framework],
            'src/index.html': frameworkBundleMap[framework]['src/index.html'].replace(
              '<html lang="en">',
              `<html lang="en" class="${theme}">`
            ),
            'src/main.ts': frameworkBundleMap[framework]['src/main.ts'].replace(
              /(PorscheDesignSystemModule\.load\(\{ theme: )'auto'( }\))/,
              `$1'${theme}'$2`
            ),
          }
        : frameworkBundleMap[framework]),
      [frameworkComponentMap[framework]]: markup,
    },
    template: 'node',
    title: 'Porsche Design System sandbox',
    description: 'Porsche Design System component example',
  });
};
