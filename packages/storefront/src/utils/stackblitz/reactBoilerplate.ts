import { version as pdsVersion } from '../../../../components-js/projects/components-wrapper/package.json';
import { devDependencies, dependencies } from '../../../../components-react/package.json';
import { getAdditionalDependencies } from '@/utils';
import { replaceSharedTableImports, isTable } from './helper';
import { convertMarkup } from '@/utils/formatting';
import { pascalCase } from 'change-case';
import type { Project, OpenOptions, ProjectDependencies } from '@stackblitz/sdk';
import type { DependenciesMap, StackBlitzFrameworkOpts } from '@/utils';

export const getCleanedReactMarkup = (markup: string): string =>
  markup.replace(/(const )[A-z]+( = \(\): JSX.Element => {)/, '$1App$2');

export const getAppFrameworkMarkup = (markup: string, isTable: boolean): string => {
  const cleanedMarkup = getCleanedReactMarkup(markup);

  return `${isTable ? replaceSharedTableImports(cleanedMarkup) : cleanedMarkup}`;
};

export const getAppDefaultMarkup = (markup: string, pdsComponents: string[]): string => {
  const reactComponentsToImport = pdsComponents.map((x) => pascalCase(x)).join(', ');
  const convertedMarkup = convertMarkup(markup, 'react')
    .replace(/(<\/?)(>)/g, '$1React.Fragment$2')
    .replace(/(\n)(\s*[<A-z/]+)/g, '$1      $2'); // Align markup

  return `import { ${reactComponentsToImport} } from '@porsche-design-system/components-react'

export const App = (): JSX.Fragment => {
  return (
    <div>
      ${convertedMarkup}
    </div>
  );
}`;
};

export const getAppTsxMarkup = (
  markup: string,
  hasFrameworkMarkup: boolean,
  isTable: boolean,
  pdsComponents: string[]
): string => {
  return hasFrameworkMarkup ? getAppFrameworkMarkup(markup, isTable) : getAppDefaultMarkup(markup, pdsComponents);
};

export const getIndexTsMarkup = (): string => `import * as React from 'react';
import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import { App } from "./App";
import { PorscheDesignSystemProvider } from "@porsche-design-system/components-react";
import './style.css';

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <PorscheDesignSystemProvider>
      <App />
    </PorscheDesignSystemProvider>
  </StrictMode>
);`;

export const getReactDependencies = (additionalDependencies?: string[]): ProjectDependencies => {
  const dependenciesMap: DependenciesMap = {
    IMask: {
      'react-imask': `${dependencies['react-imask']}`,
    },
  };

  return {
    '@porsche-design-system/components-react': `${pdsVersion}`,
    react: `${dependencies['react']}`,
    'react-dom': `${dependencies['react-dom']}`,
    '@types/react': `${devDependencies['@types/react']}`,
    '@types/react-dom': `${devDependencies['@types/react-dom']}`,
    ...(additionalDependencies && getAdditionalDependencies(additionalDependencies, dependenciesMap)),
  };
};

export const getTsconfigMarkup = (): string => `{
  "compilerOptions": {
    "target": "es6",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "strictNullChecks": false,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
`;

export const getReactProjectAndOpenOptions = (
  props: StackBlitzFrameworkOpts
): { project: Project; openOptions: OpenOptions } => {
  const { markup, description, title, hasFrameworkMarkup, bodyStyles, pdsComponents, additionalDependencies } = props;

  const project: Project = {
    files: {
      'App.tsx': getAppTsxMarkup(markup, hasFrameworkMarkup, isTable(pdsComponents), pdsComponents),
      'index.html': `<div id="root"></div>`,
      'index.tsx': getIndexTsMarkup(),
      'tsconfig.json': getTsconfigMarkup(),
      'style.css': bodyStyles,
    },
    template: 'create-react-app',
    title,
    description,
    dependencies: getReactDependencies(additionalDependencies),
  };

  const openOptions: OpenOptions = {
    openFile: 'App.tsx',
  };

  return { project, openOptions };
};
