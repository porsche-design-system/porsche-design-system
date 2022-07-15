import sdk from '@stackblitz/sdk';
import { convertMarkup } from '@/utils/formatting';
import { themeDark } from '@porsche-design-system/utilities-v2';
import { version } from '../../../components-js/projects/components-wrapper/package.json';
import type { Framework, Theme } from '@/models';

type OpenInStackBlitzOpts = {
  markup: string;
  framework: Framework;
  theme: Theme;
  hasFrameworkMarkup: boolean;
  additionalJavaScriptLogic?: string;
};

type OpenFrameWorkOpts = Omit<OpenInStackBlitzOpts, 'framework' | 'theme'> & {
  description: string;
  title: string;
  isThemeDark: boolean;
  hostComponent?: string;
  componentNames?: string;
};

const bodyStyles = `body { background: ${themeDark.background.base}; }`;

export const openInStackBlitz = (props: OpenInStackBlitzOpts) => {
  const { markup, framework, theme, hasFrameworkMarkup, additionalJavaScriptLogic } = props;
  const convertedMarkup = convertMarkup(markup, framework);

  const componentNamesArray = Array.from(convertedMarkup.matchAll(/<((?:\w|-)+)(?:.|\n)*?>/g) ?? [])
    .map(([, x]) => x)
    .filter(
      (tagName, idx, arr) => arr.findIndex((t) => (t.startsWith('P') || t.startsWith('p')) && t === tagName) === idx
    );
  const [hostComponent] = componentNamesArray;
  const componentNames = componentNamesArray.join(', ');
  const isThemeDark = theme === 'dark';

  const openProps: OpenFrameWorkOpts = {
    markup: convertedMarkup,
    hostComponent,
    componentNames,
    title: `Porsche Design System ${framework} sandbox`,
    description: `${[componentNamesArray]} component example`,
    isThemeDark,
    hasFrameworkMarkup,
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
  const { markup, description, title, isThemeDark, additionalJavaScriptLogic } = props;

  sdk.openProject(
    {
      files: {
        'index.html': `${markup}`,
        'index.js': `import './style.css'
import * as porscheDesignSystem from '@porsche-design-system/components-js'
porscheDesignSystem.load();

${additionalJavaScriptLogic}
`,
        'style.css': isThemeDark ? bodyStyles : '',
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
  const { markup, description, title, isThemeDark, componentNames } = props;

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
        'style.css': isThemeDark ? bodyStyles : '',
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
  const { markup, description, title, hasFrameworkMarkup, hostComponent, isThemeDark } = props;
  const cleanComponentName = hostComponent!.replace('p-', '');
  const selector = hasFrameworkMarkup
    ? `<page-${cleanComponentName}-example></page-${cleanComponentName}-example>`
    : '<porsche-design-system-app></porsche-design-system-app>';

  const appComponentTs = hasFrameworkMarkup
    ? markup
    : `import { Component } from '@angular/core';

@Component({
  selector: 'porsche-design-system-app',
  template: \`
    ${markup}\`,
})
export class AppComponent  {}`;

  const [, matchedClassName] = markup.match(/export class ([A-z]+) {/) ?? [];
  const className = hasFrameworkMarkup ? matchedClassName : 'AppComponent';

  sdk.openProject({
    files: {
      // root folder
      'index.html': `${selector}
${isThemeDark ? `<style>${bodyStyles}</style>` : ''}`,
      'main.ts': `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import 'zone.js/dist/zone';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));`,
      // app folder
      'app/app.component.ts': appComponentTs,
      'app/app.module.ts': `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';

import { ${className} } from './app.component';

@NgModule({
  imports: [BrowserModule, FormsModule, PorscheDesignSystemModule.load({ prefix: '' }),],
  declarations: [${className}],
  bootstrap: [${className}],
})
export class AppModule {}`,
    },
    template: 'angular-cli',
    title,
    description,
    dependencies: {
      '@porsche-design-system/components-angular': `${version}`,
    },
  });
};
