import { version as pdsVersion } from '../../../../components-js/projects/components-wrapper/package.json';
import { dependencies } from '../../../../components-angular/package.json';
import { getAdditionalDependencies, isTable } from '@/utils/stackblitz/helper';
import { replaceSharedTableImports } from './helper';
import { convertMarkup } from '@/utils/formatting';
import type { DependenciesMap, StackBlitzFrameworkOpts } from '@/utils/stackblitz/helper';
import type { Project, OpenOptions, ProjectDependencies } from '@stackblitz/sdk';

export const getCleanedAngularMarkup = (markup: string): string =>
  markup
    .replace(/(@Component\({\n\s+selector: ')(?:[A-z]|-)+(',)/, '$1porsche-design-system-app$2')
    .replace(/(export class )[A-z]+( {)/, '$1AppComponent$2');

export const getComponentTsFrameworkMarkup = (markup: string, isTable: boolean): string => {
  const cleanedMarkup = getCleanedAngularMarkup(markup);

  return isTable ? replaceSharedTableImports(cleanedMarkup) : cleanedMarkup;
};

export const getAppComponentTsDefaultMarkup = (markup: string): string =>
  `import { Component } from '@angular/core';

@Component({
  selector: 'porsche-design-system-app',
  template: \`
    ${convertMarkup(markup, 'angular').replace(/(\n)(\s*[<A-z\/]+)/g, '$1    $2')}\`,
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

export const getAngularDependencies = (usesImask: boolean, additionalDependencies?: string[]): ProjectDependencies => {
  const dependenciesMap: DependenciesMap = {
    IMask: {
      imask: `${dependencies['angular-imask']}`,
      'angular-imask': `${dependencies['angular-imask']}`,
    },
  };

  return {
    '@porsche-design-system/components-angular': `${pdsVersion}`,
    ...(additionalDependencies && getAdditionalDependencies(additionalDependencies, dependenciesMap)),
  };
};

export const usesIMask = (additionalDependencies?: string[]): boolean => {
  return additionalDependencies ? additionalDependencies.filter((x) => x === 'IMask').length > 0 : false;
};

export const getAngularProjectAndOpenOptions = (
  props: StackBlitzFrameworkOpts
): { project: Project; openOptions: OpenOptions } => {
  const { markup, description, title, hasFrameworkMarkup, bodyStyles, pdsComponents, additionalDependencies } = props;

  const hasIMask = usesIMask(additionalDependencies);

  const project: Project = {
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
    dependencies: getAngularDependencies(hasIMask, additionalDependencies),
  };

  const openOptions: OpenOptions = {};

  return { project, openOptions };
};
