import type { ColorScheme, Framework } from '@porsche-design-system/shared';
import sdk, { type ProjectFiles } from '@stackblitz/sdk';
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

/** A project as StackBlitz opens it: its files, its title and description, and the file it shows first. */
export type StackblitzProject = {
  files: ProjectFiles;
  title: string;
  description: string;
  openFile: string;
};

/**
 * Opens a project in StackBlitz, in a WebContainer (`template: 'node'`), which installs the released
 * `@porsche-design-system/components-js` from npm: a pattern's or template's project as the examples build emitted it,
 * or a story's or framework example's code in the project of its framework (`getFrameworkProject()`).
 */
export const openInStackblitz = ({ files, title, description, openFile }: StackblitzProject): void => {
  sdk.openProject({ files, template: 'node', title, description }, { openFile });
};

const getFrameworkFiles = (framework: Framework, colorScheme: ColorScheme): ProjectFiles => {
  switch (framework) {
    case 'angular':
      return {
        ...frameworkBundleMap[framework],
        'src/index.html': frameworkBundleMap[framework]['src/index.html'].replace(
          '<html lang="en">',
          `<html lang="en" class="${colorScheme}">`
        ),
        'src/main.ts': frameworkBundleMap[framework]['src/main.ts'],
      };
    case 'react':
      return {
        ...frameworkBundleMap[framework],
        'index.html': frameworkBundleMap[framework]['index.html'].replace(
          '<html lang="en">',
          `<html lang="en" class="${colorScheme}">`
        ),
        'src/main.tsx': frameworkBundleMap[framework]['src/main.tsx'],
      };
    case 'vue':
      return {
        ...frameworkBundleMap[framework],
        'index.html': frameworkBundleMap[framework]['index.html'].replace(
          '<html lang="en">',
          `<html lang="en" class="${colorScheme}">`
        ),
        'src/App.vue': frameworkBundleMap[framework]['src/App.vue'],
      };
    case 'vanilla-js':
      return frameworkBundleMap[framework];
    default:
      return frameworkBundleMap[framework];
  }
};

/** The project of a story or framework example: the framework's sandbox, its code as the example's component. */
export const getFrameworkProject = (
  framework: Framework,
  markup: string,
  colorScheme: ColorScheme
): StackblitzProject => ({
  files: {
    ...getFrameworkFiles(framework, colorScheme),
    [frameworkComponentMap[framework]]: markup,
  },
  title: 'Porsche Design System sandbox',
  description: 'Porsche Design System component example',
  openFile: frameworkComponentMap[framework],
});
