import { camelCase, kebabCase } from 'change-case';
import type { CSSProperties } from 'react';
import type { FrameworkConfiguratorMarkup } from '@/models/framework';
import type { StorefrontColorScheme } from '@/models/theme';
import type {
  ElementConfig,
  EventConfig,
  HTMLElementOrComponentProps,
  HTMLTagOrComponent,
} from '@/utils/generator/generator';

export const getVanillaJsCode = (
  { markup, states, eventHandlers }: FrameworkConfiguratorMarkup['vanilla-js'],
  { isFullConfig, theme }: { isFullConfig: boolean; theme: StorefrontColorScheme } = {
    isFullConfig: false,
    theme: 'scheme-light',
  }
) => {
  const metaTags = isFullConfig
    ? `  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Porsche Design System</title>`
    : '  <title></title>';

  return `<!doctype html>
<html lang="en" class="${theme}">
<head>
${metaTags}
</head>
<body class="bg-canvas">

${markup ?? ''}
<script>
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

  const eventEntries: [string, EventConfig][] = Object.entries(events);
  const propertyString = generateVanillaJsProperties(tag, properties, eventEntries);

  const childrenMarkup = children.map((child) => createVanillaJSMarkup(child, indentLevel + 1));

  const markup =
    children.length > 0
      ? `${indent}<${tag}${propertyString}>\n${childrenMarkup.map(({ markup }) => markup).join('\n')}\n${indent}</${tag}>`
      : isSelfClosingTag(tag)
        ? `${indent}<${tag}${propertyString} />`
        : `${indent}<${tag}${propertyString}></${tag}>`;

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
  const constant = camelCase(tagName);
  const selector = `  const ${constant} = document.querySelector("${tagName}");`;

  const eventHandler = eventEntries
    .map(([eventName, { target, prop, value, eventValueKey, negateValue }]) => {
      const element = camelCase(target);
      const nativeEventName = camelCase(eventName.replace('on', ''));
      return eventValueKey
        ? `  ${constant}.addEventListener('${nativeEventName}', (e) => e.target.${prop} = ${negateValue ? '!' : ''}e.detail.${eventValueKey});`
        : `  ${constant}.addEventListener('${nativeEventName}', () => (${element}.${prop} = ${negateValue ? '!' : ''}${value}));`;
    })
    .join('\n');

  return { selector, eventHandler };
};

export const generateVanillaJsProperties = (
  tag: HTMLTagOrComponent,
  properties: HTMLElementOrComponentProps<HTMLTagOrComponent>,
  eventEntries: [string, EventConfig][]
) => {
  return Object.entries(properties)
    .filter(([key]) => !eventEntries.some(([_, { prop }]) => prop === key))
    .map(([key, value]) => {
      // TODO: Move this logic to a separate function
      // Some props need to be treated differently for vanilla-js e.g. boolean props without value (loop: true => loop) only for non pds tags
      if (!tag.startsWith('p-') && specialProps[key]) return specialProps[key](value);
      if (typeof value === 'string') return ` ${kebabCase(key === 'className' ? 'class' : key)}="${value}"`;
      if (key === 'style')
        return ` style="${Object.entries(value as CSSProperties)
          .map(
            ([styleKey, styleValue]) => `${styleKey.startsWith('--') ? styleKey : kebabCase(styleKey)}: ${styleValue}`
          )
          .join('; ')}"`;
      if (typeof value === 'object') {
        const formattedObject = Object.entries(value ?? {})
          .map(([k, v]) => `'${k}': '${v}'`)
          .join(', ');
        return ` ${key}="{${formattedObject}}"`;
      }
      return ` ${kebabCase(key)}="${JSON.stringify(value)}"`;
    })
    .join('');
};

export const specialProps: Record<string, (value: unknown) => string> = {
  disabled: (value: unknown) => (value ? ' disabled' : ''),
  loop: (value: unknown) => (value ? ' loop' : ''),
  muted: (value: unknown) => (value ? ' muted' : ''),
  autoPlay: (value: unknown) => (value ? ' autoplay' : ''),
  playsInline: (value: unknown) => (value ? ' playsinline' : ''),
  defaultChecked: (value: unknown) => (value ? ' checked' : ''),
  readOnly: (value: unknown) => (value ? ' readonly' : ''),
  maxLength: (value: unknown) => (value !== undefined ? ` maxlength="${value}"` : ''),
  minLength: (value: unknown) => (value !== undefined ? ` minlength="${value}"` : ''),
  srcSet: (value: unknown) => (value !== undefined ? ` srcset="${value}"` : ''),
};

export const isSelfClosingTag = (tag: string): boolean => {
  const selfClosingTags = new Set([
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'source',
    'track',
    'wbr',
  ]);

  return selfClosingTags.has(tag);
};
