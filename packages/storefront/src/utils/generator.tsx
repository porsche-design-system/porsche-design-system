import type { ElementConfig } from '@/components/playground/Configurator';
import { kebabCase, pascalCase } from 'change-case';
import React from 'react';

const getPDSReactComponentLazy = (tag: string) => {
  return React.lazy(() =>
    import('@porsche-design-system/components-react/ssr').then((module) => {
      const component = module[pascalCase(tag)];
      if (!component) {
        throw new Error(`Component ${pascalCase(tag)} not found.`);
      }
      return { default: component as React.ComponentType<any> };
    })
  );
};

export type GeneratedOutput = {
  jsx: React.ReactNode;
  markup: string;
};

export const generateCode = (configs: (string | ElementConfig | undefined)[]): GeneratedOutput => {
  const outputs = configs.map((config, index) => generateOutput(config, 0, index));
  return {
    jsx: outputs.map((output) => output.jsx),
    markup: outputs.map((output) => output.markup).join('\n\n'),
  };
};

export const generateOutput = (
  descriptor: string | ElementConfig | undefined,
  indentLevel = 0,
  index?: number
): GeneratedOutput => {
  if (typeof descriptor === 'string') {
    return {
      jsx: descriptor,
      markup: `${'  '.repeat(indentLevel)}${descriptor}`,
    };
  }

  if (!descriptor) {
    return {
      jsx: null,
      markup: '',
    };
  }

  const { tag, properties = {}, children = [] } = descriptor;

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

  // Process children (filter out undefined values)
  const processedChildren = (children || []).map(
    (child, childIndex) =>
      child !== undefined
        ? typeof child === 'string'
          ? { jsx: child, markup: `${'  '.repeat(indentLevel + 1)}${child}` }
          : generateOutput(child, indentLevel + 1, childIndex)
        : { jsx: null, markup: '' } // Handle undefined children as empty
  );

  const jsxChildren = processedChildren.map((child) => child.jsx);
  const markupChildren = processedChildren.map((child) => child.markup).join('\n');

  const ReactComponent = tag.startsWith('p-') ? getPDSReactComponentLazy(tag) : tag;

  const uniqueKey = index !== undefined ? `${tag}-${index}` : JSON.stringify(properties);

  return {
    jsx: React.createElement(ReactComponent, { key: uniqueKey, ...properties }, ...jsxChildren),
    markup:
      children.length > 0
        ? `${'  '.repeat(indentLevel)}<${tag}${attributesString}>\n${markupChildren}\n${'  '.repeat(indentLevel)}</${tag}>`
        : `${'  '.repeat(indentLevel)}<${tag}${attributesString} />`,
  };
};
