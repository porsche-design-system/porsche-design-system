import { version as pdsVersion } from '../../../../components-js/projects/components-wrapper/package.json';
import { dependencies } from '../../../../components-angular/package.json';
import {
  ExternalStackBlitzDependency,
  getExternalDependencies,
  GetStackblitzProjectAndOpenOptions,
  isTable,
} from '@/utils/stackblitz/helper';
import { getSharedImportConstants } from './helper';
import { convertMarkup } from '@/utils/formatting';
import type { StackBlitzDependencyMap } from '@/utils/stackblitz/helper';
import { StackblitzProjectDependencies } from '@/models';

export const getCleanedAngularMarkup = (markup: string): string =>
  markup
    .replace(/(@Component\({\n\s+selector: ')(?:[A-z]|-)+(',)/, '$1porsche-design-system-app$2')
    .replace(/(export class )[A-z]+( {)/, '$1AppComponent$2');

export const getComponentTsFrameworkMarkup = (markup: string, isTable: boolean): string => {
  const cleanedMarkup = getCleanedAngularMarkup(markup);

  return cleanedMarkup;
};

export const getAppComponentTsDefaultMarkup = (markup: string): string =>
  `import { Component } from '@angular/core';

@Component({
  selector: 'porsche-design-system-app',
  template: \`
    ${convertMarkup(markup, 'angular')}\`,
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

const externalStackBlitzDependencyModuleImportMap: {
  [key in ExternalStackBlitzDependency]: { module: string; import: string };
} = {
  imask: {
    module: 'IMaskModule',
    import: "import { IMaskModule } from 'angular-imask';",
  },
};

export const getModuleTsMarkup = (externalStackBlitzDependencies: ExternalStackBlitzDependency[]): string => {
  const imports = externalStackBlitzDependencies
    .map((dependency) => `\n${externalStackBlitzDependencyModuleImportMap[dependency].import}`)
    .join('\n');
  const modules = externalStackBlitzDependencies
    .map((dependency) => ` ${externalStackBlitzDependencyModuleImportMap[dependency].module},`)
    .join();

  return `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AppComponent } from './app.component';${imports}

@NgModule({
  imports: [BrowserModule, FormsModule,${modules} PorscheDesignSystemModule,],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}`;
};

const dependenciesMap: StackBlitzDependencyMap = {
  imask: {
    imask: dependencies['angular-imask'],
    'angular-imask': dependencies['angular-imask'],
  },
};

export const getAngularDependencies = (
  externalStackBlitzDependencies: ExternalStackBlitzDependency[]
): StackblitzProjectDependencies => {
  return {
    '@porsche-design-system/components-angular': pdsVersion,
    ...getExternalDependencies(externalStackBlitzDependencies, dependenciesMap),
  };
};

export const getAngularProjectAndOpenOptions: GetStackblitzProjectAndOpenOptions = (opts) => {
  const {
    markup,
    description,
    title,
    hasFrameworkMarkup,
    globalStyles,
    pdsComponents,
    externalStackBlitzDependencies,
  } = opts;

  return {
    files: {
      'index.html': `<porsche-design-system-app></porsche-design-system-app>
${`<style>${globalStyles}</style>`}`,
      'main.ts': getMainTsMarkup(),
      'app/app.component.ts': getComponentTsMarkup(markup, hasFrameworkMarkup, isTable(pdsComponents)),
      'app/app.module.ts': getModuleTsMarkup(externalStackBlitzDependencies),
    },
    template: 'angular-cli',
    title,
    description,
    dependencies: getAngularDependencies(externalStackBlitzDependencies),
    openOptions: {},
  };
};
