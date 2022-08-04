import { version as pdsVersion } from '../../../../components-js/projects/components-wrapper/package.json';
import { dependencies } from '../../../../components-angular/package.json';
import { getAdditionalDependencies, isTable, replaceSharedTableImports } from '@/utils/stackblitz/helper';
import { convertMarkup } from '@/utils';
import type { DependenciesMap, StackBlitzFrameworkOpts } from '@/utils/stackblitz/helper';
import type { Project, OpenOptions } from '@stackblitz/sdk';

const getCleanedMarkup = (markup: string): string =>
  markup
    .replace(/(@Component\({\n\s+selector: ')(?:[A-z]|-)+(',)/, '$1porsche-design-system-app$2')
    .replace(/(export class )[A-z]+( {)/, '$1AppComponent$2');

const getComponentTsFrameworkMarkup = (markup: string, isTable: boolean): string => {
  const cleanedMarkup = getCleanedMarkup(markup);

  return isTable ? replaceSharedTableImports(cleanedMarkup) : cleanedMarkup;
};

const getAppComponentTsDefaultMarkup = (markup: string): string =>
  `import { Component } from '@angular/core';

@Component({
  selector: 'porsche-design-system-app',
  template: \`
    ${convertMarkup(markup, 'angular')}\`,
})
export class AppComponent  {}`;

const getComponentTsMarkup = (markup: string, hasFrameworkMarkup: boolean, isTable: boolean): string =>
  hasFrameworkMarkup ? getComponentTsFrameworkMarkup(markup, isTable) : getAppComponentTsDefaultMarkup(markup);

const getMainTsMarkup = (): string => `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import 'zone.js/dist/zone';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));`;

const getModuleTsMarkup = (usesIMask: boolean): string => `import { NgModule } from '@angular/core';
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

export const getAngularProjectAndOpenOptions = (
  props: StackBlitzFrameworkOpts
): { project: Project; openOptions: OpenOptions } => {
  const { markup, description, title, hasFrameworkMarkup, bodyStyles, pdsComponents, additionalDependencies } = props;

  const dependenciesMap: DependenciesMap = {
    IMask: {
      imask: `${dependencies['angular-imask']}`,
      'angular-imask': `${dependencies['angular-imask']}`,
    },
  };

  const usesIMask = additionalDependencies && additionalDependencies.filter((x) => x === 'IMask');

  const project: Project = {
    files: {
      // root folder
      'index.html': `<porsche-design-system-app></porsche-design-system-app>
${`<style>${bodyStyles}</style>`}`,
      'main.ts': getMainTsMarkup(),
      'app/app.component.ts': getComponentTsMarkup(markup, hasFrameworkMarkup, isTable(pdsComponents)),
      'app/app.module.ts': getModuleTsMarkup(!!usesIMask),
    },
    template: 'angular-cli',
    title,
    description,
    dependencies: {
      '@porsche-design-system/components-angular': `${pdsVersion}`,
      ...(additionalDependencies && getAdditionalDependencies(additionalDependencies, dependenciesMap)),
    },
  };

  const openOptions: OpenOptions = {};

  return { project, openOptions };
};
