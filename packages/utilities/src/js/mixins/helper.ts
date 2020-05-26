import { font } from '../variables';
import { rem } from '../variables/helper';

export const typeScale = (size: number, value: string) =>({
  fontSize: fontSize(size, value),
  lineHeight: 1.5
});

export const fontSize = (fontSize: number, value: string) => {
  if (value === 'rem') {
    return fontSize
  } else if (value === 'px') {
    return rem(fontSize)
  } else return 'fontSize() only accepts rem or px as parameter'
};

export const lineHeight(fontSize: string){

};

const isRem = (value: string) => {

};

const isPixel = (value: string) => {

};
