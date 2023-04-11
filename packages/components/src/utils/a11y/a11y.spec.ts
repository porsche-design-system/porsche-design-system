import * as a11yUtils from './a11y';
import { parseAndGetAriaAttributes, setAriaAttributes, SetAriaAttributesOptions } from './a11y';
import * as jsonUtils from '../json';
import * as setAttributeUtils from '../dom/setAttribute';
import * as removeAttributeUtils from '../dom/removeAttribute';
import type { AriaAttributes } from '../../types';
import { TAG_NAMES } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import { componentFactory } from '../../test-utils';

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
    const setAttributeSpy = jest.spyOn(setAttributeUtils, 'setAttribute');
    const removeAttributeSpy = jest.spyOn(removeAttributeUtils, 'removeAttribute');

    setAriaAttributes(node, options);

    if (options.label && !options.message) {
      expect(setAttributeSpy).toBeCalledWith(node, 'aria-label', options.label);
    } else if (!options.label && options.message) {
      expect(setAttributeSpy).not.toBeCalled();
    } else if (options.label && options.message) {
      expect(setAttributeSpy).toBeCalledWith(node, 'aria-label', options.label + '. ' + options.message);
    }

    if (options.state === 'error') {
      expect(setAttributeSpy).toBeCalledWith(node, 'aria-invalid', 'true');
    } else if (options.state) {
      expect(removeAttributeSpy).toBeCalledWith(node, 'aria-invalid');
    }
  });
});

describe('parseAndGetAriaAttributes()', () => {
  const rawAttributes = "{ aria-label: 'Some label' }";

  it('should call parseJSONAttribute()', () => {
    const spy = jest.spyOn(jsonUtils, 'parseJSONAttribute');

    parseAndGetAriaAttributes(rawAttributes);
    expect(spy).toBeCalledWith(rawAttributes);
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
    expect(parseAndGetAriaAttributes(rawAttributes)).toEqual({
      'aria-label': 'Some label',
      'aria-pressed': 'true',
    });
  });

  it.each<string>([undefined, ''])('should return undefined for %o', (rawAttributes) => {
    expect(parseAndGetAriaAttributes(rawAttributes)).toEqual(undefined);
  });

  // 'p-button-tile' and 'p-link-tile' have to be excluded because parseAndGetAriaAttributes() is not applied
  const tagNamesWithAriaProp = TAG_NAMES.filter(
    (tagName) => getComponentMeta(tagName).hasAriaProp && tagName !== 'p-button-tile' && tagName !== 'p-link-tile'
  );

  it.each<TagName>(tagNamesWithAriaProp)('should call parseAndGetAriaAttributes() via render for %s', (tagName) => {
    const spy = jest.spyOn(a11yUtils, 'parseAndGetAriaAttributes');
    const component = componentFactory(tagName);
    component['aria'] = { 'aria-label': 'Some label' };

    if (['p-link', 'p-link-pure', 'p-marque', 'p-wordmark', 'p-crest'].includes(tagName)) {
      component['href'] = 'https://porsche.com';
    }

    try {
      component.render();

      // icon is behaving a little bit different
      if (tagName === 'p-icon') {
        component.host.shadowRoot.append(document.createElement('i'));
        component['setIconContent']();
      }
    } catch (e) {}

    expect(spy).toBeCalledWith(component['aria']);
  });
});
