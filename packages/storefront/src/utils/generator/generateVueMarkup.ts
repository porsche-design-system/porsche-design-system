import type {
  ConfiguratorTagNames,
  ElementConfig,
  EventConfig,
  HTMLTagOrComponent,
} from '@/components/playground/ConfiguratorControls';
import type { StoryState } from '@/models/story';
import { camelCase, pascalCase } from 'change-case';

const getVueCode = (
  states: string | undefined,
  eventHandlers: string | undefined,
  code: string | undefined
) => `<script setup lang="ts">${states ? `\n${states}\n` : ''}${eventHandlers ? `\n${eventHandlers}\n` : ''}</script>

<template>
${code}
</template>`;

export const generateVueMarkup = (
  configs: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
  initialState: StoryState<ConfiguratorTagNames>,
  indentLevel = 1
): string => {
  const results = configs.map((config) => createVueMarkup(config, initialState, indentLevel));
  const markup = results.map(({ markup }) => markup).join('\n\n');
  const states = results
    .flatMap(({ states }) => states)
    .filter((state) => state)
    .join('\n');
  const eventHandlers = results.flatMap(({ eventHandlers }) => eventHandlers).join('\n');

  return getVueCode(states, eventHandlers, markup);
};

const createVueMarkup = (
  config: string | ElementConfig<HTMLTagOrComponent> | undefined,
  initialState: StoryState<ConfiguratorTagNames>,
  indentLevel = 0
): { markup: string; states: string[]; eventHandlers: string[] } => {
  if (!config) return { markup: '', states: [], eventHandlers: [] };
  const indent = '  '.repeat(indentLevel);

  if (typeof config === 'string') return { markup: `${indent}${config}`, states: [], eventHandlers: [] };

  const { tag, properties = {}, events = {}, children = [] } = config;
  const isPDSComponent = tag.startsWith('p-');

  let transformedTag: string = tag;
  if (isPDSComponent) {
    transformedTag = pascalCase(tag);
  }

  const props = [];

  const propEntries = Object.entries(properties);
  const eventEntries = Object.entries(events);

  for (const [key, value] of propEntries) {
    if (typeof value === 'string') {
      props.push({ key, value: `\"${value}\"` });
    } else {
      props.push({ key, value: `\"${JSON.stringify(value)}\"` });
    }
  }

  const propertiesString =
    props.length > 0
      ? ` ${props
          .map(({ key, value }) => {
            if (eventEntries.some(([_, { prop }]) => prop === key)) {
              return `:${key}="${key}"`;
            }
            return `${key}=${value}`;
          })
          .join(' ')}`
      : '';

  const eventListenersString =
    eventEntries.length > 0
      ? ` ${eventEntries.map(([eventName]) => `@${camelCase(eventName.replace('on', ''))}="${eventName}"`).join(' ')}`
      : '';

  const childrenResults = children.map((child) => createVueMarkup(child, initialState, indentLevel + 1));
  const childMarkup = childrenResults.map(({ markup }) => markup).join('\n');
  const childStates = childrenResults.flatMap(({ states }) => states);
  const childEventHandlers = childrenResults.flatMap(({ eventHandlers }) => eventHandlers);

  const markup =
    children.length > 0
      ? `${'  '.repeat(indentLevel)}<${transformedTag}${propertiesString}${eventListenersString}>\n${childMarkup}\n${'  '.repeat(indentLevel)}</${transformedTag}>`
      : `${'  '.repeat(indentLevel)}<${transformedTag}${propertiesString}${eventListenersString} />`;

  // TODO: Refactor to one function call
  const states =
    eventEntries.length > 0
      ? [generateVueControlledScript(tag, eventEntries, initialState).states, ...childStates]
      : childStates;
  const eventHandlers =
    eventEntries.length > 0
      ? [generateVueControlledScript(tag, eventEntries, initialState).eventHandler, ...childEventHandlers]
      : childEventHandlers;

  return { markup, states, eventHandlers };
};

type VueScripts = { states: string; eventHandler: string };

const generateVueControlledScript = (
  tagName: string,
  eventEntries: [string, EventConfig][],
  initialState: StoryState<ConfiguratorTagNames>
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
