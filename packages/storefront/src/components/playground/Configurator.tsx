'use client';

const buttonExample: ElementConfig = {
  tag: 'p-button',
  attributes: { 'hide-label': 'true', icon: 'arrow-right' },
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

import React from 'react';

type ElementConfig = {
  tag: string; // The HTML tag or React component name
  attributes?: Record<string, string | number | boolean>; // Props/attributes
  children?: (string | ElementConfig)[]; // Nested children
};

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

  const jsx = React.createElement(tag, { key: JSON.stringify(attributes), ...attributes }, ...jsxChildren);

  const indent = '  '.repeat(indentLevel);

  const markup =
    children.length > 0
      ? `${indent}<${tag}${attributesString ? ` ${attributesString}` : ''}>\n${markupChildren}\n${indent}</${tag}>`
      : `${indent}<${tag}${attributesString ? ` ${attributesString}` : ''} />`;

  return { jsx, markup };
};

export const Configurator = () => {
  const { jsx, markup } = generateOutput(buttonExample);
  return (
    <>
      {jsx}
      <pre>
        <code>{markup}</code>
      </pre>
    </>
  );
};
