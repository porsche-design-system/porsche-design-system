import type { TagName } from '../../src/tags';
import { camelCase, paramCase, pascalCase } from 'change-case';
import { AbstractWrapperGenerator } from './AbstractWrapperGenerator';
import type { ExtendedProp } from './DataStructureBuilder';

export class AngularWrapperGenerator extends AbstractWrapperGenerator {
  protected packageDir = 'components-angular';

  public getComponentFileName(component: TagName, withOutExtension?: boolean): string {
    return `${component.replace('p-', '')}.wrapper.component${withOutExtension ? '' : '.ts'}`;
  }

  public generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    // const hasEventProps = extendedProps.some(({ isEvent }) => isEvent);
    // const canBeObject = extendedProps.some(({ canBeObject }) => canBeObject);

    const angularImports = ['ChangeDetectionStrategy', 'ChangeDetectorRef', 'Component', 'ElementRef', 'NgZone'];
    const importsFromAngular = `import { ${angularImports.join(', ')} } from '@angular/core';`;

    const providerImports = ['ProxyCmp', 'proxyOutputs'];
    const importsFromProvider = `import { ${providerImports.join(', ')} } from '../../provider';`;

    // TODO: if this is identical to react, take care of it in abstract class
    const importsFromTypes = nonPrimitiveTypes.length
      ? `import type { ${nonPrimitiveTypes.join(', ')} } from '../types';`
      : '';

    return [importsFromAngular, importsFromProvider, importsFromTypes].filter((x) => x).join('\n');
  }

  public generateProps(component: TagName, rawComponentInterface: string): string {
    return '';
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    // const propsToDestructure = extendedProps.filter(({ isEvent, hasToBeMapped }) => isEvent || hasToBeMapped);
    // const propsToEventListener = extendedProps.filter(({ isEvent }) => isEvent);
    // const propsToMap = extendedProps.filter(({ hasToBeMapped }) => hasToBeMapped);

    return `@Component()
export class ${this.generateComponentName(component)} {
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
