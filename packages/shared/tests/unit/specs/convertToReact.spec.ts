import {
  convertToReact,
  transformBooleanDigitAndUndefinedValues,
  transformClassAttribute,
  transformCustomElementTagName,
  transformEvents,
  transformInputs,
  transformObjectValues,
  transformStandardAttributes,
  transformStyleAttribute,
  transformToSelfClosingTags,
} from '../../../src/utils/convertToReact';
import * as reactUtils from '../../../src/utils/convertToReact';

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

  it('should not transform aria attributes', () => {
    expect(
      transformStandardAttributes(
        '<div aria-label="some label" aria-checked="false" aria-disabled="false" aria-live="polite"></div>'
      )
    ).toBe('<div aria-label="some label" aria-checked="false" aria-disabled="false" aria-live="polite"></div>');
  });

  it('should transform readonly attribute to camelCase', () => {
    expect(transformStandardAttributes('<input type="text" readonly>')).toBe('<input type="text" readOnly>');
  });

  it('should not transform readonly attribute value to camelCase', () => {
    expect(transformStandardAttributes('<div attr="some readonly"></div>')).toBe('<div attr="some readonly"></div>');
  });

  it('should not transform readonly innerText to camelCase', () => {
    expect(transformStandardAttributes('<label>Some readonly label</label>')).toBe(
      '<label>Some readonly label</label>'
    );
  });

  it('should transform maxlength attribute to camelCase', () => {
    expect(transformStandardAttributes('<input type="text" maxlength="20">')).toBe(
      '<input type="text" maxLength="20">'
    );
  });

  it('should not transform maxlength innerText to camelCase', () => {
    expect(transformStandardAttributes('<label>Some maxlength label</label>')).toBe(
      '<label>Some maxlength label</label>'
    );
  });

  it('should not transform maxlength attribute value to camelCase', () => {
    expect(transformStandardAttributes('<div attr="some maxlength"></div>')).toBe('<div attr="some maxlength"></div>');
  });

  it('should transform srcset attribute to camelCase for img tag', () => {
    expect(transformStandardAttributes('<img src="./some_png.png" srcset="./some_png.png">')).toBe(
      '<img src="./some_png.png" srcSet={"./some_png.png"}>'
    );
  });

  it('should transform srcset attribute to camelCase for source tag', () => {
    expect(transformStandardAttributes('<source src="./some_png.png" srcset="./some_png.png">')).toBe(
      '<source src="./some_png.png" srcSet={"./some_png.png"}>'
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

describe('transformEvents()', () => {
  it('should transform events to react event binding syntax', () => {
    expect(transformEvents(markup)).toBe(
      `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" onClick={() => { alert('click'); return false; }} onChange={() => { alert('change'); return false; }} digit-attribute="6" negative-digit-attribute="-6" boolean-attribute="true">
  <span>Some text</span>
  <input type="checkbox">
  <button type="button"></button>
</p-some-tag>`
    );
  });

  it('should not transform attribute values containing " on"', () => {
    expect(transformEvents('<p-somme-tag label="Icon only" icon="user"></p-somme-tag>')).toBe(
      `<p-somme-tag label="Icon only" icon="user"></p-somme-tag>`
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

  it('should transform single line tags to PascalCase', () => {
    const input = `<p-some-tag><a href="#">Some link</a></p-some-tag>`;
    expect(transformCustomElementTagName(input)).toBe('<PSomeTag><a href="#">Some link</a></PSomeTag>');
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

  it('should transform multiline tags without children to self-closing', () => {
    const input = `<p-some-tag>
</p-some-tag>`;
    expect(transformToSelfClosingTags(input)).toBe('<p-some-tag />');
  });

  it('should not transform single line tags to self-closing', () => {
    const input = `<p-some-tag><a href="#">Some link</a></p-some-tag>`;
    expect(transformToSelfClosingTags(input)).toBe('<p-some-tag><a href="#">Some link</a></p-some-tag>');
  });
});

describe('transformStyleAttribute()', () => {
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

  it('should handle multiline style', () => {
    const markup = `<div
  style="
    text-align: center;
    font-size: 16px;
  "
></div>`;

    expect(transformStyleAttribute(markup)).toBe(`<div
  style={{ textAlign: 'center', fontSize: '16px' }}
></div>`);
  });

  it('should correctly convert number values', () => {
    expect(transformStyleAttribute('<div style="font-size: 60px; line-height: 1.5; font-weight: 100"></div>')).toBe(
      `<div style={{ fontSize: '60px', lineHeight: 1.5, fontWeight: 100 }}></div>`
    );
  });

  it('should correctly convert custom css properties', () => {
    expect(
      transformStyleAttribute(
        '<div style="--some-custom-property: 60px; --some-additional-custom-property: 1.5;"></div>'
      )
    ).toBe(`<div style={{ "--some-custom-property": '60px', "--some-additional-custom-property": 1.5 }}></div>`);
  });

  it('should correctly convert custom css properties with functions', () => {
    expect(
      transformStyleAttribute(`<div
      style="
        position: sticky;
        top: calc(var(--p-flyout-sticky-top, 0) + 16px);
        padding: 16px;
        background: rgba(255, 0, 0, 0.1);
      "
    ></div>`)
    ).toBe(
      `<div
      style={{ position: 'sticky', top: 'calc(var(--p-flyout-sticky-top, 0) + 16px)', padding: '16px', background: 'rgba(255, 0, 0, 0.1)' }}
    ></div>`
    );
  });
});

// TODO: Make this work again
describe.skip('convertToReact()', () => {
  afterEach(() => jest.clearAllMocks());

  let previousSpy: jest.SpyInstance;
  const transformFunctions: (keyof typeof reactUtils)[] = [
    'transformObjectValues',
    'transformStandardAttributes',
    'transformClassAttribute',
    'transformEvents',
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

    expect(spy).toHaveBeenCalledWith(expect.stringMatching(/p-some-tag|PSomeTag/));
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
