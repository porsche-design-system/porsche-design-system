import {
  attachComponentCss,
  buildResponsiveHostStyles,
  buildResponsiveStyles,
  buildSlottedStyles,
  getCachedComponentCss,
  getCss,
  isObject,
  mergeDeep,
  supportsConstructableStylesheets,
  componentCssMap,
} from './jss';
import * as jssUtils from './jss';
import type { JssStyle, Styles } from 'jss';

describe('getCss()', () => {
  const data: { input: Styles; result: string }[] = [
    {
      input: { ':host': { display: 'block', marginLeft: '5px' } },
      result: ':host {\n  display: block;\n  margin-left: 5px;\n}',
    },
    {
      input: { ':host': { display: 'block', marginLeft: '5px !important' } },
      result: ':host {\n  display: block;\n  margin-left: 5px !important;\n}',
    },
    {
      input: { ':host': { display: 'block', width: '500px', transition: 'width .25s ease' } },
      result: ':host {\n  display: block;\n  width: 500px;\n  transition: width .25s ease;\n}',
    },
    {
      input: {
        ':host': { display: 'block', marginLeft: '5px !important' },
        '@media (min-width: 760px)': { ':host': { marginRight: '5px !important' } },
      },
      result:
        ':host {\n  display: block;\n  margin-left: 5px !important;\n}\n@media (min-width: 760px) {\n  :host {\n    margin-right: 5px !important;\n  }\n}\n',
    },
    {
      input: {
        ':host': { display: 'block', marginLeft: '5px !important' },
        '@media (min-width: 760px)': { ':host': { marginRight: '5px !important' } },
        '@media (min-width: 1000px)': { ':host': { marginRight: '10px !important' } },
      },
      result:
        ':host {\n  display: block;\n  margin-left: 5px !important;\n}\n@media (min-width: 760px) {\n  :host {\n    margin-right: 5px !important;\n  }\n}\n\n@media (min-width: 1000px) {\n  :host {\n    margin-right: 10px !important;\n  }\n}\n',
    },
    {
      input: {
        ':host': { display: 'block', marginLeft: '5px !important' },
        '@media (min-width: 1000px)': { ':host': { marginRight: '10px !important' } },
        '@media (min-width: 760px)': { ':host': { marginRight: '5px !important' } },
      },
      result:
        ':host {\n  display: block;\n  margin-left: 5px !important;\n}\n@media (min-width: 760px) {\n  :host {\n    margin-right: 5px !important;\n  }\n}\n\n@media (min-width: 1000px) {\n  :host {\n    margin-right: 10px !important;\n  }\n}\n',
    },
    {
      input: { '@global': { div: { display: 'block' } } },
      result: 'div {\n  display: block;\n}',
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

describe('buildSlottedStyles()', () => {
  it('should return @global styles object with node selector and important styles', () => {
    const el = document.createElement('p-button');
    expect(buildSlottedStyles(el, { div: { marginLeft: 5 } })).toStrictEqual({
      '@global': { 'p-button': { div: { marginLeft: '5 !important' } } },
    });
  });
});

describe('buildResponsiveHostStyles()', () => {
  describe('for simple getStyles', () => {
    const getStyles = (val: number): JssStyle => ({ width: 100 * val });

    it('should return flat jss for simple type', () => {
      expect(buildResponsiveHostStyles(6, getStyles)).toStrictEqual({ ':host': { width: 600 } });
    });

    it('should return nested jss for responsive type', () => {
      expect(buildResponsiveHostStyles({ base: 6, xs: 3, s: 4, m: 5, l: 6, xl: 7 }, getStyles)).toStrictEqual({
        ':host': {
          width: 600,
          '@media (min-width: 480px)': { width: 300 },
          '@media (min-width: 760px)': { width: 400 },
          '@media (min-width: 1000px)': { width: 500 },
          '@media (min-width: 1300px)': { width: 600 },
          '@media (min-width: 1760px)': { width: 700 },
        },
      });
    });
  });

  describe('for complex getStyles', () => {
    const getStyles = (val: number): JssStyle => ({ width: 100 * val, display: 'block' });

    it('should return flat jss for simple type', () => {
      expect(buildResponsiveHostStyles(6, getStyles)).toStrictEqual({ ':host': { width: 600, display: 'block' } });
    });

    it('should return nested jss for responsive type', () => {
      expect(buildResponsiveHostStyles({ base: 6, xs: 3, s: 4, m: 5, l: 6, xl: 7 }, getStyles)).toStrictEqual({
        ':host': {
          width: 600,
          display: 'block',
          '@media (min-width: 480px)': { width: 300, display: 'block' },
          '@media (min-width: 760px)': { width: 400, display: 'block' },
          '@media (min-width: 1000px)': { width: 500, display: 'block' },
          '@media (min-width: 1300px)': { width: 600, display: 'block' },
          '@media (min-width: 1760px)': { width: 700, display: 'block' },
        },
      });
    });
  });
});

describe('buildResponsiveStyles()', () => {
  describe('for simple getStyles', () => {
    const getStyles = (val: number): JssStyle => ({ width: 100 * val });

    it('should return flat jss for simple type', () => {
      expect(buildResponsiveStyles(6, getStyles)).toStrictEqual({ width: 600 });
    });

    it('should return nested jss for responsive type', () => {
      expect(buildResponsiveStyles({ base: 6, xs: 3, s: 4, m: 5, l: 6, xl: 7 }, getStyles)).toStrictEqual({
        width: 600,
        '@media (min-width: 480px)': { width: 300 },
        '@media (min-width: 760px)': { width: 400 },
        '@media (min-width: 1000px)': { width: 500 },
        '@media (min-width: 1300px)': { width: 600 },
        '@media (min-width: 1760px)': { width: 700 },
      });
    });
  });

  describe('for complex getStyles', () => {
    const getStyles = (val: number): JssStyle => ({ width: 100 * val, display: 'block' });

    it('should return flat jss for simple type', () => {
      expect(buildResponsiveStyles(6, getStyles)).toStrictEqual({ width: 600, display: 'block' });
    });

    it('should return nested jss for responsive type', () => {
      expect(buildResponsiveStyles({ base: 6, xs: 3, s: 4, m: 5, l: 6, xl: 7 }, getStyles)).toStrictEqual({
        width: 600,
        display: 'block',
        '@media (min-width: 480px)': { width: 300, display: 'block' },
        '@media (min-width: 760px)': { width: 400, display: 'block' },
        '@media (min-width: 1000px)': { width: 500, display: 'block' },
        '@media (min-width: 1300px)': { width: 600, display: 'block' },
        '@media (min-width: 1760px)': { width: 700, display: 'block' },
      });
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

describe('attachComponentCss()', () => {
  beforeEach(() => {
    componentCssMap.clear();
  });

  it('should call getCachedComponentCss() with infinite parameters to retrieve cached css', () => {
    const host = document.createElement('p-some-component');
    host.attachShadow({ mode: 'open' });
    const spy = jest.spyOn(jssUtils, 'getCachedComponentCss').mockImplementation(() => '');

    attachComponentCss(host, (x: boolean) => 'some css', true);

    expect(spy).toHaveBeenCalledWith(host, expect.anything(), true);

    attachComponentCss(host, (x: boolean, y: string, z: number) => 'some css', false, '', 1);

    expect(spy).toHaveBeenCalledWith(host, expect.anything(), false, '', 1);
  });

  describe('with CSSStyleSheet support', () => {
    it('should create CSSStyleSheet and apply it to shadowRoot', () => {
      const div = document.createElement('p-some-component');
      div.attachShadow({ mode: 'open' });

      expect(div.shadowRoot.adoptedStyleSheets.length).toBe(0);

      attachComponentCss(div, () => ':host { display: "block" }');
      expect(div.shadowRoot.adoptedStyleSheets.length).toBe(1);
    });
  });

  describe('without CSSStyleSheet support', () => {
    it('should create style node and prepend it in shadowRoot', () => {
      const spy = jest.spyOn(jssUtils, 'supportsConstructableStylesheets').mockImplementation(() => false);

      const div = document.createElement('p-some-component');
      div.attachShadow({ mode: 'open' });
      expect(div.shadowRoot.querySelector('style')).toBeNull();

      const css = ':host { display: "block" }';
      attachComponentCss(div, () => css);
      expect(div.shadowRoot.querySelector('style').innerHTML).toBe(css);

      spy.mockRestore();
    });
  });
});

describe('getCachedComponentCss()', () => {
  beforeEach(() => {
    componentCssMap.clear();
  });

  it('should return css provided by css function', () => {
    const host = document.createElement('p-some-element');
    const getComponentCss = () => 'some css';

    expect(getCachedComponentCss(host, getComponentCss)).toBe('some css');
  });

  it('should call passed css function with infinite passed arguments', () => {
    const host = document.createElement('p-some-element');
    const getComponentCss1 = (a: number, b: boolean, c: string) => `some css ${a} ${b} ${c}`;

    expect(getCachedComponentCss(host, getComponentCss1, 1, true, 'some string')).toBe('some css 1 true some string');

    const getComponentCss2 = (d: { someProp: string }) => `some css ${d.someProp}`;

    expect(getCachedComponentCss(host, getComponentCss2, { someProp: 'some-object-value' })).toBe(
      'some css some-object-value'
    );
  });

  it('should keep CSS Cache clean and handle multiple types of infinite passed parameters', () => {
    const host1 = document.createElement('p-some-element');
    const host2 = document.createElement('my-prefix-p-some-element');
    const host3 = document.createElement('p-another-element');
    const getComponentCss1 = (a?: number, b?: boolean, c?: string, d?: { someProp: string }) => 'some css';

    getCachedComponentCss(host1, getComponentCss1, 1, true, 'some string', { someProp: 'some value' });
    getCachedComponentCss(host1, getComponentCss1, 1, true, 'some string', { someProp: 'some value' });
    getCachedComponentCss(host1, getComponentCss1);
    getCachedComponentCss(host1, getComponentCss1);

    getCachedComponentCss(host2, getComponentCss1, 1, true, 'some string', { someProp: 'some value' });
    getCachedComponentCss(host2, getComponentCss1, 1, true, 'some string', { someProp: 'some value' });
    getCachedComponentCss(host2, getComponentCss1);
    getCachedComponentCss(host2, getComponentCss1);

    getCachedComponentCss(host3, getComponentCss1, 1, true, 'some string', { someProp: 'some value' });
    getCachedComponentCss(host3, getComponentCss1, 1, true, 'some string', { someProp: 'some value' });
    getCachedComponentCss(host3, getComponentCss1);
    getCachedComponentCss(host3, getComponentCss1);

    expect(componentCssMap).toMatchSnapshot();
  });

  it('should call provided css function only once when it was already called before for the same host type', () => {
    const host1 = document.createElement('p-some-element');
    const host2 = document.createElement('p-some-element');
    const host3 = document.createElement('p-some-element');
    const getComponentCss = jest.fn();

    getCachedComponentCss(host1, getComponentCss, 'some-param');

    expect(getComponentCss).toHaveBeenCalledTimes(1);

    getCachedComponentCss(host2, getComponentCss, 'some-param');

    expect(getComponentCss).toHaveBeenCalledTimes(1);

    getCachedComponentCss(host3, getComponentCss, 'another-param');

    expect(getComponentCss).toHaveBeenCalledTimes(2);
  });

  it('should not call provided css function again for prefixed version of host type', () => {
    const host = document.createElement('p-some-element');
    const hostPrefixed = document.createElement('my-prefix-p-some-element');
    const getComponentCss = jest.fn();

    getCachedComponentCss(host, getComponentCss);

    expect(getComponentCss).toHaveBeenCalledTimes(1);

    getCachedComponentCss(hostPrefixed, getComponentCss);

    expect(getComponentCss).toHaveBeenCalledTimes(1);
  });
});
