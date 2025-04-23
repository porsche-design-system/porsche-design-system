import {
  cleanVueBooleanAndUndefinedValues,
  convertToVue,
  transformEventsToVueSyntax,
  transformVueAttributesWithDigitValue,
  transformVueAttributesWithNotDigitValue,
  transformVueAttributesWithObjectValues,
  unbindVueNativeAttributes,
} from '../../../src/utils/convertToVue';
import * as vueUtils from '../../../src/utils/convertToVue';

const markup = `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" onclick="alert('click'); return false;" onchange="alert('change'); return false;" digit-attribute="6" negative-digit-attribute="-6" boolean-attribute="true" aria-label="something label" aria-something="Something foo" name="1">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</p-some-tag>`;

describe('transformEventsToViewSyntax()', () => {
  it('should transform only events into vue syntax', () => {
    expect(transformEventsToVueSyntax(markup)).toBe(
      `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" @click="alert('click'); return false;" @change="alert('change'); return false;" digit-attribute="6" negative-digit-attribute="-6" boolean-attribute="true" aria-label="something label" aria-something="Something foo" name="1">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</p-some-tag>`
    );
  });

  it('should not transform attribute values containing " on"', () => {
    expect(transformEventsToVueSyntax('<p-somme-tag label="Icon only" icon="user"></p-somme-tag>')).toBe(
      `<p-somme-tag label="Icon only" icon="user"></p-somme-tag>`
    );
  });
});

describe('transformAttributesWithObjectValues()', () => {
  it('should transform only attributes with object values into vue syntax', () => {
    expect(transformVueAttributesWithObjectValues(markup)).toBe(
      `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" :anotherAttribute="{ bar: 'foo' }" onclick="alert('click'); return false;" onchange="alert('change'); return false;" digit-attribute="6" negative-digit-attribute="-6" boolean-attribute="true" aria-label="something label" aria-something="Something foo" name="1">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</p-some-tag>`
    );
  });
});

describe('transformAttributesWithNotDigitValue()', () => {
  it('should transform only attributes without digit values', () => {
    expect(transformVueAttributesWithNotDigitValue(markup)).toBe(
      `<p-some-tag :someAttribute="'some value'" :attribute="'some value'" :class="'some-class'" :anotherAttribute="'{ bar: 'foo' }'" :onclick="'alert('click'); return false;'" :onchange="'alert('change'); return false;'" digit-attribute="6" negative-digit-attribute="-6" :booleanAttribute="'true'" aria-label="something label" aria-something="Something foo" name="1">
  <span>some text</span>
  <span :slot="'some-slot'">some slot text</span>
</p-some-tag>`
    );
  });
});

describe('transformAttributesWithDigitValue()', () => {
  it('should transform attributes with digit values', () => {
    expect(transformVueAttributesWithDigitValue(markup)).toBe(
      `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" onclick="alert('click'); return false;" onchange="alert('change'); return false;" :digitAttribute="6" :negativeDigitAttribute="-6" boolean-attribute="true" aria-label="something label" aria-something="Something foo" :name="'1'">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</p-some-tag>`
    );
  });
  it('transform maxlength with maxLength', () => {
    expect(transformVueAttributesWithDigitValue('<textarea maxlength="200">Some value</textarea>')).toBe(
      '<textarea :maxLength="200">Some value</textarea>'
    );
  });
});

describe('cleanBooleanAndUndefinedValues()', () => {
  it('should remove single quotes from boolean values after initial transform', () => {
    const transformedMarkup = transformVueAttributesWithNotDigitValue(markup);

    expect(cleanVueBooleanAndUndefinedValues(transformedMarkup)).toBe(
      `<p-some-tag :someAttribute="'some value'" :attribute="'some value'" :class="'some-class'" :anotherAttribute="'{ bar: 'foo' }'" :onclick="'alert('click'); return false;'" :onchange="'alert('change'); return false;'" digit-attribute="6" negative-digit-attribute="-6" :booleanAttribute="true" aria-label="something label" aria-something="Something foo" name="1">
  <span>some text</span>
  <span :slot="'some-slot'">some slot text</span>
</p-some-tag>`
    );
  });

  it('should remove single quotes from undefined values after initial transform', () => {
    expect(cleanVueBooleanAndUndefinedValues(`<p-some-tag attribute="undefined"></p-some-tag>`)).toBe(
      `<p-some-tag attribute="undefined"></p-some-tag>`
    );
  });
});

describe('unbindNativeAttributes()', () => {
  it('should remove colon from "class" and "slot" attributes after initial transform', () => {
    const transformedMarkup = transformVueAttributesWithNotDigitValue(markup);

    expect(unbindVueNativeAttributes(transformedMarkup)).toBe(
      `<p-some-tag :someAttribute="'some value'" :attribute="'some value'" class="some-class" :anotherAttribute="'{ bar: 'foo' }'" :onclick="'alert('click'); return false;'" :onchange="'alert('change'); return false;'" digit-attribute="6" negative-digit-attribute="-6" :booleanAttribute="'true'" aria-label="something label" aria-something="Something foo" name="1">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</p-some-tag>`
    );
  });

  it('should remove colon from "title" attribute', () => {
    expect(unbindVueNativeAttributes(`<div :title="'hello'"></div>`)).toBe('<div title="hello"></div>');
  });

  it('should remove colon from "id" attribute', () => {
    expect(unbindVueNativeAttributes(`<div :id="'hello'"></div>`)).toBe('<div id="hello"></div>');
  });

  it('should remove colon from "style" attribute', () => {
    expect(unbindVueNativeAttributes(`<div :style="'background: yellow'"></div>`)).toBe(
      '<div style="background: yellow"></div>'
    );
  });
});

// TODO: Make this work again
describe.skip('convertToVue()', () => {
  afterEach(() => jest.clearAllMocks());

  let previousSpy: jest.SpyInstance;
  const transformFunctions: (keyof typeof vueUtils)[] = [
    'transformEventsToVueSyntax',
    'transformVueAttributesWithObjectValues',
    'transformVueAttributesWithNotDigitValue',
    'transformVueAttributesWithDigitValue',
    'cleanVueBooleanAndUndefinedValues',
    'unbindVueNativeAttributes',
    'transformVueCustomElementTagName',
    'transformVueInputs',
    'transformVueToSelfClosingTags',
  ];

  it.each(transformFunctions)('should call %s()', (fn) => {
    const spy = jest.spyOn(vueUtils, fn as any);
    const i = transformFunctions.indexOf(fn);

    if (i) {
      previousSpy = jest.spyOn(vueUtils, transformFunctions[i - 1] as any);
    }

    convertToVue(markup);

    if (previousSpy) {
      expect(previousSpy.mock.invocationCallOrder[0]).toBeLessThan(spy.mock.invocationCallOrder[0]);
    }
  });

  it('should convert markup to Vue syntax', () => {
    expect(convertToVue(markup)).toBe(
      `<PSomeTag :someAttribute="'some value'" :attribute="'some value'" class="some-class" :anotherAttribute="{ bar: 'foo' }" @click="alert('click'); return false;" @change="alert('change'); return false;" :digitAttribute="6" :negativeDigitAttribute="-6" :booleanAttribute="true" aria-label="something label" aria-something="Something foo" :name="'1'">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</PSomeTag>`
    );
  });
});
