import { version as pdsVersion } from '../../../../components-js/projects/components-wrapper/package.json';
import { devDependencies, dependencies } from '../../../../components-react/package.json';
import {
  getAdditionalDependencies,
  replaceSharedTableImports,
  isTable,
  StackBlitzFrameworkOpts,
} from '@/utils/stackblitz/helper';
import { convertMarkup } from '@/utils';
import { pascalCase } from 'change-case';
import type { Project, OpenOptions } from '@stackblitz/sdk';
import type { DependenciesMap } from '@/utils/stackblitz/helper';

// TODO: unit test
const getAppFrameworkMarkup = (markup: string, isTable: boolean): string => {
  const cleanedMarkup = markup.replace(/(const )[A-z]+( = \(\): JSX.Element => {)/, '$1App$2');

  return `import React from 'react';
${isTable ? replaceSharedTableImports(cleanedMarkup) : cleanedMarkup}`;
};

// TODO: unit test
const getDefaultMarkup = (markup: string, pdsComponents: string[]): string => {
  const reactComponentsToImport = pdsComponents.map((x) => pascalCase(x)).join(', ');
  const convertedMarkup = convertMarkup(markup, 'react').replace(/(<\/?)(>)/g, '$1React.Fragment$2');

  return `import * as React from 'react';
import { ${reactComponentsToImport} } from '@porsche-design-system/components-react'

export const App = (): JSX.Fragment => {
  return (
    <div>
      ${convertedMarkup}
    </div>
  );
}`;
};

// TODO: unit test
const getAppTsxMarkup = (
  markup: string,
  hasFrameworkMarkup: boolean,
  isTable: boolean,
  pdsComponents: string[]
): string => {
  return hasFrameworkMarkup ? getAppFrameworkMarkup(markup, isTable) : getDefaultMarkup(markup, pdsComponents);
};

// TODO: unit test
export const getReactProjectAndOpenOptions = (
  props: StackBlitzFrameworkOpts
): { project: Project; openOptions: OpenOptions } => {
  const { markup, description, title, hasFrameworkMarkup, bodyStyles, pdsComponents, additionalDependencies } = props;

  const dependenciesMap: DependenciesMap = {
    IMask: {
      'react-imask': `${dependencies['react-imask']}`,
    },
  };

  const project: Project = {
    files: {
      'App.tsx': getAppTsxMarkup(markup, hasFrameworkMarkup, isTable(pdsComponents), pdsComponents),
      'index.html': `<div id="root"></div>`,
      'index.tsx': `import * as React from 'react';
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
);`,
      'style.css': bodyStyles,
    },
    template: 'create-react-app',
    title,
    description,
    dependencies: {
      '@porsche-design-system/components-react': `${pdsVersion}`,
      react: `${dependencies['react']}`,
      'react-dom': `${dependencies['react-dom']}`,
      '@types/react': `${devDependencies['@types/react']}`,
      '@types/react-dom': `${devDependencies['@types/react-dom']}`,
      ...(additionalDependencies && getAdditionalDependencies(additionalDependencies, dependenciesMap)),
    },
  };

  const openOptions: OpenOptions = {
    openFile: 'App.tsx',
  };

  return { project, openOptions };
};
