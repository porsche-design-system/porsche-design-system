import sdk from '@stackblitz/sdk';
import { convertMarkup } from '@/utils/formatting';
import { Framework } from '@/models';
import { version } from '../../../components-js/projects/components-wrapper/package.json';

export type OpenStackBlitzOptions = {
  markup: string;
  componentName: string;
  additionalJavaScriptLogic?: string;
};

export const openVanillaJS = (props: OpenStackBlitzOptions) => {
  const { markup, componentName, additionalJavaScriptLogic } = props;

  sdk.openProject(
    {
      files: {
        'index.html': `${markup}`,
        'index.js': `import './style.css'
import * as porscheDesignSystem from '@porsche-design-system/components-js'
porscheDesignSystem.load();

${additionalJavaScriptLogic}
`,
        'style.css': `*:not(:last-child) { margin-right: 0.5rem; margin-bottom: 0.5rem; }`,
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

export const openReact = (props: OpenStackBlitzOptions) => {
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

export const openAngular = (props: OpenStackBlitzOptions) => {
  const { markup, componentName } = props;

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
      'app/app.component.css': `*:not(:last-child) { margin-right: 0.5rem; margin-bottom: 0.5rem; }`,
    },
    template: 'angular-cli',
    title: 'Angular Example',
    description: `Porsche Design System ${componentName} example`,
    dependencies: {
      '@porsche-design-system/components-angular': `${version}`,
    },
  });
};
