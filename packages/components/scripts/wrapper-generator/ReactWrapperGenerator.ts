import type { TagName } from '@porsche-design-system/shared';
import { camelCase, pascalCase } from 'change-case';
import ts from 'typescript';
import { AbstractWrapperGenerator } from './AbstractWrapperGenerator';
import type { ExtendedProp } from './DataStructureBuilder';

type ParsedReactEvent = {
  name: string;
  typeName: string;
  detailType: string;
  handler: string;
};

type ParsedReactProps = {
  properties: string[];
  events: ParsedReactEvent[];
};

export class ReactWrapperGenerator extends AbstractWrapperGenerator {
  protected packageDir = 'components-react';
  protected projectDir = 'react-wrapper';

  public getComponentFileName(component: TagName): string {
    return `${component.replace('p-', '')}.wrapper.tsx`;
  }

  public generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    const hasRegularProps = extendedProps.some(({ isEvent }) => !isEvent);
    const hasEventProps = extendedProps.some(({ isEvent }) => isEvent);

    const reactImports = [
      'type ForwardedRef',
      'forwardRef',
      'type JSX',
      ...(this.inputParser.canHaveChildren(component) ? ['type PropsWithChildren'] : []),
      'useRef',
    ].sort();
    const importsFromReact = `import { ${reactImports.join(', ')} } from 'react';`;

    const importsFromBaseProps = `import type { BaseProps } from '../../BaseProps';`;

    const hooksImports = [
      ...(hasRegularProps ? ['useBrowserLayoutEffect'] : []),
      ...(hasEventProps ? ['useEventCallback'] : []),
      'useMergedClass',
      'usePrefix',
    ].sort();
    const importsFromHooks = `import { ${hooksImports.join(', ')} } from '../../hooks';`;

    const utilsImports = ['syncRef'];
    const importsFromUtils = `import { ${utilsImports.join(', ')} } from '../../utils';`;

    const importsFromTypes = nonPrimitiveTypes.length
      ? `import type { ${nonPrimitiveTypes.join(', ')} } from '../types';`
      : '';

