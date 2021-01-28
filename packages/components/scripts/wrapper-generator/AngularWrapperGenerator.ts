import type { TagName } from '../../src/tags';
import { camelCase, pascalCase } from 'change-case';
import { AbstractWrapperGenerator } from './AbstractWrapperGenerator';
import type { ExtendedProp } from './DataStructureBuilder';

export class AngularWrapperGenerator extends AbstractWrapperGenerator {
  protected packageDir = 'components-angular';

  // ngc with { enableIvy: false } can't handle index.ts barrel files 🤷‍♂️
  // https://github.com/ng-packagr/ng-packagr/issues/1013#issuecomment-424877378
  protected barrelFileName = 'barrel.ts';

  public getComponentFileName(component: TagName, withOutExtension?: boolean): string {
    return `${component.replace('p-', '')}.wrapper${withOutExtension ? '' : '.ts'}`;
  }

  public generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    const hasEventProps = extendedProps.some(({ isEvent }) => isEvent);
    // const canBeObject = extendedProps.some(({ canBeObject }) => canBeObject);

    const angularImports = ['ChangeDetectionStrategy', 'ChangeDetectorRef', 'Component', 'ElementRef', 'NgZone'];
    const importsFromAngular = `import { ${angularImports.join(', ')} } from '@angular/core';`;

    const providerImports = ['ProxyCmp', ...(hasEventProps ? ['proxyOutputs'] : [])];
    const importsFromProvider = `import { ${providerImports.join(', ')} } from '../../utils';`;

    const typesImports = nonPrimitiveTypes.concat(hasEventProps ? ['EventEmitter'] : []);
    const importsFromTypes = typesImports.length ? `import type { ${typesImports.join(', ')} } from '../types';` : '';

    return [importsFromAngular, importsFromProvider, importsFromTypes].filter((x) => x).join('\n');
  }

  public generateProps(component: TagName, rawComponentInterface: string): string {
    return '';
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    const inputProps = extendedProps.filter(({ isEvent }) => !isEvent);
    const outputProps = extendedProps
      .filter(({ isEvent }) => isEvent)
      .map((x) => ({ ...x, key: camelCase(x.key.substr(2)) }));

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
      ...inputProps.map((x) => `${x.key}: ${x.rawValueType};`),
      ...outputProps.map((x) => `${x.key}!: EventEmitter<${x.rawValueType.match(/<(.*?)>/)?.[1]}>;`),
    ].join('\n  ');

    const constructorCode = [
      'c.detach();',
      'this.el = r.nativeElement;',
      ...(outputs ? ['proxyOutputs(this, this.el, outputs);'] : []),
    ].join('\n    ');

    return `${inputsAndOutputs}

@ProxyCmp({
  ${decoratorOpts}
})
@Component({
  ${componentOpts}
})
export class ${this.generateComponentName(component)} {
  ${classMembers}

  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    ${constructorCode}
  }
}`;
  }

  public getAdditionalBarrelFileContent(): string {
    const componentTagNames: TagName[] = Object.keys(this.intrinsicElements) as TagName[];

    const componentNames = componentTagNames.map(this.generateComponentName);
    const imports = componentTagNames
      .map((cmp, idx) => `import { ${componentNames[idx]} } from './${this.getComponentFileName(cmp, true)}';`)
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
