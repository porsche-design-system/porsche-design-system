import type { Styles } from 'jss';
import type { TagName } from '@porsche-design-system/shared';
import { getMinifiedCss, INTERNAL_TAG_NAMES, TAG_NAMES } from '@porsche-design-system/shared';
import { joinArrayElementsToString } from './utils';
import {
  fontFamily,
  fontHyphenationStyle,
  fontLineHeight,
  fontWeight,
  getFocusStyle,
  getHoverStyle,
} from '@porsche-design-system/utilities-v2';
import { addImportantToEachRule } from '@porsche-design-system/components/src/styles';

const tagNames = joinArrayElementsToString(TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x)));

// TODO: Modal + Table will get theme prop soon
// TODO: extend slotted link case for Carousel, Display, Link Tile, Modal, Switch, Tabs (maybe states test is good enough)
const tagNamesWithSlottedAnchor: TagName[] = [
  'p-accordion',
  'p-banner',
  'p-carousel',
  'p-checkbox-wrapper',
  'p-display',
  'p-heading',
  'p-headline',
  'p-inline-notification',
  'p-modal',
  'p-popover',
  'p-radio-button-wrapper',
  'p-select-wrapper',
  'p-switch',
  'p-table',
  'p-tabs',
  'p-text',
  'p-text-field-wrapper',
  'p-text-list',
  'p-textarea-wrapper',
];

const tagNamesWithSlottedInputIndicator: TagName[] = ['p-text-field-wrapper'];

const tagNamesWithSlottedImage: TagName[] = ['p-table'];

const tagNamesWithSlottedPicture: TagName[] = ['p-button-tile', 'p-link-tile'];

export const generateInitialStylesPartial = (): string => {
  const types = `type GetInitialStylesOptions = {
  prefix?: string;
  format?: Format;
};`;

  const normalizeStyles: Styles = {
    '@global': {
      'html, body': {
        margin: 0,
        padding: 0,
        fontFamily,
        lineHeight: fontLineHeight,
        letterSpacing: 'normal',
        textSizeAdjust: 'none',
        WebkitTextSizeAdjust: 'none', // stop iOS safari from adjusting font size when screen rotation is changing
      },

      'h1, h2, h3, h4, h5, h6': {
        fontWeight: fontWeight.semiBold,
      },

      p: {
        fontWeight: fontWeight.regular,
        ...fontHyphenationStyle,
      },

      'b, strong': {
        fontWeight: fontWeight.bold,
      },

      // TODO: add prefix support
      // TODO: add multi prefix support
      [tagNamesWithSlottedAnchor.join()]: {
        '& a': addImportantToEachRule({
          textDecoration: 'underline',
          color: 'currentcolor',
          // TODO: add smooth transition to hover
          ...getHoverStyle({ inset: '0 -4px' }),
          ...getFocusStyle({ inset: '0 -4px' }),
        }),
      },

      // TODO: add prefix support
      // TODO: add multi prefix support
      [tagNamesWithSlottedInputIndicator.join()]: {
        '& input': {
          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button, &::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-calendar-picker-indicator':
            addImportantToEachRule({
              display: 'none',
            }),
        },
      },

      // TODO: add prefix support
      // TODO: add multi prefix support
      [tagNamesWithSlottedImage.join()]: {
        '& img': addImportantToEachRule({
          verticalAlign: 'middle',
        }),
      },

      // TODO: add prefix support
      // TODO: add multi prefix support
      [tagNamesWithSlottedPicture.join()]: {
        '& picture > img': addImportantToEachRule({
          height: '100%',
          width: '100%',
          objectFit: 'cover',
        }),
      },
    },
  };

  const initialStylesFunction = `export function getInitialStyles(opts?: GetInitialStylesOptions & { format: 'jsx' }): JSX.Element;
export function getInitialStyles(opts?: GetInitialStylesOptions): string;
export function getInitialStyles(opts?: GetInitialStylesOptions): string | JSX.Element {
  const { prefix, format }: GetInitialStylesOptions = {
    prefix: '',
    format: 'html',
    ...opts,
  };

  const tagNames = [${tagNames}];
  const prefixedTagNames = getPrefixedTagNames(tagNames, prefix);

  throwIfRunInBrowser('getInitialStyles');

  const styleProps = { [\`data-pds-initial-styles\$\{prefix ? '-' + prefix : ''\}\`]: '' };
  const styleAttributes = convertPropsToAttributeString(styleProps);

  const prefixedTagNamesStyles = prefixedTagNames.join() + '{visibility:hidden}.hydrated,.ssr{visibility:inherit}';
  const normalizeStyles = \`${getMinifiedCss(normalizeStyles)}\`;

  const styles = prefixedTagNamesStyles.concat(normalizeStyles);

  return format === 'html'
    ? \`<style \$\{styleAttributes\}>\${styles}</style>\`
    : <style {...styleProps} dangerouslySetInnerHTML={{ __html: styles }} />;
}`;

  const helperFunction = `const getPrefixedTagNames = (tagNames: string[], prefix?: string): string[] => {
  return prefix ? tagNames.map((x) => \`\${prefix}-\${x}\`) : tagNames;
};`;

  return [types, initialStylesFunction, helperFunction].join('\n\n');
};
