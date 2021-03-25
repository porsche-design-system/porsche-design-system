import {
  attachCss,
  buildHostStyles,
  buildResponsiveJss,
  getCss,
  isObject,
  mergeDeep,
  supportsConstructableStylesheets,
} from '../../../src/utils';
import * as jssUtils from '../../../src/utils/jss';
import type { JssStyle, Styles } from 'jss';

describe('getCss()', () => {
  const data: { input: Styles; result: string }[] = [
    { input: { ':host': { display: 'block', marginLeft: 5 } }, result: ':host{display:block;margin-left:5px}' },
    {
      input: { ':host': { display: 'block', marginLeft: '5px !important' } },
      result: ':host{display:block;margin-left:5px !important}',
    },
    {
      input: { ':host': { display: 'block', width: 500, transition: 'width .25s ease' } },
      result: ':host{display:block;width:500px;transition:width .25s ease}',
    },
    {
      input: {
        ':host': { display: 'block', marginLeft: '5px !important' },
        '@media (min-width: 760px)': { ':host': { marginRight: '5px !important' } },
      },
      result:
        ':host{display:block;margin-left:5px !important}@media(min-width:760px){:host{margin-right:5px !important}}',
    },
  ];
  it.each(
    data.map(({ input, result }) => [
      JSON.stringify(input), // for test description
      JSON.stringify(result), // for test description
      input,
      result,
    ])
  )(`should transform '%s' to %s`, (_, __, input: Styles, result: string) => {
    expect(getCss(input)).toBe(result);
  });
});

describe('supportsConstructableStylesheets()', () => {
  it('should return true if CSSStyleSheet constructor exists', () => {
    // due to polyfill
    expect(supportsConstructableStylesheets()).toBe(true);
  });

  it('should return false if CSSStyleSheet constructor does not exist', () => {
    const globalCSSStyleSheet = global.CSSStyleSheet;
    delete global.CSSStyleSheet;
    expect(supportsConstructableStylesheets()).toBe(false);
    global.CSSStyleSheet = globalCSSStyleSheet;
  });
});

describe('attachCss()', () => {
  describe('with CSSStyleSheet support', () => {
    it('should create CSSStyleSheet and apply it to shadowRoot', () => {
      const div = document.createElement('div');
      div.attachShadow({ mode: 'open' });

      expect(div.shadowRoot.adoptedStyleSheets.length).toBe(0);

      attachCss(div, ':host { display: "block" }');
      expect(div.shadowRoot.adoptedStyleSheets.length).toBe(1);
    });
  });

  describe('without CSSStyleSheet support', () => {
    it('should create style node and prepend it in shadowRoot', () => {
      const spy = jest.spyOn(jssUtils, 'supportsConstructableStylesheets').mockImplementation(() => false);

      const div = document.createElement('div');
      div.attachShadow({ mode: 'open' });
      expect(div.shadowRoot.querySelector('style')).toBeNull();

      const css = ':host { display: "block" }';
      attachCss(div, css);
      expect(div.shadowRoot.querySelector('style').innerHTML).toBe(css);

      spy.mockRestore();
    });
  });
});

describe('buildHostStyles()', () => {
  it('should return :host styles object', () => {
    expect(buildHostStyles({ marginLeft: 5 })).toStrictEqual({ ':host': { marginLeft: 5 } });
  });
});

describe('buildResponsiveJss()', () => {
  const getStyles = (val: number): JssStyle => ({ width: 100 * val });

  it('should return flat jss for simple type', () => {
    expect(buildResponsiveJss(6, getStyles)).toStrictEqual({ ':host': { width: 600 } });
  });

  it('should return nested jss for responsive type', () => {
    expect(buildResponsiveJss({ base: 6, xs: 3, s: 4, m: 5, l: 6, xl: 7 }, getStyles)).toStrictEqual({
      ':host': { width: 600 },
      '@media (min-width: 480px)': { ':host': { width: 300 } },
      '@media (min-width: 760px)': { ':host': { width: 400 } },
      '@media (min-width: 1000px)': { ':host': { width: 500 } },
      '@media (min-width: 1300px)': { ':host': { width: 600 } },
      '@media (min-width: 1760px)': { ':host': { width: 700 } },
    });
  });
});

describe('isObject()', () => {
  it('should return true for object', () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ foo: 'bar' })).toBe(true);
  });

  it('should return false for other values', () => {
    expect(isObject('someString' as any)).toBe(false);
    expect(isObject(true as any)).toBe(false);
    expect(isObject([] as any)).toBe(false);
    expect(isObject(5 as any)).toBe(false);
  });
});

describe('mergeDeep()', () => {
  const data: { input: object[]; result: object }[] = [
    {
      input: [{}, { foo: 'bar' }],
      result: { foo: 'bar' },
    },
    {
      input: [{ foo: 'bar' }, {}, {}],
      result: { foo: 'bar' },
    },
    {
      input: [{ foo: 'bar' }, { xy: 1 }, { someVal: true }],
      result: { foo: 'bar', xy: 1, someVal: true },
    },
    {
      input: [{ foo: { key1: 'bar' } }, { foo: { key2: 'ok', key3: 'yea' }, some: 'thing' }],
      result: { foo: { key1: 'bar', key2: 'ok', key3: 'yea' }, some: 'thing' },
    },
    {
      input: [{ foo: { key1: 'bar' } }, { foo: { key1: 'ok' } }],
      result: { foo: { key1: 'ok' } },
    },
  ];
  it.each(
    data.map(({ input, result }) => [
      input.map((x) => JSON.stringify(x)).join(', '), // for test description
      JSON.stringify(result), // for test description
      input,
      result,
    ])
  )(`should be called with '%s' and return '%s'`, (_, __, input: object[], result: object) => {
    expect(mergeDeep(...input)).toStrictEqual(result);
  });
});
