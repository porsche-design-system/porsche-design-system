import type { StoryState } from '@/models/story';
import type {
  ConfiguratorTagNames,
  ElementConfig,
  EventConfig,
  HTMLElementOrComponentProps,
  HTMLTagOrComponent,
} from '@/utils/generator/generator';

const getAngularCode = (
  states: string | undefined,
  eventHandlers: string | undefined,
  code: string | undefined
) => `import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'example',
  template: \`
${code}
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ExampleComponent {${states ? `\n${states}\n` : ''}${eventHandlers ? `\n${eventHandlers}\n` : ''}}`;

export const generateAngularMarkup = (
  configs: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
  initialState: StoryState<HTMLTagOrComponent>,
  indentLevel = 3
): string => {
  const results = configs.map((config) => createAngularMarkup(config, initialState, indentLevel));
  const markup = results.map(({ markup }) => markup).join('\n\n');
  const states = results
    .flatMap(({ states }) => states)
    .filter((state) => state)
    .join('\n');
  const eventHandlers = results.flatMap(({ eventHandlers }) => eventHandlers).join('\n');

  return getAngularCode(states, eventHandlers, markup);
};

const createAngularMarkup = (
  config: string | ElementConfig<HTMLTagOrComponent> | undefined,
  initialState: StoryState<HTMLTagOrComponent>,
  indentLevel = 0
): { markup: string; states: string[]; eventHandlers: string[] } => {
  const indent = '  '.repeat(indentLevel);

  if (!config) return { markup: '', states: [], eventHandlers: [] };
  if (typeof config === 'string') return { markup: `${indent}${config}`, states: [], eventHandlers: [] };

  const { tag, properties = {}, events = {}, children = [] } = config;

  const eventEntries = Object.entries(events);
  const propertiesString = generateAngularProperties(properties, eventEntries);

  const eventListenersString =
    eventEntries.length > 0 ? ` ${eventEntries.map(([eventName]) => `(${eventName})="${eventName}"`).join(' ')}` : '';

  const childrenResults = children.map((child) => createAngularMarkup(child, initialState, indentLevel + 1));
  const childMarkup = childrenResults.map(({ markup }) => markup).join('\n');
  const childStates = childrenResults.flatMap(({ states }) => states);
  const childEventHandlers = childrenResults.flatMap(({ eventHandlers }) => eventHandlers);

  const markup =
    children.length > 0
      ? `${'  '.repeat(indentLevel)}<${tag}${propertiesString}${eventListenersString}>\n${childMarkup}\n${'  '.repeat(indentLevel)}</${tag}>`
      : `${'  '.repeat(indentLevel)}<${tag}${propertiesString}${eventListenersString} />`;

  const scripts = eventEntries.length > 0 ? generateAngularControlledScript(tag, eventEntries, initialState) : null;
  const states = scripts ? [scripts.states, ...childStates] : childStates;
  const eventHandlers = scripts ? [scripts.eventHandler, ...childEventHandlers] : childEventHandlers;

  return { markup, states, eventHandlers };
};

type AngularScripts = { states: string; eventHandler: string };

export const generateAngularControlledScript = (
  tagName: string,
  eventEntries: [string, EventConfig][],
  initialState: StoryState<HTMLTagOrComponent>
): AngularScripts => {
  const states = eventEntries
    // Only create state if the current element's tagName is the same as the element the state is applied to e.g. don't create state for p-button onClick open flyout
    .filter(([_, { target }]) => tagName === target)
    .map(([_, { prop }]) => `  ${prop} = ${(initialState?.properties as any)?.[prop]};`)
    .join('\n');

  const eventHandler = eventEntries
    .map(([eventName, { prop, value, eventValueKey, eventType, negateValue }]) => {
      if (eventValueKey) {
        return `  ${eventName}(e: ${eventType}) {
    this.${prop} = ${negateValue ? '!' : ''}e.detail.${eventValueKey};
  }`;
      }
      return `  const ${eventName} = () => {
    this.${prop} = ${negateValue ? '!' : ''}${value};
  }`;
    })
    .join('\n');

  return { states, eventHandler };
};

export const generateAngularProperties = (
  properties: HTMLElementOrComponentProps<HTMLTagOrComponent>,
  eventEntries: [string, EventConfig][]
) => {
  return Object.entries(properties)
    .map(([key, value]) => {
      if (eventEntries.some(([_, { prop }]) => prop === key)) {
        return ` [${key}]="${key}"`;
      }
      if (typeof value === 'string') return ` ${key}="${value}"`;
      if (key === 'aria') {
        return ` [${key}]="${JSON.stringify(value).replace(/"/g, "'")}"`;
      }
      return ` [${key}]="${JSON.stringify(value)}"`;
    })
    .join('');
};
