import { paramCase } from 'change-case';
import { getComponentMeta, TagName } from '@porsche-design-system/shared';
import { convertToAngular } from '@/utils/convertToAngular';
import { convertToReact } from '@/utils/convertToReact';
import type { Theme } from '@/models';
import { FrameworksWithoutShared } from '@/utils/stackblitz/helper';

export * from './convertToAngular';
export * from './convertToReact';

export const cleanMarkup = (markup: string): string =>
  markup
    // replace <br> tags with new line
    .replace(/<br[\s/]*>/g, '\n')
    // remove multiple new lines
    .replace(/\n{3,}/g, '\n\n');

export const patchThemeIntoMarkup = (markup: string, theme: Theme): string =>
  theme === 'dark'
    ? markup
        // add dark theme attribute if component supports it
        .replace(/(<[pP][\w-]+)/g, (m, $tag) => {
          return getComponentMeta(paramCase($tag.replace('<', '')) as TagName)?.isThemeable
            ? `${$tag} theme="dark"`
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

export const convertMarkup = (markup: string, framework: FrameworksWithoutShared): string => {
  const cleanedMarkup = cleanMarkup(markup);
  switch (framework) {
    case 'angular':
      return convertToAngular(cleanedMarkup);
    case 'react':
      return convertToReact(cleanedMarkup);
    default:
      return cleanedMarkup;
  }
};