    return [
      "'use client';\n",
      importsFromReact,
      importsFromBaseProps,
      importsFromHooks,
      importsFromUtils,
      importsFromTypes,
    ]
      .filter(Boolean)
      .join('\n');
  }

  public generateProps(component: TagName, rawComponentInterface: string): string {
    const genericType = this.inputParser.hasGeneric(component) ? '<T>' : '';
    const propsName = this.generatePropsName(component) + genericType;
    const { properties, events } = this.parseComponentProps(component, rawComponentInterface, genericType);

    if (!events.length) {
      return `export type ${propsName} = BaseProps & ${rawComponentInterface};`;
    }

    const componentName = pascalCase(component);
    const propertiesName = `${componentName.slice(1)}Properties${genericType}`;
    const eventHandlersName = `${componentName.slice(1)}EventHandlers${genericType}`;
    const eventMapName = `${componentName.slice(1)}EventMap${genericType}`;
    const elementName = `${componentName}Element${genericType}`;
    const eventTypes = events.map(
      ({ typeName, detailType }) => `export interface ${typeName} extends CustomEvent<${detailType}> {
  target: ${elementName};
}`
    );

    // React callbacks are not DOM properties. Only the React props merge BaseProps, replacing
    // synthetic callbacks such as onBlur with the component's actual CustomEvent signature.
    return `interface ${propertiesName} {${properties.join('')}
}

interface ${eventHandlersName} {${events.map(({ handler }) => handler).join('')}
}

interface ${eventMapName} {
${events.map(({ name, typeName }) => `  '${name}': ${typeName};`).join('\n')}
}

export type ${propsName} = Omit<BaseProps, keyof ${eventHandlersName}> & ${propertiesName} & ${eventHandlersName};

export interface ${elementName} extends HTMLElement, ${propertiesName} {
${this.generateEventListenerOverloads(elementName, eventMapName)}
}

${eventTypes.join('\n\n')}`;
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
      'const elementRef = useRef<HTMLElement | undefined>(undefined);',
      ...propsToEventListener.map(
        ({ key }) => `useEventCallback(elementRef, '${camelCase(key.substring(2))}', ${key} as any);`
      ),
      `const WebComponentTag = usePrefix('${component}');`,
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

    const componentPropsArr: string[] = [
      '...rest',
      `class: useMergedClass(elementRef, className)`,
      'ref: syncRef(elementRef, ref)',
    ];

    const componentProps = `const props = {
      ${componentPropsArr.join(',\n      ')}
    };`;

    const genericType = hasGeneric ? '<T extends object>' : '';

    // Preserve the existing ref API; concrete ref inference/enforcement is deferred to V5 (#4712).
    return `${this.inputParser.getDeprecationMessage(component)}export const ${pascalCase(component)} = /*#__PURE__*/ forwardRef(
  ${genericType}(
    ${wrapperProps}: ${wrapperPropsType},
    ref: ForwardedRef<HTMLElement>
  ): JSX.Element => {
    ${[componentHooks, componentEffects, componentProps].filter(Boolean).join('\n\n    ')}

    // @ts-ignore
    return <WebComponentTag {...props} />;
  }
);`;
  }

  private parseComponentProps(
    component: TagName,
    rawComponentInterface: string,
    genericType: string
  ): ParsedReactProps {
    // Use syntax nodes to separate top-level members without splitting nested types or JSDoc.
    // Keep the original member text so defaults, deprecations, and optionality survive generation.
    const source = ts.createSourceFile(
      `${component}.ts`,
      `interface Props${genericType} ${rawComponentInterface}`,
      ts.ScriptTarget.Latest,
      true
    );
    const declaration = source.statements[0];
    if (!declaration || !ts.isInterfaceDeclaration(declaration)) {
      throw new Error(`Expected a component props interface for ${component}`);
    }

    const properties: string[] = [];
    const events: ParsedReactEvent[] = [];
    for (const member of declaration.members) {
      if (!ts.isPropertySignature(member) || !ts.isIdentifier(member.name)) {
        throw new Error(`Expected a named component prop for ${component}: ${member.getText(source)}`);
      }
      const key = member.name.text;
      const rawMember = member.getFullText(source);
      if (!/^on[A-Z]/.test(key)) {
        properties.push(rawMember);
        continue;
      }

      const eventType = member.type && ts.isFunctionTypeNode(member.type) ? member.type.parameters[0]?.type : undefined;
      if (
        !eventType ||
        !ts.isTypeReferenceNode(eventType) ||
        eventType.typeName.getText(source) !== 'CustomEvent' ||
        eventType.typeArguments?.length !== 1
      ) {
        throw new Error(`Expected a CustomEvent callback for ${component}.${key}`);
      }

      // Match the DOM event name used by useEventCallback. Public event types follow the
      // component's P-prefixed name; existing event-detail names remain unchanged.
      const typeName = `${pascalCase(component)}${key.slice(2)}Event${genericType}`;
      const typeStart = eventType.getStart(source) - member.getFullStart();
      const typeEnd = eventType.end - member.getFullStart();
      events.push({
        name: camelCase(key.slice(2)),
        typeName,
        detailType: eventType.typeArguments[0].getText(source),
        handler: rawMember.slice(0, typeStart) + typeName + rawMember.slice(typeEnd),
      });
    }
    return { properties, events };
  }

  private generateEventListenerOverloads(elementName: string, eventMapName: string): string {
    // Host capture listeners see composed native events before the inner control can stop propagation.
    // A same-name CustomEvent is a separate dispatch, regardless of its detail payload (V5: #4689).
    // Only known non-capturing options can promise custom-only types for overlapping native names.
    // Retain native and string fallbacks so the element remains compatible with HTMLElement.
    return ['addEventListener', 'removeEventListener']
      .map((method) => {
        const optionsType = method === 'addEventListener' ? 'AddEventListenerOptions' : 'EventListenerOptions';
        return `  ${method}<K extends keyof ${eventMapName}>(type: K, listener: (this: ${elementName}, event: ${eventMapName}[K]) => void, options?: false | (${optionsType} & { capture?: false })): void;
  ${method}<K extends keyof ${eventMapName}>(type: K, listener: (this: ${elementName}, event: ${eventMapName}[K] | HTMLElementEventMap[K & keyof HTMLElementEventMap]) => void, options?: boolean | ${optionsType}): void;
  ${method}<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, event: HTMLElementEventMap[K]) => void, options?: boolean | ${optionsType}): void;
  ${method}(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | ${optionsType}): void;`;
      })
      .join('\n');
  }

  private generatePropsName(component: TagName): string {
    return `${pascalCase(component)}Props`;
  }
}
