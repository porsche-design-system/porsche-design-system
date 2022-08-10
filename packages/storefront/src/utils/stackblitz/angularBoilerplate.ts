import { dependencies } from '../../../../components-angular/package.json';
import { getExternalDependencies, removeSharedImport, getSharedImportConstants } from '@/utils/stackblitz/helper';
import { convertMarkup } from '@/utils/formatting';
import type {
  StackBlitzDependencyMap,
  SharedImportKey,
  GetStackblitzProjectAndOpenOptions,
  ExternalStackBlitzDependency,
} from '@/utils';
import { StackblitzProjectDependencies } from '@/models';

const classNameRegex = /(export class )[A-z]+( {)/;

export const getComponentTsFrameworkMarkup = (markup: string, sharedImportKeys: SharedImportKey[]): string => {
  const sharedImportConstants = getSharedImportConstants(sharedImportKeys);

  return `// @ts-nocheck
${removeSharedImport(
  markup
    .replace(/(@Component\({\n\s+selector: ')(?:[A-z]|-)+(',)/, `${sharedImportConstants}$1porsche-design-system-app$2`)
    .replace(classNameRegex, '$1AppComponent$2')
)}`;
};

export const getAppComponentTsDefaultMarkup = (markup: string): string =>
  `import { Component } from '@angular/core';

@Component({
  selector: 'porsche-design-system-app',
  template: \`
    ${convertMarkup(markup, 'angular')}\`,
})
export class AppComponent  {}`;

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
    '@angular/animations': dependencies['@angular/animations'],
    '@angular/common': dependencies['@angular/common'],
    '@angular/compiler': dependencies['@angular/compiler'],
    '@angular/core': dependencies['@angular/core'],
    '@angular/forms': dependencies['@angular/forms'],
    '@angular/platform-browser': dependencies['@angular/platform-browser'],
    '@angular/platform-browser-dynamic': dependencies['@angular/platform-browser-dynamic'],
    '@angular/router': dependencies['@angular/router'],
    rxjs: dependencies['rxjs'],
    tslib: dependencies['tslib'],
    'zone.js': dependencies['zone.js'],
    '@porsche-design-system/components-angular': dependencies['@porsche-design-system/components-angular'],
    ...getExternalDependencies(externalStackBlitzDependencies, dependenciesMap),
  };
};

export const getAngularProjectAndOpenOptions: GetStackblitzProjectAndOpenOptions = (opts) => {
  const { markup, description, title, globalStyles, sharedImportKeys, externalStackBlitzDependencies } = opts;

  const isFrameworkMarkup = !!markup.match(classNameRegex);

  return {
    files: {
      'src/index.html': `<porsche-design-system-app></porsche-design-system-app>
${`<style>${globalStyles}</style>`}`,
      'src/main.ts': getMainTsMarkup(),
      'src/polyfill.ts': "import 'zone.js/dist/zone';  // Included with Angular CLI.",
      'src/styles.css': '',
      'src/app/app.component.ts': isFrameworkMarkup
        ? getComponentTsFrameworkMarkup(markup, sharedImportKeys)
        : getAppComponentTsDefaultMarkup(markup),
      'src/app/app.module.ts': getModuleTsMarkup(externalStackBlitzDependencies),
    },
    template: 'angular-cli',
    title,
    description,
    dependencies: getAngularDependencies(externalStackBlitzDependencies),
    openOptions: {},
  };
};
