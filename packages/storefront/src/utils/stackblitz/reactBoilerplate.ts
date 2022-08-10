import { devDependencies, dependencies } from '../../../../components-react/package.json';
import { default as tsconfig } from '../../../../components-react/tsconfig.json';
import { getExternalDependencies, removeSharedImport } from '@/utils';
import { getSharedImportConstants } from './helper';
import { convertMarkup } from '@/utils/formatting';
import type {
  StackBlitzDependencyMap,
  GetStackblitzProjectAndOpenOptions,
  SharedImportKey,
  ExternalStackBlitzDependency,
} from '@/utils';
import type { StackblitzProjectDependencies } from '@/models';

const componentNameRegex = /(export const )[A-z]+( = \(\): JSX.Element => {)/;

export const getAppFrameworkMarkup = (markup: string, sharedImportKeys: SharedImportKey[]): string => {
  const sharedImportConstants = getSharedImportConstants(sharedImportKeys);

  return removeSharedImport(markup.replace(componentNameRegex, `${sharedImportConstants}$1App$2`));
};

export const getAppDefaultMarkup = (markup: string): string => {
  const convertedMarkup = convertMarkup(markup, 'react');
  const reactComponentsToImport = Array.from(convertedMarkup.matchAll(/<(P[A-z]+)/g) || [])
    .map(([, x]) => x)
    .filter((tagName, idx, arr) => arr.findIndex((t) => t === tagName) === idx)
    .join(', ');

  return `import { ${reactComponentsToImport} } from '@porsche-design-system/components-react'

export const App = (): JSX.Fragment => {
  return (
    <>
      ${convertedMarkup}
    </>
  );
}`;
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
  // TODO: pick dependencies?
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
  const { markup, description, title, globalStyles, sharedImportKeys, externalStackBlitzDependencies } = opts;

  const isFrameworkMarkup = !!markup.match(componentNameRegex);

  return {
    files: {
      'App.tsx': isFrameworkMarkup ? getAppFrameworkMarkup(markup, sharedImportKeys) : getAppDefaultMarkup(markup),
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
