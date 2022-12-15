import { AbstractWrapperGenerator } from './AbstractWrapperGenerator';
import { getComponentMeta } from '@porsche-design-system/shared';
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

    return getComponentMeta(component).props
      ? `type ${propsName} = {${rawComponentInterface
          .slice(1, -1) // remove brackets
          .split(';\n') // split into props with description
          .filter((x) => !x.match(/ {2}on[A-Z][a-z]+.+/)) // remove event properties and their description
          .join(';\n')}};` // rejoin with correct indentation
      : '';
  }

  public generateComponent(component: TagName, extendedProps: ExtendedProp[]): string {
    const propsName = this.generatePropsName(component);
    const eventNamesAndTypes = extendedProps
      .filter(({ isEvent }) => isEvent)
      .map(({ key, rawValueType }) => {
        const [, type] = /<(\w+)>/.exec(rawValueType) || [];
        return {
          eventName: camelCase(key.replace('on', '')),
          type,
        };
      });

    const eslintAnnotation = ' // eslint-disable-line vue/require-valid-default-prop';

    const defaultPropsWithValue = extendedProps
      .map(({ key, defaultValue, isEvent }) => {
        if (!(isEvent || defaultValue === undefined)) {
          // Check if default value is complex type and transform it into callback
          return `${key}: ${defaultValue.startsWith('{') ? `() => (${defaultValue})` : defaultValue},${
            component === 'p-headline' && key === 'color' ? eslintAnnotation : ''
          }`;
        } else {
          return undefined;
        }
      })
      .filter((x) => x)
      .join('\n');

    const { hasEvent, hasSlot } = getComponentMeta(component);
    const hasProps = !!extendedProps.length;
    const hasDefaultProps = defaultPropsWithValue.length;

    const defineProps = `defineProps<${propsName}>()`;
    const props = `const props = ${
      hasDefaultProps
        ? `withDefaults(${defineProps}, {
 ${defaultPropsWithValue}
})`
        : defineProps
    };`;

    const defineEmits = `const emit = defineEmits<{ ${eventNamesAndTypes
    .map(({ eventName, type }) => `(e: '${eventName}', value: ${type}): void;`)
    .join(' ')} }>();`;

    const addEventListener = eventNamesAndTypes
      .map(({ eventName }, index) => {
        const { eventName: lastEventName } = eventNamesAndTypes.at(-1) || {}; // We need to cast eventNames to the last eventName defined in defineEmits
        const typeCast =
          eventNamesAndTypes.length > 1 && index + 1 < eventNamesAndTypes.length ? ` as '${lastEventName}'` : '';

        return `addEventListenerToElementRef(pdsComponentRef.value!, '${eventName}'${typeCast}, emit);`;
      })
      .join('');

    const syncProperties = 'syncProperties(pdsComponentRef.value!, props);';

    const additionalContent = `
  ${props}
  const pdsComponentRef = ref<${propsName} & HTMLElement>();${hasEvent ? defineEmits : ''}

  onMounted(() => {
    ${syncProperties}${addEventListener}
  });

  onUpdated(() => {
    ${syncProperties}
  });`;

    const componentProps = [':is="webComponentTag"', ...(hasProps ? ['ref="pdsComponentRef"'] : [])].join(' ');
    // TODO: how is this called in vue?
    const vueComponent = hasSlot
      ? `<component ${componentProps}><slot /></component>`
      : `<component ${componentProps} />`;

    return `  const webComponentTag = getPrefixedTagName('${component}');${hasProps ? additionalContent : ''}
</script>

<template>
  ${vueComponent}
</template>`;
  }

  public getBarrelFileContent(componentFileNameWithoutExtension: string, componentSubDir: string): string {
    return `export { default as P${pascalCase(componentFileNameWithoutExtension.replace('Wrapper', ''))} } from './${
      componentSubDir ? componentSubDir + '/' : ''
    }${componentFileNameWithoutExtension}.vue';`;
  }

  private generatePropsName(component: TagName): string {
    return `${pascalCase(component)}Props`;
  }
}
