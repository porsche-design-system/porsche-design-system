import { getMinifiedPorscheNextFontFaceCss } from '@porsche-design-system/assets/projects/font-face/scripts/fontFaceStyles';

export const generateFontFaceStylesPartial = (): string => {
  const stylesCom = getMinifiedPorscheNextFontFaceCss( './assets/porsche-design-system' );
  const stylesCn = getMinifiedPorscheNextFontFaceCss( './assets/porsche-design-system' );

  const types = `type GetFontFaceStylesOptions = {
  cdn?: Cdn;
  format?: FormatWithCSP;
};`;

  const func = `export function getFontFaceStyles(opts: GetFontFaceStylesOptions & { format: 'jsx' }): JSX.Element;
export function getFontFaceStyles(opts?: GetFontFaceStylesOptions): string;
export function getFontFaceStyles(opts?: GetFontFaceStylesOptions): string | JSX.Element {
  const { cdn, format }: GetFontFaceStylesOptions = {
    cdn: 'auto',
    format: 'html',
    ...opts,
  };

  const styleProps = { ['data-pds-font-face-styles']: '' };
  const styleAttributes = convertPropsToAttributeString(styleProps);

  const styles = cdn === 'auto' ? \`${stylesCom}\` : \`${stylesCn}\`;

  throwIfRunInBrowser('getFontFaceStyles');

    return format === 'sha256'
    ? getSha256Hash(styles)
    : format === 'html'
      ? \`<style \$\{styleAttributes\}>\${styles}</style>\`
      : <style {...styleProps} dangerouslySetInnerHTML={{ __html: styles }} />;
}`;

  return [types, func].join('\n\n');
};
