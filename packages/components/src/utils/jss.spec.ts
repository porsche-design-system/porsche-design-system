import * as jssUtils from './jss';
import {
  attachComponentCss,
  buildResponsiveStyles,
  componentCssMap,
  getCachedComponentCss,
  getCss,
  isObject,
  mergeDeep,
  supportsConstructableStylesheets,
} from './jss';
import type { JssStyle, Styles } from 'jss';
import * as globby from 'globby-legacy';
import * as path from 'node:path';
import * as fs from 'node:fs';

describe('getCss()', () => {
  const data: { input: Styles; result: string }[] = [
    {
      input: {
        '@global': {
          ':host': { display: 'block', marginLeft: '5px' },
        },
      },
      result: `:host {
  display: block;
  margin-left: 5px;
}`,
    },
    {
      input: {
        '@global': {
          ':host': { display: 'block', marginLeft: '5px !important' },
        },
      },
      result: `:host {
  display: block;
  margin-left: 5px !important;
}`,
    },
    {
      input: {
        '@global': {
          ':host': { display: 'block', width: '500px', transition: 'width .25s ease' },
        },
      },
      result: `:host {
  display: block;
  width: 500px;
  transition: width .25s ease;
}`,
    },
    {
      input: {
        '@global': {
          ':host': { display: 'block', marginLeft: '5px !important' },
        },
        '@media (min-width: 760px)': {
          '@global': { ':host': { marginRight: '5px !important' } },
        },
      },
      result: `:host {
  display: block;
  margin-left: 5px !important;
}
@media (min-width: 760px) {
  :host {
    margin-right: 5px !important;
  }
}
`,
    },
    {
      input: {
        '@global': {
          ':host': { display: 'block', marginLeft: '5px !important' },
        },
        '@media (min-width: 760px)': {
          '@global': {
            ':host': { marginRight: '5px !important' },
          },
        },
        '@media (min-width: 1000px)': {
          '@global': {
            ':host': { marginRight: '10px !important' },
          },
        },
      },
      result: `:host {
  display: block;
  margin-left: 5px !important;
}
@media (min-width: 760px) {
  :host {
    margin-right: 5px !important;
  }
}

@media (min-width: 1000px) {
  :host {
    margin-right: 10px !important;
  }
}
`,
    },
    {
      // flat media query
      input: {
        '@global': {
          ':host': { display: 'block', marginLeft: '5px !important' },
        },
        '@media (min-width: 1000px)': {
          '@global': {
            ':host': { marginRight: '10px !important' },
          },
        },
        '@media (min-width: 760px)': {
          '@global': {
            ':host': { marginRight: '5px !important' },
          },
        },
      },
      result: `:host {
  display: block;
  margin-left: 5px !important;
}
@media (min-width: 760px) {
  :host {
    margin-right: 5px !important;
  }
}

@media (min-width: 1000px) {
  :host {
    margin-right: 10px !important;
  }
}
`,
    },
    {
      // nested media query
      input: {
        '@global': {
          ':host': {
            display: 'block',
            marginLeft: '5px !important',
            '@media (min-width: 1000px)': {
              marginRight: '10px !important',
            },
          },
        },
      },
      result: `:host {
  display: block;
  margin-left: 5px !important;
}
@media (min-width: 1000px) {
  :host {
    margin-right: 10px !important;
  }
}
`,
    },
    {
      // .class and global media query
      input: {
        '@global': {
          ':host': {
            display: 'block',
            marginLeft: '5px !important',
            '@media (min-width: 1000px)': {
              marginRight: '10px !important',
            },
          },
        },
        '@media (min-width: 1000px)': {
          root: { display: 'block' },
        },
      },
      // causes two identical media queries for now
      result: `:host {
  display: block;
  margin-left: 5px !important;
}
@media (min-width: 1000px) {
  :host {
    margin-right: 10px !important;
  }
}

@media (min-width: 1000px) {
  .root {
    display: block;
  }
}
`,
    },
    {
      input: {
        '@global': {
          div: { display: 'block' },
        },
      },
      result: `div {
  display: block;
}`,
    },
  ];
  it.each(data.map(({ input, result }) => [input, result]))(
    'should correctly transform %j',
    (input: Styles, result: string) => {
      expect(getCss(input)).toBe(result);
    }
  );
});

