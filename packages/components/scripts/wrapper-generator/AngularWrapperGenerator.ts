import type { TagName } from '../../src/tags';
import { camelCase, pascalCase } from 'change-case';
import { AbstractWrapperGenerator } from './AbstractWrapperGenerator';
import type { ExtendedProp } from './DataStructureBuilder';

export class AngularWrapperGenerator extends AbstractWrapperGenerator {
  protected packageDir = 'components-angular';

  public getComponentFileName(component: TagName, withOutExtension?: boolean): string {
    return `${component.replace('p-', '')}.wrapper.component${withOutExtension ? '' : '.ts'}`;
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
    return ''; // `export interface ${this.generateComponentName(component)} ${rawComponentInterface}`;
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    const inputProps = extendedProps.filter(({ isEvent }) => !isEvent);
    const outputProps = extendedProps
      .filter(({ isEvent }) => isEvent)
      .map((x) => ({ ...x, key: camelCase(x.key.substr(2)) }));

    const inputs = inputProps.length ? `inputs: [${inputProps.map(({ key }) => `'${key}'`).join(', ')}]` : '';
    const outputs = outputProps.length ? `outputs: [${outputProps.map(({ key }) => `'${key}'`).join(', ')}]` : '';
    const componentOpts = [inputs, outputs].filter((x) => x).join(',\n  ');

    const classMembers = [
      'protected el: HTMLElement;',
      ...outputProps.map((x) => `${x.key}!: EventEmitter<${x.rawValueType.match(/<(.*?)>/)?.[1]}>;`),
    ].join('\n  ');

    const constructorCode = [
      'c.detach();',
      'this.el = r.nativeElement;',
      ...outputProps.map(({ key }) => `proxyOutputs(this, this.el, ['${key}']);`),
    ].join('\n    ');

    return `@ProxyCmp({
  ${inputs}
})
@Component({
  selector: '${component}',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
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
