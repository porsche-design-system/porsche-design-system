import * as a11yUtils from './a11y';
import {
  parseAndGetAriaAttributes,
  setAriaAttributes,
  SetAriaAttributesOptions,
  throwIfAriaAttributesAreInvalid,
} from './a11y';
import * as jsonUtils from './json';
import * as domUtils from './dom';
import type { AriaAttributes } from '../types';

describe('setAriaAttributes()', () => {
  const node = document.createElement('div');
  const label = 'Some label';
  const message = 'Some message';

  it.each<SetAriaAttributesOptions>([
    { label },
    { message },
    { label, message },
    { state: 'error' },
    { state: 'success' },
    { state: 'none' },
  ])('should call setAttribute and removeAttribute with correct params for options: %o', (options) => {
    const setAttributeSpy = jest.spyOn(domUtils, 'setAttribute');
    const removeAttributeSpy = jest.spyOn(domUtils, 'removeAttribute');

    setAriaAttributes(node, options);

    if (options.label && !options.message) {
      expect(setAttributeSpy).toHaveBeenCalledWith(node, 'aria-label', options.label);
    } else if (!options.label && options.message) {
      expect(setAttributeSpy).toHaveBeenCalledTimes(0);
    } else if (options.label && options.message) {
      expect(setAttributeSpy).toHaveBeenCalledWith(node, 'aria-label', options.label + '. ' + options.message);
    }

    if (options.state === 'error') {
      expect(setAttributeSpy).toHaveBeenCalledWith(node, 'aria-invalid', 'true');
    } else if (options.state) {
      expect(removeAttributeSpy).toHaveBeenCalledWith(node, 'aria-invalid');
    }
  });
});

describe('throwIfAriaAttributesAreInvalid()', () => {
  it('should throw error for unsupported attribute', () => {
    const testFunc = () => {
      throwIfAriaAttributesAreInvalid(['aria-asd' as any], ['aria-label']);
    };

    expect(testFunc).toThrowErrorMatchingSnapshot();
  });

  it('should not throw error for supported attribute', () => {
    const testFunc = () => {
      throwIfAriaAttributesAreInvalid(['aria-label'], ['aria-label']);
    };

    expect(testFunc).not.toThrow();
  });
});

describe('parseAndGetAriaAttributes()', () => {
  const rawAttributes = "{ aria-label: 'Some label' }";

  it('should call parseJSONAttribute()', () => {
    const spy = jest.spyOn(jsonUtils, 'parseJSONAttribute');

    parseAndGetAriaAttributes(rawAttributes, undefined);
    expect(spy).toHaveBeenCalledWith(rawAttributes);
  });

  it('should call throwIfAriaAttributesAreInvalid()', () => {
    const spy = jest.spyOn(a11yUtils, 'throwIfAriaAttributesAreInvalid');

    parseAndGetAriaAttributes(rawAttributes, ['aria-label']);
    expect(spy).toHaveBeenCalledWith(['aria-label'], ['aria-label']);
  });

  it.each<AriaAttributes | string>([
    {
      'aria-label': 'Some label',
      'aria-pressed': true,
    },
    {
      'aria-label': 'Some label',
      'aria-pressed': 'true',
    },
    "{'aria-label': 'Some label', 'aria-pressed': true}",
    "{'aria-label': 'Some label', 'aria-pressed': 'true'}",
  ])('should return correct aria attributes with boolean for %o', (rawAttributes) => {
    expect(parseAndGetAriaAttributes(rawAttributes, undefined)).toEqual({
      'aria-label': 'Some label',
      'aria-pressed': 'true',
    });
  });

  it.each<string>([undefined, ''])('should return undefined for %o', (rawAttributes) => {
    expect(parseAndGetAriaAttributes(rawAttributes, [])).toEqual(undefined);
  });
});
