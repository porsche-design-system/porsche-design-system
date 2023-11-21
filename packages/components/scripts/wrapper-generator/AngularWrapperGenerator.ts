import type { TagName } from '@porsche-design-system/shared';
import { camelCase, pascalCase } from 'change-case';
import { AbstractWrapperGenerator } from './AbstractWrapperGenerator';
import type { ExtendedProp } from './DataStructureBuilder';
import * as path from 'path';

export class AngularWrapperGenerator extends AbstractWrapperGenerator {
  protected packageDir = 'components-angular';
  protected projectDir = 'angular-wrapper';

  // ngc with { enableIvy: false } can't handle index.ts barrel files 🤷‍♂️
  // https://github.com/ng-packagr/ng-packagr/issues/1013#issuecomment-424877378
  protected barrelFileName = 'barrel.ts';

  public getComponentFileName(component: TagName): string {
    return `${component.replace('p-', '')}.wrapper.ts`;
  }

  public generateImports(_: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    const hasEventProps = extendedProps.some(({ isEvent }) => isEvent);
    const hasThemeProp = extendedProps.some(({ key }) => key === 'theme');

    const angularImports = ['Component', ...(hasEventProps ? ['EventEmitter'] : [])].sort();
    const importsFromAngular = `import { ${angularImports.join(', ')} } from '@angular/core';`;

    const importsFromComponentsWrapperModule = '';

    const utilsImports = [hasThemeProp ? 'BaseComponentWithTheme' : 'BaseComponent'].sort();
    const importsFromUtils = `import { ${utilsImports.join(', ')} } from '../../utils';`;

    const typesImports = nonPrimitiveTypes;
    const importsFromTypes = typesImports.length ? `import type { ${typesImports.join(', ')} } from '../types';` : '';

    return [importsFromAngular, importsFromUtils, importsFromTypes, importsFromComponentsWrapperModule]
      .filter(Boolean)
      .join('\n');
  }

  public generateProps(_: TagName, __: string): string {
    return '';
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    const hasThemeProp = extendedProps.some(({ key }) => key === 'theme');
    const inputProps = extendedProps.filter(({ isEvent }) => !isEvent);
    const outputProps = extendedProps
      .filter(({ isEvent }) => isEvent)
      .map((x) => ({ ...x, key: camelCase(x.key.substring(2)) }));

    const inputs = inputProps.length ? `[${inputProps.map(({ key }) => `'${key}'`).join(', ')}]` : '';
    const outputs = outputProps.length ? `[${outputProps.map(({ key }) => `'${key}'`).join(', ')}]` : '';

    const componentOpts = [
      `selector: '${component},[${component}]'`,
      `template: '<ng-content />'`,
      ...(inputs ? [`inputs: ${inputs}`] : []),
      ...(outputs ? [`outputs: ${outputs}`] : []),
    ]
      .filter(Boolean)
      .join(',\n  ');

    const classMembers = [
      ...inputProps.map(
        (x) =>
          (x.isDeprecated ? '/** @deprecated */\n  ' : '') +
          `${(x.key === 'theme' ? 'declare ' : '') + x.key}${x.isOptional ? '?' : ''}: ${x.rawValueType};`
      ),
      ...outputProps.map(
        (x) =>
          (x.isDeprecated ? '/** @deprecated */\n  ' : '') +
          `${x.key} = new EventEmitter<CustomEvent<${x.rawValueType.match(/<(.*?)>/)?.[1]}>>();`
      ),
    ].join('\n  ');

    const genericType = this.inputParser.hasGeneric(component) ? '<T>' : '';
    const baseClass = hasThemeProp ? 'BaseComponentWithTheme' : 'BaseComponent';

    return `${this.inputParser.getDeprecationMessage(component)}@Component({
  ${componentOpts}
})
export class ${this.generateComponentName(component)}${genericType} extends ${baseClass} {
  ${classMembers}
}`;
  }

  public getAdditionalBarrelFileContent(): string {
    const componentNames = this.relevantComponentTagNames.map(this.generateComponentName);
    const imports = this.relevantComponentTagNames
      .map(
        (cmp, idx) => `import { ${componentNames[idx]} } from './${path.parse(this.getComponentFileName(cmp)).name}';`
      )
      .join('\n');

    const exports = `export const DECLARATIONS = [
  ${componentNames.join(',\n  ')}
];`;

    return [imports, exports].join('\n\n');
  }

  private generateComponentName(component: TagName): string {
    return pascalCase(component);
  }
}
