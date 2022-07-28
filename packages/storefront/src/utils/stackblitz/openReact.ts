import sdk from '@stackblitz/sdk';
import { version as pdsVersion } from '../../../../components-js/projects/components-wrapper/package.json';
import {
  devDependencies as reactDevDependencies,
  dependencies as reactDependencies,
} from '../../../../components-react/package.json';
import { getAdditionalDependencies, themeDarkBodyStyles } from '@/utils/stackblitz/openInStackBlitz';
import type { StackBlitzFrameworkOpts, DependenciesMap } from '@/utils/stackblitz/openInStackBlitz';

export const openReact = (props: StackBlitzFrameworkOpts): void => {
  const {
    markup,
    description,
    title,
    hasFrameworkMarkup,
    isThemeDark,
    reactComponentsToImport,
    additionalDependencies,
  } = props;

  const dependenciesMap: DependenciesMap = {
    IMask: {
      'react-imask': `${reactDependencies['react-imask']}`,
    },
  };

  const cleanedFragmentsMarkup = markup.replace(/(<\/?)(>)/g, '$1React.Fragment$2');

  const appTsx = hasFrameworkMarkup
    ? `import React from 'react';
${cleanedFragmentsMarkup}`
    : `import * as React from 'react';
import { ${reactComponentsToImport} } from '@porsche-design-system/components-react'

export default function App() {
  return (
    <div>
      ${cleanedFragmentsMarkup}
    </div>
  );
}`;
  const [, componentName] = markup.match(/const ([A-z]+) = \(\): JSX.Element => {/) ?? [];
  const tagName = hasFrameworkMarkup ? componentName : 'App';
  const reactImport = hasFrameworkMarkup ? `{ ${componentName} }` : 'App';

  sdk.openProject(
    {
      files: {
        'App.tsx': appTsx,
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
        'style.css': isThemeDark ? themeDarkBodyStyles : '',
      },
      template: 'create-react-app',
      title,
      description,
      dependencies: {
        '@porsche-design-system/components-react': `${pdsVersion}`,
        '@types/react': `${reactDevDependencies['@types/react']}`,
        '@types/react-dom': `${reactDevDependencies['@types/react-dom']}`,
        ...getAdditionalDependencies(additionalDependencies, dependenciesMap),
      },
    },
    {
      openFile: 'App.tsx',
    }
  );
};
