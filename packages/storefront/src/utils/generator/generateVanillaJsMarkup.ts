import type { ElementConfig, EventConfig, HTMLTagOrComponent } from '@/components/playground/ConfiguratorControls';
import { camelCase, kebabCase } from 'change-case';

const getVanillaJsCode = (code: string | undefined, script: string | undefined) => `<!doctype html>
<html lang="en">
<head>
  <title></title>
</head>
<body>

${code}
${script ? `\n<script>\n${script}\n</script>\n` : ''}
</body>
</html>`;

export const generateVanillaJsMarkup = (
  configs: (string | ElementConfig<HTMLTagOrComponent> | undefined)[]
): string => {
  const results = configs.map((config) => createVanillaJSMarkup(config));
  const markup = results.map(({ markup }) => markup).join('\n\n');
  const scripts = results.flatMap(({ scripts }) => scripts).join('\n');

  return getVanillaJsCode(markup, scripts);
};

const createVanillaJSMarkup = (
  config: string | ElementConfig<HTMLTagOrComponent> | undefined,
  indentLevel = 0
): { markup: string; scripts: string[] } => {
  if (!config) return { markup: '', scripts: [] };
  const indent = '  '.repeat(indentLevel);

  if (typeof config === 'string') return { markup: `${indent}${config}`, scripts: [] };

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
  const childScripts = childrenResults.flatMap(({ scripts }) => scripts);

  const markup =
    children.length > 0
      ? `${indent}<${tag}${propertiesString}>\n${childMarkup}\n${indent}</${tag}>`
      : `${indent}<${tag}${propertiesString} />`;

  const scripts =
    eventEntries.length > 0 ? [generateVanillaJSControlledScript(tag, eventEntries), ...childScripts] : childScripts;

  return { markup, scripts };
};

const generateVanillaJSControlledScript = (tagName: string, eventEntries: [string, EventConfig][]) => {
  const constant = camelCase(tagName.replace('p-', ''));
  const selector = `  const ${constant} = document.querySelector('${tagName}');`;

  const listeners = eventEntries
    .map(([eventName, { target, prop, value, eventValueKey, eventType, negateValue }]) => {
      const element = camelCase(target.replace('p-', ''));
      const nativeEventName = camelCase(eventName.replace('on', ''));
      if (eventValueKey) {
        return `  ${constant}.addEventListener('${nativeEventName}', (e: ${eventType}) => (e.target.${prop} = ${negateValue ? '!' : ''}e.detail.${eventValueKey}))`;
      }
      return `  ${constant}.addEventListener('${nativeEventName}', () => (${element}.${prop} = ${negateValue ? '!' : ''}${value}))`;
    })
    .join('\n');

  return [selector, listeners].join('\n');
};
