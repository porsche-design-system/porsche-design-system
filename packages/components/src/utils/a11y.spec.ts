import { parseAndGetAccessibilityAttributes, setAriaAttributes, SetAriaAttributesOptions } from '.';
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

// TODO: change test to match each function scope (parseAriaAttributes, throwIfAccessibilityAttributesAreInvalid)
describe('parseAndGetAccessibilityAttributes()', () => {
  it.each<AriaAttributes | string>([
    {
      'aria-label': 'Some label',
    },
    "{'aria-label': 'Some label'}",
    "{'aria-label':'Some label'}",
    '{"aria-label": "Some label"}',
    '{"aria-label":"Some label"}',
  ])('should return correct accessibility attributes for %o', (input) => {
    expect(parseAndGetAccessibilityAttributes(input)).toEqual({
      'aria-label': 'Some label',
    });
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
  ])('should return correct accessibility attributes with boolean for %o', (input) => {
    expect(parseAndGetAccessibilityAttributes(input)).toEqual({
      'aria-label': 'Some label',
      'aria-pressed': 'true',
    });
  });

  it('should throw error for unsupported attribute', () => {
    const testFunc = () =>
      parseAndGetAccessibilityAttributes(
        {
          'aria-asd': 'Some label',
        } as any,
        ['aria-label']
      );

    expect(testFunc).toThrowErrorMatchingSnapshot();
  });
});
