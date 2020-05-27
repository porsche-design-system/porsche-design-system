import { rem } from '../variables';


export const typeScale = (size: string) => ({
  fontSize: fontSize(size),
  lineHeight: 1.5
});

export const fontSize = (fontSize: string) => {
  if (fontSize.endsWith('rem')) {
    return fontSize
  } else if (fontSize.endsWith('px')) {
    const fontSizeLength = getFontSizeLength(fontSize);
    if (fontSizeLength != -1) {
      return rem(fontSizeLength)
    }
  } else return 'fontSize() only accepts rem or px as parameter'
};

/*export const lineHeight = (fontSize: string) => {

};*/

const getFontSizeLength = (fontSize: string): number => {
  let fontSizeLengthStr = '';
  if (fontSize.endsWith('rem')){
    fontSizeLengthStr = fontSize.slice(0, -3);
  } else if (fontSize.endsWith('px')) {
    fontSizeLengthStr = fontSize.slice(0, -2);
  }

  const fontSizeLength = parseFloat(fontSizeLengthStr);
  if (isNaN(fontSizeLength)) {
    return fontSizeLength
  } else return -1
};
