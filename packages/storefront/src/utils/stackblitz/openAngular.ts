import { version as pdsVersion } from '../../../../components-js/projects/components-wrapper/package.json';
import { bodyStyles } from '@/utils/stackblitz/openInStackBlitz';
import type { StackBlitzFrameworkOpts } from '@/utils/stackblitz/openInStackBlitz';
import { paramCase } from 'change-case';
import sdk from '@stackblitz/sdk';

export const openAngular = (props: StackBlitzFrameworkOpts): void => {
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
