import {
  calculateLineHeight,
  pxToRem,
  remToPx,
  generateTypeScale,
  generateFontDefinition
} from '../../../projects/utilities/src/js';

describe('pxToRem()', () => {
  it('should return correct rem value for px', () => {
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

describe('generateFontDefinition()', () => {
  it('should return correct font definition', () => {
    const fontDefinition1 = generateFontDefinition('16px', 'regular');
    const fontDefinition2 = generateFontDefinition('32px', 'bold');
    expect(fontDefinition1).toEqual({
      "fontFamily": "\"Porsche Next\", \"Arial Narrow\", Arial, sans-serif",
      "fontSize": "1rem",
      "fontWeight": 400,
      "lineHeight": 1.5
    });
    expect(fontDefinition2).toEqual({
      "fontFamily": "\"Porsche Next\", \"Arial Narrow\", Arial, sans-serif",
      "fontSize": "2rem",
      "fontWeight": 700,
      "lineHeight": 1.375
    });
  });
});

describe('calculateLineHeight()', () => {
  it('should throw error if called with wrong unit', () => {
    try {
      calculateLineHeight('2bs');
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should throw error if called with wrong 0 as value', () => {
    try {
      calculateLineHeight('0rem');
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should return correct lineHeight for 12px', () => {
    const lineHeight = calculateLineHeight('12px');
    expect(lineHeight).toBe(1.66667);
  });

  it('should return correct lineHeight for 16px', () => {
    const lineHeight = calculateLineHeight('16px');
    expect(lineHeight).toBe(1.5);
  });

  it('should return correct lineHeight for 18px', () => {
    const lineHeight = calculateLineHeight('18px');
    expect(lineHeight).toBe(1.55556);
  });

  it('should return correct lineHeight for 20px', () => {
    const lineHeight = calculateLineHeight('20px');
    expect(lineHeight).toBe(1.4);
  });

  it('should return correct lineHeight for 22px', () => {
    const lineHeight = calculateLineHeight('22px');
    expect(lineHeight).toBe(1.45455);
  });

  it('should return correct lineHeight for 24px', () => {
    const lineHeight = calculateLineHeight('24px');
    expect(lineHeight).toBe(1.5);
  });

  it('should return correct lineHeight for 28px', () => {
    const lineHeight = calculateLineHeight('28px');
    expect(lineHeight).toBe(1.42857);
  });

  it('should return correct lineHeight for 30px', () => {
    const lineHeight = calculateLineHeight('30px');
    expect(lineHeight).toBe(1.33333);
  });

  it('should return correct lineHeight for 32px', () => {
    const lineHeight = calculateLineHeight('32px');
    expect(lineHeight).toBe(1.375);
  });

  it('should return correct lineHeight for 36px', () => {
    const lineHeight = calculateLineHeight('36px');
    expect(lineHeight).toBe(1.33333);
  });

  it('should return correct lineHeight for 42px', () => {
    const lineHeight = calculateLineHeight('42px');
    expect(lineHeight).toBe(1.2381);
  });

  it('should return correct lineHeight for 44px', () => {
    const lineHeight = calculateLineHeight('44px');
    expect(lineHeight).toBe(1.18182);
  });

  it('should return correct lineHeight for 48px', () => {
    const lineHeight = calculateLineHeight('48px');
    expect(lineHeight).toBe(1.25);
  });

  it('should return correct lineHeight for 52px', () => {
    const lineHeight = calculateLineHeight('52px');
    expect(lineHeight).toBe(1.23077);
  });

  it('should return correct lineHeight for 60px', () => {
    const lineHeight = calculateLineHeight('60px');
    expect(lineHeight).toBe(1.2);
  });

  it('should return correct lineHeight for 62px', () => {
    const lineHeight = calculateLineHeight('62px');
    expect(lineHeight).toBe(1.22581);
  });

  it('should return correct lineHeight for 72px', () => {
    const lineHeight = calculateLineHeight('72px');
    expect(lineHeight).toBe(1.22222);
  });

  it('should return correct lineHeight for 84px', () => {
    const lineHeight = calculateLineHeight('84px');
    expect(lineHeight).toBe(1.19048);
  });
});

describe('generateTypeScale()', () => {
  it('should throw error if called with undefined', () => {
    try {
      generateTypeScale(undefined!);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should throw error if called with wrong unit', () => {
    try {
      generateTypeScale('32fx');
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should return fontSize and lineHeight', () => {
    const foo = generateTypeScale('32px');
    expect(foo.lineHeight).toBe(1.375);
    expect(foo.fontSize).toBe('2rem');
  });
});
