import { fontFamilyPorscheNext, fontLineHeightNormal } from '@porsche-design-system/tokens';

// -webkit-text-size-adjust: stop iOS safari from adjusting font size when screen rotation is changing
// language=CSS
export const normalizeStyles = `html, body {
  margin: 0;
  padding: 0;
  font-family: ${fontFamilyPorscheNext};
  line-height: ${fontLineHeightNormal};
  letter-spacing: normal;
  text-size-adjust: none;
  -webkit-text-size-adjust: none;
}`;
