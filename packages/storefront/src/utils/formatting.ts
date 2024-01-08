import { paramCase } from 'change-case';
import type { TagName } from '@porsche-design-system/shared';
import { getComponentMeta, PropMeta } from '@porsche-design-system/component-meta';
import { convertToAngular } from './convertToAngular';
import { convertToReact } from './convertToReact';
import { convertToVue } from './convertToVue';
import type { Framework, PlaygroundTheme } from '../models';

export * from './convertToAngular';
export * from './convertToReact';

export const cleanMarkup = (markup: string): string =>
  markup
    // replace <br> tags with new line
    .replace(/<br[\s/]*>/g, '\n')
    // remove multiple new lines
    .replace(/\n{3,}/g, '\n\n');

export const patchThemeIntoMarkup = (markup: string, theme: PlaygroundTheme): string =>
  ['dark', 'auto'].includes(theme)
    ? markup
        // add dark theme attribute if component supports it
        .replace(/(<[pP][\w-]+)/g, (m, $tag) => {
          return getComponentMeta(paramCase($tag.replace(/</g, '')) as TagName)?.isThemeable
            ? `${$tag} theme="${theme}"`
            : $tag;
        })
    : markup;

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
  return meta.description
    ? meta.description
        .replace(/@(deprecated)/, '<strong class="deprecated">$1</strong>') // deprecated annotation
        .replace(/`(.+?)`/g, (_, g1) => `<code>${formatHtml(g1)}</code>`) // prop references in backticks
    : '';
};

export const formatPropType = (meta: PropMeta): string => {
  return Array.isArray(meta.allowedValues) || meta.isBreakpointCustomizable
    ? [
        ...(meta.type.includes('|')
          ? [] // inline union type is taken care of via allowedValues
          : [
              meta.type !== 'string' && meta.type !== 'number' && meta.type !== 'boolean'
                ? `type ${meta.type} =` // literal types, etc.
                : meta.type, // simple type
            ]),
        ...(Array.isArray(meta.allowedValues)
          ? meta.allowedValues.map(
              (val) =>
                wrapInCodeTag(
                  val === 'string'
                    ? val // `string` type is fine
                    : val === null
                      ? 'undefined' // `null` isn't allowed as part of validateProps, but `undefined` is
                      : typeof val === 'number'
                        ? `${val}` // numbers don't need string quotes, e.g. `1`, `911`
                        : `'${val}'` // everything else is a string value, e.g. `'start'` or `'16:9'`
                ) + (meta.deprecatedValues?.includes(val) ? '<span title="deprecated"> 🚫</span>' : '')
            )
          : []),
        ...(meta.isBreakpointCustomizable ? [`BreakpointCustomizable<${meta.type}>`] : []),
      ]
        // allowedValues are already wrapped with code tag because of trailing deprecated icon, but others are not
        .map((item) => (item.match(/<code>.+?<\/code>/) ? item : wrapInCodeTag(item)))
        .join('<br>\n')
    : meta.isAria && typeof meta.allowedValues === 'object'
      ? // aria props
        wrapInCodeTag(
          `type ${meta.type} = {
${Object.entries(meta.allowedValues)
  // possible values are output as string, even though actual types are more precise
  .map(([key, val]) => `&nbsp;&nbsp;'${key}'?: ${val};`)
  .join('\n')}
}`
        )
      : wrapInCodeTag(meta.type); // all other cases
};

export const formatPropDefaultValue = (meta: PropMeta): string => {
  return wrapInCodeTag(
    (typeof meta.defaultValue === 'string'
      ? `'${meta.defaultValue}'`
      : typeof meta.defaultValue === 'object' || typeof meta.defaultValue === 'boolean'
        ? JSON.stringify(meta.defaultValue).replace(/[{:,]/g, '$& ').replace(/}/g, ' $&')
        : `${meta.defaultValue}`) ?? 'undefined'
  );
};
