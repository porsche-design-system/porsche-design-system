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

    const angularImports = [
      'ChangeDetectionStrategy',
      'ChangeDetectorRef',
      'Component',
      'ElementRef',
      ...(hasEventProps ? ['EventEmitter'] : []),
      'NgZone',
    ];
    const importsFromAngular = `import { ${angularImports.join(', ')} } from '@angular/core';`;

    const importsFromComponentsWrapperModule = '';

    const providerImports = ['ProxyCmp', ...(hasEventProps ? ['proxyOutputs'] : [])];
    const importsFromProvider = `import { ${providerImports.join(', ')} } from '../../utils';`;

    const typesImports = nonPrimitiveTypes;
    const importsFromTypes = typesImports.length ? `import type { ${typesImports.join(', ')} } from '../types';` : '';

    return [importsFromAngular, importsFromProvider, importsFromTypes, importsFromComponentsWrapperModule]
      .filter((x) => x)
      .join('\n');
  }

  public generateProps(_: TagName, __: string): string {
    return '';
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    const inputProps = extendedProps.filter(({ isEvent }) => !isEvent);
    const outputProps = extendedProps
      .filter(({ isEvent }) => isEvent)
      .map((x) => ({ ...x, key: camelCase(x.key.substring(2)) }));

    const inputs = inputProps.length
      ? `const inputs: string[] = [${inputProps.map(({ key }) => `'${key}'`).join(', ')}];`
      : '';
    const outputs = outputProps.length
      ? `const outputs: string[] = [${outputProps.map(({ key }) => `'${key}'`).join(', ')}];`
      : '';

    const inputsAndOutputs = [inputs, outputs].filter((x) => x).join('\n');
    const decoratorOpts = (inputs ? ['inputs'] : []).filter((x) => x).join('\n');

    const componentOpts = [
      `selector: '${component},[${component}]'`,
      'changeDetection: ChangeDetectionStrategy.OnPush',
      `template: '<ng-content></ng-content>'`,
      ...(inputs ? ['inputs'] : []),
      ...(outputs ? ['outputs'] : []),
    ]
      .filter((x) => x)
      .join(',\n  ');

    const classMembers = [
      'protected el: HTMLElement;',
      ...inputProps.map(
        (x) =>
          (x.isDeprecated ? '/** @deprecated */\n  ' : '') + `${x.key}${x.isOptional ? '?' : ''}: ${x.rawValueType};`
      ),
      ...outputProps.map(
        (x) =>
          (x.isDeprecated ? '/** @deprecated */\n  ' : '') +
          `${x.key}!: EventEmitter<CustomEvent<${x.rawValueType.match(/<(.*?)>/)?.[1]}>>;`
      ),
    ].join('\n  ');

    const constructorCode = [
      'c.detach();',
      'this.el = r.nativeElement;',
      ...(outputs ? ['proxyOutputs(this, outputs);'] : []),
    ].join('\n    ');

    const genericType = this.inputParser.hasGeneric(component) ? '<T>' : '';
    const implementsOnInit = '';
    const constructorParams = `c: ChangeDetectorRef, r: ElementRef, protected z: NgZone`;

    return `${inputsAndOutputs}

${this.inputParser.getDeprecationMessage(component)}@ProxyCmp({
  ${decoratorOpts}
})
@Component({
  ${componentOpts}
})
export class ${this.generateComponentName(component)}${genericType}${implementsOnInit} {
  ${classMembers}

  constructor(${constructorParams}) {
    ${constructorCode}
  }
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
