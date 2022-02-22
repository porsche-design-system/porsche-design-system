import type { TagName } from '@porsche-design-system/shared';
import { camelCase, paramCase, pascalCase } from 'change-case';
import { AbstractWrapperGenerator } from './AbstractWrapperGenerator';
import type { ExtendedProp } from './DataStructureBuilder';
import { getComponentMeta } from '@porsche-design-system/shared';
import { PDS_SKELETON_CLASS_PREFIX } from '../../src/styles/skeletons';

export class ReactWrapperGenerator extends AbstractWrapperGenerator {
  protected packageDir = 'components-react';

  public getComponentFileName(component: TagName, withOutExtension?: boolean): string {
    return `${component.replace('p-', '')}.wrapper${withOutExtension ? '' : '.tsx'}`;
  }

  public generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    const hasEventProps = extendedProps.some(({ isEvent }) => isEvent);
    const canBeObject = extendedProps.some(({ canBeObject }) => canBeObject);

    const reactImports = [
      'ForwardedRef',
      'forwardRef',
      'HTMLAttributes',
      ...(this.inputParser.canHaveChildren(component) ? ['PropsWithChildren'] : []),
      'useRef',
    ];
    const importsFromReact = `import { ${reactImports.join(', ')} } from 'react';`;

    const hooksImports = [
      ...(extendedProps.some(({ isEvent }) => !isEvent) ? ['useBrowserLayoutEffect'] : []),
      ...(hasEventProps ? ['useEventCallback'] : []),
      'useMergedClass',
      'usePrefix',
    ];
    const importsFromHooks = `import { ${hooksImports.join(', ')} } from '../../hooks';`;

    const utilsImports = ['syncRef'];
    const importsFromUtils = `import { ${utilsImports.join(', ')} } from '../../utils';`;

    const importsFromTypes = nonPrimitiveTypes.length
      ? `import type { ${nonPrimitiveTypes.join(', ')} } from '../types';`
      : '';

    return [importsFromReact, importsFromHooks, importsFromUtils, importsFromTypes].filter((x) => x).join('\n');
  }

  private generatePropsName(component: TagName): string {
    return `${pascalCase(component)}Props`;
  }

  public generateProps(component: TagName, rawComponentInterface: string): string {
    const genericType = this.inputParser.hasGeneric(component) ? '<T>' : '';
    return `export type ${this.generatePropsName(
      component
    )}${genericType} = HTMLAttributes<{}> & ${rawComponentInterface};`;
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    const hasGeneric = this.inputParser.hasGeneric(component);
    const propsToDestructure = extendedProps;
    const propsToEventListener = extendedProps.filter(({ isEvent }) => isEvent);
    const propsToSync = extendedProps.filter(({ isEvent }) => !isEvent);

    const wrapperPropsArr: string[] = [
      ...propsToDestructure.map(({ key, defaultValue, isEvent }) =>
        isEvent || defaultValue === undefined ? key : `${key} = ${defaultValue}`
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
        ({ key }) => `useEventCallback(elementRef, '${camelCase(key.substr(2))}', ${key} as any);`
      ),
      `const Tag = usePrefix('${component}');`,
    ];
    const componentHooks = componentHooksArr.join('\n    ');

    const [firstPropToSync] = propsToSync;
    const componentEffectsArr: string[] =
      propsToSync.length === 1
        ? [
            `useBrowserLayoutEffect(() => {
      (elementRef.current as any).${firstPropToSync.key} = ${firstPropToSync.key};
    }, [${firstPropToSync.key}]);`,
          ]
        : [
            `const propsToSync = [${propsToSync.map(({ key }) => key).join(', ')}];`,
            `useBrowserLayoutEffect(() => {
      const { current } = elementRef;
      [${propsToSync.map(({ key }) => `'${key}'`).join(', ')}].forEach(
        (propName, i) => ((current as any)[propName] = propsToSync[i])
      );
    }, propsToSync);`,
          ];
    const componentEffects = propsToSync.length ? componentEffectsArr.join('\n    ') : '';

    let skeletonClassNames: string = '';

    if (getComponentMeta(component).hasSkeleton) {
      skeletonClassNames = getComponentMeta(component)
        .skeletonProps.map(
          (prop) => `\${prop ? ' ${PDS_SKELETON_CLASS_PREFIX}${paramCase(prop)}-${JSON.stringify(prop)}' : ''}`
        )
        .join('');
    }
    const classNameWithSkeleton: string = `\${className ?? ''}${skeletonClassNames}`;

    const componentPropsArr: string[] = [
      '...rest',
      `class: useMergedClass(elementRef, ${classNameWithSkeleton}`,
      'ref: syncRef(elementRef, ref)',
    ];

    const componentProps = `const props = {
      ${componentPropsArr.join(',\n      ')}
    };`;

    const genericType = hasGeneric ? '<T extends object>' : '';

    return `export const ${pascalCase(component)} = /*#__PURE__*/ forwardRef(
  ${genericType}(
    ${wrapperProps}: ${wrapperPropsType},
    ref: ForwardedRef<HTMLElement>
  ): JSX.Element => {
    ${[componentHooks, componentEffects, componentProps].filter((x) => x).join('\n\n    ')}

    return <Tag {...props} />;
  }
);`;
  }
}
