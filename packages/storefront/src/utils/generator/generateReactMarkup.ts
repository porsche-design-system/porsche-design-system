import type { StoryState } from '@/models/story';
import type {
  ConfiguratorTagNames,
  ElementConfig,
  EventConfig,
  EventsConfig,
  HTMLElementOrComponentProps,
  HTMLTagOrComponent,
} from '@/utils/generator/generator';
import { pascalCase } from 'change-case';

const getReactCode = (
  imports: string,
  states: string | undefined,
  eventHandlers: string | undefined,
  code: string | undefined
) => `${imports}

export const Example = () => {${states ? `\n${states}\n` : ''}${eventHandlers ? `\n${eventHandlers}\n` : ''}
  return (
    <>
${code}
    </>
  )
}`;

export const generateReactMarkup = (
  configs: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
  initialState: StoryState<HTMLTagOrComponent>,
  indentLevel = 3
): string => {
  const results = configs.map((config) => createReactMarkup(config, initialState, indentLevel));
  const markup = results.map(({ markup }) => markup).join('\n\n');
  const states = results
    .flatMap(({ states }) => states)
    .filter((state) => state)
    .join('\n');
  const eventHandlers = results.flatMap(({ eventHandlers }) => eventHandlers).join('\n');
  const pdsComponents = new Set(results.flatMap(({ pdsComponents }) => pdsComponents));
  const imports = `${states.length > 0 ? "import { useState } from 'react';\n" : ''}${
    pdsComponents.size > 0
      ? `import { ${Array.from(pdsComponents).sort().join(', ')} } from '@porsche-design-system/components-react';`
      : ''
  }`;

  return getReactCode(imports, states, eventHandlers, markup);
};

const createReactMarkup = (
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
  const propertiesString = generateReactProperties(properties, eventEntries);

  const eventListenersString =
    eventEntries.length > 0 ? ` ${eventEntries.map(([eventName]) => `${eventName}={${eventName}}`).join(' ')}` : '';

  const childrenResults = children.map((child) => createReactMarkup(child, initialState, indentLevel + 1));
  const childMarkup = childrenResults.map(({ markup }) => markup).join('\n');
  const childStates = childrenResults.flatMap(({ states }) => states);
  const childEventHandlers = childrenResults.flatMap(({ eventHandlers }) => eventHandlers);
  const childPDSComponents = childrenResults.flatMap(({ pdsComponents }) => pdsComponents);

  const markup =
    children.length > 0
      ? `${'  '.repeat(indentLevel)}<${transformedTag}${propertiesString}${eventListenersString}>\n${childMarkup}\n${'  '.repeat(indentLevel)}</${transformedTag}>`
      : `${'  '.repeat(indentLevel)}<${transformedTag}${propertiesString}${eventListenersString} />`;

  const scripts = eventEntries.length > 0 ? generateReactControlledScript(tag, eventEntries, initialState) : null;
  const states = scripts ? [scripts.states, ...childStates] : childStates;
  const eventHandlers = scripts ? [scripts.eventHandler, ...childEventHandlers] : childEventHandlers;

  return { markup, states, eventHandlers, pdsComponents: [...pdsComponents, ...childPDSComponents] };
};

type ReactScripts = { states: string; eventHandler: string };

export const generateReactControlledScript = (
  tagName: string,
  eventEntries: [string, EventConfig][],
  initialState: StoryState<HTMLTagOrComponent>
): ReactScripts => {
  const states = eventEntries
    // Only create state if the current element's tagName is the same as the element the state is applied to e.g. don't create state for p-button onClick open flyout
    .filter(([_, { target }]) => tagName === target)
    .map(
      ([_, { prop }]) =>
        `  const [${prop}, set${pascalCase(prop)}] = useState(${(initialState?.properties as any)?.[prop]});`
    )
    .join('\n');

  const eventHandler = eventEntries
    .map(([eventName, { prop, value, eventValueKey, eventType, negateValue }]) => {
      if (eventValueKey) {
        return `  const ${eventName} = (e: ${eventType}) => {
    set${pascalCase(prop)}(${negateValue ? '!' : ''}e.detail.${eventValueKey});
  }`;
      }
      return `  const ${eventName} = () => {
    set${pascalCase(prop)}(${negateValue ? '!' : ''}${value});
  }`;
    })
    .join('\n');

  return { states, eventHandler };
};

export const generateReactProperties = (
  properties: HTMLElementOrComponentProps<HTMLTagOrComponent>,
  eventEntries: [string, EventConfig][]
) => {
  return Object.entries(properties)
    .map(([key, value]) => {
      if (eventEntries.some(([_, { prop }]) => prop === key)) {
        return ` ${key}={${key}}`;
      }
      if (typeof value === 'string') return ` ${key}="${value}"`;
      return ` ${key}={${JSON.stringify(value)}}`;
    })
    .join('');
};
