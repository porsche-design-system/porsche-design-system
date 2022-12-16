import * as fs from 'fs';
import * as path from 'path';

export const generateNormalizeStylesPartial = (): string => {
  const types = `type GetNormalizeStylesOptions = {
  cdn?: Cdn;
  format?: Format;
};
type GetNormalizeStylesOptionsFormatHtml = GetCookiesFallbackScriptOptions & { format: 'html' };
type GetNormalizeStylesOptionsFormatJsx = GetCookiesFallbackScriptOptions & { format: 'jsx' };`;

  const normalizeCssFilePath = path.resolve('src/css/normalize.css');
  const normalizeCss = fs
    .readFileSync(normalizeCssFilePath, 'utf8')
    .replace(/\/\*(?:(?!\*\/).|[\n\r])*\*\//g, '') // remove jsdoc
    .replace(/\n|\r/g, '') // remove line breaks
    .replace(/\s/g, ''); // remove whitespaces

  const normalizeStylesFunction = `export function getNormalizeStyles(opts?: GetNormalizeStylesOptionsFormatHtml): string;
export function getNormalizeStyles(opts?: GetNormalizeStylesOptionsFormatJsx): JSX.Element;
export function getNormalizeStyles(opts?: GetNormalizeStylesOptions): string | JSX.Element {
  const { cdn, format }: GetNormalizeStylesOptions = {
    cdn: 'auto',
    format: 'html',
    ...opts,
  };

  throwIfRunInBrowser('getNormalizeStyles');

  const styleProps = { ['data-pds-normalize-styles']: '' };
  const styleAttributes = convertPropsToAttributeString(styleProps);

  const cdnBaseUrl = getCdnBaseUrl(cdn);
  const normalizeStyles = \`${normalizeCss}\`;

  return format === 'html' ? \`<style \$\{styleAttributes\}>\${normalizeStyles}</style>\` : <style dangerouslySetInnerHTML={{ __html: normalizeStyles }}/>;
}`;

  return [types, normalizeStylesFunction].join('\n\n');
};
