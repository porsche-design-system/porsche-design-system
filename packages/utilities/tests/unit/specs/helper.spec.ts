import {
  convertLineHeight,
  pxToRem,
  remToPx,
  calculateTypeScale,
  getHexColor
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

  it('should return correct lineHeight for 12px', () => {
    const lineHeight = convertLineHeight('12px');
    expect(lineHeight).toBe(1.66667);
  });

  it('should return correct lineHeight for 16px', () => {
    const lineHeight = convertLineHeight('16px');
    expect(lineHeight).toBe(1.5);
  });

  it('should return correct lineHeight for 18px', () => {
    const lineHeight = convertLineHeight('18px');
    expect(lineHeight).toBe(1.55556);
  });

  it('should return correct lineHeight for 20px', () => {
    const lineHeight = convertLineHeight('20px');
    expect(lineHeight).toBe(1.4);
  });

  it('should return correct lineHeight for 22px', () => {
    const lineHeight = convertLineHeight('22px');
    expect(lineHeight).toBe(1.45455);
  });

  it('should return correct lineHeight for 24px', () => {
    const lineHeight = convertLineHeight('24px');
    expect(lineHeight).toBe(1.5);
  });

  it('should return correct lineHeight for 28px', () => {
    const lineHeight = convertLineHeight('28px');
    expect(lineHeight).toBe(1.42857);
  });

  it('should return correct lineHeight for 30px', () => {
    const lineHeight = convertLineHeight('30px');
    expect(lineHeight).toBe(1.33333);
  });

  it('should return correct lineHeight for 32px', () => {
    const lineHeight = convertLineHeight('32px');
    expect(lineHeight).toBe(1.375);
  });

  it('should return correct lineHeight for 36px', () => {
    const lineHeight = convertLineHeight('36px');
    expect(lineHeight).toBe(1.33333);
  });

  it('should return correct lineHeight for 42px', () => {
    const lineHeight = convertLineHeight('42px');
    expect(lineHeight).toBe(1.2381);
  });

  it('should return correct lineHeight for 44px', () => {
    const lineHeight = convertLineHeight('44px');
    expect(lineHeight).toBe(1.18182);
  });

  it('should return correct lineHeight for 48px', () => {
    const lineHeight = convertLineHeight('48px');
    expect(lineHeight).toBe(1.25);
  });

  it('should return correct lineHeight for 52px', () => {
    const lineHeight = convertLineHeight('52px');
    expect(lineHeight).toBe(1.23077);
  });

  it('should return correct lineHeight for 60px', () => {
    const lineHeight = convertLineHeight('60px');
    expect(lineHeight).toBe(1.2);
  });

  it('should return correct lineHeight for 62px', () => {
    const lineHeight = convertLineHeight('62px');
    expect(lineHeight).toBe(1.22581);
  });

  it('should return correct lineHeight for 72px', () => {
    const lineHeight = convertLineHeight('72px');
    expect(lineHeight).toBe(1.22222);
  });

  it('should return correct lineHeight for 84px', () => {
    const lineHeight = convertLineHeight('84px');
    expect(lineHeight).toBe(1.19048);
  });
});

describe('typeScale()', () => {
  it('should throw error if called with undefined', () => {
    try {
      calculateTypeScale(undefined!);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should throw error if called with wrong unit', () => {
    try {
      calculateTypeScale('32fx');
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should return fontSize and lineHeight', () => {
    const foo = calculateTypeScale('32px');
    expect(foo.lineHeight).toBe(1.375);
    expect(foo.fontSize).toBe('2rem');
    const test = calculateTypeScale('1rem');
    expect(test.fontSize).toBe('1rem');
    expect(test.lineHeight).toBe(1.375);
  });
});

describe('getColorHexCode()', () => {
  it('should show correct hexcode for brand color', () => {
    expect(getHexColor('brand')).toBe('#d5001c');
    expect(getHexColor('brand', 'light')).toBe('#d5001c');
    expect(getHexColor('brand', 'dark')).toBe('#d5001c');
  });

  it('should show correct hexcode for neutralContrast high color', () => {
    expect(getHexColor('neutralContrast', 'high', 'light')).toBe('#323639');
    expect(getHexColor('neutralContrast', 'high')).toBe('#323639');
    expect(getHexColor('neutralContrast', 'high', 'dark')).toBe('#e3e4e5');
  });

  it('should show correct hexcode for external color', () => {
    expect(getHexColor('external', 'facebook')).toBe('#1877f2');
  });
});
