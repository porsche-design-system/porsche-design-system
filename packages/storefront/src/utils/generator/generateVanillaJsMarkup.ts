import { camelCase, kebabCase } from 'change-case';
import type { CSSProperties } from 'react';
import type { StorefrontColorScheme } from '@/models/colorScheme';
import type { FrameworkConfiguratorMarkup } from '@/models/framework';
import type {
  ElementConfig,
  EventConfig,
  HTMLElementOrComponentProps,
  HTMLTagOrComponent,
} from '@/utils/generator/generator';

export const getVanillaJsCode = (
  { markup, states, eventHandlers }: FrameworkConfiguratorMarkup['vanilla-js'],
  {
    isFullConfig,
    theme,
    scriptAttributes = '',
  }: { isFullConfig: boolean; theme: StorefrontColorScheme; scriptAttributes?: string } = {
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
<script${scriptAttributes && ` ${scriptAttributes}`}>
${[states, eventHandlers].filter(Boolean).join('\n')}
</script>
</body>
</html>`;
};

export const generateVanillaJsMarkup = (
  configs: (string | ElementConfig<HTMLTagOrComponent> | undefined)[],
  indentLevel = 0
): FrameworkConfiguratorMarkup['vanilla-js'] => {
  const sharedTags = getSharedControlledTags(configs);
  const { markup, selector, eventHandlers } = configs.reduce(
    (acc, config) => {
      const result = createVanillaJSMarkup(config, indentLevel, sharedTags);
      acc.markup.push(result.markup);
      acc.selector.push(...result.selector);
      acc.eventHandlers.push(...result.eventHandlers);
      return acc;
    },
    { markup: [], selector: [], eventHandlers: [] } as { markup: string[]; selector: string[]; eventHandlers: string[] }
  );

  // elements sharing their state produce identical scripts, which are only needed once
  return {
    states: [...new Set(selector)].join('\n'),
    eventHandlers: [...new Set(eventHandlers)].join('\n'),
    markup: markup.join('\n\n'),
  };
};

/**
 * Returns the tags of elements with events which occur multiple times, e.g. two accordions sharing the same `open`
 * state. Their script has to address all of them instead of only the first one.
 */
const getSharedControlledTags = (configs: (string | ElementConfig<HTMLTagOrComponent> | undefined)[]): Set<string> => {
  const counts = new Map<string, number>();
  const count = (config: string | ElementConfig<HTMLTagOrComponent> | undefined): void => {
    if (!config || typeof config === 'string') return;
    if (Object.keys(config.events ?? {}).length > 0) {
      counts.set(config.tag, (counts.get(config.tag) ?? 0) + 1);
    }
    config.children?.forEach(count);
  };
  configs.forEach(count);
  return new Set([...counts].filter(([, amount]) => amount > 1).map(([tag]) => tag));
};

const createVanillaJSMarkup = (
  config: string | ElementConfig<HTMLTagOrComponent> | undefined,
  indentLevel = 0,
  sharedTags: Set<string> = new Set()
): { markup: string; selector: string[]; eventHandlers: string[] } => {
  if (!config) return { markup: '', selector: [], eventHandlers: [] };
  const indent = '  '.repeat(indentLevel);

  if (typeof config === 'string') return { markup: `${indent}${config}`, selector: [], eventHandlers: [] };

  const { tag, properties = {}, events = {}, children = [] } = config;

  const eventEntries: [string, EventConfig][] = Object.entries(events);
  const propertyString = generateVanillaJsProperties(tag, properties, eventEntries);

  const childrenMarkup = children.map((child) => createVanillaJSMarkup(child, indentLevel + 1, sharedTags));

  const markup =
    children.length > 0
      ? `${indent}<${tag}${propertyString}>\n${childrenMarkup.map(({ markup }) => markup).join('\n')}\n${indent}</${tag}>`
      : isSelfClosingTag(tag)
        ? `${indent}<${tag}${propertyString} />`
        : `${indent}<${tag}${propertyString}></${tag}>`;

  const scripts =
    Object.keys(events).length > 0 ? generateVanillaJSControlledScript(tag, eventEntries, sharedTags) : null;

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
  eventEntries: [string, EventConfig][],
  sharedTags: Set<string> = new Set()
) => {
  if (sharedTags.has(tagName)) {
    return generateVanillaJSSharedControlledScript(tagName, eventEntries, sharedTags);
  }

  const constant = camelCase(tagName);
  const selector = `  const ${constant} = document.querySelector("${tagName}");`;

  const eventHandler = eventEntries
    .map(([eventName, { target, prop, value, eventValueKey, negateValue, toggleValue }]) => {
      const element = camelCase(target);
      const nativeEventName = camelCase(eventName.replace('on', ''));
      return eventValueKey
        ? `  ${constant}.addEventListener('${nativeEventName}', (e) => e.target.${prop} = ${negateValue ? '!' : ''}e.detail.${eventValueKey});`
        : `  ${constant}.addEventListener('${nativeEventName}', () => (${element}.${prop} = ${toggleValue ? `!${element}.${prop}` : `${negateValue ? '!' : ''}${value}`}));`;
    })
    .join('\n');

  return { selector, eventHandler };
};

/**
 * Elements of the same tag sharing their state are selected via `querySelectorAll()`, each of them listens for the event
 * and applies the value to all targets.
 */
const generateVanillaJSSharedControlledScript = (
  tagName: HTMLTagOrComponent,
  eventEntries: [string, EventConfig][],
  sharedTags: Set<string>
) => {
  const constant = camelCase(`${tagName}s`);
  const selector = `  const ${constant} = document.querySelectorAll("${tagName}");`;

  const eventHandler = eventEntries
    .map(([eventName, { target, prop, value, eventValueKey, negateValue, toggleValue }]) => {
      const nativeEventName = camelCase(eventName.replace('on', ''));
      const getValue = (element: string): string =>
        eventValueKey
          ? `${negateValue ? '!' : ''}e.detail.${eventValueKey}`
          : toggleValue
            ? `!${element}.${prop}`
            : `${negateValue ? '!' : ''}${value}`;
      const assignment = sharedTags.has(target)
        ? `${camelCase(`${target}s`)}.forEach((el) => (el.${prop} = ${getValue('el')}))`
        : `(${camelCase(target)}.${prop} = ${getValue(camelCase(target))})`;
      return `  ${constant}.forEach((element) => element.addEventListener('${nativeEventName}', (${eventValueKey ? 'e' : ''}) => ${assignment}));`;
    })
    .join('\n');

  return { selector, eventHandler };
};

const getAttributeName = (key: string): string =>
  key === 'className' ? 'class' : key === 'tabIndex' ? 'tabindex' : key.startsWith('aria-') ? key : kebabCase(key);

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
      if (typeof value === 'string') {
        const attributeName = getAttributeName(key);
        return ` ${attributeName}="${value}"`;
      }
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
      return ` ${getAttributeName(key)}="${JSON.stringify(value)}"`;
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
