import * as fs from 'fs';
import * as path from 'path';
import { withoutTagsOption } from './utils';

export const generateNormalizeStylesPartial = (): string => {
  const types = `type GetNormalizeStylesOptions = {
  cdn?: Cdn;
  prefix?: string;
  ${withoutTagsOption}
  format?: Format;
};
type GetNormalizeStylesOptionsFormatHtml = Omit<GetNormalizeStylesOptions, 'withoutTags'> & { format: 'html' };
type GetNormalizeStylesOptionsFormatJsx = Omit<GetNormalizeStylesOptions, 'withoutTags'> & { format: 'jsx' };
type GetNormalizeStylesOptionsWithoutTags = Omit<GetNormalizeStylesOptions, 'format'>;`;

  // TODO: better get normalize.css from cdn?
  // inject --> <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
  const normalizeCssFilePath = path.resolve('../../../../node_modules/normalize.css/normalize.css');
  const normalizeCss = fs
    .readFileSync(normalizeCssFilePath, 'utf8')
    .replace(/\/\*(?:(?!\*\/).|[\n\r])*\*\//g, '') // remove jsdoc
    .replace(/\n|\r/g, '') // remove line breaks
    .replace(/\s/g, ''); // remove whitespaces

  const normalizeStylesFunction = `export function getNormalizeStyles(opts?: GetNormalizeStylesOptionsFormatHtml): string;
export function getNormalizeStyles(opts?: GetNormalizeStylesOptionsFormatJsx): JSX.Element;
export function getNormalizeStyles(opts?: GetNormalizeStylesOptions): string | JSX.Element {
  const { cdn, prefix, format }: GetNormalizeStylesOptions = {
    cdn: 'auto',
    prefix: '',
    format: 'html',
    ...opts,
  };

  throwIfRunInBrowser('getNormalizeStyles');

  const styleProps = { ['data-pds-normalize-styles']: '' };
  const styleAttributes = convertPropsToAttributeString(styleProps);

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const normalizeStyles = \`${normalizeCss}\`;

  return format === 'html' ? \`<style \$\{styleAttributes\}>\${normalizeStyles}</style>\` : <style {...styleProps} dangerouslySetInnerHTML={{ __html: normalizeStyles }}/>;
}`;

  return [types, normalizeStylesFunction].join('\n\n');
};
