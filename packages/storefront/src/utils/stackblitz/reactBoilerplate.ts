import { version as pdsVersion } from '../../../../components-js/projects/components-wrapper/package.json';
import { devDependencies, dependencies } from '../../../../components-react/package.json';
import { default as tsconfig } from '../../../../components-react/tsconfig.json';
import { AdditionalStackBlitzDependency, getAdditionalDependencies, GetStackblitzProjectAndOpenOptions } from '@/utils';
import { inlineSharedImports, isTable } from './helper';
import { convertMarkup } from '@/utils/formatting';
import { pascalCase } from 'change-case';
import type { StackBlitzDependencyMap } from '@/utils';
import type { StackblitzProjectDependencies } from '@/models';

// TODO: Maybe better inline? If not, naming
export const getCleanedReactMarkup = (markup: string): string =>
  markup.replace(/(const )[A-z]+( = \(\): JSX.Element => {)/, '$1App$2');

export const getAppFrameworkMarkup = (markup: string, isTable: boolean): string => {
  const cleanedMarkup = getCleanedReactMarkup(markup);

  return isTable ? inlineSharedImports(cleanedMarkup) : cleanedMarkup;
};

export const getAppDefaultMarkup = (markup: string, pdsComponents: string[]): string => {
  const reactComponentsToImport = pdsComponents.map((x) => pascalCase(x)).join(', ');
  // TODO: check if convert is really needed?? Check regex for alignment (button) + include text without tag
  const convertedMarkup = convertMarkup(markup, 'react').replace(/(\n)+(\s*<\/?[A-z]+)/g, '$1      $2'); // Align markup

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
  isTable: boolean,
  pdsComponents: string[]
): string => {
  return hasFrameworkMarkup ? getAppFrameworkMarkup(markup, isTable) : getAppDefaultMarkup(markup, pdsComponents);
};

// TODO: Use single quotes
export const getIndexTsxMarkup = (): string => `import * as React from 'react';
import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import { App } from "./App";
import { PorscheDesignSystemProvider } from "@porsche-design-system/components-react";
import "./style.css";

const rootElement = document.getElementById("root");
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
  additionalStackBlitzDependencies?: AdditionalStackBlitzDependency[]
): StackblitzProjectDependencies => {
  // TODO: remove interpolation / pick dependencies
  return {
    '@porsche-design-system/components-react': dependencies['@porsche-design-system/components-react'],
    react: `${dependencies['react']}`,
    'react-dom': `${dependencies['react-dom']}`,
    '@types/react': `${devDependencies['@types/react']}`,
    '@types/react-dom': `${devDependencies['@types/react-dom']}`,
    ...(additionalStackBlitzDependencies &&
      getAdditionalDependencies(additionalStackBlitzDependencies, dependenciesMap)),
  };
};

export const getReactProjectAndOpenOptions: GetStackblitzProjectAndOpenOptions = (opts) => {
  const {
    markup,
    description,
    title,
    hasFrameworkMarkup,
    bodyStyles,
    pdsComponents,
    additionalStackBlitzDependencies,
  } = opts;

  return {
    files: {
      'App.tsx': getAppTsxMarkup(markup, hasFrameworkMarkup, isTable(pdsComponents), pdsComponents),
      'index.html': `<div id="root"></div>`,
      'index.tsx': getIndexTsxMarkup(),

      'tsconfig.json': JSON.stringify(tsconfig),
      'style.css': bodyStyles,
    },
    template: 'create-react-app',
    title,
    description,
    dependencies: getReactDependencies(additionalStackBlitzDependencies),
    openFile: 'App.tsx',
  };
};
