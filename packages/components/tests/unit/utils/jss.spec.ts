import { attachCss, buildHostStyles, buildResponsiveJss, getCss, isObject, mergeDeep } from '../../../src/utils';

xdescribe('getCss', () => {});
describe('attachCss', () => {
  it('should create CSSStyleSheet and add apply it to shadowRoot', () => {
    const div = document.createElement('div');
    div.attachShadow({ mode: 'open' });

    expect(div.shadowRoot.adoptedStyleSheets.length).toBe(0);

    attachCss(div, ':host { display: "block" }');
    expect(div.shadowRoot.adoptedStyleSheets.length).toBe(1);
  });
});

describe('buildHostStyles', () => {
  it('should return :host styles object', () => {
    expect(buildHostStyles({ marginLeft: 5 })).toMatchObject({ ':host': { marginLeft: 5 } });
  });
});

xdescribe('buildResponsiveJss', () => {});

describe('isObject', () => {
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

describe('mergeDeep', () => {
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
    expect(mergeDeep(...input)).toMatchObject(result);
  });
});
