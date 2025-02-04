import { devDependencies, dependencies } from '../../../../components-react/package.json';
import {
  convertImportPaths,
  getExternalDependencies,
  getSharedImportConstants,
  isStableStorefrontReleaseOrForcedPdsVersion,
  removeSharedImport,
} from './helper';
import { convertMarkup } from '../../utils/formatting';
import type {
  DependencyMap,
  GetStackBlitzProjectAndOpenOptions,
  SharedImportKey,
  ExternalDependency,
} from '../../utils';
import type { PlaygroundDir, StackBlitzProjectDependencies } from '../../models';
import { initialStyles } from '@/lib/partialResults';

const componentNameRegex = /(export const )[a-zA-Z]+( = \(({[^}]+})?\): JSX.Element => {)/;

// TODO: this entire puzzle should be refactored into an object-oriented way so that there is a clear and clean structure
// as well as code flow, similar to our WrapperGenerator

export const replaceSharedImportsWithConstants = (markup: string, sharedImportKeys: SharedImportKey[]): string => {
  const sharedImportConstants = getSharedImportConstants(sharedImportKeys);

  return removeSharedImport(markup.replace(componentNameRegex, `${sharedImportConstants}$1App$2`));
};

export const extendMarkupWithAppComponent = (markup: string): string => {
  const convertedMarkup = convertMarkup(markup, 'react').replace(/(\n)/g, '$1      ');
  const reactComponentsToImport = Array.from(convertedMarkup.matchAll(/<(P[a-zA-Z]+)/g)) // Returns array of all matches and captured groups
    .map(([, reactComponentName]) => reactComponentName)
    .filter((reactComponentName, idx, arr) => arr.findIndex((t) => t === reactComponentName) === idx) // Remove duplicates
    .join(', ');

  return `import { ${reactComponentsToImport} } from '@porsche-design-system/components-react';

export const App = (): JSX.Fragment => {
  return (
    <>
      ${convertedMarkup}
    </>
  );
}`;
};

// TODO: this workaround is necessary because StackBlitz doesn't reflect the tsconfig file when using create-react-app template which results in highlighting non existing typescript errors
export const applyStackBlitzFixForReact = (markup: string): string => {
  return `import * as React from 'react'; // StackBlitz workaround (not necessary for React >= 17)
${markup
  .replace(/JSX\.Fragment/g, 'JSX.Element')
  .replace(/<>/g, '<React.Fragment>')
  .replace(/<\/>/g, '</React.Fragment>')}`;
};

export const getAppTsx = (
  markup: string,
  isExampleMarkup: boolean,
  sharedImportKeys: SharedImportKey[],
  pdsVersion: string
): string => {
  return applyStackBlitzFixForReact(
    convertImportPaths(
      isExampleMarkup
        ? replaceSharedImportsWithConstants(markup, sharedImportKeys)
        : extendMarkupWithAppComponent(markup),
      'react',
      pdsVersion
    )
  );
};

export const getIndexHtml = (dir: PlaygroundDir, globalStyles: string) => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Porsche Design System - React</title>

    <!-- prettier-ignore -->
    ${initialStyles}

    <style>
      html, body { margin: 0; padding: 0; }
      ${globalStyles}
    </style>
  </head>
  <body dir="${dir}">
    <div id="root"></div>
  </body>
</html>`;
};

export const getIndexTsx = (pdsVersion: string): string => {
  return applyStackBlitzFixForReact(
    convertImportPaths(
      `import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { App } from './App';
import { PorscheDesignSystemProvider } from '@porsche-design-system/components-react';
import './style.css';

const rootElement = document.getElementById('root');
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <PorscheDesignSystemProvider>
      <App />
    </PorscheDesignSystemProvider>
  </StrictMode>
);`,
      'react',
      pdsVersion
    )
  );
};

export const dependencyMap: Partial<DependencyMap<typeof dependencies & typeof devDependencies>> = {
  imask: {
    'react-imask': dependencies['react-imask'],
  },
  'styled-components': {
    'styled-components': dependencies['styled-components'],
  },
  'ag-grid-community': {
    'ag-grid-community': devDependencies['ag-grid-community'],
  },
  'ag-grid-react': {
    'ag-grid-react': devDependencies['ag-grid-react'],
  },
};

export const getDependencies = (
  externalDependencies: ExternalDependency[],
  pdsVersion: string
): StackBlitzProjectDependencies => {
  // TODO: pick dependencies?
  return {
    ...(isStableStorefrontReleaseOrForcedPdsVersion(pdsVersion) && {
      '@porsche-design-system/components-react': pdsVersion || dependencies['@porsche-design-system/components-react'],
    }),
    react: dependencies['react'],
    'react-dom': dependencies['react-dom'],
    '@types/react': devDependencies['@types/react'],
    '@types/react-dom': devDependencies['@types/react-dom'],
    ...getExternalDependencies(externalDependencies, dependencyMap),
  };
};

export const getReactProjectAndOpenOptions: GetStackBlitzProjectAndOpenOptions = (opts) => {
  const {
    markup,
    dir,
    description,
    title,
    globalStyles,
    sharedImportKeys,
    externalDependencies,
    porscheDesignSystemBundle,
    pdsVersion,
  } = opts;

  return {
    files: {
      ...porscheDesignSystemBundle,
      'App.tsx': getAppTsx(markup, !!markup.match(componentNameRegex), sharedImportKeys, pdsVersion),
      'index.html': getIndexHtml(dir, globalStyles),
      'index.tsx': getIndexTsx(pdsVersion),
      'style.css': '', // empty file seems to be required
    },
    template: 'create-react-app',
    title,
    description,
    dependencies: getDependencies(externalDependencies, pdsVersion),
    openFile: 'App.tsx',
  };
};
