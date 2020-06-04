import { convertLineHeight, convertToRem, pxToRem, remToPx } from '../../../src/js/helper';

describe('pxToRem()', () => {
  it('should return correct rem value absolute px', () => {
    const testValue = pxToRem('16px');
    expect(testValue).toEqual('1rem');
  });

  it('should return correct rem value decimal px', () => {
    const testValue2 = pxToRem('32.5px');
    expect(testValue2).toEqual('2.03125rem');
  });

  it('should return correct rem value decimal rem return', () => {
    const testValue3 = pxToRem('20px');
    expect(testValue3).toEqual('1.25rem');
  });
});

describe('remToPx()', () => {
  it('should throw error if called with wrong unit', () => {
    try {
      remToPx('2px');
    } catch (e) {
      expect((e as Error).message).toBeDefined();
    }
  });

  it('should throw error if called with 0 value', () => {
    try {
      remToPx('0rem');
    } catch (e) {
      expect((e as Error).message).toBeDefined();
    }
  });

  it('should convert rem to px', () => {
    const pxValue = remToPx('1rem');
    expect(pxValue).toBe('16px');
  });
});

describe('convertToRem()', () => {
  it('should return correct fontSize from rem', () => {
    const fontSizeRem = convertToRem('2rem');
    expect(fontSizeRem).toEqual('2rem');
  });

  it('should return correct fontSize from px', () => {
    const fontSizeRem = convertToRem('16px');
    expect(fontSizeRem).toEqual('1rem');
  });

  it('should throw error on false fontSize unit rem', () => {
    try {
      convertToRem('2rem');
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should throw error on false fontSize unit px', () => {
    try {
      convertToRem('Fpx');
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should throw error on wrong unit', () => {
    try {
      convertToRem('12bs');
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should throw error on 0 as size value', () => {
    try {
      convertToRem('0px');
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});

describe('convertLineHeight()', () => {
  it('should throw error if called with wrong unit', () => {
    try {
      convertLineHeight('2bs');
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should throw error if called with wrong 0 as value', () => {
    try {
      convertLineHeight('0rem');
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should return correct lineHeight absolute 14', () => {
    const lineHeight = convertLineHeight('14px');
    expect(lineHeight).toBe(1.4285714285714286);
  });

  it('should return correct lineHeight absolute 15', () => {
    const lineHeight = convertLineHeight('15px');
    expect(lineHeight).toBe(1.6);
  });

  it('should return correct lineHeight absolute 16', () => {
    const lineHeight = convertLineHeight('16px');
    expect(lineHeight).toBe(1.5);
  });

  it('should return correct lineHeight absolute 17', () => {
    const lineHeight = convertLineHeight('17px');
    expect(lineHeight).toBe(1.411764705882353);
  });

  it('should return correct lineHeight absolute 18', () => {
    const lineHeight = convertLineHeight('18px');
    expect(lineHeight).toBe(1.5555555555555556);
  });

  it('should return correct lineHeight absolute 90', () => {
    const lineHeight = convertLineHeight('90px');
    expect(lineHeight).toBe(1.2);
  });

  it('should return correct lineHeight absolute 33', () => {
    const lineHeight = convertLineHeight('33px');
    expect(lineHeight).toBe(1.3333333333333333);
  });

  it('should return correct lineHeight decimal', () => {
    const lineHeight = convertLineHeight('32.5px');
    expect(lineHeight).toBe(1.353846153846154);
  });
});
