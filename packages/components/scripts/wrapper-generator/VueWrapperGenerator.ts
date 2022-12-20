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

    // TODO: Abstract Wrapper generator public to handle indentation
    return [importsFromVue, importsFromUtils, importsFromTypes].filter((x) => x).join('\n');
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
      .map(({ key, rawValueType }) => {
        const [, type] = /<(\w+)>/.exec(rawValueType) || [];
        return {
          eventName: camelCase(key.replace('on', '')),
          type,
        };
      });

    const defaultPropsWithValue = extendedProps
      .map(({ key, defaultValue, isEvent }) => {
        if (!(isEvent || defaultValue === undefined)) {
          // Check if default value is complex type and transform it into callback
          // TODO: get this from extended props
          const defaultPropValue = defaultValue.startsWith('{') ? `() => (${defaultValue})` : defaultValue;

          const eslintAnnotation =
            component === 'p-headline' && key === 'color'
              ? " // eslint-disable-line vue/require-valid-default-prop';"
              : '';

          return `  ${key}: ${defaultPropValue},${eslintAnnotation}`;
        } else {
          return undefined;
        }
      })
      .filter((x) => x)
      .join('\n');

    const hasChildren = this.inputParser.canHaveChildren(component);
    const hasEvent = extendedProps.some(({ isEvent }) => isEvent);
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

    const pdsComponentRef = `const pdsComponentRef = ref<${propsName} & HTMLElement>();`;

    const defineEmits = hasEvent
      ? `const emit = defineEmits<{ ${eventNamesAndTypes
          .map(({ eventName, type }) => `(e: '${eventName}', value: ${type}): void;`)
          .join(' ')} }>();`
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
${[props, pdsComponentRef, defineEmits].join('\n')}

onMounted(() => {
  ${[syncProperties, addEventListener].join('\n  ')}
});

onUpdated(() => {
  ${syncProperties}
});`;

    const componentAttr = [':is="webComponentTag"', ...(hasProps ? ['ref="pdsComponentRef"'] : [])].join(' ');

    const vueComponent = hasChildren
      ? `<component ${componentAttr}><slot /></component>`
      : `<component ${componentAttr} />`;

    return `const webComponentTag = getPrefixedTagName('${component}');${hasProps ? content : ''}

<template>
  ${vueComponent}
</template>`;
  }

  public getBarrelFileContent(componentFileNameWithoutExtension: string, componentSubDir: string): string {
    return `export { default as P${pascalCase(componentFileNameWithoutExtension.replace('Wrapper', ''))} } from './${
      componentSubDir ? componentSubDir + '/' : ''
    }${componentFileNameWithoutExtension}.vue';`;
  }

  public getModifiedContent(content: string): string {
    const [, scriptContent, templateContent] = /(.*)(<template>.*)/s.exec(content) || [];
    const indentedScriptcontent = scriptContent
      .split('\n')
      .join('\n  ');

    return `<script setup lang="ts">
  ${indentedScriptcontent}
</script>

${templateContent}`;
  }

  private generatePropsName(component: TagName): string {
    return `${pascalCase(component)}Props`;
  }
}
