import { paramCase } from 'change-case';
import type { TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
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
