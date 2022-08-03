import sdk from '@stackblitz/sdk';
import type { Project, OpenOptions } from '@stackblitz/sdk';
import { version as pdsVersion } from '../../../../components-js/projects/components-wrapper/package.json';
import { devDependencies, dependencies } from '../../../../components-react/package.json';
import { getAdditionalDependencies, replaceSharedTableImports } from '@/utils/stackblitz/openInStackBlitz';
import type { StackBlitzFrameworkOpts, DependenciesMap } from '@/utils/stackblitz/openInStackBlitz';

export const getReactProjectAndOpenOptions = (
  props: StackBlitzFrameworkOpts
): { project: Project; openOptions: OpenOptions } => {
  const {
    markup,
    description,
    title,
    hasFrameworkMarkup,
    bodyStyles,
    reactComponentsToImport,
    sharedTableMarkup,
    additionalDependencies,
  } = props;

  const dependenciesMap: DependenciesMap = {
    IMask: {
      'react-imask': `${dependencies['react-imask']}`,
    },
  };

  const cleanedFragmentsMarkup = markup.replace(/(<\/?)(>)/g, '$1React.Fragment$2');

  const appTsxDefaultMarkup = `import * as React from 'react';
import { ${reactComponentsToImport} } from '@porsche-design-system/components-react'

export default function App() {
  return (
    <div>
      ${cleanedFragmentsMarkup}
    </div>
  );
}`;

  const appTsxFrameworkMarkup = `import React from 'react';
${sharedTableMarkup ? replaceSharedTableImports(cleanedFragmentsMarkup, sharedTableMarkup) : cleanedFragmentsMarkup}`;

  const [, componentName] = markup.match(/const ([A-z]+) = \(\): JSX.Element => {/) ?? [];
  const tagName = hasFrameworkMarkup ? componentName : 'App';
  const reactImport = hasFrameworkMarkup ? `{ ${componentName} }` : 'App';

  const project: Project = {
    files: {
      'App.tsx': hasFrameworkMarkup ? appTsxFrameworkMarkup : appTsxDefaultMarkup,
      'index.html': `<div id="root"></div>`,
      'index.tsx': `import * as React from 'react';
import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import ${reactImport} from "./App";
import { PorscheDesignSystemProvider } from "@porsche-design-system/components-react";
import './style.css';

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <PorscheDesignSystemProvider>
      <${tagName} />
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

export const openReact = (props: StackBlitzFrameworkOpts) => {
  const { project, openOptions } = getReactProjectAndOpenOptions(props);
  sdk.openProject(project, openOptions);
};
