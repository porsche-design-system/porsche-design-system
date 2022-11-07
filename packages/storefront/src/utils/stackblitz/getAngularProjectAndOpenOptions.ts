import { dependencies } from '../../../../components-angular/package.json';
import {
  convertImportPaths,
  getExternalDependencies,
  getSharedImportConstants,
  isStableStorefrontRelease,
  removeSharedImport,
} from './helper';
import { convertMarkup } from '../../utils/formatting';
import type {
  DependencyMap,
  SharedImportKey,
  GetStackBlitzProjectAndOpenOptions,
  ExternalDependency,
} from '../../utils';
import type { StackBlitzProjectDependencies } from '../../models';

const classNameRegex = /(export class )[a-zA-Z]+( {)/;

export const replaceSharedImportsWithConstants = (markup: string, sharedImportKeys: SharedImportKey[]): string => {
  const sharedImportConstants = getSharedImportConstants(sharedImportKeys);

  // ts-nocheck is needed for examples that use types from shared
  return `${sharedImportKeys.length ? '// @ts-nocheck\n' : ''}${removeSharedImport(
    markup
      .replace(/(@Component\({\n\s{2}selector: ')[a-z-]+/, `${sharedImportConstants}$1porsche-design-system-app`)
      .replace(classNameRegex, '$1AppComponent$2')
  )}`;
};

export const extendMarkupWithAppComponent = (markup: string): string =>
  `import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'porsche-design-system-app',
  template: \`
    ${convertMarkup(markup, 'angular').replace(/(\n)/g, '$1    ')}
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}`;

export const getAppComponentTs = (
  markup: string,
  isExampleMarkup: boolean,
  sharedImportKeys: SharedImportKey[]
): string => {
  return convertImportPaths(
    isExampleMarkup
      ? replaceSharedImportsWithConstants(markup, sharedImportKeys)
      : extendMarkupWithAppComponent(markup),
    'angular'
  );
};

const externalDependencyModuleImportMap: {
  [key in ExternalDependency]: { module: string; import: string };
} = {
  imask: {
    module: 'IMaskModule',
    import: "import { IMaskModule } from 'angular-imask';",
  },
};

export const getAppModuleTs = (externalDependencies: ExternalDependency[], pdsVersion?: string): string => {
  const isPdsVersionAndStableStorefrontRelease = pdsVersion || isStableStorefrontRelease();
  const imports = [
    `import { NgModule${
      isPdsVersionAndStableStorefrontRelease ? '' : ', CUSTOM_ELEMENTS_SCHEMA'
    } } from '@angular/core';`,
    `import { BrowserModule } from '@angular/platform-browser';`,
    `import { FormsModule } from '@angular/forms';`,
    ...(isPdsVersionAndStableStorefrontRelease
      ? [`import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';`]
      : [`import * as porscheDesignSystem from './../../@porsche-design-system/components-js';`]),
    `import { AppComponent } from './app.component';`,
  ]
    .concat(externalDependencies.map((dependency) => externalDependencyModuleImportMap[dependency].import))
    .join('\n');

  const ngImports = [
    'BrowserModule',
    'FormsModule',
    ...(isStableStorefrontRelease() ? ['PorscheDesignSystemModule'] : []),
  ]
    .concat(externalDependencies.map((dependency) => externalDependencyModuleImportMap[dependency].module))
    .join(', ');

  const ngSchemas = isPdsVersionAndStableStorefrontRelease ? [] : ['CUSTOM_ELEMENTS_SCHEMA'];

  return `${imports}
@NgModule({
  imports: [${ngImports}],
  declarations: [AppComponent],
  schemas: [${ngSchemas}],
  bootstrap: [AppComponent],
})
export class AppModule {${
    isPdsVersionAndStableStorefrontRelease ? '' : 'constructor () { porscheDesignSystem.load(); }'
  }}`;
};

export const getIndexHtml = (globalStyles: string): string => {
  return `<!DOCTYPE html>
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
};

export const getMainTs = (): string => {
  return `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import 'zone.js/dist/zone';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));`;
};

export const dependencyMap: DependencyMap<typeof dependencies> = {
  imask: {
    imask: dependencies['imask'],
    'angular-imask': dependencies['angular-imask'],
  },
};

export const getDependencies = (
  externalDependencies: ExternalDependency[],
  pdsVersion?: string
): StackBlitzProjectDependencies => {
  return {
    ...(pdsVersion
      ? {
          '@porsche-design-system/components-angular': pdsVersion,
        }
      : isStableStorefrontRelease() && {
          '@porsche-design-system/components-angular': dependencies['@porsche-design-system/components-angular'],
        }),
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
    ...getExternalDependencies(externalDependencies, dependencyMap),
  };
};

export const getAngularProjectAndOpenOptions: GetStackBlitzProjectAndOpenOptions = (opts) => {
  const {
    markup,
    description,
    title,
    globalStyles,
    sharedImportKeys,
    externalDependencies,
    porscheDesignSystemBundle,
    pdsVersion,
  } = opts;

  return {
    files: {
      ...porscheDesignSystemBundle,
      'src/app/app.component.ts': getAppComponentTs(markup, !!markup.match(classNameRegex), sharedImportKeys),
      'src/app/app.module.ts': getAppModuleTs(externalDependencies, pdsVersion),
      'src/index.html': getIndexHtml(globalStyles),
      'src/main.ts': getMainTs(),
    },
    template: 'angular-cli',
    title,
    description,
    dependencies: getDependencies(externalDependencies, pdsVersion),
  };
};
