import { isReleasedPds } from '@/lib/stackblitz/helper';
import { getStackblitzGlobalStyle } from '@/lib/stackblitz/openInStackblitz';
import type { FrameworkConfiguratorMarkup } from '@/models/framework';
import type { StorefrontTheme } from '@/models/theme';
import type {
  ElementConfig,
  EventConfig,
  HTMLElementOrComponentProps,
  HTMLTagOrComponent,
} from '@/utils/generator/generator';
import { camelCase, kebabCase } from 'change-case';
import type { CSSProperties } from 'react';

export const getVanillaJsCode = (
  { markup, states, eventHandlers }: FrameworkConfiguratorMarkup['vanilla-js'],
  { isFullConfig, theme, pdsVersion }: { isFullConfig: boolean; theme: StorefrontTheme; pdsVersion?: string } = {
    isFullConfig: false,
    theme: 'light',
    pdsVersion: '',
  }
) => {
  const metaTags = isFullConfig
    ? `  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Porsche Design System</title>\n`
    : '  <title></title>';

  const basePath = isReleasedPds(pdsVersion) ? 'node_modules' : '.';
  const porscheDesignSystemScript = `<script src="${basePath}/@porsche-design-system/components-js/index.js"></script>`;
  const scripts = isFullConfig ? `  ${porscheDesignSystemScript}\n` : '';

  const globalStyle = isFullConfig ? getStackblitzGlobalStyle(theme) : '';

  return `<!doctype html>
<html lang="en">
<head>
${metaTags}${scripts}${globalStyle}
</head>
<body>

${markup ?? ''}

<script>${isFullConfig ? '\n  porscheDesignSystem.load();\n\n' : ''}
${[states, eventHandlers].filter(Boolean).join('\n')}
</script>
</body>
</html>`;
};

export const generateVanillaJsMarkup = (
  configs: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
  indentLevel = 0
): FrameworkConfiguratorMarkup['vanilla-js'] => {
  const { markup, selector, eventHandlers } = configs.reduce(
    (acc, config) => {
      const result = createVanillaJSMarkup(config, indentLevel);
      acc.markup.push(result.markup);
      acc.selector.push(...result.selector);
      acc.eventHandlers.push(...result.eventHandlers);
      return acc;
    },
    { markup: [], selector: [], eventHandlers: [] } as { markup: string[]; selector: string[]; eventHandlers: string[] }
  );

  return { states: selector.join('\n'), eventHandlers: eventHandlers.join('\n'), markup: markup.join('\n\n') };
};

const createVanillaJSMarkup = (
  config: string | ElementConfig<HTMLTagOrComponent> | undefined,
  indentLevel = 0
): { markup: string; selector: string[]; eventHandlers: string[] } => {
  if (!config) return { markup: '', selector: [], eventHandlers: [] };
  const indent = '  '.repeat(indentLevel);

  if (typeof config === 'string') return { markup: `${indent}${config}`, selector: [], eventHandlers: [] };

  const { tag, properties = {}, events = {}, children = [] } = config;

  const eventEntries = Object.entries(events);
  const propertyString = generateVanillaJsProperties(properties, eventEntries);

  const childrenMarkup = children.map((child) => createVanillaJSMarkup(child, indentLevel + 1));

  const markup =
    children.length > 0
      ? `${indent}<${tag}${propertyString}>\n${childrenMarkup.map(({ markup }) => markup).join('\n')}\n${indent}</${tag}>`
      : `${indent}<${tag}${propertyString} />`;

  const scripts = Object.keys(events).length > 0 ? generateVanillaJSControlledScript(tag, eventEntries) : null;

  return {
    markup,
    selector: scripts
      ? [scripts.selector, ...childrenMarkup.flatMap(({ selector }) => selector)]
      : childrenMarkup.flatMap(({ selector }) => selector),
    eventHandlers: scripts
      ? [scripts.eventHandler, ...childrenMarkup.flatMap(({ eventHandlers }) => eventHandlers)]
      : childrenMarkup.flatMap(({ eventHandlers }) => eventHandlers),
  };
};

export const generateVanillaJSControlledScript = (
  tagName: HTMLTagOrComponent,
  eventEntries: [string, EventConfig][]
) => {
  const constant = camelCase(tagName.replace('p-', ''));
  const selector = `  const ${constant} = document.querySelector("${tagName}");`;

  const eventHandler = eventEntries
    .map(([eventName, { target, prop, value, eventValueKey, negateValue }]) => {
      const element = camelCase(target.replace('p-', ''));
      const nativeEventName = camelCase(eventName.replace('on', ''));
      return eventValueKey
        ? `  ${constant}.addEventListener('${nativeEventName}', (e) => e.target.${prop} = ${negateValue ? '!' : ''}e.detail.${eventValueKey});`
        : `  ${constant}.addEventListener('${nativeEventName}', () => (${element}.${prop} = ${negateValue ? '!' : ''}${value}));`;
    })
    .join('\n');

  return { selector, eventHandler };
};

export const generateVanillaJsProperties = (
  properties: HTMLElementOrComponentProps<HTMLTagOrComponent>,
  eventEntries: [string, EventConfig][]
) => {
  return Object.entries(properties)
    .filter(([key]) => !eventEntries.some(([_, { prop }]) => prop === key))
    .map(([key, value]) => {
      if (typeof value === 'string') return ` ${kebabCase(key === 'className' ? 'class' : key)}="${value}"`;
      if (key === 'style')
        return ` style="${Object.entries(value as CSSProperties)
          .map(
            ([styleKey, styleValue]) => `${styleKey.startsWith('--') ? styleKey : kebabCase(styleKey)}: ${styleValue}`
          )
          .join('; ')}"`;
      if (key === 'aria') {
        return ` ${key}="${JSON.stringify(value).replace(/"/g, "'")}"`;
      }
      return ` ${kebabCase(key)}="${JSON.stringify(value)}"`;
    })
    .join('');
};
