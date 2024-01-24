import { expect } from '@jest/globals';
import { componentMeta } from '@porsche-design-system/component-meta';
import { getCssObject } from '../../../src/test-utils';
import { TagName } from '@porsche-design-system/shared';

export const validateCssAndMatchSnapshot = (css: string) => {
  const cssObject = getCssObject(css);
  const componentName = expect.getState().testPath.match(/\/([^\/]+)\/[^\/]+\.spec\.ts/)[1];
  const componentTagName = `p-${componentName}` as TagName;
  // Extract componentMeta from testPath, if it's a functional component this will be undefined
  const currentComponentMeta = componentMeta[componentTagName];

  expect(css).not.toMatch('. {'); // Invalid css which was produced before

  validateVisibilityStyle(cssObject);
  validateSlottedStyles(cssObject, componentTagName);
  validateHoverMediaQuery(cssObject);

  // Validations for components only
  if (currentComponentMeta && !currentComponentMeta.isInternal) {
    expect(cssObject[':host([hidden])']).toEqual({ display: 'none !important' });
    validateHostDisplayStyle(cssObject);
  }

  expect(css).toMatchSnapshot();
};

// We shouldn't use visibility: visible since it cannot be overridden, use inherit instead
const validateVisibilityStyle = (cssObject: object) => {
  recursivelyApply(cssObject, (key, value) => {
    if (key.includes('visibility')) {
      expect(value).not.toMatch(/visible/);
    }
  });
};

// Expect no !important rule on display style of :host selector since it should be overridable
const validateHostDisplayStyle = (cssObject: object) => {
  if (cssObject[':host'].display) {
    expect(cssObject[':host'].display).not.toMatch(/!important/);
  } else {
    // some components don't have a display style
    expect(cssObject[':host'].display).toBeUndefined();
  }
};

// Expect all slotted styles to be !important since they shouldn't be overridable
const validateSlottedStyles = (cssObject: object, tagName: TagName) => {
  recursivelyApplyForKey(cssObject, '::slotted', (_, value) => {
    Object.entries(value).forEach(([cssProp, cssValue]) => {
      // exceptions for tagName and css property are defined here
      if (tagName !== 'p-textarea-wrapper' || !['height', 'min-height', 'resize'].includes(cssProp)) {
        expect(cssValue).toMatch(/ !important$/);
      }
    });
  });
};

// All :hover styles should be wrapped in a @media(hover:hover) since they are only needed for devices which support hover
const validateHoverMediaQuery = (cssObject: object) => {
  Object.entries(cssObject).forEach(([key, value]) => {
    // potential media query
    if (typeof value === 'object') {
      Object.entries(value).forEach(([childKey]) => {
        // nested selectors inside media query
        if (childKey.match(/:hover/)) {
          expect(key).toBe('@media(hover:hover)');
        }
      });
    }

    // top level selectors
    if (!key.match(/^@media\(hover:hover\)$/)) {
      expect(key).not.toMatch(/:hover/);
    }
  });
};

/**
 * Recursively applies a function to each key-value pair in a nested object.
 * @param jsonObject - The object to traverse recursively.
 * @param fn - The function to apply to each key-value pair.
 */
const recursivelyApply = (jsonObject: object, fn: (key: string, value: any) => void) => {
  for (const [key, value] of Object.entries(jsonObject)) {
    if (typeof value === 'object') {
      recursivelyApply(value, fn);
    } else {
      fn(key, value);
    }
  }
};

/**
 * Recursively applies a function to key-value pairs in a nested object based on a key selector.
 * @param jsonObject - The object to traverse recursively.
 * @param keySelector - The key or pattern to match for applying the function.
 * @param fn - The function to apply to matching key-value pairs.
 */
const recursivelyApplyForKey = (jsonObject: object, keySelector: string, fn: (key: string, value: any) => void) => {
  for (const [key, value] of Object.entries(jsonObject)) {
    if (key.includes(keySelector)) {
      fn(key, value);
    } else if (typeof value === 'object') {
      recursivelyApplyForKey(value, keySelector, fn);
    }
  }
};
