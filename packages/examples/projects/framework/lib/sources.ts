import { FRAMEWORKS, type Framework } from '@porsche-design-system/shared';
import { pascalCase } from 'change-case';
import type { FrameworkExampleMeta } from './meta';

/** The example folder of every wrapper's example app, relative to `packages/`. */
export const exampleAppPaths: Record<Framework, string> = {
  'vanilla-js': 'components-js/src/examples',
  angular: 'components-angular/src/app/examples',
  react: 'components-react/src/examples',
  vue: 'components-vue/src/examples',
};

/** The file of an example in every example app, by their naming conventions or as the meta names them. */
export const sourceFiles = (source: FrameworkExampleMeta['source']): Record<Framework, string> => {
  if (typeof source !== 'string') {
    return source;
  }
  const pascal = pascalCase(source);
  return {
    'vanilla-js': `${source}.html`,
    angular: `${source}.component.ts`,
    react: `${pascal}.tsx`,
    vue: `${pascal}.vue`,
  };
};

/**
 * The code the Storefront, StackBlitz and the skills show, from the sources as the example apps run them: assets come
 * from the Storefront instead of the apps' dev server, the React component is named `Example` and imports React, and
 * the Angular component is `ExampleComponent` with the selector of the StackBlitz app.
 */
export const toFrameworkMarkup = (sources: Record<Framework, string>): Record<Framework, string> => {
  const code = Object.fromEntries(
    FRAMEWORKS.map((framework) => [framework, sources[framework].trim().replace(/http:\/\/localhost:3002/g, 'assets')])
  ) as Record<Framework, string>;

  return {
    ...code,
    react: `import React from 'react';\n${code.react.replace(/export const (\w+)\s*=/, 'export const Example =')}`,
    angular: code.angular
      .replace(/export class (\w+)Component\s*\{/, 'export class ExampleComponent {')
      .replace(/selector: '[^']*'/g, "selector: 'porsche-design-system-app'"),
  };
};

/**
 * The live preview the Storefront renders, from the React source: a client module whose default export is the example,
 * importing the server-renderable components of `@porsche-design-system/components-react/ssr`.
 */
export const toPreview = (reactSource: string): string => {
  const code = reactSource
    .trim()
    .replace(/http:\/\/localhost:3002/g, 'assets')
    .replace("@porsche-design-system/components-react'", "@porsche-design-system/components-react/ssr'")
    .replace(/export const (\w+)\s*=/, 'const Example =');

  return `'use client';\n${code}\n\nexport default Example;\n`;
};
