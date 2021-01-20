import { TagName } from '@porsche-design-system/components/dist/types/tags';
import { camelCase, paramCase, pascalCase } from 'change-case';
import { WrapperGenerator } from './WrapperGenerator';
import { ExtendedProp } from './DataStructureBuilder';

export class ReactWrapperGenerator extends WrapperGenerator {
  protected packageDir: string = 'components-react';

  constructor() {
    super();
    super.generate();
  }

  public getComponentFileName(component: TagName, withOutExtension?: boolean): string {
    return `${component.replace('p-', '')}.wrapper${withOutExtension ? '' : '.tsx'}`;
  }

  public generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    const hasEventProps = extendedProps.some(({ isEvent }) => isEvent);
    const canBeObject = extendedProps.some(({ canBeObject }) => canBeObject);

    const reactImports = [
      'HTMLAttributes',
      ...(this.inputParser.canHaveChildren(component) ? ['PropsWithChildren'] : []),
      ...(hasEventProps ? ['useRef'] : []),
    ];
    const importsFromReact = `import { ${reactImports.join(', ')} } from 'react';`;
    const providerImports = [
      'usePrefix',
      ...(hasEventProps ? ['useEventCallback'] : []),
      ...(canBeObject ? ['jsonStringify'] : []),
    ];
    const importsFromProvider = `import { ${providerImports.join(', ')} } from '../../provider';`;

    let importsFromTypes = '';
    if (nonPrimitiveTypes.length > 0) {
      importsFromTypes = `import type { ${nonPrimitiveTypes.join(', ')} } from '../types';`;
    }

    return [importsFromReact, importsFromProvider, importsFromTypes].filter((x) => x).join('\n');
  }

  private generatePropsName(component: TagName): string {
    return `${pascalCase(component)}Props`;
  }

  public generateProps(component: TagName, rawComponentInterface: string): string {
    const content = `export type ${this.generatePropsName(component)} = HTMLAttributes<{}> & ${rawComponentInterface};`
      .replace(/    |\t\t/g, '  ')
      .replace(/(  |\t)};/g, '};');
    return content;
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    let wrapperProps = 'props';
    let componentHooks = '';
    let componentProps = '';
    let componentAttributes = '{...props}';

    const propsToDestructure = extendedProps.filter(({ isEvent, hasToBeMapped }) => isEvent || hasToBeMapped);
    const propsToEventListener = extendedProps.filter(({ isEvent }) => isEvent);
    const propsToMap = extendedProps.filter(({ hasToBeMapped }) => hasToBeMapped);

    if (propsToDestructure.length > 0) {
      wrapperProps = `{ ${propsToDestructure.map(({ key }) => key).join(', ')}, ...rest }`;
    }

    const propMapping: string[] = [
      ...(propsToDestructure.length > 0 ? ['...rest'] : []),
      ...propsToMap.map(
        ({ key, canBeObject }) => `'${paramCase(key)}': ${canBeObject ? `jsonStringify(${key})` : key}`
      ),
    ];

    if (propsToEventListener.length > 0) {
      const eventHooks = propsToEventListener
        .map(({ key }) => `useEventCallback(elementRef, '${camelCase(key.substr(2))}', ${key} as any);`)
        .join('\n');

      propMapping.push('ref: elementRef');

      componentHooks = `const elementRef = useRef<HTMLElement>();
  ${eventHooks}\n`;
    }

    if (propMapping.length > 0) {
      componentProps = `const props = {
    ${propMapping.join(',\n    ')}
  };\n`;
    } else {
      if (propsToDestructure.length > 0) {
        componentAttributes = '{...rest}';
      }
    }

    const propsName = this.generatePropsName(component);
    const wrapperPropsType = this.inputParser.canHaveChildren(component)
      ? `PropsWithChildren<${propsName}>`
      : propsName;

    return `export const ${pascalCase(component)} = (${wrapperProps}: ${wrapperPropsType}): JSX.Element => {
  ${componentHooks}
  const Tag = usePrefix('${component}');
  ${componentProps}
  return <Tag ${componentAttributes} />;
};`;
  }
}
