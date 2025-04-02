import { EventMeta, PropMeta, getComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import { convertToAngular, convertToReact, convertToVue } from '@porsche-design-system/shared/utils';
import { paramCase } from 'change-case';
import type { Framework, PlaygroundTheme } from '../models';

export const cleanMarkup = (markup: string): string =>
  markup
    // replace <br> tags with new line
    .replace(/<br[\s/]*>/g, '\n')
    // remove multiple new lines
    .replace(/\n{3,}/g, '\n\n');

export const patchThemeIntoMarkup = (markup: string, theme: PlaygroundTheme): string => {
  markup = markup.replace(/ag-theme-pds(-dark)?/, theme === 'dark' ? 'ag-theme-pds-dark' : 'ag-theme-pds');
  if (['dark', 'auto'].includes(theme)) {
    return (
      markup
        // add dark theme attribute if component supports it
        .replace(/(<[pP][\w-]+)/g, (m, $tag) => {
          return getComponentMeta(paramCase($tag.replace(/</g, '')) as TagName)?.isThemeable
            ? `${$tag} theme="${theme}"`
            : $tag;
        })
    );
  } else {
    return markup;
  }
};

export const escapeHtml = (input: string): string =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export const convertMarkup = (markup: string, framework: Framework): string => {
  const cleanedMarkup = cleanMarkup(markup);
  switch (framework) {
    case 'angular':
      return convertToAngular(cleanedMarkup);
    case 'react':
      return convertToReact(cleanedMarkup);
    case 'vue':
      return convertToVue(cleanedMarkup);
    default:
      return cleanedMarkup;
  }
};

export const formatHtml = (input: string): string => {
  return input.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
};

export const wrapInCodeTag = (input: string): string => `<code>${formatHtml(input)}</code>`;

export const formatPropDescription = (meta: PropMeta): string => {
  return (
    meta.description
      ?.replace(/@(deprecated|experimental)/, '<strong class="deprecated">$1</strong>') // deprecated and experimental annotations
      .replace(/`(.+?)`/g, (_, g1) => `<code>${formatHtml(g1)}</code>`) || '' // prop references in backticks
  );
};

export const formatPropType = (meta: PropMeta): string => {
  if (Array.isArray(meta.allowedValues) || meta.isBreakpointCustomizable) {
    return (
      [
        ...(meta.type.includes('|')
          ? [] // inline union type is taken care of via allowedValues
          : [
              meta.type !== 'string' && meta.type !== 'number' && meta.type !== 'boolean'
                ? `type ${meta.type} =` // literal types, etc.
                : meta.type, // simple type
            ]),
        ...(Array.isArray(meta.allowedValues)
          ? meta.allowedValues.map((val) => {
              let newVal: string;
              if (val === 'string' || val === 'number') {
                newVal = val; // `string` and `number` types are fine
              } else if (val === null) {
                newVal = 'undefined'; // `null` isn't allowed as part of validateProps, but `undefined` is
              } else if (typeof val === 'number') {
                newVal = `${val}`; // numbers don't need string quotes, e.g. `1`, `911`
              } else {
                newVal = `'${val}'`; // everything else is a string value, e.g. `'start'` or `'16:9'`
              }

              const deprecatedIcon = meta.deprecatedValues?.includes(val) ? '<span title="deprecated"> 🚫</span>' : '';
              return wrapInCodeTag(newVal) + deprecatedIcon;
            })
          : []),
        ...(meta.isBreakpointCustomizable ? [`BreakpointCustomizable<${meta.type}>`] : []), // BreakpointCustomizable<T> generic type
      ]
        // allowedValues are already wrapped with code tag because of trailing deprecated icon, but others are not
        .map((item) => (item.match(/<code>.+?<\/code>/) ? item : wrapInCodeTag(item)))
        .join('<br>\n')
    );
  } else if (meta.isAria || typeof meta.allowedValues === 'object') {
    // aria props
    return wrapInCodeTag(
      `type ${meta.type} = {
${Object.entries(meta.allowedValues as object)
  // possible values are output as string, even though actual types are more precise
  .map(([key, val]) => `&nbsp;&nbsp;'${key}'?: ${val};`)
  .join('\n')}
}`
    );
  } else {
    return wrapInCodeTag(meta.type); // all other cases
  }
};

export const formatPropDefaultValue = (meta: PropMeta): string => {
  return wrapInCodeTag(
    typeof meta.defaultValue === 'string'
      ? `'${meta.defaultValue}'`
      : meta.defaultValue !== null && (typeof meta.defaultValue === 'object' || typeof meta.defaultValue === 'boolean')
        ? JSON.stringify(meta.defaultValue).replace(/[{:,]/g, '$& ').replace(/}/g, ' $&')
        : `${meta.defaultValue ?? 'undefined'}`
  );
};

export const formatEventType = (meta: EventMeta): string => {
  // single code block with line breaks to avoid `|` via code::before pseudo element
  return wrapInCodeTag(
    [
      ...(meta.typeDetail
        ? [
            `type ${meta.type} = ${meta.typeDetail
              .replace(/[{;] /g, '$&\n&nbsp;&nbsp;') // make single line objects multi line
              .replace(/(.) }$/, '$1;\n}')}`, // add semi colon to last property and add new line
          ]
        : []),
      `CustomEvent<${meta.type}>`,
    ].join('\n')
  );
};
