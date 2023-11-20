import type { TagName } from '@porsche-design-system/shared';
import { camelCase, pascalCase } from 'change-case';
import { AbstractWrapperGenerator } from './AbstractWrapperGenerator';
import type { ExtendedProp } from './DataStructureBuilder';

export class ReactWrapperGenerator extends AbstractWrapperGenerator {
  protected packageDir = 'components-react';
  protected projectDir = 'react-wrapper';

  public getComponentFileName(component: TagName): string {
    return `${component.replace('p-', '')}.wrapper.tsx`;
  }

  public generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    const hasRegularProps = extendedProps.some(({ isEvent }) => !isEvent);
    const hasEventProps = extendedProps.some(({ isEvent }) => isEvent);
    const hasThemeProp = extendedProps.some(({ key }) => key === 'theme');

    const reactImports = [
      'type ForwardedRef',
      'forwardRef',
      'type HTMLAttributes',
      ...(this.inputParser.canHaveChildren(component) ? ['type PropsWithChildren'] : []),
      'useRef',
    ].sort();
    const importsFromReact = `import { ${reactImports.join(', ')} } from 'react';`;

    const hooksImports = [
      ...(hasRegularProps ? ['useBrowserLayoutEffect'] : []),
      ...(hasEventProps ? ['useEventCallback'] : []),
      'useMergedClass',
      'usePrefix',
      ...(hasThemeProp ? ['useTheme'] : []),
    ].sort();
    const importsFromHooks = `import { ${hooksImports.join(', ')} } from '../../hooks';`;

    const utilsImports = ['syncRef'];
    const importsFromUtils = `import { ${utilsImports.join(', ')} } from '../../utils';`;

    const importsFromTypes = nonPrimitiveTypes.length
      ? `import type { ${nonPrimitiveTypes.join(', ')} } from '../types';`
      : '';

    return ["'use client';\n", importsFromReact, importsFromHooks, importsFromUtils, importsFromTypes]
      .filter(Boolean)
      .join('\n');
  }

  public generateProps(component: TagName, rawComponentInterface: string): string {
    const genericType = this.inputParser.hasGeneric(component) ? '<T>' : '';
    const propsName = this.generatePropsName(component) + genericType;
    const htmlAttributesType = this.generateHTMLAttributesType();

    return `export type ${propsName} = ${htmlAttributesType} & ${rawComponentInterface};`;
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    const hasGeneric = this.inputParser.hasGeneric(component);
    const propsToDestructure = extendedProps;
    const propsToEventListener = extendedProps.filter(({ isEvent }) => isEvent);
    const propsToSync = extendedProps.filter(({ isEvent }) => !isEvent);

    const wrapperPropsArr: string[] = [
      ...propsToDestructure.map(({ key, defaultValue, isEvent }) =>
        isEvent || defaultValue === undefined || key === 'theme' ? key : `${key} = ${defaultValue}`
      ),
      'className',
      '...rest',
    ];
    const wrapperProps = `{ ${wrapperPropsArr.join(', ')} }`;

    const propsName = this.generatePropsName(component) + (hasGeneric ? '<T>' : '');
    const wrapperPropsType = this.inputParser.canHaveChildren(component)
      ? `PropsWithChildren<${propsName}>`
      : propsName;

    const componentHooksArr: string[] = [
      'const elementRef = useRef<HTMLElement>();',
      ...propsToEventListener.map(
        ({ key }) => `useEventCallback(elementRef, '${camelCase(key.substring(2))}', ${key} as any);`
      ),
      `const WebComponentTag = usePrefix('${component}');`,
    ];
    const componentHooks = componentHooksArr.join('\n    ');

    const [firstPropToSync] = propsToSync;
    const isTheme = firstPropToSync?.key === 'theme';
    const componentEffectsArr: string[] =
      propsToSync.length === 1
        ? [
            ...(isTheme ? ['const themeValue = useTheme();'] : []),
            `useBrowserLayoutEffect(() => {
      (elementRef.current as any).${firstPropToSync.key} = ${firstPropToSync.key + (isTheme ? ' || themeValue' : '')};
    }, [${firstPropToSync.key + (isTheme ? ', themeValue' : '')}]);`,
          ]
        : [
            `const propsToSync = [${propsToSync
              .map(({ key }) => key + (key === 'theme' ? ' || useTheme()' : ''))
              .join(', ')}];`,
            `useBrowserLayoutEffect(() => {
      const { current } = elementRef;
      [${propsToSync.map(({ key }) => `'${key}'`).join(', ')}].forEach(
        (propName, i) => ((current as any)[propName] = propsToSync[i])
      );
    }, propsToSync);`,
          ];
    const componentEffects = propsToSync.length ? componentEffectsArr.join('\n    ') : '';

    const componentPropsArr: string[] = [
      '...rest',
      `class: useMergedClass(elementRef, className)`,
      'ref: syncRef(elementRef, ref)',
    ];

    const componentProps = `const props = {
      ${componentPropsArr.join(',\n      ')}
    };`;

    const genericType = hasGeneric ? '<T extends object>' : '';

    return `${this.inputParser.getDeprecationMessage(component)}export const ${pascalCase(component)} = forwardRef(
  ${genericType}(
    ${wrapperProps}: ${wrapperPropsType},
    ref: ForwardedRef<HTMLElement>
  ): JSX.Element => {
    ${[componentHooks, componentEffects, componentProps].filter(Boolean).join('\n\n    ')}

    return <WebComponentTag {...props} />;
  }
);`;
  }

  // Return the `HTMLAttribute` type to be used in the intersection of the component type,
  // omitting HTML attributes that are overridden by the component
  protected generateHTMLAttributesType(): string {
    const overriddenPropNames = ['color'];
    const omitted = overriddenPropNames.map((propName) => `'${propName}'`).join(' | ');
    return `Omit<HTMLAttributes<{}>, ${omitted}>`;
  }

  private generatePropsName(component: TagName): string {
    return `${pascalCase(component)}Props`;
  }
}
