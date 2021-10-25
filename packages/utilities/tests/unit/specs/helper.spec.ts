import {
  calculateLineHeight,
  pxToRem,
  remToPx,
  generateTypeScale,
  generateFontDefinition,
} from '../../../projects/utilities/src/js';

describe('pxToRem()', () => {
  it('should return correct rem value for px', () => {
    expect(pxToRem('16px')).toEqual('1rem');
    expect(pxToRem('32.5px')).toEqual('2.03125rem');
    expect(pxToRem('20px')).toEqual('1.25rem');
  });

  it('should throw error if called with wrong unit', (done) => {
    try {
      pxToRem('2rem');
    } catch (e) {
      expect((e as Error).message).toBeDefined();
      done();
    }
  });

  it('should throw error if called with 0 value', (done) => {
    try {
      pxToRem('0rem');
    } catch (e) {
      expect((e as Error).message).toBeDefined();
      done();
    }
  });
});

describe('remToPx()', () => {
  it('should convert rem to px', () => {
    expect(remToPx('1rem')).toBe('16px');
    expect(remToPx('1.5rem')).toBe('24px');
    expect(remToPx('1.6rem')).toBe('25.6px');
  });

  it('should throw error if called with wrong unit', (done) => {
    try {
      remToPx('2px');
    } catch (e) {
      expect((e as Error).message).toBeDefined();
      done();
    }
  });

  it('should throw error if called with 0 value', (done) => {
    try {
      remToPx('0rem');
    } catch (e) {
      expect((e as Error).message).toBeDefined();
      done();
    }
  });
});

describe('generateFontDefinition()', () => {
  it('should return correct font definition', () => {
    const fontDefinition1 = generateFontDefinition('16px', 'regular');
    const fontDefinition2 = generateFontDefinition('32px', 'bold');
    expect(fontDefinition1).toEqual({
      fontFamily: "'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif",
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    });
    expect(fontDefinition2).toEqual({
      fontFamily: "'Porsche Next','Arial Narrow',Arial,'Heiti SC',SimHei,sans-serif",
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.375,
    });
  });
});

describe('calculateLineHeight()', () => {
  it('should throw error if called with wrong unit', (done) => {
    try {
      calculateLineHeight('2bs');
    } catch (e) {
      expect(e).toBeDefined();
      done();
    }
  });

  it('should throw error if called with wrong 0 as value', (done) => {
    try {
      calculateLineHeight('0rem');
    } catch (e) {
      expect(e).toBeDefined();
      done();
    }
  });

  // TODO: write with it.each
  it('should return correct lineHeight for 12px', () => {
    const lineHeight = calculateLineHeight('12px');
    expect(lineHeight).toBe(1.6666666667);
  });

  it('should return correct lineHeight for 16px', () => {
    const lineHeight = calculateLineHeight('16px');
    expect(lineHeight).toBe(1.5);
  });

  it('should return correct lineHeight for 18px', () => {
    const lineHeight = calculateLineHeight('18px');
    expect(lineHeight).toBe(1.5555555556);
  });

  it('should return correct lineHeight for 20px', () => {
    const lineHeight = calculateLineHeight('20px');
    expect(lineHeight).toBe(1.4);
  });

  it('should return correct lineHeight for 22px', () => {
    const lineHeight = calculateLineHeight('22px');
    expect(lineHeight).toBe(1.4545454545);
  });

  it('should return correct lineHeight for 24px', () => {
    const lineHeight = calculateLineHeight('24px');
    expect(lineHeight).toBe(1.5);
  });

  it('should return correct lineHeight for 28px', () => {
    const lineHeight = calculateLineHeight('28px');
    expect(lineHeight).toBe(1.4285714286);
  });

  it('should return correct lineHeight for 30px', () => {
    const lineHeight = calculateLineHeight('30px');
    expect(lineHeight).toBe(1.3333333333);
  });

  it('should return correct lineHeight for 32px', () => {
    const lineHeight = calculateLineHeight('32px');
    expect(lineHeight).toBe(1.375);
  });

  it('should return correct lineHeight for 36px', () => {
    const lineHeight = calculateLineHeight('36px');
    expect(lineHeight).toBe(1.3333333333);
  });

  it('should return correct lineHeight for 42px', () => {
    const lineHeight = calculateLineHeight('42px');
    expect(lineHeight).toBe(1.2380952381);
  });

  it('should return correct lineHeight for 44px', () => {
    const lineHeight = calculateLineHeight('44px');
    expect(lineHeight).toBe(1.1818181818);
  });

  it('should return correct lineHeight for 48px', () => {
    const lineHeight = calculateLineHeight('48px');
    expect(lineHeight).toBe(1.25);
  });

  it('should return correct lineHeight for 52px', () => {
    const lineHeight = calculateLineHeight('52px');
    expect(lineHeight).toBe(1.2307692308);
  });

  it('should return correct lineHeight for 60px', () => {
    const lineHeight = calculateLineHeight('60px');
    expect(lineHeight).toBe(1.2);
  });

  it('should return correct lineHeight for 62px', () => {
    const lineHeight = calculateLineHeight('62px');
    expect(lineHeight).toBe(1.2258064516);
  });

  it('should return correct lineHeight for 72px', () => {
    const lineHeight = calculateLineHeight('72px');
    expect(lineHeight).toBe(1.2222222222);
  });

  it('should return correct lineHeight for 84px', () => {
    const lineHeight = calculateLineHeight('84px');
    expect(lineHeight).toBe(1.1904761905);
  });
});

describe('generateTypeScale()', () => {
  it('should throw error if called with undefined', (done) => {
    try {
      generateTypeScale(undefined!);
    } catch (e) {
      expect(e).toBeDefined();
      done();
    }
  });

  it('should throw error if called with wrong unit', (done) => {
    try {
      generateTypeScale('32fx');
    } catch (e) {
      expect(e).toBeDefined();
      done();
    }
  });

  it('should return fontSize and lineHeight', () => {
    const typeScale = generateTypeScale('32px');
    expect(typeScale.lineHeight).toBe(1.375);
    expect(typeScale.fontSize).toBe('2rem');
  });
});
