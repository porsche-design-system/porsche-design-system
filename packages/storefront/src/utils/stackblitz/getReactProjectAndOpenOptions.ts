import { devDependencies, dependencies } from '../../../../components-react/package.json';
import { default as tsconfig } from '../../../../components-react/tsconfig.json';
import {
  convertImportPaths,
  getSharedImportConstants,
  getExternalDependencies,
  removeSharedImport,
  isStableStorefrontRelease
} from './helper';
import { convertMarkup } from '../../utils/formatting';
import componentsJs from '@/lib/porsche-design-system/components-js.json';
import componentsReact from '@/lib/porsche-design-system/components-react.json';
import type {
  DependencyMap,
  GetStackblitzProjectAndOpenOptions,
  SharedImportKey,
  ExternalDependency,
} from '../../utils';
import type { StackblitzProjectDependencies } from '../../models';

const componentNameRegex = /(export const )[A-z]+( = \(\): JSX.Element => {)/;

export const replaceSharedImportsWithConstants = (markup: string, sharedImportKeys: SharedImportKey[]): string => {
  const sharedImportConstants = getSharedImportConstants(sharedImportKeys);

  return removeSharedImport(markup.replace(componentNameRegex, `${sharedImportConstants}$1App$2`));
};

export const extendMarkupWithAppComponent = (markup: string): string => {
  const convertedMarkup = convertMarkup(markup, 'react').replace(/(\n)/g, '$1      ');
  const reactComponentsToImport = Array.from(convertedMarkup.matchAll(/<(P[A-z]+)/g)) // Returns array of all matches and captured groups
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

export const getAppTsx = (markup: string, isExampleMarkup: boolean, sharedImportKeys: SharedImportKey[]): string => {
  return convertImportPaths(
    isExampleMarkup
      ? replaceSharedImportsWithConstants(markup, sharedImportKeys)
      : extendMarkupWithAppComponent(markup),
    'react'
  )
};

export const indexTsx = convertImportPaths(`import { StrictMode } from 'react';
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
);`, 'react');

export const tsconfigJson = JSON.stringify(tsconfig, null, 2);

export const dependencyMap: DependencyMap<typeof dependencies> = {
  imask: {
    'react-imask': dependencies['react-imask'],
  },
};

export const getDependencies = (externalDependencies: ExternalDependency[]): StackblitzProjectDependencies => {
  // TODO: pick dependencies?
  return {
    ...isStableStorefrontRelease() && {
      '@porsche-design-system/components-react': dependencies['@porsche-design-system/components-react']
    },
    react: dependencies['react'],
    'react-dom': dependencies['react-dom'],
    '@types/react': devDependencies['@types/react'],
    '@types/react-dom': devDependencies['@types/react-dom'],
    ...getExternalDependencies(externalDependencies, dependencyMap),
  };
};

export const getReactProjectAndOpenOptions: GetStackblitzProjectAndOpenOptions = (opts) => {
  const { markup, description, title, globalStyles, sharedImportKeys, externalDependencies } = opts;

  return {
    files: {
      // TODO: we should load component artifacts by fetch API and provide it as artifact in public folder to decrease vue component chunk size or provide examples by public git repo including commit based component builds
      ...!isStableStorefrontRelease() && {
        ...componentsJs,
        ...componentsReact,
      },
      'App.tsx': getAppTsx(markup, !!markup.match(componentNameRegex), sharedImportKeys),
      'index.html': '<div id="root"></div>',
      'index.tsx': indexTsx,
      'tsconfig.json': tsconfigJson,
      'style.css': globalStyles,
    },
    template: 'create-react-app',
    title,
    description,
    dependencies: getDependencies(externalDependencies),
    openFile: 'App.tsx',
  };
};
