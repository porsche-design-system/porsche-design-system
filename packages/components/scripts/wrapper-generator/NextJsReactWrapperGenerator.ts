import { getComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import { kebabCase, pascalCase } from 'change-case';
import type { ExtendedProp } from './DataStructureBuilder';
import { ReactWrapperGenerator } from './ReactWrapperGenerator';

export class NextJsReactWrapperGenerator extends ReactWrapperGenerator {
  protected projectDir = 'react-ssr-wrapper';

  public generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    let imports = super.generateImports(component, extendedProps, nonPrimitiveTypes);
    const ssrComponentName = this.getSsrComponentName(component);
    imports += `\nimport { ${ssrComponentName} } from '../dsr-components/${kebabCase(
      ssrComponentName.replace('DSR', '')
    )}';`;

    if (extendedProps.some(({ isEvent }) => !isEvent)) {
      imports += `\nimport { SSR_PROPS_ATTRIBUTE, serializeSsrProps } from '../../serializeSsrProps';`;
    }

    return imports;
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    let tweakedComponent = super.generateComponent(component, extendedProps);
    const componentMeta = getComponentMeta(component);
    const hasChildren = this.inputParser.canHaveChildren(component);

    // destructure children prop
    if (hasChildren) {
      tweakedComponent = tweakedComponent.replace(/\.\.\.rest/, 'children, $&');
    }

    // destructure internal props
    if (componentMeta.internalProps) {
      tweakedComponent = tweakedComponent.replace(/.*\.\.\.rest/, '    // @ts-ignore\n$&');

      Object.entries(componentMeta.internalProps).forEach(([prop, value]) => {
        value = value ? ' = ' + (typeof value === 'string' ? "'" + value + "'" : value) : '';
        tweakedComponent = tweakedComponent.replace(/\.\.\.rest/, `${prop}${value}, $&`);
      });
    }

    // add props
    const propsToSync = extendedProps.filter(({ isEvent }) => !isEvent);
    const spreadProps = [
      ...propsToSync.map(({ key }) => key + (key === 'theme' ? ': theme || useTheme()' : '')),
      ...(componentMeta.internalProps ? Object.keys(componentMeta.internalProps) : []),
      ...(hasChildren ? ['children'] : []),
    ].join(', ');
    const hostAttributes = componentMeta.hostAttributes
      ? `...${JSON.stringify(componentMeta.hostAttributes)},\n            `
      : '';

    // the web component applies the serialized props before its first render, the wrapper removes them on hydration
    const ssrPropsAttribute = propsToSync.length
      ? `[SSR_PROPS_ATTRIBUTE]: serializeSsrProps(
              { ${propsToSync.map(({ key }) => key).join(', ')} },
              { ${propsToSync
                .filter(({ defaultValue }) => defaultValue !== undefined)
                .map(({ key, defaultValue }) => `${key}: ${defaultValue}`)
                .join(', ')} }
            ),\n            `
      : '';

    if (propsToSync.length) {
      tweakedComponent = tweakedComponent.replace(
        /useBrowserLayoutEffect\(\(\) => \{\n/,
        `$&      elementRef.current?.removeAttribute(SSR_PROPS_ATTRIBUTE);\n`
      );
    }

    // `data-dsr` is rendered on the server only (`data-ssr` on the client too): it tells the web component to wait
    // until the parser has attached the declarative shadow root, which matters when the markup is streamed
    tweakedComponent = tweakedComponent.replace(
      /\.\.\.rest,\n/,
      `$&      // @ts-ignore
      ...(!process.browser
        ? {
            'data-dsr': '',
            ${hostAttributes}${ssrPropsAttribute}children: (
              <${this.getSsrComponentName(component)}
                {...{ ${spreadProps} }}
              />
            ),
          }
        : {
            ${hasChildren ? 'children,\n            ' : ''}suppressHydrationWarning: true,
          }),
      'data-ssr': '',
`
    );

    return tweakedComponent;
  }

  private getSsrComponentName(component: TagName): string {
    return 'DSR' + pascalCase(component.slice(2));
  }
}
