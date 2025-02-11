import type { StoryState } from '@/models/story';
import type {
  ConfiguratorTagNames,
  ElementConfig,
  EventConfig,
  EventsConfig,
  HTMLElementOrComponentProps,
  HTMLTagOrComponent,
} from '@/utils/generator/generator';
import { camelCase, kebabCase, pascalCase } from 'change-case';

const getVueCode = (
  imports: string,
  states: string | undefined,
  eventHandlers: string | undefined,
  code: string | undefined
) => `<script setup lang="ts">\n${imports}\n${states ? `\n${states}\n` : ''}${eventHandlers ? `\n${eventHandlers}\n` : ''}</script>

<template>
${code}
</template>`;

export const generateVueMarkup = (
  configs: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
  initialState: StoryState<HTMLTagOrComponent>,
  indentLevel = 1
): string => {
  const results = configs.map((config) => createVueMarkup(config, initialState, indentLevel));
  const markup = results.map(({ markup }) => markup).join('\n\n');
  const states = results
    .flatMap(({ states }) => states)
    .filter((state) => state)
    .join('\n');
  const eventHandlers = results.flatMap(({ eventHandlers }) => eventHandlers).join('\n');
  const pdsComponents = new Set(results.flatMap(({ pdsComponents }) => pdsComponents));
  const imports = `${states.length > 0 ? "  import { ref } from 'vue';\n" : ''}${
    pdsComponents.size > 0
      ? `  import { ${Array.from(pdsComponents).sort().join(', ')} } from '@porsche-design-system/components-vue';`
      : ''
  }`;

  return getVueCode(imports, states, eventHandlers, markup);
};

const createVueMarkup = (
  config: string | ElementConfig<HTMLTagOrComponent> | undefined,
  initialState: StoryState<HTMLTagOrComponent>,
  indentLevel = 0
): { markup: string; states: string[]; eventHandlers: string[]; pdsComponents: string[] } => {
  if (!config) return { markup: '', states: [], eventHandlers: [], pdsComponents: [] };
  const indent = '  '.repeat(indentLevel);

  if (typeof config === 'string')
    return { markup: `${indent}${config}`, states: [], eventHandlers: [], pdsComponents: [] };

  const { tag, properties = {}, events = {}, children = [] } = config;
  const isPDSComponent = tag.startsWith('p-');

  let transformedTag: string = tag;
  const pdsComponents: string[] = [];
  if (isPDSComponent) {
    transformedTag = pascalCase(tag);
    pdsComponents.push(transformedTag);
  }

  const eventEntries = Object.entries(events);
  const propertiesString = generateVueProperties(properties, eventEntries);

  const eventListenersString =
    eventEntries.length > 0
      ? ` ${eventEntries.map(([eventName]) => `@${camelCase(eventName.replace('on', ''))}="${eventName}"`).join(' ')}`
      : '';

  const childrenResults = children.map((child) => createVueMarkup(child, initialState, indentLevel + 1));
  const childMarkup = childrenResults.map(({ markup }) => markup).join('\n');
  const childStates = childrenResults.flatMap(({ states }) => states);
  const childEventHandlers = childrenResults.flatMap(({ eventHandlers }) => eventHandlers);
  const childPDSComponents = childrenResults.flatMap(({ pdsComponents }) => pdsComponents);

  const markup =
    children.length > 0
      ? `${'  '.repeat(indentLevel)}<${transformedTag}${propertiesString}${eventListenersString}>\n${childMarkup}\n${'  '.repeat(indentLevel)}</${transformedTag}>`
      : `${'  '.repeat(indentLevel)}<${transformedTag}${propertiesString}${eventListenersString} />`;

  const scripts = eventEntries.length > 0 ? generateVueControlledScript(tag, eventEntries, initialState) : null;
  const states = scripts ? [scripts.states, ...childStates] : childStates;
  const eventHandlers = scripts ? [scripts.eventHandler, ...childEventHandlers] : childEventHandlers;

  return { markup, states, eventHandlers, pdsComponents: [...pdsComponents, ...childPDSComponents] };
};

type VueScripts = { states: string; eventHandler: string };

export const generateVueControlledScript = (
  tagName: string,
  eventEntries: [string, EventConfig][],
  initialState: StoryState<HTMLTagOrComponent>
): VueScripts => {
  const states = eventEntries
    // Only create state if the current element's tagName is the same as the element the state is applied to e.g. don't create state for p-button onClick open flyout
    .filter(([_, { target }]) => tagName === target)
    .map(([_, { prop }]) => `  const ${prop} = ref(${(initialState?.properties as any)?.[prop]});`)
    .join('\n');

  const eventHandler = eventEntries
    .map(([eventName, { prop, value, eventValueKey, eventType, negateValue }]) => {
      if (eventValueKey) {
        return `  const ${eventName} = (e: ${eventType}) => {
    ${prop}.value = ${negateValue ? '!' : ''}e.detail.${eventValueKey};
  }`;
      }
      return `  const ${eventName} = () => {
    ${prop}.value = ${negateValue ? '!' : ''}${value};
  }`;
    })
    .join('\n');

  return { states, eventHandler };
};

export const generateVueProperties = (
  properties: HTMLElementOrComponentProps<HTMLTagOrComponent>,
  eventEntries: [string, EventConfig][]
) => {
  return Object.entries(properties)
    .map(([key, value]) => {
      if (eventEntries.some(([_, { prop }]) => prop === key)) {
        return ` :${key}="${key}"`;
      }
      if (typeof value === 'string') return ` ${key}="${value}"`;
      if (key === 'aria') {
        return ` ${key}="${JSON.stringify(value).replace(/"/g, "'")}"`;
      }
      return ` :${key}="${JSON.stringify(value)}"`;
    })
    .join('');
};
