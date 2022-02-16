import * as lineHeightUtil from './line-height';
import { calcLineHeightForElement, calculateLineHeight, generateTypeScale, lineHeightMap } from './line-height';

describe('calculateLineHeight()', () => {
  it('should not extend lineHeightMap if fontSize already exists', () => {
    const spy = jest.spyOn(lineHeightMap, 'set');
    calculateLineHeight(12);

    expect(spy).not.toBeCalled();
    expect(lineHeightMap).toMatchSnapshot();
  });

  it('should extend lineHeightMap', () => {
    calculateLineHeight(48);
    expect(lineHeightMap).toMatchSnapshot();
  });

  it.each<[number, number]>([
    [12, 1.6666666667],
    [16, 1.5],
    [18, 1.5555555556],
    [20, 1.4],
    [22, 1.4545454545],
    [24, 1.5],
    [36, 1.3333333333],
    [52, 1.2307692308],
  ])('should be called with fontsize: "%s" and return lineHeight: "%s"', (fontSize, lineHeight) => {
    expect(calculateLineHeight(fontSize)).toBe(lineHeight);
  });
});

describe('calcLineHeightForElement()', () => {
  it('should call calculateLineHeight', () => {
    const spy = jest.spyOn(lineHeightUtil, 'calculateLineHeight');

    const element = document.createElement('div');
    element.style.fontSize = '12px';
    calcLineHeightForElement(element);

    expect(spy).toBeCalledWith(12);
  });
  it('should not call calculateLineHeight when font size is ""', () => {
    const spy = jest.spyOn(lineHeightUtil, 'calculateLineHeight');

    const element = document.createElement('div');
    calcLineHeightForElement(element);

    expect(spy).not.toBeCalled();
  });
});

describe('generateTypeScale()', () => {
  it.each([
    ['0.75rem', { fontSize: '0.75rem', lineHeight: 1.6666666667 }],
    ['1rem', { fontSize: '1rem', lineHeight: 1.5 }],
  ])('should be called with fontsize: "%s" and return %o', (fontSize, expected) => {
    expect(generateTypeScale(fontSize)).toEqual(expected);
  });

  it('should call calculateLineHeight', () => {
    const spy = jest.spyOn(lineHeightUtil, 'calculateLineHeight');
    generateTypeScale('0.75rem');

    expect(spy).toBeCalledWith(parseFloat('0.75rem') * 16);
  });
});
