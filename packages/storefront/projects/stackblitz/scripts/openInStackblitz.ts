import type { Framework } from '@porsche-design-system/shared';
// TODO: Move to shared
import type { StorefrontColorScheme } from '@porsche-design-system/storefront/src/models/colorScheme';
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

export const openInStackblitz = (framework: Framework, markup: string, colorScheme: StorefrontColorScheme) => {
  const getFrameworkFiles = (framework: Framework): ProjectFiles => {
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

/** A generated example project, as `@porsche-design-system/examples` writes it into `stackblitz.json`. */
export type ExampleProject = {
  title: string;
  description: string;
  /** Path inside the project → content: `package.json`, `vite.config.ts`, `index.html`, `main.js`, `style.css`. */
  files: Record<string, string>;
};

/**
 * Opens a pattern or template of the storefront in StackBlitz, as the Vite project it was built from.
 *
 * Unlike `openInStackblitz()`, nothing is assembled here: the project is complete as the examples build emitted it,
 * and the storefront has already pointed its media at the deployment they are served from. `template: 'node'` runs it
 * in a WebContainer, which installs the released `@porsche-design-system/components-js` from npm.
 */
export const openExampleInStackblitz = ({ title, description, files }: ExampleProject) => {
  sdk.openProject({ files, template: 'node', title, description }, { openFile: 'index.html' });
};
