import { dependencies } from '../../../../components-angular/package.json';
import { getExternalDependencies, removeSharedImport, getSharedImportConstants } from '@/utils/stackblitz/helper';
import { convertMarkup } from '@/utils/formatting';
import type { DependencyMap, SharedImportKey, GetStackblitzProjectAndOpenOptions, ExternalDependency } from '@/utils';
import type { StackblitzProjectDependencies } from '@/models';

const classNameRegex = /(export class )[A-z]+( {)/;

export const replaceSharedImportsWithConstants = (markup: string, sharedImportKeys: SharedImportKey[]): string => {
  const sharedImportConstants = getSharedImportConstants(sharedImportKeys);

  // ts-nocheck is needed for examples that use types from shared
  return `${!sharedImportKeys ? '// @ts-nocheck\n' : ''}${removeSharedImport(
    markup
      .replace(/(@Component\({\n\s{2}selector: ')[a-z-]+/, `${sharedImportConstants}$1porsche-design-system-app`)
      .replace(classNameRegex, '$1AppComponent$2')
  )}`;
};

export const extendMarkupWithAppComponent = (markup: string): string =>
  `import { Component } from '@angular/core';

@Component({
  selector: 'porsche-design-system-app',
  template: \`
    ${convertMarkup(markup, 'angular').replace(/(\n)/g, '$1    ')}\`,
})
export class AppComponent {}`;

const externalDependencyModuleImportMap: {
  [key in ExternalDependency]: { module: string; import: string };
} = {
  imask: {
    module: 'IMaskModule',
    import: "import { IMaskModule } from 'angular-imask';",
  },
};

export const getAppModuleTsMarkup = (externalDependencies: ExternalDependency[]): string => {
  const imports = externalDependencies
    .map((dependency) => externalDependencyModuleImportMap[dependency].import)
    .join('\n');
  const modules = externalDependencies
    .map((dependency) => externalDependencyModuleImportMap[dependency].module)
    .join(', ');

  return `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';
import { AppComponent } from './app.component';
${imports}
@NgModule({
  imports: [BrowserModule, FormsModule, ${modules ? modules + ', ' : ''}PorscheDesignSystemModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}`;
};

const dependenciesMap: DependencyMap = {
  imask: {
    imask: dependencies['angular-imask'],
    'angular-imask': dependencies['angular-imask'],
  },
};

export const getAngularDependencies = (externalDependencies: ExternalDependency[]): StackblitzProjectDependencies => {
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
    ...getExternalDependencies(externalDependencies, dependenciesMap),
  };
};

export const getAngularProjectAndOpenOptions: GetStackblitzProjectAndOpenOptions = (opts) => {
  const { markup, description, title, globalStyles, sharedImportKeys, externalDependencies } = opts;

  const isFrameworkMarkup = !!markup.match(classNameRegex);

  const mainTsMarkup = `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import 'zone.js/dist/zone';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));`;

  const indexHtmlMarkup = `<!DOCTYPE html>
<html dir="ltr" lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Porsche Design System - Angular</title>

    <style>
      ${globalStyles}
    </style>
  </head>
  <body>
    <porsche-design-system-app></porsche-design-system-app>
  </body>
</html>`;

  return {
    files: {
      'src/index.html': indexHtmlMarkup,
      'src/main.ts': mainTsMarkup,
      'src/app/app.component.ts': isFrameworkMarkup
        ? replaceSharedImportsWithConstants(markup, sharedImportKeys)
        : extendMarkupWithAppComponent(markup),
      'src/app/app.module.ts': getAppModuleTsMarkup(externalDependencies),
    },
    template: 'angular-cli',
    title,
    description,
    dependencies: getAngularDependencies(externalDependencies),
    openOptions: {},
  };
};
