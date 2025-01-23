'use client';

import { ConfigureProps } from '@/components/playground/ConfigureProps';
import { componentsStory } from '@/components/playground/componentStory';
import { isDefaultValue } from '@/components/playground/configuratorUtils';
import { componentMeta } from '@porsche-design-system/component-meta';
import { PButton } from '@porsche-design-system/components-react/ssr';
import type { TagName } from '@porsche-design-system/shared';
import React, { useState } from 'react';

const componentMap: Record<string, React.ElementType> = {
  'p-button': PButton,
};

export type ElementConfig = {
  tag: string; // The component tag e.g. 'p-button'
  attributes?: Record<string, string | boolean>; // The component attributes/props written in camelCase e.g. { hideLabel: 'true' }
  children?: (string | ElementConfig)[]; // Nested children either as string for text or ElementConfig for nested components
};

const buttonExample: ElementConfig = {
  tag: 'p-button',
  attributes: { hideLabel: true, icon: 'arrow-right' },
  children: ['Some label'],
};

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
const flyoutExample: ElementConfig = {
  tag: 'p-flyout',
  attributes: { open: 'false', aria: '{ "aria-label": "Some Heading" }' },
  children: [
    {
      tag: 'p-heading',
      attributes: { slot: 'header', size: 'large', tag: 'h2' },
      children: ['Some Heading'],
    },
    { tag: 'p-text', attributes: { slot: '' }, children: ['Some Content'] },
    {
      tag: 'p-button-group',
      attributes: { slot: 'footer' },
      children: [
        { tag: 'p-button', attributes: { type: 'button' }, children: ['Proceed'] },
        { tag: 'p-button', attributes: { type: 'button', variant: 'secondary' }, children: ['Cancel'] },
      ],
    },
    { tag: 'p-text', attributes: { slot: 'sub-footer' }, children: ['Some additional Sub-Footer'] },
  ],
};

// type ElementConfig = {
//   tag: string;
//   attributes?: Record<string, string>;
//   children?: (string | ElementConfig)[];
// };
//
// export const generateHtml = (config: ElementConfig): { node: HTMLElement | Text; markup: string } => {
//   const { tag, attributes = {}, children = [] } = config;
//
//   // // Special case: text node
//   // if (tag === '#text') {
//   //   const textNode = document.createTextNode(children as string);
//   //   return {
//   //     node: textNode,
//   //     markup: children as string,
//   //   };
//   // }
//
//   // Create the DOM element
//   const element = document.createElement(tag);
//
//   // Set attributes
//   for (const [key, value] of Object.entries(attributes)) {
//     element.setAttribute(key, value);
//   }
//
//   // Build children recursively
//   const childMarkup: string[] = [];
//
//   for (const child of children) {
//     const { node: childNode, markup: childMarkupString } =
//       typeof child === 'string' ? { node: document.createTextNode(child), markup: child } : generateHtml(child);
//     element.appendChild(childNode);
//     childMarkup.push(childMarkupString);
//   }
//
//   // Generate the string representation of the element
//   const markup = `<${tag} ${Object.entries(attributes)
//     .map(([key, value]) => `${key}="${value}"`)
//     .join(' ')}>${childMarkup.join('')}</${tag}>`;
//
//   return { node: element, markup };
// };

type GeneratedOutput = {
  jsx: React.ReactNode;
  markup: string;
};

const generateOutput = (
  descriptor: ElementConfig,
  indentLevel = 0 // Track indentation level for formatting
): GeneratedOutput => {
  const { tag, attributes = {}, children = [] } = descriptor;

  const attributesString = Object.entries(attributes)
    .map(([key, value]) => (typeof value === 'string' ? `${key}="${value}"` : `${key}='${JSON.stringify(value)}'`))
    .join(' ');

  const processedChildren = children.map((child) =>
    typeof child === 'string'
      ? { jsx: child, markup: `${'  '.repeat(indentLevel + 1)}${child}` }
      : generateOutput(child, indentLevel + 1)
  );

  const jsxChildren = processedChildren.map((child) => child.jsx);
  const markupChildren = processedChildren.map((child) => child.markup).join('\n');

  const ReactComponent = componentMap[tag];
  const jsx = React.createElement(ReactComponent, { key: JSON.stringify(attributes), ...attributes }, ...jsxChildren);

  const indent = '  '.repeat(indentLevel);

  const markup =
    children.length > 0
      ? `${indent}<${tag}${attributesString ? ` ${attributesString}` : ''}>\n${markupChildren}\n${indent}</${tag}>`
      : `${indent}<${tag}${attributesString ? ` ${attributesString}` : ''} />`;

  return { jsx, markup };
};

type ConfiguratorProps = {
  tagName: TagName;
};

export const Configurator = ({ tagName }: ConfiguratorProps) => {
  const [example, setExample] = useState(buttonExample);

  const meta = componentMeta[tagName];
  const story = componentsStory[tagName];

  const { jsx, markup } = generateOutput(example);

  const handleUpdateProps = (propName: string, selectedValue: string) => {
    setExample((prev) => {
      const { attributes = {} } = prev;

      const updatedAttributes = {
        ...attributes,
        [propName]: selectedValue,
      };

      if (isDefaultValue(meta.propsMeta?.[propName]?.defaultValue, selectedValue) || selectedValue === '') {
        delete updatedAttributes[propName];
      }

      return { ...prev, attributes: updatedAttributes };
    });
  };

  if (!meta.propsMeta) return null;

  return (
    <>
      <ConfigureProps
        componentProps={meta.propsMeta}
        configuredProps={buttonExample.attributes}
        onUpdateProps={handleUpdateProps}
      />
      {jsx}
      <pre>
        <code>{markup}</code>
      </pre>
    </>
  );
};
