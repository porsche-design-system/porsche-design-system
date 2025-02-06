import type {
  ConfiguratorTagNames,
  ElementConfig,
  HTMLTagOrComponent,
} from '@/components/playground/ConfiguratorControls';
import type { StoryState } from '@/models/story';
import { type ControlledInfo, extractParams } from '@/utils/generator/generateVanillaJsMarkup';
import { camelCase, kebabCase, pascalCase } from 'change-case';

const getReactCode = (
  states: string | undefined,
  eventHandlers: string | undefined,
  code: string | undefined
) => `export const Example = () => {
${states}
${eventHandlers}
  return (
    <>
${code}
    </>
  )
}`;

export const generateReactMarkup = (
  configs: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
  initialState: StoryState<ConfiguratorTagNames>,
  indentLevel = 3
): string => {
  const results = configs.map((config) => createReactJSMarkup(config, initialState, indentLevel));
  const markup = results.map(({ markup }) => markup).join('\n\n');
  const states = results
    .flatMap(({ states }) => states)
    .filter((state) => state)
    .join('\n');
  const eventHandlers = results.flatMap(({ eventHandlers }) => eventHandlers).join('\n');

  return getReactCode(states, eventHandlers, markup);
};

const createReactJSMarkup = (
  config: string | ElementConfig<HTMLTagOrComponent> | undefined,
  initialState: StoryState<ConfiguratorTagNames>,
  indentLevel = 0
): { markup: string; states: string[]; eventHandlers: string[] } => {
  if (!config) return { markup: '', states: [], eventHandlers: [] };
  const indent = '  '.repeat(indentLevel);

  if (typeof config === 'string') return { markup: `${indent}${config}`, states: [], eventHandlers: [] };

  const { tag, properties = {}, children = [] } = config;
  const isPDSComponent = tag.startsWith('p-');

  let transformedTag: string = tag;
  if (isPDSComponent) {
    transformedTag = pascalCase(tag);
  }

  const events: ControlledInfo = [];
  const props = [];

  const propEntries = Object.entries(properties);
  for (const [key, value] of propEntries) {
    if (key.startsWith('on')) {
      const {
        eventParams,
        updateStateParams: [component, prop, val],
      } = extractParams(value);
      props.push({ key, value: `{${key}}` });
      events.push({
        tagName: tag,
        eventName: key,
        component,
        prop,
        initialValue: initialState?.properties?.[prop as keyof StoryState<ConfiguratorTagNames>['properties']],
        newValue: val,
        isEventVal: eventParams.length > 0,
      });
    } else if (typeof value === 'string') {
      props.push({ key, value: `"${value}"` });
    } else {
      props.push({ key, value: `{${JSON.stringify(value)}}` });
    }
  }

  const propertiesString =
    props.length > 0
      ? ` ${props
          .map(({ key, value }) => {
            if (events.some(({ prop }) => prop === key)) {
              return `${key}={${key}}`;
            }
            return `${key}=${value}`;
          })
          .join(' ')}`
      : '';

  const childrenResults = children.map((child) => createReactJSMarkup(child, initialState, indentLevel + 1));
  const childMarkup = childrenResults.map(({ markup }) => markup).join('\n');
  const childStates = childrenResults.flatMap(({ states }) => states);
  const childEventHandlers = childrenResults.flatMap(({ eventHandlers }) => eventHandlers);

  const markup =
    children.length > 0
      ? `${'  '.repeat(indentLevel)}<${transformedTag}${propertiesString}>\n${childMarkup}\n${'  '.repeat(indentLevel)}</${transformedTag}>`
      : `${'  '.repeat(indentLevel)}<${transformedTag}${propertiesString} />`;

  const states = events.length > 0 ? [generateReactControlledScript(events).states, ...childStates] : childStates;
  const eventHandlers =
    events.length > 0
      ? [generateReactControlledScript(events).eventHandler, ...childEventHandlers]
      : childEventHandlers;

  return { markup, states, eventHandlers };
};

type ReactScripts = { states: string; eventHandler: string };

const generateReactControlledScript = (controlled: ControlledInfo): ReactScripts => {
  const states = controlled
    // Only create state if the current element's tagName is the same as the element the state is applied to e.g. don't create state for p-button onClick open flyout
    .filter(({ tagName, component }) => tagName === component)
    .map(({ prop, initialValue }) => `  const [${prop}, set${pascalCase(prop)}] = useState(${initialValue});`)
    .join('\n');

  const eventHandler = controlled
    .map(({ eventName, prop, newValue, isEventVal }) => {
      if (isEventVal) {
        return `  const ${eventName} = (e) => {
    set${pascalCase(prop)}(${newValue});
  }`;
      }
      return `  const ${eventName} = () => {
    set${pascalCase(prop)}(${newValue});
  }`;
    })
    .join('\n');

  return { states, eventHandler };
};
