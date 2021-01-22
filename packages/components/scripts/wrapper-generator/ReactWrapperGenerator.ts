import { TagName } from '@porsche-design-system/components/dist/types/tags';
import { camelCase, paramCase, pascalCase } from 'change-case';
import { AbstractWrapperGenerator } from './AbstractWrapperGenerator';
import { ExtendedProp } from './DataStructureBuilder';

export class ReactWrapperGenerator extends AbstractWrapperGenerator {
  protected packageDir = 'components-react';

  public getComponentFileName(component: TagName, withOutExtension?: boolean): string {
    return `${component.replace('p-', '')}.wrapper${withOutExtension ? '' : '.tsx'}`;
  }

  public generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    const hasEventProps = extendedProps.some(({ isEvent }) => isEvent);
    const canBeObject = extendedProps.some(({ canBeObject }) => canBeObject);

    const reactImports = [
      'HTMLAttributes',
      'useRef',
      ...(this.inputParser.canHaveChildren(component) ? ['PropsWithChildren'] : []),
    ];
    const importsFromReact = `import { ${reactImports.join(', ')} } from 'react';`;
    const providerImports = [
      'usePrefix',
      'useMergedClass',
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
      .replace(/"(\w+)"(\?:)/g, '$1$2') // clean double quotes around interface/type keys
      .replace(/    |\t\t/g, '  ') // adjust indentation
      .replace(/(  |\t)};/g, '};'); // adjust indentation at closing };
    return content;
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    const propsToDestructure = extendedProps.filter(({ isEvent, hasToBeMapped }) => isEvent || hasToBeMapped);
    const propsToEventListener = extendedProps.filter(({ isEvent }) => isEvent);
    const propsToMap = extendedProps.filter(({ hasToBeMapped }) => hasToBeMapped);

    const wrapperPropsArr: string[] = [...propsToDestructure.map(({ key }) => key), 'className', '...rest'];
    const wrapperProps = `{ ${wrapperPropsArr.join(', ')} }`;

    const propsName = this.generatePropsName(component);
    const wrapperPropsType = this.inputParser.canHaveChildren(component)
      ? `PropsWithChildren<${propsName}>`
      : propsName;

    const componentHooksArr: string[] = [
      'const elementRef = useRef<HTMLElement>();',
      ...propsToEventListener.map(
        ({ key }) => `useEventCallback(elementRef, '${camelCase(key.substr(2))}', ${key} as any);`
      ),
      `const Tag = usePrefix('${component}');`,
    ];
    const componentHooks = componentHooksArr.join('\n  ');

    const componentPropsArr: string[] = [
      '...rest',
      ...propsToMap.map(
        ({ key, canBeObject }) => `'${paramCase(key)}': ${canBeObject ? `jsonStringify(${key})` : key}`
      ),
      'class: useMergedClass(elementRef, className)',
      'ref: elementRef',
    ];

    const componentProps = `const props = {
    ${componentPropsArr.join(',\n    ')}
  };`;

    return `export const ${pascalCase(component)} = (${wrapperProps}: ${wrapperPropsType}): JSX.Element => {
  ${componentHooks}

  ${componentProps}

  return <Tag {...props} />;
};`;
  }
}
