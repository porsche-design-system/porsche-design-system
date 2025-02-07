import type { ElementConfig, EventConfig, HTMLTagOrComponent } from '@/components/playground/ConfiguratorControls';
import { camelCase, kebabCase } from 'change-case';

const getVanillaJsCode = (
  selector: string | undefined,
  eventHandlers: string | undefined,
  code: string | undefined
) => `<!doctype html>
<html lang="en">
<head>
  <title></title>
</head>
<body>

${code}

<script>${selector ? `\n${selector}\n` : ''}${eventHandlers ? `\n${eventHandlers}\n` : ''}</script>
</body>
</html>`;

export const generateVanillaJsMarkup = (
  configs: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
  indentLevel = 0
): string => {
  const results = configs.map((config) => createVanillaJSMarkup(config, indentLevel));
  const markup = results.map(({ markup }) => markup).join('\n\n');
  const selector = results
    .flatMap(({ selector }) => selector)
    .filter((state) => state)
    .join('\n');
  const eventHandlers = results.flatMap(({ eventHandlers }) => eventHandlers).join('\n');

  return getVanillaJsCode(selector, eventHandlers, markup);
};

const createVanillaJSMarkup = (
  config: string | ElementConfig<HTMLTagOrComponent> | undefined,
  indentLevel = 0
): { markup: string; selector: string[]; eventHandlers: string[] } => {
  if (!config) return { markup: '', selector: [], eventHandlers: [] };
  const indent = '  '.repeat(indentLevel);

  if (typeof config === 'string') return { markup: `${indent}${config}`, selector: [], eventHandlers: [] };

  const { tag, properties = {}, events = {}, children = [] } = config;

  const props = [];

  const propEntries = Object.entries(properties);
  const eventEntries = Object.entries(events);

  for (const [key, value] of propEntries) {
    if (typeof value === 'string') {
      props.push({ key: key === 'className' ? 'class' : kebabCase(key), value });
    } else if (key === 'style') {
      const styles = Object.entries(value)
        .map(([styleKey, styleValue]) =>
          styleKey.startsWith('--') ? `${styleKey}: ${styleValue}` : `${kebabCase(styleKey)}: ${styleValue}`
        )
        .join('; ');
      props.push({ key: 'style', value: styles });
    } else {
      props.push({ key: key, value: JSON.stringify(value) });
    }
  }

  const propsWithoutControlled = props.filter(({ key }) => !eventEntries.some(([_, { prop }]) => prop === key));

  const propertiesString =
    propsWithoutControlled.length > 0
      ? ` ${propsWithoutControlled.map(({ key, value }) => `${kebabCase(key)}="${value}"`).join(' ')}`
      : '';

  const childrenResults = children.map((child) => createVanillaJSMarkup(child, indentLevel + 1));
  const childMarkup = childrenResults.map(({ markup }) => markup).join('\n');
  const childSelectors = childrenResults.flatMap(({ selector }) => selector);
  const childEventHandlers = childrenResults.flatMap(({ eventHandlers }) => eventHandlers);

  const markup =
    children.length > 0
      ? `${indent}<${tag}${propertiesString}>\n${childMarkup}\n${indent}</${tag}>`
      : `${indent}<${tag}${propertiesString} />`;

  const scripts = eventEntries.length > 0 ? generateVanillaJSControlledScript(tag, eventEntries) : null;
  const selector = scripts ? [scripts.selector, ...childSelectors] : childSelectors;
  const eventHandlers = scripts ? [scripts.eventHandler, ...childEventHandlers] : childEventHandlers;

  return { markup, selector, eventHandlers };
};

type VanillaJSScripts = { selector: string; eventHandler: string };

const generateVanillaJSControlledScript = (
  tagName: string,
  eventEntries: [string, EventConfig][]
): VanillaJSScripts => {
  const constant = camelCase(tagName.replace('p-', ''));
  const selector = `  const ${constant} = document.querySelector('${tagName}');`;

  const eventHandler = eventEntries
    .map(([eventName, { target, prop, value, eventValueKey, negateValue }]) => {
      const element = camelCase(target.replace('p-', ''));
      const nativeEventName = camelCase(eventName.replace('on', ''));
      if (eventValueKey) {
        return `  ${constant}.addEventListener('${nativeEventName}', (e) => (e.target.${prop} = ${negateValue ? '!' : ''}e.detail.${eventValueKey}))`;
      }
      return `  ${constant}.addEventListener('${nativeEventName}', () => (${element}.${prop} = ${negateValue ? '!' : ''}${value}))`;
    })
    .join('\n');

  return { selector, eventHandler };
};