describe('supportsConstructableStylesheets()', () => {
  it('should return true if CSSStyleSheet constructor exists', () => {
    // due to polyfill
    expect(supportsConstructableStylesheets()).toBe(true);
  });

  it('should return false if CSSStyleSheet constructor does not exist', () => {
    const globalCSSStyleSheet = global.CSSStyleSheet;
    global.CSSStyleSheet = undefined;
    expect(supportsConstructableStylesheets()).toBe(false);
    global.CSSStyleSheet = globalCSSStyleSheet;
  });
});

describe('buildResponsiveStyles()', () => {
  describe('for simple getJssStyle', () => {
    const getJssStyle = (val: number): JssStyle => ({ width: 100 * val });

    it('should return flat jss for simple type', () => {
      expect(buildResponsiveStyles(6, getJssStyle)).toStrictEqual({ width: 600 });
    });

    it('should return nested jss for responsive type', () => {
      expect(buildResponsiveStyles({ base: 6, xs: 3, s: 4, m: 5, l: 6, xl: 7 }, getJssStyle)).toStrictEqual({
        width: 600,
        '@media(min-width:480px)': { width: 300 },
        '@media(min-width:760px)': { width: 400 },
        '@media(min-width:1000px)': { width: 500 },
        '@media(min-width:1300px)': { width: 600 },
        '@media(min-width:1760px)': { width: 700 },
      });
    });
  });

  describe('for complex getJssStyle', () => {
    const getJssStyle = (val: number): JssStyle => ({ width: 100 * val, display: 'block' });

    it('should return flat jss for simple type', () => {
      expect(buildResponsiveStyles(6, getJssStyle)).toStrictEqual({ width: 600, display: 'block' });
    });

    it('should return nested jss for responsive type', () => {
      expect(buildResponsiveStyles({ base: 6, xs: 3, s: 4, m: 5, l: 6, xl: 7 }, getJssStyle)).toStrictEqual({
        width: 600,
        display: 'block',
        '@media(min-width:480px)': { width: 300, display: 'block' },
        '@media(min-width:760px)': { width: 400, display: 'block' },
        '@media(min-width:1000px)': { width: 500, display: 'block' },
        '@media(min-width:1300px)': { width: 600, display: 'block' },
        '@media(min-width:1760px)': { width: 700, display: 'block' },
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
      input
        .map((x) => JSON.stringify(x))
        .join(', '), // for test description
      JSON.stringify(result), // for test description
      input,
      result,
    ])
  )('should for inputs: %s return %s', (_, __, input: object[], result: object) => {
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

    attachComponentCss(host, (_x: boolean) => 'some css', true);

    expect(spy).toHaveBeenCalledWith(host, expect.anything(), true);

    attachComponentCss(host, (_x: boolean, _y: string, _z: number) => 'some css', false, '', 1);

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
      const spy = jest.spyOn(jssUtils, 'getHasConstructableStylesheetSupport').mockReturnValue(false);

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
    const getComponentCss1 = (_a?: number, _b?: boolean, _c?: string, _d?: { someProp: string }) => 'some css';

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

describe('all styles snapshots', () => {
  const srcDirPath = path.resolve(__dirname, '..');
  const snapshotFilePaths = globby.sync(`${srcDirPath}/**/*-styles.spec.ts.snap`);

  it.each(snapshotFilePaths.map((filePath) => [path.basename(filePath), filePath]))(
    'should not contain [object Object] in %s',
    (_, filePath) => {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      expect(fileContent).not.toContain('[object Object]');
    }
  );
});
