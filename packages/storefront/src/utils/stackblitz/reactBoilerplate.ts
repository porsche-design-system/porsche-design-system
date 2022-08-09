import { devDependencies, dependencies } from '../../../../components-react/package.json';
import { default as tsconfig } from '../../../../components-react/tsconfig.json';
import { getExternalDependencies, removeSharedImport } from '@/utils';
import { getSharedImportConstants } from './helper';
import { convertMarkup } from '@/utils/formatting';
import { pascalCase } from 'change-case';
import type {
  StackBlitzDependencyMap,
  GetStackblitzProjectAndOpenOptions,
  SharedImportKey,
  ExternalStackBlitzDependency,
} from '@/utils';
import type { StackblitzProjectDependencies } from '@/models';

export const getAppFrameworkMarkup = (markup: string, sharedImportKeys: SharedImportKey[]): string => {
  const sharedImportConstants = getSharedImportConstants(sharedImportKeys);

  return removeSharedImport(
    markup.replace(/(export const )[A-z]+( = \(\): JSX.Element => {)/, `${sharedImportConstants}$1App$2`)
  );
};

export const getAppDefaultMarkup = (markup: string, pdsComponents: string[]): string => {
  const reactComponentsToImport = pdsComponents.map((x) => pascalCase(x)).join(', ');
  const convertedMarkup = convertMarkup(markup, 'react');

  return `import { ${reactComponentsToImport} } from '@porsche-design-system/components-react'

export const App = (): JSX.Fragment => {
  return (
    <>
      ${convertedMarkup}
    </>
  );
}`;
};

export const getAppTsxMarkup = (
  markup: string,
  hasFrameworkMarkup: boolean,
  pdsComponents: string[],
  sharedImportKeys: SharedImportKey[]
): string => {
  return hasFrameworkMarkup
    ? getAppFrameworkMarkup(markup, sharedImportKeys)
    : getAppDefaultMarkup(markup, pdsComponents);
};

export const getIndexTsxMarkup = (): string => `import { StrictMode } from 'react';
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
);`;

const dependenciesMap: StackBlitzDependencyMap = {
  imask: {
    'react-imask': dependencies['react-imask'],
  },
};

export const getReactDependencies = (
  externalStackBlitzDependencies?: ExternalStackBlitzDependency[]
): StackblitzProjectDependencies => {
  // TODO: pick dependencies
  return {
    '@porsche-design-system/components-react': dependencies['@porsche-design-system/components-react'],
    react: dependencies['react'],
    'react-dom': dependencies['react-dom'],
    '@types/react': devDependencies['@types/react'],
    '@types/react-dom': devDependencies['@types/react-dom'],
    ...(externalStackBlitzDependencies && getExternalDependencies(externalStackBlitzDependencies, dependenciesMap)),
  };
};

export const getReactProjectAndOpenOptions: GetStackblitzProjectAndOpenOptions = (opts) => {
  const {
    markup,
    description,
    title,
    hasFrameworkMarkup,
    globalStyles,
    pdsComponents,
    sharedImportKeys,
    externalStackBlitzDependencies,
  } = opts;

  return {
    files: {
      'App.tsx': getAppTsxMarkup(markup, hasFrameworkMarkup, pdsComponents, sharedImportKeys),
      'index.html': `<div id="root"></div>`,
      'index.tsx': getIndexTsxMarkup(),
      'tsconfig.json': JSON.stringify(tsconfig, null, 2),
      'style.css': globalStyles,
    },
    template: 'create-react-app',
    title,
    description,
    dependencies: getReactDependencies(externalStackBlitzDependencies),
    openFile: 'App.tsx',
  };
};
