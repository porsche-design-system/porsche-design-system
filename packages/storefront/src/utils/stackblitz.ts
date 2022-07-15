import sdk from '@stackblitz/sdk';
import { convertMarkup } from '@/utils/formatting';
import { themeDark } from '@porsche-design-system/utilities-v2';
import { version as pdsVersion } from '../../../components-js/projects/components-wrapper/package.json';
import { devDependencies as reactDevDependencies } from '../../../components-react/package.json';
import { paramCase } from 'change-case';
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
  hostComponentName?: string;
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
  const componentNames = componentNamesArray.join(', ');
  const isThemeDark = theme === 'dark';

  const openProps: OpenFrameWorkOpts = {
    markup: convertedMarkup,
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
        '@porsche-design-system/components-js': `${pdsVersion}`,
      },
    },
    {
      openFile: 'index.html',
    }
  );
};

export const openReact = (props: OpenFrameWorkOpts) => {
  const { markup, description, title, hasFrameworkMarkup, isThemeDark, componentNames } = props;

  const cleanedFragmentsMarkup = markup.replace(/(<\/?)(>)/g, '$1React.Fragment$2');

  const appTsx = hasFrameworkMarkup
    ? `import React from 'react';
${cleanedFragmentsMarkup}`
    : `import * as React from 'react';
import { ${componentNames} } from '@porsche-design-system/components-react'
export default function App() {
  return (
    <div>
      ${cleanedFragmentsMarkup}
    </div>
  );
}`;

  const [, extractComponentName] = markup.match(/const ([A-z]+) = \(\): JSX.Element => {/) ?? [];
  const reactComponentName = hasFrameworkMarkup ? extractComponentName : 'App';
  const reactImport = hasFrameworkMarkup ? `{ ${reactComponentName} }` : reactComponentName;

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
      <${reactComponentName} />
    </PorscheDesignSystemProvider>
  </StrictMode>
);`,
        'style.css': isThemeDark ? bodyStyles : '',
      },
      template: 'create-react-app',
      title,
      description,
      dependencies: {
        '@porsche-design-system/components-react': `${pdsVersion}`,
        '@types/react': `${reactDevDependencies['@types/react']}`,
        '@types/react-dom': `${reactDevDependencies['@types/react-dom']}`,
      },
    },
    {
      openFile: 'App.tsx',
    }
  );
};

export const openAngular = (props: OpenFrameWorkOpts) => {
  const { markup, description, title, hasFrameworkMarkup, isThemeDark } = props;

  const [, matchedClassName] = markup.match(/export class ([A-z]+) {/) ?? [];
  const className = hasFrameworkMarkup ? matchedClassName : 'AppComponent';
  const classNameParamCase = paramCase(className);

  const selector = hasFrameworkMarkup
    ? `<${classNameParamCase}></${classNameParamCase}>`
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
      '@porsche-design-system/components-angular': `${pdsVersion}`,
    },
  });
};
