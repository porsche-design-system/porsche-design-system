import type { ElementConfig } from '@/components/playground/Configurator';
import { pascalCase } from 'change-case';

export const generateAngularMarkup = (configs: (string | ElementConfig | undefined)[]): string => {
  const outputs = configs.map((config) => createAngularMarkup(config));
  return outputs.join('\n\n');
};

const createAngularMarkup = (config: string | ElementConfig | undefined, indentLevel = 0): string => {
  const indent = '  '.repeat(indentLevel);

  if (!config) return '';
  if (typeof config === 'string') return `${indent}${config}`;

  const { tag, properties = {}, children = [] } = config;
  const isPDSComponent = tag.startsWith('p-');

  const propertiesArray = Object.entries(properties).map(([key, value]) => {
    if (typeof value === 'string') {
      return key.startsWith('on')
        ? `(${key.substring(2)})="${value}($event)"`
        : `[${key}]="${JSON.stringify(value).replace(/"/g, "'")}"`;
    }
    return `[${key}]="${JSON.stringify(value)}"`;
  });

  const propertiesString = propertiesArray.length > 0 ? ` ${propertiesArray.join(' ')}` : '';
  const processedChildren = (children || []).map((child) => createAngularMarkup(child, indentLevel + 1)).join('\n');

  const markup =
    children.length > 0
      ? `${'  '.repeat(indentLevel)}<${tag}${propertiesString}>\n${processedChildren}\n${'  '.repeat(indentLevel)}</${tag}>`
      : `${'  '.repeat(indentLevel)}<${tag}${propertiesString} />`;

  return markup;
};
