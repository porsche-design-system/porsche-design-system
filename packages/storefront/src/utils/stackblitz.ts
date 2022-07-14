import sdk from '@stackblitz/sdk';
import { convertMarkup } from '@/utils/formatting';
import { Framework, Theme } from '@/models';
import { version } from '../../../components-js/projects/components-wrapper/package.json';
import { themeDark } from '../../../utilities/projects/utilities';

type OpenInStackBlitzOpts = {
  markup: string;
  framework: Framework;
  theme: Theme;
  additionalJavaScriptLogic?: string;
};

type OpenFrameWorkOpts = Omit<OpenInStackBlitzOpts, 'framework' | 'theme'> & {
  description: string;
  title: string;
  css: string;
  componentNames?: string;
};

export const openInStackBlitz = (props: OpenInStackBlitzOpts) => {
  const { markup, framework, theme, additionalJavaScriptLogic } = props;
  const convertedMarkup = convertMarkup(markup, framework);

  const componentNamesArray = Array.from(convertedMarkup.matchAll(/<((?:\w|-)+)(?:.|\n)*?>/g) ?? [])
    .map(([, x]) => x)
    .filter(
      (tagName, idx, arr) => arr.findIndex((t) => (t.startsWith('P') || t.startsWith('p')) && t === tagName) === idx
    );
  const componentNames = componentNamesArray.join(', ');

  const openProps: OpenFrameWorkOpts = {
    markup: convertedMarkup,
    componentNames,
    title: `Porsche Design System ${framework} sandbox`,
    description: `${[componentNamesArray]} component example`,
    css: `*:not(:last-child) { margin-right: 0.5rem; margin-bottom: 0.5rem; }
${theme === 'dark' && `body { background: ${themeDark.background.base}; }`}    `,
  };

  switch (framework) {
    case 'angular':
      return openAngular(openProps);
    case 'react':
      return openReact(openProps);
    default:
      return openVanillaJS({
        ...openProps,
        additionalJavaScriptLogic,
      });
  }
};

export const openVanillaJS = (props: OpenFrameWorkOpts) => {
  const { markup, description, title, css, additionalJavaScriptLogic } = props;

  sdk.openProject(
    {
      files: {
        'index.html': `${markup}`,
        'index.js': `import './style.css'
import * as porscheDesignSystem from '@porsche-design-system/components-js'
porscheDesignSystem.load();

${additionalJavaScriptLogic}
`,
        'style.css': css,
      },
      template: 'javascript',
      title,
      description,
      dependencies: {
        '@porsche-design-system/components-js': `${version}`,
      },
    },
    {
      openFile: 'index.html',
    }
  );
};

export const openReact = (props: OpenFrameWorkOpts) => {
  const { markup, componentNames, description, title, css } = props;

  sdk.openProject(
    {
      files: {
        'App.tsx': `import * as React from 'react';
import { ${componentNames} } from '@porsche-design-system/components-react'
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
        'style.css': css,
      },
      template: 'create-react-app',
      title,
      description,
      dependencies: {
        '@porsche-design-system/components-react': `${version}`,
      },
    },
    {
      openFile: 'App.tsx',
    }
  );
};

export const openAngular = (props: OpenFrameWorkOpts) => {
  const { markup, description, title, css } = props;

  sdk.openProject({
    files: {
      // root folder
      'index.html': `<porsche-design-system-app></porsche-design-system-app>`,
      'main.ts': `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import 'zone.js/dist/zone';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));`,
      // app folder
      'app/app.component.ts': `import { Component } from '@angular/core';

@Component({
  selector: 'porsche-design-system-app',
  template: \`
    ${markup}\`,
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {}`,
      'app/app.module.ts': `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, FormsModule, PorscheDesignSystemModule.load({ prefix: '' }),],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}`,
      'app/app.component.css': css,
    },
    template: 'angular-cli',
    title,
    description,
    dependencies: {
      '@porsche-design-system/components-angular': `${version}`,
    },
  });
};
