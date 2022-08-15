import { devDependencies, dependencies } from '../../../../components-react/package.json';
import { default as tsconfig } from '../../../../components-react/tsconfig.json';
import { getSharedImportConstants, getExternalDependencies, removeSharedImport } from './helper';
import { convertMarkup } from '../../utils/formatting';
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

export const dependencyMap: DependencyMap<typeof dependencies> = {
  imask: {
    'react-imask': dependencies['react-imask'],
  },
};

export const getReactDependencies = (externalDependencies: ExternalDependency[]): StackblitzProjectDependencies => {
  // TODO: pick dependencies?
  return {
    '@porsche-design-system/components-react': 'latest',
    react: dependencies['react'],
    'react-dom': dependencies['react-dom'],
    '@types/react': devDependencies['@types/react'],
    '@types/react-dom': devDependencies['@types/react-dom'],
    ...getExternalDependencies(externalDependencies, dependencyMap),
  };
};

export const indexTsMarkup = `import { StrictMode } from 'react';
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

export const getReactProjectAndOpenOptions: GetStackblitzProjectAndOpenOptions = (opts) => {
  const { markup, description, title, globalStyles, sharedImportKeys, externalDependencies } = opts;

  const isExampleMarkup = !!markup.match(componentNameRegex);

  return {
    files: {
      'App.tsx': isExampleMarkup
        ? replaceSharedImportsWithConstants(markup, sharedImportKeys)
        : extendMarkupWithAppComponent(markup),
      'index.html': '<div id="root"></div>',
      'index.tsx': indexTsMarkup,
      'tsconfig.json': JSON.stringify(tsconfig, null, 2),
      'style.css': globalStyles,
    },
    template: 'create-react-app',
    title,
    description,
    dependencies: getReactDependencies(externalDependencies),
    openFile: 'App.tsx',
  };
};
