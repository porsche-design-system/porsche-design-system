import { MockInstance, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  cleanAngularBooleanAndUndefinedValues,
  convertToAngular,
  transformAngularAttributesWithDigitValue,
  transformAngularAttributesWithNotDigitValue,
  transformAngularAttributesWithObjectValues,
  transformEventsToAngularSyntax,
  unbindAngularNativeAttributes,
} from '../../../src';
import * as angularUtils from '../../../src/utils/convertToAngular';

const markup = `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" onclick="alert('click'); return false;" onchange="alert('change'); return false;" digit-attribute="6" negative-digit-attribute="-6" boolean-attribute="true" aria-label="something label" aria-something="Something foo" name="1">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</p-some-tag>`;

describe('transformEventsToAngularSyntax()', () => {
  it('should transform only events into angular syntax', () => {
    expect(transformEventsToAngularSyntax(markup)).toBe(
      `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" (click)="alert('click'); return false;" (change)="alert('change'); return false;" digit-attribute="6" negative-digit-attribute="-6" boolean-attribute="true" aria-label="something label" aria-something="Something foo" name="1">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</p-some-tag>`
    );
  });

  it('should not transform attribute values containing " on"', () => {
    expect(transformEventsToAngularSyntax('<p-somme-tag label="Icon only" icon="user"></p-somme-tag>')).toBe(
      `<p-somme-tag label="Icon only" icon="user"></p-somme-tag>`
    );
  });
});

describe('transformAttributesWithObjectValues()', () => {
  it('should transform only attributes with object values into angular syntax', () => {
    expect(transformAngularAttributesWithObjectValues(markup)).toBe(
      `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" [anotherAttribute]="{ bar: 'foo' }" onclick="alert('click'); return false;" onchange="alert('change'); return false;" digit-attribute="6" negative-digit-attribute="-6" boolean-attribute="true" aria-label="something label" aria-something="Something foo" name="1">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</p-some-tag>`
    );
  });
});

describe('transformAttributesWithNotDigitValue()', () => {
  it('should transform only attributes without digit values', () => {
    expect(transformAngularAttributesWithNotDigitValue(markup)).toBe(
      `<p-some-tag [someAttribute]="'some value'" [attribute]="'some value'" [class]="'some-class'" [anotherAttribute]="'{ bar: 'foo' }'" [onclick]="'alert('click'); return false;'" [onchange]="'alert('change'); return false;'" digit-attribute="6" negative-digit-attribute="-6" [booleanAttribute]="'true'" aria-label="something label" aria-something="Something foo" name="1">
  <span>some text</span>
  <span [slot]="'some-slot'">some slot text</span>
</p-some-tag>`
    );
  });
});

describe('transformAttributesWithDigitValue()', () => {
  it('should transform attributes with digit values', () => {
    expect(transformAngularAttributesWithDigitValue(markup)).toBe(
      `<p-some-tag some-attribute="some value" attribute="some value" class="some-class" another-attribute="{ bar: 'foo' }" onclick="alert('click'); return false;" onchange="alert('change'); return false;" [digitAttribute]="6" [negativeDigitAttribute]="-6" boolean-attribute="true" aria-label="something label" aria-something="Something foo" [name]="'1'">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</p-some-tag>`
    );
  });
  it('should transform maxlength with maxLength', () => {
    expect(transformAngularAttributesWithDigitValue('<textarea maxlength="200">Some value</textarea>')).toBe(
      '<textarea [maxLength]="200">Some value</textarea>'
    );
  });
  it('should not transform prop model with digit values', () => {
    expect(transformAngularAttributesWithDigitValue('<p-model-signature model="911"></p-model-signature>')).toBe(
      `<p-model-signature [model]="'911'"></p-model-signature>`
    );
  });
  it('should not transform pin codes prop value with digit values', () => {
    expect(transformAngularAttributesWithDigitValue('<p-pin-code value="1234"></p-pin-code>')).toBe(
      `<p-pin-code [value]="'1234'"></p-pin-code>`
    );
  });
});

