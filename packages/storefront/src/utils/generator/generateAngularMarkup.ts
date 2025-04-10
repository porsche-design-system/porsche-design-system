import type { FrameworkConfiguratorMarkup } from '@/models/framework';
import type { StoryState } from '@/models/story';
import { isSelfClosingTag } from '@/utils/generator/generateVanillaJsMarkup';
import type {
  ElementConfig,
  EventConfig,
  HTMLElementOrComponentProps,
  HTMLTagOrComponent,
} from '@/utils/generator/generator';
import { camelCase } from 'change-case';

export const getAngularCode = ({
  imports,
  states,
  eventHandlers,
  markup,
}: FrameworkConfiguratorMarkup['angular']) => `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PorscheDesignSystemModule${imports ? `, ${imports}` : ''} } from '@porsche-design-system/components-angular';

@Component({
  selector: 'porsche-design-system-app',
  template: \`
${markup}
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PorscheDesignSystemModule], // <-- PDS module is imported here
})
export class ExampleComponent {${states ? `\n${states}\n` : ''}${eventHandlers ? `\n${eventHandlers}\n` : ''}}`;

export const generateAngularMarkup = (
  configs: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
  initialState: StoryState<HTMLTagOrComponent>,
  indentLevel = 3
): FrameworkConfiguratorMarkup['angular'] => {
  const results = configs.map((config) => createAngularMarkup(config, initialState, indentLevel));
  const markup = results.map(({ markup }) => markup).join('\n\n');
  const states = results
    .flatMap(({ states }) => states)
    .filter((state) => state)
    .join('\n');
  const eventHandlers = results.flatMap(({ eventHandlers }) => eventHandlers).join('\n');
  const imports = results
    .flatMap(({ types }) => types)
    .map((t) => `type ${t}`)
    .join(', ');

  return { imports, states, eventHandlers, markup };
};

const createAngularMarkup = (
  config: string | ElementConfig<HTMLTagOrComponent> | undefined,
  initialState: StoryState<HTMLTagOrComponent>,
  indentLevel = 0
): { markup: string; states: string[]; eventHandlers: string[]; types: string[] } => {
  const indent = '  '.repeat(indentLevel);

  if (!config) return { markup: '', states: [], eventHandlers: [], types: [] };
  if (typeof config === 'string') return { markup: `${indent}${config}`, states: [], eventHandlers: [], types: [] };

  const { tag, properties = {}, events = {}, children = [] } = config;

  const eventEntries: [string, EventConfig][] = Object.entries(events);
  const propertiesString = generateAngularProperties(properties, eventEntries);

  const eventListenersString =
    eventEntries.length > 0
      ? ` ${eventEntries.map(([eventName, eventMeta]) => `(${camelCase(eventName.replace('on', ''))})="${eventName}(${eventMeta.eventValueKey ? '$event' : ''})"`).join(' ')}`
      : '';

  const childrenResults = children.map((child) => createAngularMarkup(child, initialState, indentLevel + 1));
  const childMarkup = childrenResults.map(({ markup }) => markup).join('\n');
  const childStates = childrenResults.flatMap(({ states }) => states);
  const childEventHandlers = childrenResults.flatMap(({ eventHandlers }) => eventHandlers);
  const childTypes = childrenResults.flatMap(({ types }) => types);

  const markup =
    children.length > 0
      ? `${'  '.repeat(indentLevel)}<${tag}${propertiesString}${eventListenersString}>\n${childMarkup}\n${'  '.repeat(indentLevel)}</${tag}>`
      : isSelfClosingTag(tag)
        ? `${'  '.repeat(indentLevel)}<${tag}${propertiesString}${eventListenersString} />`
        : `${'  '.repeat(indentLevel)}<${tag}${propertiesString}${eventListenersString}></${tag}>`;

  const scripts = eventEntries.length > 0 ? generateAngularControlledScript(tag, eventEntries, initialState) : null;
  const states = scripts ? [scripts.states, ...childStates] : childStates;
  const eventHandlers = scripts ? [scripts.eventHandler, ...childEventHandlers] : childEventHandlers;
  const types = scripts ? [...scripts.types, ...childTypes] : childTypes;

  return { markup, states, eventHandlers, types };
};

type AngularScripts = { states: string; eventHandler: string; types: string[] };

export const generateAngularControlledScript = (
  tagName: string,
  eventEntries: [string, EventConfig][],
  initialState: StoryState<HTMLTagOrComponent>
): AngularScripts => {
  const types: string[] = [];
  const states = eventEntries
    // Only create state if the current element's tagName is the same as the element the state is applied to e.g. don't create state for p-button onClick open flyout
    .filter(([_, { target }]) => tagName === target)
    .map(([_, { prop }]) => `  ${prop} = ${JSON.stringify((initialState?.properties as any)?.[prop])};`)
    .join('\n');

  const eventHandler = eventEntries
    .map(([eventName, { prop, value, eventValueKey, eventType, negateValue }]) => {
      if (eventValueKey) {
        eventType && types.push(eventType);
        return `  ${eventName}(e: CustomEvent<${eventType}>) {
    this.${prop} = ${negateValue ? '!' : ''}e.detail.${eventValueKey};
  }`;
      }
      return `  ${eventName}() {
    this.${prop} = ${negateValue ? '!' : ''}${value};
  }`;
    })
    .join('\n');

  return { states, eventHandler, types };
};

// TODO: Same replacements like in vanilla-js?
export const generateAngularProperties = (
  properties: HTMLElementOrComponentProps<HTMLTagOrComponent>,
  eventEntries: [string, EventConfig][]
) => {
  return Object.entries(properties)
    .map(([key, value]) => {
      if (eventEntries.some(([_, { prop }]) => prop === key)) {
        return ` [${key}]="${key}"`;
      }
      if (typeof value === 'string') return ` ${key === 'className' ? 'class' : key}="${value}"`;
      if (typeof value === 'object') {
        const formattedObject = Object.entries(value ?? {})
          .map(([k, v]) => `'${k}': '${v}'`)
          .join(', ');
        return ` [${key}]="{${formattedObject}}"`;
      }
      return ` [${key}]="${JSON.stringify(value)}"`;
    })
    .join('');
};
