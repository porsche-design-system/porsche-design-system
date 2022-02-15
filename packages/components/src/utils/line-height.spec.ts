import * as lineHeightUtil from './line-height';
import { calcLineHeightForElement, calculateLineHeight, generateTypeScale, lineHeightMap } from './line-height';

describe('calculateLineHeight()', () => {
  it('should use line-height from map', () => {
    calculateLineHeight(12);
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
  ])('should return correct lineHeight for fontSize %s', (fontSize, lineHeight) => {
    expect(calculateLineHeight(fontSize)).toBe(lineHeight);
  });
});

describe('calcLineHeightForElement()', () => {
  const element = document.createElement('div');
  it('should not call calculateLineHeight when font size is ""', () => {
    const spy = jest.spyOn(lineHeightUtil, 'calculateLineHeight');
    calcLineHeightForElement(element);

    expect(spy).not.toBeCalled();
  });
  it('should call calculateLineHeight', () => {
    const spy = jest.spyOn(lineHeightUtil, 'calculateLineHeight');
    element.style.fontSize = '12px';
    calcLineHeightForElement(element);

    expect(spy).toBeCalledWith(12);
  });
});

describe('generateTypeScale()', () => {
  it.each([
    { fontSize: '0.75rem', expected: { fontSize: '0.75rem', lineHeight: 1.6666666667 } },
    { fontSize: '1rem', expected: { fontSize: '1rem', lineHeight: 1.5 } },
  ])('should return correct fontSize and lineHeight for %o', ({ fontSize, expected }) => {
    expect(generateTypeScale(fontSize)).toEqual(expected);
  });
});
