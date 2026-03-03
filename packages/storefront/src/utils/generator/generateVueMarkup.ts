import { camelCase, pascalCase } from 'change-case';
import type { FrameworkConfiguratorMarkup } from '@/models/framework';
import type { StoryState } from '@/models/story';
import { isSelfClosingTag } from '@/utils/generator/generateVanillaJsMarkup';
import type {
  ElementConfig,
  EventConfig,
  HTMLElementOrComponentProps,
  HTMLTagOrComponent,
} from '@/utils/generator/generator';

export const getVueCode = ({ imports, states, eventHandlers, markup, style }: FrameworkConfiguratorMarkup['vue']) =>
  `<script setup lang="ts">\n${imports ? imports : ''}\n${states ? `\n${states}\n` : ''}${eventHandlers ? `\n${eventHandlers}\n` : ''}</script>

<template>
${markup}
</template>${style ? `\n${style}` : ''}`;

export const generateVueMarkup = (
  configs: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
  initialState: StoryState<HTMLTagOrComponent>,
  indentLevel = 1
): FrameworkConfiguratorMarkup['vue'] => {
  const results = configs.map((config) => createVueMarkup(config, initialState, indentLevel));
  const markup = results.map(({ markup }) => markup).join('\n\n');
  const style = results
    .filter(({ style }) => style !== '')
    .map(({ style }) => style)
    .join('\n\n');
  const states = results
    .flatMap(({ states }) => states)
    .filter((state) => state)
    .join('\n');
  const eventHandlers = results.flatMap(({ eventHandlers }) => eventHandlers).join('\n');
  const pdsComponents = new Set(results.flatMap(({ pdsComponents }) => pdsComponents));
  const types = results.flatMap(({ types }) => types);
  const allImports = [...pdsComponents].sort();
  if (types.length > 0) {
    allImports.push(...types.map((t) => `type ${t}`));
  }

  const imports = `${states.length > 0 ? "  import { ref } from 'vue';\n" : ''}${
    allImports.length > 0 ? `  import { ${allImports.join(', ')} } from '@porsche-design-system/components-vue';` : ''
  }`;

  return { imports, states, eventHandlers, markup, style };
};

// TODO: style tags need to be moved out of <template>
const createVueMarkup = (
  config: string | ElementConfig<HTMLTagOrComponent> | undefined,
  initialState: StoryState<HTMLTagOrComponent>,
  indentLevel = 0
): {
  markup: string;
  states: string[];
  eventHandlers: string[];
  pdsComponents: string[];
  types: string[];
  style: string;
} => {
  if (!config) return { markup: '', states: [], eventHandlers: [], pdsComponents: [], types: [], style: '' };
  const indent = '  '.repeat(indentLevel);

  if (typeof config === 'string')
    return { markup: `${indent}${config}`, states: [], eventHandlers: [], pdsComponents: [], types: [], style: '' };

  const { tag, properties = {}, events = {}, children = [] } = config;

  if (tag === 'style') {
    return {
      markup: '',
      states: [],
      eventHandlers: [],
      pdsComponents: [],
      types: [],
      style: `<style>${indent}${children}</style>`,
    };
  }

  const isPDSComponent = tag.startsWith('p-');

  let transformedTag: string = tag;
  const pdsComponents: string[] = [];
  if (isPDSComponent) {
    transformedTag = pascalCase(tag);
    pdsComponents.push(transformedTag);
  }

  const eventEntries: [string, EventConfig][] = Object.entries(events);
  const propertiesString = generateVueProperties(properties, eventEntries);

  const eventListenersString =
    eventEntries.length > 0
      ? ` ${eventEntries.map(([eventName]) => `@${camelCase(eventName.replace('on', ''))}="${eventName}"`).join(' ')}`
      : '';

  const childrenResults = children.map((child) => createVueMarkup(child, initialState, indentLevel + 1));
  const childMarkup = childrenResults.map(({ markup }) => markup).join('\n');
  const childStates = childrenResults.flatMap(({ states }) => states);
  const childEventHandlers = childrenResults.flatMap(({ eventHandlers }) => eventHandlers);
  const childTypes = childrenResults.flatMap(({ types }) => types);
  const childPDSComponents = childrenResults.flatMap(({ pdsComponents }) => pdsComponents);

  const markup =
    children.length > 0
      ? `${'  '.repeat(indentLevel)}<${transformedTag}${propertiesString}${eventListenersString}>\n${childMarkup}\n${'  '.repeat(indentLevel)}</${transformedTag}>`
      : isSelfClosingTag(tag)
        ? `${'  '.repeat(indentLevel)}<${transformedTag}${propertiesString}${eventListenersString} />`
        : `${'  '.repeat(indentLevel)}<${transformedTag}${propertiesString}${eventListenersString}></${transformedTag}>`;

  const scripts = eventEntries.length > 0 ? generateVueControlledScript(tag, eventEntries, initialState) : null;
  const states = scripts ? [scripts.states, ...childStates] : childStates;
  const eventHandlers = scripts ? [scripts.eventHandler, ...childEventHandlers] : childEventHandlers;
  const types = scripts ? [...scripts.types, ...childTypes] : childTypes;

  return { markup, states, eventHandlers, pdsComponents: [...pdsComponents, ...childPDSComponents], types, style: '' };
};

type VueScripts = { states: string; eventHandler: string; types: string[] };

export const generateVueControlledScript = (
  tagName: string,
  eventEntries: [string, EventConfig][],
  initialState: StoryState<HTMLTagOrComponent>
): VueScripts => {
  const types: string[] = [];
  const states = eventEntries
    // Only create state if the current element's tagName is the same as the element the state is applied to e.g. don't create state for p-button onClick open flyout
    .filter(([_, { target }]) => tagName === target)
    .map(([_, { prop }]) => `  const ${prop} = ref(${JSON.stringify((initialState?.properties as any)?.[prop])});`)
    .join('\n');

  const eventHandler = eventEntries
    .map(([eventName, { prop, value, eventValueKey, eventType, negateValue }]) => {
      if (eventValueKey) {
        eventType && types.push(eventType);
        return `  const ${eventName} = (e: CustomEvent<${eventType}>) => {
    ${prop}.value = ${negateValue ? '!' : ''}e.detail.${eventValueKey};
  }`;
      }
      return `  const ${eventName} = () => {
    ${prop}.value = ${negateValue ? '!' : ''}${value};
  }`;
    })
    .join('\n');

  return { states, eventHandler, types };
};

// TODO: Same replacements like in vanilla-js?
export const generateVueProperties = (
  properties: HTMLElementOrComponentProps<HTMLTagOrComponent>,
  eventEntries: [string, EventConfig][]
) => {
  return Object.entries(properties)
    .map(([key, value]) => {
      if (eventEntries.some(([_, { prop }]) => prop === key)) {
        return ` :${key}="${key}"`;
      }
      if (typeof value === 'string') return ` ${key === 'className' ? 'class' : key}="${value}"`;
      if (typeof value === 'object') {
        const formattedObject = Object.entries(value ?? {})
          .map(([k, v]) => `'${k}': '${v}'`)
          .join(', ');
        return ` :${key}="{${formattedObject}}"`;
      }
      return ` :${key}="${JSON.stringify(value)}"`;
    })
    .join('');
};
