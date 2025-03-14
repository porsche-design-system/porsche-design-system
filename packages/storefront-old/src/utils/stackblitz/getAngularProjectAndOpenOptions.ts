import { dependencies, devDependencies } from '../../../../components-angular/package.json';
import {
  convertImportPaths,
  getExternalDependencies,
  getSharedImportConstants,
  isStableStorefrontReleaseOrForcedPdsVersion,
  removeSharedImport,
} from './helper';
import { convertMarkup } from '../../utils/formatting';
import type { DependencyMap, SharedImportKey, GetStackBlitzProjectAndOpenOptions, ExternalDependency } from '@/utils';
import type { PlaygroundDir, StackBlitzProjectDependencies } from '@/models';
import { initialStyles } from '@/lib/partialResults';

const classNameRegex = /(export class )[a-zA-Z]+( {)/;

// TODO: this entire puzzle should be refactored into an object-oriented way so that there is a clear and clean structure
// as well as code flow, similar to our WrapperGenerator

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

export const hasMarkupInlineScss = (input: string): boolean => {
  const [, styles] = input.match(/ {2}styles: \[([\s\S]+?)\]/) || [];
  return !!styles?.match(/@import|@use/);
};

// since stackblitz doesn't respect angular.json configurations we can't use the `inlineStyleLanguage: "scss"` option
// therefore we extract inline scss into a separate file and reference it via styleUrls
// open stackblitz issues: https://github.com/stackblitz/core/search?q=angular.json&type=issues
export const extractInlineStyles = (input: string, pdsVersion: string): string => {
  const [, inlineScss = ''] = input.match(/ {2}styles: \[\s+`\n([\s\S]+?)\s+`,\s+\],\n/) || [];

  return inlineScss
    .replace(/^ {6}/g, '')
    .replace(/\n {6}/g, '\n')
    .replace(
      /^(@(?:import|use)) '(@porsche-design-system)/,
      isStableStorefrontReleaseOrForcedPdsVersion(pdsVersion) ? '$&' : "$1 '../../$2"
    );
};

export const getAppComponentTs = (
  markup: string,
  isExampleMarkup: boolean,
  sharedImportKeys: SharedImportKey[],
  pdsVersion: string,
  hasInlineScss: boolean
): string => {
  let result = convertImportPaths(
    isExampleMarkup
      ? replaceSharedImportsWithConstants(markup, sharedImportKeys)
      : extendMarkupWithAppComponent(markup),
    'angular',
    pdsVersion
  );

  if (hasInlineScss) {
    result = result.replace(/ {2}styles: \[[\s\S]+\],/, "  styleUrls: ['./app.component.scss'],");
  }

  return result;
};

const externalDependencyModuleImportMap: Partial<Record<ExternalDependency, { module: string; import: string }>> = {
  imask: {
    module: 'IMaskModule',
    import: "import { IMaskModule } from 'angular-imask';",
  },
  'ag-grid-community': {
    module: 'AgGridAngular',
    import: "import { AgGridAngular } from 'ag-grid-angular';",
  },
};

export const getAppModuleTs = (externalDependencies: ExternalDependency[], pdsVersion: string): string => {
  const imports = [
    `import { NgModule${
      isStableStorefrontReleaseOrForcedPdsVersion(pdsVersion) ? '' : ', CUSTOM_ELEMENTS_SCHEMA'
    } } from '@angular/core';`,
    `import { BrowserModule } from '@angular/platform-browser';`,
    `import { FormsModule } from '@angular/forms';`,
    ...(isStableStorefrontReleaseOrForcedPdsVersion(pdsVersion)
      ? [`import { PorscheDesignSystemModule } from '@porsche-design-system/components-angular';`]
      : [`import * as porscheDesignSystem from './../../@porsche-design-system/components-js';`]),
    `import { AppComponent } from './app.component';`,
  ]
    .concat(
      externalDependencies
        .map((dependency) => externalDependencyModuleImportMap[dependency]?.import)
        .filter((item) => item) as string[]
    )
    .join('\n');

  const ngImports = [
    'BrowserModule',
    'FormsModule',
    ...(isStableStorefrontReleaseOrForcedPdsVersion(pdsVersion) ? ['PorscheDesignSystemModule'] : []),
  ]
    .concat(
      externalDependencies
        .map((dependency) => externalDependencyModuleImportMap[dependency]?.module)
        .filter((item) => item) as string[]
    )
    .join(', ');

  const ngSchemas = isStableStorefrontReleaseOrForcedPdsVersion(pdsVersion) ? [] : ['CUSTOM_ELEMENTS_SCHEMA'];

  return `${imports}
@NgModule({
  imports: [${ngImports}],
  declarations: [AppComponent],
  schemas: [${ngSchemas}],
  bootstrap: [AppComponent],
})
export class AppModule {${
    isStableStorefrontReleaseOrForcedPdsVersion(pdsVersion) ? '' : 'constructor () { porscheDesignSystem.load(); }'
  }}`;
};

export const getIndexHtml = (dir: PlaygroundDir, globalStyles: string): string => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Porsche Design System - Angular</title>

    <!-- prettier-ignore -->
    ${initialStyles}

    <style>
      html, body { margin: 0; padding: 0; }
      ${globalStyles}
    </style>
  </head>
  <body dir="${dir}">
    <porsche-design-system-app></porsche-design-system-app>
  </body>
</html>`;
};

export const getMainTs = (): string => {
  return `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import 'zone.js';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));`;
};

export const dependencyMap: Partial<DependencyMap<typeof dependencies & typeof devDependencies>> = {
  imask: {
    imask: dependencies['imask'],
    'angular-imask': dependencies['angular-imask'],
  },
  'ag-grid-community': {
    'ag-grid-community': devDependencies['ag-grid-community'],
  },
  'ag-grid-angular': {
    'ag-grid-angular': devDependencies['ag-grid-angular'],
  },
};

export const getDependencies = (
  externalDependencies: ExternalDependency[],
  pdsVersion: string
): StackBlitzProjectDependencies => {
  return {
    ...(isStableStorefrontReleaseOrForcedPdsVersion(pdsVersion) && {
      '@porsche-design-system/components-angular':
        pdsVersion || dependencies['@porsche-design-system/components-angular'],
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
    dir,
    description,
    title,
    globalStyles,
    sharedImportKeys,
    externalDependencies,
    porscheDesignSystemBundle,
    pdsVersion,
  } = opts;

  const hasInlineScss = hasMarkupInlineScss(markup);

  return {
    files: {
      ...porscheDesignSystemBundle,
      'src/app/app.component.ts': getAppComponentTs(
        markup,
        !!markup.match(classNameRegex),
        sharedImportKeys,
        pdsVersion,
        hasInlineScss
      ),
      ...(hasInlineScss && {
        'src/app/app.component.scss': extractInlineStyles(markup, pdsVersion),
      }),
      'src/app/app.module.ts': getAppModuleTs(externalDependencies, pdsVersion),
      'src/index.html': getIndexHtml(dir, globalStyles),
      'src/main.ts': getMainTs(),
    },
    template: 'angular-cli',
    title,
    description,
    dependencies: getDependencies(externalDependencies, pdsVersion),
  };
};