describe('cleanBooleanAndUndefinedValues()', () => {
  it('should remove single quotes from boolean values after initial transform', () => {
    const transformedMarkup = transformAngularAttributesWithNotDigitValue(markup);

    expect(cleanAngularBooleanAndUndefinedValues(transformedMarkup)).toBe(
      `<p-some-tag [someAttribute]="'some value'" [attribute]="'some value'" [class]="'some-class'" [anotherAttribute]="'{ bar: 'foo' }'" [onclick]="'alert('click'); return false;'" [onchange]="'alert('change'); return false;'" digit-attribute="6" negative-digit-attribute="-6" [booleanAttribute]="true" aria-label="something label" aria-something="Something foo" name="1">
  <span>some text</span>
  <span [slot]="'some-slot'">some slot text</span>
</p-some-tag>`
    );
  });

  it('should remove single quotes from undefined values after initial transform', () => {
    expect(cleanAngularBooleanAndUndefinedValues(`<p-some-tag attribute="undefined"></p-some-tag>`)).toBe(
      `<p-some-tag attribute="undefined"></p-some-tag>`
    );
  });
});

describe('unbindNativeAttributes()', () => {
  it('should remove brackets from "class" and "slot" attributes after initial transform', () => {
    const transformedMarkup = transformAngularAttributesWithNotDigitValue(markup);

    expect(unbindAngularNativeAttributes(transformedMarkup)).toBe(
      `<p-some-tag [someAttribute]="'some value'" [attribute]="'some value'" class="some-class" [anotherAttribute]="'{ bar: 'foo' }'" [onclick]="'alert('click'); return false;'" [onchange]="'alert('change'); return false;'" digit-attribute="6" negative-digit-attribute="-6" [booleanAttribute]="'true'" aria-label="something label" aria-something="Something foo" name="1">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</p-some-tag>`
    );
  });

  it('should remove brackets from "title" attribute', () => {
    expect(unbindAngularNativeAttributes(`<div [title]="'hello'"></div>`)).toBe('<div title="hello"></div>');
  });

  it('should remove brackets from "id" attribute', () => {
    expect(unbindAngularNativeAttributes(`<div [id]="'hello'"></div>`)).toBe('<div id="hello"></div>');
  });

  it('should remove brackets from "style" attribute', () => {
    expect(unbindAngularNativeAttributes(`<div [style]="'background: yellow'"></div>`)).toBe(
      '<div style="background: yellow"></div>'
    );
  });
});

// TODO: Make this work again
describe.skip('convertToAngular()', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  let previousSpy: MockInstance;
  const transformFunctions: (keyof typeof angularUtils)[] = [
    'transformEventsToAngularSyntax',
    'transformAngularAttributesWithObjectValues',
    'transformAngularAttributesWithNotDigitValue',
    'transformAngularAttributesWithDigitValue',
    'cleanAngularBooleanAndUndefinedValues',
    'unbindAngularNativeAttributes',
  ];

  it.each(transformFunctions)('should call %s()', (fn) => {
    const spy = vi.spyOn(angularUtils, fn as any);

    const i = transformFunctions.indexOf(fn);
    if (i) {
      previousSpy = vi.spyOn(angularUtils, transformFunctions[i - 1] as any);
    }

    convertToAngular(markup);

    expect(spy).toHaveBeenCalledWith(expect.stringContaining('p-some-tag'));
    if (previousSpy) {
      expect(previousSpy.mock.invocationCallOrder[0]).toBeLessThan(spy.mock.invocationCallOrder[0]);
    }
  });

  it('should convert markup to Angular syntax', () => {
    expect(convertToAngular(markup)).toBe(
      `<p-some-tag [someAttribute]="'some value'" [attribute]="'some value'" class="some-class" [anotherAttribute]="{ bar: 'foo' }" (click)="alert('click'); return false;" (change)="alert('change'); return false;" [digitAttribute]="6" [negativeDigitAttribute]="-6" [booleanAttribute]="true" aria-label="something label" aria-something="Something foo" [name]="'1'">
  <span>some text</span>
  <span slot="some-slot">some slot text</span>
</p-some-tag>`
    );
  });
});
