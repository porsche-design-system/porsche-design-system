import type { TagName } from '@porsche-design-system/shared';
import { ReactWrapperGenerator } from './ReactWrapperGenerator';
import type { ExtendedProp } from './DataStructureBuilder';
import { pascalCase, paramCase } from 'change-case';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { INTERNAL_TAG_NAMES } from '@porsche-design-system/shared';

export class NextJsReactWrapperGenerator extends ReactWrapperGenerator {
  protected projectDir = 'react-ssr-wrapper';
  protected ignoreComponents: TagName[] = INTERNAL_TAG_NAMES.filter(
    (tagName) => tagName !== 'p-select-wrapper-dropdown'
  );

  public generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    let imports = super.generateImports(component, extendedProps, nonPrimitiveTypes);
    const ssrComponentName = this.getSsrComponentName(component);
    imports += `\nimport { ${ssrComponentName} } from '../dsr-components/${paramCase(
      ssrComponentName.replace('DSR', '')
    )}';`;

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

    // add hydrated class
    tweakedComponent = tweakedComponent.replace(
      /const props = \{/,
      `// @ts-ignore
    if (!process.browser) {
      className = className ? \`\${className} ssr\` : 'ssr';
    }

    $&`
    );

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

    tweakedComponent = tweakedComponent.replace(
      /\.\.\.rest,\n/,
      `$&      // @ts-ignore
      ...(!process.browser
        ? {
            ${hostAttributes}children: (
              <${this.getSsrComponentName(component)}
                {...{ ${spreadProps} }}
              />
            ),
          }
        : {
            ${hasChildren ? 'children,\n            ' : ''}suppressHydrationWarning: true,
          }),
`
    );

    return tweakedComponent;
  }

  private getSsrComponentName(component: TagName): string {
    return 'DSR' + pascalCase(component.slice(2));
  }
}
