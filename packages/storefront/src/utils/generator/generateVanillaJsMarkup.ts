import type { ConfiguratorTagNames, ElementConfig } from '@/components/playground/Configurator';
import { type ControlledMeta, componentMeta } from '@porsche-design-system/component-meta';
import { camelCase, kebabCase } from 'change-case';

export const generateVanillaJsMarkup = (configs: (string | ElementConfig | undefined)[]): string => {
  const outputs = configs.map((config) => createVanillaJSMarkup(config));
  return outputs.join('\n\n');
};

const createVanillaJSMarkup = (config: string | ElementConfig | undefined, indentLevel = 0): string => {
  const indent = '  '.repeat(indentLevel);

  if (!config) return '';
  if (typeof config === 'string') return `${indent}${config}`;

  const { tag, properties = {}, children = [] } = config;
  const isPDSComponent = tag.startsWith('p-');
  const meta = isPDSComponent ? componentMeta[tag as ConfiguratorTagNames] : undefined;

  const attributesArray = Object.entries(properties).map(([key, value]) => {
    if (typeof value === 'string') {
      return `${key === 'className' ? 'class' : kebabCase(key)}="${value}"`;
    }

    if (key === 'style') {
      const styles = Object.entries(value)
        .map(([key, value]) => {
          // CSS Custom Property
          if (key.startsWith('--')) {
            return `${key}: ${value}`;
          }
          return `${kebabCase(key)}: ${value}`;
        })
        .join('; ');
      return `style="${styles}"`;
    }

    if (key === 'aria') {
      return `${kebabCase(key)}="${JSON.stringify(value).replace(/"/g, "'")}"`;
    }

    return `${kebabCase(key)}="${JSON.stringify(value)}"`;
  });

  const attributesString = attributesArray.length > 0 ? ` ${attributesArray.join(' ')}` : '';
  const processedChildren = (children || []).map((child) => createVanillaJSMarkup(child, indentLevel + 1)).join('\n');

  let markup =
    children.length > 0
      ? `${'  '.repeat(indentLevel)}<${tag}${attributesString}>\n${processedChildren}\n${'  '.repeat(indentLevel)}</${tag}>`
      : `${'  '.repeat(indentLevel)}<${tag}${attributesString} />`;

  if (meta?.controlledMeta) {
    markup += `\n\n${generateVanillaJSControlledScript(tag as ConfiguratorTagNames, meta.controlledMeta)}`;
  }

  return markup;
};

const generateVanillaJSControlledScript = (tagName: ConfiguratorTagNames, controlledMeta: ControlledMeta[]) => {
  return controlledMeta
    .map((controlledInfo) => {
      const constant = camelCase(tagName.replace('p-', ''));
      const selector = `const ${constant} = document.querySelector('${tagName}');`;
      let listeners = '';

      if (controlledInfo.event === 'dismiss') {
        const closeListeners = controlledInfo.props
          .map((prop) => `${constant}.addEventListener('${controlledInfo.event}', () => (${constant}.${prop} = false))`)
          .join('\n  ');
        const openListeners = controlledInfo.props
          .map(
            (prop) => `document.querySelector('p-button').addEventListener('click', () => (${constant}.${prop} = true))`
          )
          .join('\n  ');
        listeners += `${closeListeners}\n  ${openListeners}`;
      }

      return `<script>
  ${selector}
  ${listeners}
</script>`;
    })
    .join('\n');
};
