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
const tagNamesWithSlottedAnchor = joinArrayElementsToString([
  'p-accordion',
  'p-banner',
  'p-carousel',
  'p-checkbox-wrapper',
  'p-display',
  'p-flyout',
  'p-heading',
  'p-headline',
  'p-inline-notification',
  'p-modal',
  'p-multi-select',
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
] as TagName[]);
const tagNamesWithSlottedInputIndicator = joinArrayElementsToString(['p-text-field-wrapper'] as TagName[]);
const tagNamesWithSlottedImage = joinArrayElementsToString(['p-table'] as TagName[]);
const tagNamesWithSlottedPictureImage = joinArrayElementsToString([
  'p-button-tile',
  'p-link-tile',
  'p-link-tile-model-signature',
] as TagName[]);
const tagNamesWithSiblingTabindex = joinArrayElementsToString(['p-tabs-bar'] as TagName[]);

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
  },
};

const slottedStyles: Styles = {
  '@global': {
    '%%tagNamesWithSlottedAnchor%%': {
      // it's important to reset following styles again for components supporting ::slotted(a) like Link, Link-Pure, Tag and Tabs-Bar,…
      '& a': addImportantToEachRule({
        textDecoration: 'underline',
        color: 'currentcolor',
        ...getHoverStyle(),
        ...getFocusStyle({ offset: 'none' }),
      }),
    },

    '%%tagNamesWithSlottedInputIndicator%%': {
      '& input': {
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button, &::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-calendar-picker-indicator':
          addImportantToEachRule({
            display: 'none',
          }),
      },
    },

    '%%tagNamesWithSlottedImage%%': {
      '& img': addImportantToEachRule({
        verticalAlign: 'middle',
      }),
    },

    '%%tagNamesWithSlottedPictureImage%%': {
      '& picture img': addImportantToEachRule({
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      }),
    },
  },
};

const siblingStyles: Styles = {
  '@global': {
    '%%tagNamesWithSiblingTabindex%%': {
      '& ~ [tabindex="0"][role="tabpanel"]': addImportantToEachRule({
        ...getFocusStyle({ offset: 'small' }),
        borderRadius: '1px', // needs to be overwritten due to scaled border-radius if offset is set
      }),
    },
  },
};

export const generateInitialStylesPartial = (): string => {
  const types = `type GetInitialStylesOptions = {
  prefix?: string | string[];
  format?: Format;
};`;

  const initialStylesFunction = `export function getInitialStyles(opts: GetInitialStylesOptions & { format: 'jsx' }): JSX.Element;
export function getInitialStyles(opts?: GetInitialStylesOptions): string;
export function getInitialStyles(opts?: GetInitialStylesOptions): string | JSX.Element {
  const { prefix, format }: GetInitialStylesOptions = {
    prefix: '',
    format: 'html',
    ...opts,
  };

  const tagNames = [${tagNames}];
  const tagNamesWithSlottedAnchor = [${tagNamesWithSlottedAnchor}];
  const tagNamesWithSlottedInputIndicator = [${tagNamesWithSlottedInputIndicator}];
  const tagNamesWithSlottedImage = [${tagNamesWithSlottedImage}];
  const tagNamesWithSlottedPictureImage = [${tagNamesWithSlottedPictureImage}];
  const tagNamesWithSiblingTabindex = [${tagNamesWithSiblingTabindex}];

  const prefixedTagNames = getPrefixedTagNames(tagNames, prefix);
  const prefixedTagNamesWithSlottedAnchor = getPrefixedTagNames(tagNamesWithSlottedAnchor, prefix);
  const prefixedTagNamesWithSlottedInputIndicator = getPrefixedTagNames(tagNamesWithSlottedInputIndicator, prefix);
  const prefixedTagNamesWithSlottedImage = getPrefixedTagNames(tagNamesWithSlottedImage, prefix);
  const prefixedTagNamesWithSlottedPictureImage = getPrefixedTagNames(tagNamesWithSlottedPictureImage, prefix);
  const prefixedTagNamesWithSiblingTabindex = getPrefixedTagNames(tagNamesWithSiblingTabindex, prefix);

  throwIfRunInBrowser('getInitialStyles');

  const styleProps = { ['data-pds-initial-styles']: '' };
  const styleAttributes = convertPropsToAttributeString(styleProps);

  const normalizeStyles = \`${getMinifiedCss(normalizeStyles)}\`;
  const hydrationStyles = prefixedTagNames.join() + '{visibility:hidden}.hydrated,.ssr{visibility:inherit}';
  const slottedStyles = \`${getMinifiedCss(slottedStyles)}\`
    .replace(/%%tagNamesWithSlottedAnchor%%\\s*([\\S\\s]*?)\\s*(,|\\{)/g, prefixedTagNamesWithSlottedAnchor.map(tagName => tagName +' $1').join() +'$2')
    .replace(/%%tagNamesWithSlottedInputIndicator%%\\s*([\\S\\s]*?)\\s*(,|\\{)/g, prefixedTagNamesWithSlottedInputIndicator.map(tagName => tagName +' $1').join() +'$2')
    .replace(/%%tagNamesWithSlottedImage%%\\s*([\\S\\s]*?)\\s*(,|\\{)/g, prefixedTagNamesWithSlottedImage.map(tagName => tagName +' $1').join() +'$2')
    .replace(/%%tagNamesWithSlottedPictureImage%%\\s*([\\S\\s]*?)\\s*(,|\\{)/g, prefixedTagNamesWithSlottedPictureImage.map(tagName => tagName +' $1').join() +'$2');
  const siblingStyles = \`${getMinifiedCss(siblingStyles)}\`
    .replace(/%%tagNamesWithSiblingTabindex%%\\s*([\\S\\s]*?)\\s*(,|\\{)/g, prefixedTagNamesWithSiblingTabindex.map(tagName => tagName +' $1').join() +'$2');


  const styles = normalizeStyles.concat(hydrationStyles, slottedStyles, siblingStyles);

  return format === 'html'
    ? \`<style \$\{styleAttributes\}>\${styles}</style>\`
    : <style {...styleProps} dangerouslySetInnerHTML={{ __html: styles }} />;
}`;

  const helperFunction = `const getPrefixedTagNames = (tagNames: string[], prefix?: string | string[]): string[] => {
    if (prefix && typeof prefix === 'string') {
      return tagNames.map((tagName) => \`\${prefix}-\${tagName}\`);
    } else if (Array.isArray(prefix) && prefix.length) {
      return prefix.map((_prefix) => tagNames.map((tagName) => \`\${_prefix ? _prefix + '-' : ''}\${tagName}\`)).flat();
    } else {
      return tagNames;
    }
  };`;

  return [types, initialStylesFunction, helperFunction].join('\n\n');
};
