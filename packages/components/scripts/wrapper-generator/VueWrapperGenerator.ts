import { getComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import { camelCase, pascalCase } from 'change-case';
import { AbstractWrapperGenerator } from './AbstractWrapperGenerator';
import type { ExtendedProp } from './DataStructureBuilder';

export class VueWrapperGenerator extends AbstractWrapperGenerator {
  protected packageDir = 'components-vue';
  protected projectDir = 'vue-wrapper';

  public getComponentFileName(component: TagName): string {
    return `${pascalCase(component.replace('p-', ''))}Wrapper.vue`;
  }

  public generateImports(_: TagName, extendedProps: ExtendedProp[], nonPrimitiveTypes: string[]): string {
    const hasEventProps = extendedProps.some(({ isEvent }) => isEvent);
    const hasProps = !!extendedProps.length;

    const vueImports = ['onMounted', 'onUpdated', 'ref'].sort();
    const importsFromVue = hasProps ? `import { ${vueImports.join(', ')} } from 'vue';` : '';

    const utilsImports = [
      ...(hasEventProps ? ['addEventListenerToElementRef'] : []),
      ...(hasProps ? ['syncProperties'] : []),
      'usePrefix',
    ].sort();
    const importsFromUtils = `import { ${utilsImports.join(', ')} } from '../../utils';`;

    const importsFromTypes = nonPrimitiveTypes.length
      ? `import type { ${nonPrimitiveTypes.join(', ')} } from '../types';`
      : '';

    return `<script setup lang="ts">
${[importsFromVue, importsFromUtils, importsFromTypes].filter(Boolean).join('\n')}`;
  }

  public generateProps(component: TagName, rawComponentInterface: string): string {
    const propsName = this.generatePropsName(component);
    const componentInterfaceWithoutEventProps = rawComponentInterface
      .slice(1, -1)
      .split(';\n')
      .filter((x) => !x.match(/ {2}on[A-Z][a-z]+.+/))
      .join(';\n');

    return getComponentMeta(component).propsMeta ? `type ${propsName} = {${componentInterfaceWithoutEventProps}};` : '';
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
            (component === 'p-heading' && key === 'color') || (component === 'p-carousel' && key === 'slidesPerPage')
              ? ' // eslint-disable-line vue/require-valid-default-prop'
              : '';

          return `${key}: ${defaultPropValue},${eslintAnnotation}`;
        }
      })
      .filter(Boolean)
      .join('\n  ');

    const defineProps = `defineProps<${propsName}>()`;
    const propsContent = defaultPropsWithValue.length
      ? `withDefaults(${defineProps}, {
  ${defaultPropsWithValue}
})`
      : defineProps;

    const props = `const props = ${propsContent};`;

    const pdsComponentRef = `const pdsComponentRef = ref<${propsName} & HTMLElement>();`;

    const meta = getComponentMeta(component);
    const hasInputEvent = !!Object.keys(meta.eventsMeta ?? {}).find((e) => e === 'input');
    const hasVModelSupport = this.hasVModelSupport(component);
    const vModelValue = component === 'p-checkbox' ? 'checked' : 'value';

    const defineEmits = eventNamesAndTypes.length
      ? `const emit = defineEmits<{
  ${hasVModelSupport ? `(e: 'update:${vModelValue}', value: ${meta.propsMeta[vModelValue].type}): void;\n  ` : ''}${eventNamesAndTypes
    .map(
      ({ eventName, type, isDeprecated }) =>
        (isDeprecated ? '/** @deprecated */\n  ' : '') + `(e: '${eventName}', value: CustomEvent<${type}>): void;`
    )
    .join('\n  ')}
}>();`
      : '';

    const addEventListener = eventNamesAndTypes
      .map(({ eventName }, index, arr) => {
        const { eventName: lastEventName } = arr.at(-1) || {}; // We need to cast eventNames to the last eventName defined in defineEmits
        const typeCast = index + 1 < arr.length ? ` as '${lastEventName}'` : '';

        if (hasVModelSupport && eventName === (hasInputEvent ? 'input' : 'change')) {
          return `addEventListenerToElementRef(pdsComponentRef, '${eventName}'${typeCast}, emit, (e) => {
      emit('update:${vModelValue}'${typeCast}, (e.target as any).${vModelValue})
    });`;
        }

        return `addEventListenerToElementRef(pdsComponentRef, '${eventName}'${typeCast}, emit);`;
      })
      .join('\n  ');

    const syncProperties = `const syncProps = (): void => syncProperties(pdsComponentRef, props);`;

    const content = [
      [props, pdsComponentRef, defineEmits, syncProperties].filter(Boolean).join('\n'),
      addEventListener
        ? `onMounted(() => {
  ${['syncProps();', addEventListener].filter(Boolean).join('\n  ')}
});`
        : `onMounted(syncProps);`,
      `onUpdated(syncProps);`,
    ]
      .filter(Boolean)
      .join('\n\n');

    const hasProps = !!extendedProps.length;
    const componentAttr = [':is="webComponentTag"', ...(hasProps ? ['ref="pdsComponentRef"'] : [])].join(' ');

    const vueComponent = this.inputParser.canHaveChildren(component)
      ? `<component ${componentAttr}><slot /></component>`
      : `<component ${componentAttr} />`;

    return `const webComponentTag = usePrefix('${component}');${hasProps ? '\n' + content : ''}
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
    return content.replace(/(<script setup lang="ts">)([\S\s]*)(\s<\/script>)/, (_, grp1, grp2, grp3) => {
      return grp1 + grp2.replace(/\n/g, '$&  ') + grp3;
    });
  }

  private generatePropsName(component: TagName): string {
    return `${pascalCase(component)}Props`;
  }

  private hasVModelSupport(component: TagName): boolean {
    const meta = getComponentMeta(component);
    return meta.hasElementInternals && component !== 'p-button' && component !== 'p-button-pure';
  }
}
