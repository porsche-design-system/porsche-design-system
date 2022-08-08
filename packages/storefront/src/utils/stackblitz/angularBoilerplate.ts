import { version as pdsVersion } from '../../../../components-js/projects/components-wrapper/package.json';
import { dependencies } from '../../../../components-angular/package.json';
import {
  ExternalStackBlitzDependency,
  getExternalDependencies,
  GetStackblitzProjectAndOpenOptions,
  hastIMaskDependency,
  isTable,
} from '@/utils/stackblitz/helper';
import { inlineSharedImports } from './helper';
import { convertMarkup } from '@/utils/formatting';
import type { StackBlitzDependencyMap } from '@/utils/stackblitz/helper';
import { StackblitzProjectDependencies } from '@/models';

export const getCleanedAngularMarkup = (markup: string): string =>
  markup
    .replace(/(@Component\({\n\s+selector: ')(?:[A-z]|-)+(',)/, '$1porsche-design-system-app$2')
    .replace(/(export class )[A-z]+( {)/, '$1AppComponent$2');

export const getComponentTsFrameworkMarkup = (markup: string, isTable: boolean): string => {
  const cleanedMarkup = getCleanedAngularMarkup(markup);

  return isTable ? inlineSharedImports(cleanedMarkup) : cleanedMarkup;
};

export const getAppComponentTsDefaultMarkup = (markup: string): string =>
  `import { Component } from '@angular/core';

@Component({
  selector: 'porsche-design-system-app',
  template: \`
    ${convertMarkup(markup, 'angular').replace(/(\n)(\s*[<A-z/]+)/g, '$1    $2')}\`,
})
export class AppComponent  {}`;

export const getComponentTsMarkup = (markup: string, hasFrameworkMarkup: boolean, isTable: boolean): string =>
  hasFrameworkMarkup ? getComponentTsFrameworkMarkup(markup, isTable) : getAppComponentTsDefaultMarkup(markup);

export const getMainTsMarkup =
  (): string => `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import 'zone.js/dist/zone';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));`;

export const getModuleTsMarkup = (usesIMask: boolean): string => `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
${usesIMask ? `import { IMaskModule } from 'angular-imask';` : ''}
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, FormsModule,${usesIMask ? 'IMaskModule,' : ''} PorscheDesignSystemModule,],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}`;

const dependenciesMap: StackBlitzDependencyMap = {
  imask: {
    imask: `${dependencies['angular-imask']}`,
    'angular-imask': `${dependencies['angular-imask']}`,
  },
};

export const getAngularDependencies = (
  usesImask: boolean,
  externalStackBlitzDependencies?: ExternalStackBlitzDependency[]
): StackblitzProjectDependencies => {
  return {
    '@porsche-design-system/components-angular': `${pdsVersion}`,
    ...(externalStackBlitzDependencies && getExternalDependencies(externalStackBlitzDependencies, dependenciesMap)),
  };
};

export const getAngularProjectAndOpenOptions: GetStackblitzProjectAndOpenOptions = (opts) => {
  const { markup, description, title, hasFrameworkMarkup, bodyStyles, pdsComponents, externalStackBlitzDependencies } =
    opts;

  const hasIMask = hastIMaskDependency(externalStackBlitzDependencies);

  return {
    files: {
      'index.html': `<porsche-design-system-app></porsche-design-system-app>
${`<style>${bodyStyles}</style>`}`,
      'main.ts': getMainTsMarkup(),
      'app/app.component.ts': getComponentTsMarkup(markup, hasFrameworkMarkup, isTable(pdsComponents)),
      'app/app.module.ts': getModuleTsMarkup(hasIMask),
    },
    template: 'angular-cli',
    title,
    description,
    dependencies: getAngularDependencies(hasIMask, externalStackBlitzDependencies),
    openOptions: {},
  };
};
