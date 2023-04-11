import { AbstractWrapperGenerator } from './AbstractWrapperGenerator';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import type { ExtendedProp } from './DataStructureBuilder';
import { camelCase, pascalCase } from 'change-case';

export class VueWrapperGenerator extends AbstractWrapperGenerator {
  protected packageDir = 'components-vue';
  protected projectDir = 'vue-wrapper';

  public getComponentFileName(component: TagName): string {
    return `${pascalCase(component.replace('p-', ''))}Wrapper.vue`;
  }

  public generateImports(component: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    const hasEventProps = extendedProps.some(({ isEvent }) => isEvent);
    const hasProps = !!extendedProps.length;

    const vueImports = ['onMounted', 'onUpdated', 'ref'];
    const importsFromVue = hasProps ? `import { ${vueImports.join(', ')} } from 'vue';` : '';

    const utilsImports = [
      'getPrefixedTagName',
      ...(hasProps ? ['syncProperties'] : []),
      ...(hasEventProps ? ['addEventListenerToElementRef'] : []),
    ];
    const importsFromUtils = `import { ${utilsImports.join(', ')} } from '../../utils';`;

    const importsFromTypes = nonPrimitiveTypes.length
      ? `import type { ${nonPrimitiveTypes.join(', ')} } from '../types';`
      : '';

    return `<script setup lang="ts">
${[importsFromVue, importsFromUtils, importsFromTypes].filter((x) => x).join('\n')}`;
  }

  public generateProps(component: TagName, rawComponentInterface: string): string {
    const propsName = this.generatePropsName(component);
    const componentInterfaceWithoutEventProps = rawComponentInterface
      .slice(1, -1)
      .split(';\n')
      .filter((x) => !x.match(/ {2}on[A-Z][a-z]+.+/))
      .join(';\n');

    return getComponentMeta(component).props ? `type ${propsName} = {${componentInterfaceWithoutEventProps}};` : '';
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    const propsName = this.generatePropsName(component);
    const eventNamesAndTypes = extendedProps
      .filter(({ isEvent }) => isEvent)
      .map(({ key, rawValueType, isDeprecated }) => {
        const [, type] = /<(\w+)>/.exec(rawValueType) || [];
        return {
          eventName: camelCase(key.replace('on', '')),
          type,
          isDeprecated,
        };
      });

    const defaultPropsWithValue = extendedProps
      .filter(({ isEvent }) => !isEvent)
      .map(({ key, defaultValue, isDefaultValueComplex }) => {
        if (defaultValue !== undefined) {
          const defaultPropValue = isDefaultValueComplex ? `() => (${defaultValue})` : defaultValue;

          // vue linting doesn't like certain values and would prefer a string, so we disable the rule for those
          const eslintAnnotation =
            ((component === 'p-headline' || component === 'p-heading') && key === 'color') ||
            (component === 'p-carousel' && key === 'slidesPerPage')
              ? ' // eslint-disable-line vue/require-valid-default-prop'
              : '';

          return `  ${key}: ${defaultPropValue},${eslintAnnotation}`;
        }
      })
      .filter((x) => x)
      .join('\n');

    const defineProps = `defineProps<${propsName}>()`;
    const propsContent = defaultPropsWithValue.length
      ? `withDefaults(${defineProps}, {
${defaultPropsWithValue}
})`
      : defineProps;

    const props = `const props = ${propsContent};`;

    const pdsComponentRef = `const pdsComponentRef = ref<${propsName} & HTMLElement>();`;

    const defineEmits = eventNamesAndTypes.length
      ? `const emit = defineEmits<{
  ${eventNamesAndTypes
    .map(
      ({ eventName, type, isDeprecated }) =>
        (isDeprecated ? '/** @deprecated */\n  ' : '') + `(e: '${eventName}', value: ${type}): void;`
    )
    .join('\n  ')}
}>();`
      : '';

    const addEventListener = eventNamesAndTypes
      .map(({ eventName }, index, arr) => {
        const { eventName: lastEventName } = arr.at(-1) || {}; // We need to cast eventNames to the last eventName defined in defineEmits
        const typeCast = index + 1 < arr.length ? ` as '${lastEventName}'` : '';

        return `addEventListenerToElementRef(pdsComponentRef.value!, '${eventName}'${typeCast}, emit);`;
      })
      .join('\n  ');

    const syncProperties = 'syncProperties(pdsComponentRef.value!, props);';

    const content = `
${[props, pdsComponentRef, defineEmits].filter((x) => x).join('\n')}

onMounted(() => {
  ${[syncProperties, addEventListener].filter((x) => x).join('\n  ')}
});

onUpdated(() => {
  ${syncProperties}
});`;

    const hasProps = !!extendedProps.length;
    const componentAttr = [':is="webComponentTag"', ...(hasProps ? ['ref="pdsComponentRef"'] : [])].join(' ');

    const vueComponent = this.inputParser.canHaveChildren(component)
      ? `<component ${componentAttr}><slot /></component>`
      : `<component ${componentAttr} />`;

    return `const webComponentTag = getPrefixedTagName('${component}');${hasProps ? content : ''}
</script>

<template>
  ${vueComponent}
</template>
`;
  }

  public getBarrelFileContent(componentFileNameWithoutExtension: string, componentSubDir: string): string {
    return `export { default as P${pascalCase(componentFileNameWithoutExtension.replace('Wrapper', ''))} } from './${
      componentSubDir ? componentSubDir + '/' : ''
    }${componentFileNameWithoutExtension}.vue';`;
  }

  public transformContent(content: string): string {
    // fix indentation vor everything within script tags
    return content.replace(/(<script setup lang="ts">)([\S\s]*)(\s<\/script>)/, (match, grp1, grp2, grp3) => {
      return grp1 + grp2.replace(/\n/g, '$&  ') + grp3;
    });
  }

  private generatePropsName(component: TagName): string {
    return `${pascalCase(component)}Props`;
  }
}
