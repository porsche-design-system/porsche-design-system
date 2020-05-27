import { convertLineHeight, getFontSizeLength, getFontSizeRem, rem } from '../../src/js/helper';

describe('test pixel to rem()', () => {
  it('should return correct rem value', () => {
    const testValue = rem(16);
    expect(testValue).toEqual('1rem');

    const testValue2 = rem(32);
    expect(testValue2).toEqual('2rem');
  });

  it('should return correct fontSize from getFontSizeRem', () => {
    const testValue = rem(16);
    expect(testValue).toEqual('1rem');

    const testValue2 = rem(32);
    expect(testValue2).toEqual('2rem');
  })

});

describe('test getFontSizeLength()', () => {
  it('should return fontSize without rem', () => {
    const fontSizeLength = getFontSizeLength('2rem');
    expect(fontSizeLength).toEqual(2);
  });

  it('should return fontSize without px', () => {
    const fontSizeLength = getFontSizeLength('16px');
    expect(fontSizeLength).toEqual(16);
  });

  it('should fail with invalid fontSize', () => {
    const fontSizeLength = getFontSizeLength('16pz');
    expect(fontSizeLength).toEqual(-1);
  });

  it('should fail with no number in fontSize', () => {
    const fontSizeLength = getFontSizeLength('failrem');
    expect(fontSizeLength).toEqual(-1);
  });
});


describe('test getFontSizeRem()', () => {
  it('should return correct fontSize from rem', () => {
    const fontSizeRem = getFontSizeRem('2rem');
    expect(fontSizeRem).toEqual('2rem');
  });

  it('should return correct fontSize from px', () => {
    const fontSizeRem = getFontSizeRem('16px');
    expect(fontSizeRem).toEqual('1rem');
  });

  it('should return error message on false fontSize rem', () => {
    const falseFontSize = getFontSizeRem('Frem');
    expect(falseFontSize).toContain('e.g. 12px');
  });

  it('should return error message on false fontSize px', () => {
    const falseFontSize = getFontSizeRem('Fpx');
    expect(falseFontSize).toContain('e.g. 12px');
  });

  it('should return error message on wrong unit', () => {
    const falseFontSize = getFontSizeRem('16bg');
    expect(falseFontSize).toContain('fontSize() only accepts rem or px as parameter');
  });
});
