import {
  convertToReact,
  transformBooleanDigitAndUndefinedValues,
  transformClassAttribute,
  transformCustomElementTagName,
  transformEventsToReactSyntax,
  transformInputs,
  transformObjectValues,
  transformStandardAttributes,
  transformStyleAttribute,
  transformToSelfClosingTags,
} from '../../src/utils/convertToReact';
import * as reactUtils from '../../src/utils/convertToReact';

const markup = `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" onclick="alert('click'); return false;" onchange="alert('change'); return false;" digit-attribute="6" negative-digit-attribute="-6" boolean-attribute="true">
  <span>Some text</span>
  <input type="checkbox">
  <button type="button"></button>
</p-some-tag>`;

describe('transformObjectValues()', () => {
  it('should remove quotes and add double brackets to value, transform attribute to camelCase', () => {
    expect(transformObjectValues(markup)).toBe(
      `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" anotherAttribute={{ bar: 'foo' }} onclick="alert('click'); return false;" onchange="alert('change'); return false;" digit-attribute="6" negative-digit-attribute="-6" boolean-attribute="true">
  <span>Some text</span>
  <input type="checkbox">
  <button type="button"></button>
</p-some-tag>`
    );
  });
});

describe('transformStandardAttributes()', () => {
  it('should transform attributes to camelCase', () => {
    expect(transformStandardAttributes(markup)).toBe(
      `<p-some-tag someAttribute="some value" attribute="some value" class="some-class" anotherAttribute="{ bar: 'foo' }" onclick="alert('click'); return false;" onchange="alert('change'); return false;" digitAttribute="6" negativeDigitAttribute="-6" booleanAttribute="true">
  <span>Some text</span>
  <input type="checkbox">
  <button type="button"></button>
</p-some-tag>`
    );
  });
});

describe('transformClassAttribute()', () => {
  it('should transform class to className', () => {
    expect(transformClassAttribute(markup)).toBe(
      `<p-some-tag some-attribute="some value" attribute="some value" className="some-class" another-attribute="{ bar: 'foo' }" onclick="alert('click'); return false;" onchange="alert('change'); return false;" digit-attribute="6" negative-digit-attribute="-6" boolean-attribute="true">
  <span>Some text</span>
  <input type="checkbox">
  <button type="button"></button>
</p-some-tag>`
    );
  });
});

describe('transformEventsToReactSyntax()', () => {
  it('should transform events to react event binding syntax', () => {
    expect(transformEventsToReactSyntax(markup)).toBe(
      `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" onClick={() => { alert('click'); return false; }} onChange={() => { alert('change'); return false; }} digit-attribute="6" negative-digit-attribute="-6" boolean-attribute="true">
  <span>Some text</span>
  <input type="checkbox">
  <button type="button"></button>
</p-some-tag>`
    );
  });
});

describe('transformBooleanDigitAndUndefinedValues()', () => {
  it('should remove quotes and add brackets to boolean and digit values', () => {
    expect(transformBooleanDigitAndUndefinedValues(markup)).toBe(
      `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" onclick="alert('click'); return false;" onchange="alert('change'); return false;" digit-attribute={6} negative-digit-attribute={-6} boolean-attribute={true}>
  <span>Some text</span>
  <input type="checkbox">
  <button type="button"></button>
</p-some-tag>`
    );
  });

  it('should remove quotes and add brackets to undefined values', () => {
    expect(transformBooleanDigitAndUndefinedValues(`<p-some-tag attribute="undefined"></p-some-tag>`)).toBe(
      `<p-some-tag attribute={undefined}></p-some-tag>`
    );
  });
});

describe('transformCustomElementTagName()', () => {
  it('should transform tag-name to PascalCase', () => {
    expect(transformCustomElementTagName(markup)).toBe(
      `<PSomeTag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" onclick="alert('click'); return false;" onchange="alert('change'); return false;" digit-attribute="6" negative-digit-attribute="-6" boolean-attribute="true">
  <span>Some text</span>
  <input type="checkbox">
  <button type="button"></button>
</PSomeTag>`
    );
  });

  it('should transform multiline tag-name to PascalCase', () => {
    const multiLineMarkup = `<p-some-tag
  attribute="some value"
  class="some-class"
>
</p-some-tag>`;
    expect(transformCustomElementTagName(multiLineMarkup)).toBe(
      `<PSomeTag
  attribute="some value"
  class="some-class"
>
</PSomeTag>`
    );
  });
});

describe('transformInputs()', () => {
  it('should add closing dash to input', () => {
    expect(transformInputs(markup)).toBe(
      `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" onclick="alert('click'); return false;" onchange="alert('change'); return false;" digit-attribute="6" negative-digit-attribute="-6" boolean-attribute="true">
  <span>Some text</span>
  <input type="checkbox" />
  <button type="button"></button>
</p-some-tag>`
    );
  });
});

describe('transformToSelfClosingTags()', () => {
  it('should transform tags without children to self-closing', () => {
    expect(transformToSelfClosingTags(markup)).toBe(
      `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" onclick="alert('click'); return false;" onchange="alert('change'); return false;" digit-attribute="6" negative-digit-attribute="-6" boolean-attribute="true">
  <span>Some text</span>
  <input type="checkbox">
  <button type="button" />
</p-some-tag>`
    );
  });
});

describe('transformStyleAttribute', () => {
  it('should quote values', () => {
    const markup = '<div style="display: block"></div>';
    expect(transformStyleAttribute(markup)).toBe("<div style={{ display: 'block' }}></div>");
  });
  it('should transform properties to camelCase', () => {
    const markup = '<div style="text-align: center"></div>';
    expect(transformStyleAttribute(markup)).toBe("<div style={{ textAlign: 'center' }}></div>");
  });
  it('should handle multiple styles', () => {
    const markup = '<div style="text-align: center; font-size: 16px"></div>';
    expect(transformStyleAttribute(markup)).toBe("<div style={{ textAlign: 'center', fontSize: '16px' }}></div>");
  });
});

describe('convertToReact()', () => {
  afterEach(() => jest.clearAllMocks());

  let previousSpy: jest.SpyInstance;
  const transformFunctions: (keyof typeof reactUtils)[] = [
    'transformObjectValues',
    'transformStandardAttributes',
    'transformClassAttribute',
    'transformEventsToReactSyntax',
    'transformBooleanDigitAndUndefinedValues',
    'transformCustomElementTagName',
    'transformInputs',
    'transformToSelfClosingTags',
    'transformStyleAttribute',
  ];

  it.each(transformFunctions)('should call %s()', (fn) => {
    const spy = jest.spyOn(reactUtils, fn as any);

    const i = transformFunctions.indexOf(fn);
    if (i) {
      previousSpy = jest.spyOn(reactUtils, transformFunctions[i - 1] as any);
    }

    convertToReact(markup);

    expect(spy).toBeCalledWith(expect.stringMatching(/p-some-tag|PSomeTag/));
    if (previousSpy) {
      expect(previousSpy.mock.invocationCallOrder[0]).toBeLessThan(spy.mock.invocationCallOrder[0]);
    }
  });

  it('should convert markup to React syntax', () => {
    expect(convertToReact(markup)).toBe(
      `<PSomeTag someAttribute="some value" attribute="some value" className="some-class" anotherAttribute={{ bar: 'foo' }} onClick={() => { alert('click'); return false; }} onChange={() => { alert('change'); return false; }} digitAttribute={6} negativeDigitAttribute={-6} booleanAttribute={true}>
  <span>Some text</span>
  <input type="checkbox" />
  <button type="button" />
</PSomeTag>`
    );
  });
});
