import { fontBehavior, fontFamily, fontSize, fontStyle, fontVariant, fontWeight } from '../font/font';

export const headline5 = {
  font: `${fontStyle} ${fontVariant} ${fontWeight.semibold} ${Object.values(fontSize.small).join('/')} ${fontFamily}`,
  ...fontBehavior,
};
