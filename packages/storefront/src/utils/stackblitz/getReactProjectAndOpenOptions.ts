import { devDependencies, dependencies } from '../../../../components-react/package.json';
import { default as tsconfig } from '../../../../components-react/tsconfig.json';
import {
  convertImportPaths,
  getExternalDependencies,
  getSharedImportConstants,
  isStableStorefrontRelease,
  removeSharedImport,
} from './helper';
import { convertMarkup } from '../../utils/formatting';
import type {
  DependencyMap,
  GetStackblitzProjectAndOpenOptions,
  SharedImportKey,
  ExternalDependency,
} from '../../utils';
import type { StackblitzProjectDependencies } from '../../models';

const componentNameRegex = /(export const )[a-zA-Z]+( = \(\): JSX.Element => {)/;

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

export const getAppTsx = (markup: string, isExampleMarkup: boolean, sharedImportKeys: SharedImportKey[]): string => {
  return applyStackBlitzFixForReact(
    convertImportPaths(
      isExampleMarkup
        ? replaceSharedImportsWithConstants(markup, sharedImportKeys)
        : extendMarkupWithAppComponent(markup),
      'react'
    )
  );
};

export const getIndexTsx = (): string => {
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
      'react'
    )
  );
};

export const getTsconfigJson = (): string => JSON.stringify(tsconfig, null, 2);

export const dependencyMap: DependencyMap<typeof dependencies> = {
  imask: {
    'react-imask': dependencies['react-imask'],
  },
};

export const getDependencies = (externalDependencies: ExternalDependency[]): StackblitzProjectDependencies => {
  // TODO: pick dependencies?
  return {
    ...(isStableStorefrontRelease() && {
      '@porsche-design-system/components-react': dependencies['@porsche-design-system/components-react'],
    }),
    react: dependencies['react'],
    'react-dom': dependencies['react-dom'],
    '@types/react': devDependencies['@types/react'],
    '@types/react-dom': devDependencies['@types/react-dom'],
    ...getExternalDependencies(externalDependencies, dependencyMap),
  };
};

export const getReactProjectAndOpenOptions: GetStackblitzProjectAndOpenOptions = (opts) => {
  const {
    markup,
    description,
    title,
    globalStyles,
    sharedImportKeys,
    externalDependencies,
    porscheDesignSystemBundle,
  } = opts;

  return {
    files: {
      ...porscheDesignSystemBundle,
      'App.tsx': getAppTsx(markup, !!markup.match(componentNameRegex), sharedImportKeys),
      'index.html': '<div id="root"></div>',
      'index.tsx': getIndexTsx(),
      'tsconfig.json': getTsconfigJson(),
      'style.css': globalStyles,
    },
    template: 'create-react-app',
    title,
    description,
    dependencies: getDependencies(externalDependencies),
    openFile: 'App.tsx',
  };
};
