import sdk from '@stackblitz/sdk';
import { convertMarkup } from '@/utils/formatting';
import { Framework } from '@/models';
import { version } from '../../../components-js/projects/components-wrapper/package.json';

type OpenOptions = {
  markup: string;
  componentName: string;
  additionalJavaScriptLogic?: string;
};

export const openVanillaJS = (props: OpenOptions) => {
  const { markup, componentName, additionalJavaScriptLogic } = props;

  sdk.openProject(
    {
      files: {
        'index.html': `${markup}`,
        'index.js': `import * as porscheDesignSystem from '@porsche-design-system/components-js'
porscheDesignSystem.load();

${additionalJavaScriptLogic}
`,
      },
      template: 'javascript',
      title: 'Vanilla JS Example',
      description: `Porsche Design System ${componentName} example`,
      dependencies: {
        '@porsche-design-system/components-js': `${version}`,
      },
    },
    {
      openFile: 'index.html',
    }
  );
};

export const openReact = (props: OpenOptions) => {
  const { markup, componentName } = props;

  sdk.openProject(
    {
      files: {
        'App.tsx': `import * as React from 'react';
import { ${componentName} } from '@porsche-design-system/components-react'
export default function App() {
  return (
    <div>
      ${markup}
    </div>
  );
}`,
        'index.html': `<div id="root"></div>`,
        'index.tsx': `import * as React from 'react';
          import { StrictMode } from "react";
          import * as ReactDOMClient from "react-dom/client";
          import App from "./App";
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
        'style.css': `*:not(:last-child) { margin-right: 0.5rem; margin-bottom: 0.5rem; }`,
      },
      template: 'create-react-app',
      title: 'React Example',
      description: `Porsche Design System ${componentName} example`,
      dependencies: {
        '@porsche-design-system/components-react': `${version}`,
      },
    },
    {
      openFile: 'App.tsx',
    }
  );
};
