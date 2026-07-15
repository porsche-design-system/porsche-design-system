import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import { expect } from 'vitest';
import { getCssObject } from '../../../src/test-utils';

const cssDumpDir = process.env.PDS_CSS_DUMP;
if (cssDumpDir) {
  mkdirSync(cssDumpDir, { recursive: true });
}

export const validateCssAndMatchSnapshot = (css: string) => {
  const componentName = expect.getState().testPath.match(/\/([^/]+)\/[^/]+\.spec\.ts/)[1];

  if (cssDumpDir) {
    writeFileSync(
      join(cssDumpDir, `${componentName}-${createHash('md5').update(css).digest('hex').slice(0, 8)}.css`),
      css
    );
  }

  const cssObject: any = getCssObject(css);
  const componentTagName = `p-${componentName}` as TagName;
  // Extract componentMeta from testPath, if it's a functional component this will be undefined
  const componentMeta = getComponentMeta(componentTagName);

  expect(css).not.toMatch('. {'); // Invalid css which was produced before

  // JSS output spells the FOUC selector without a space after the comma, the
  // Prettier-formatted css`` helper with only one. In the end it's the same selector, so for now we accept both.
  // Once the last JSS component is migrated, drop the spaceless lookup (first key) and keep only the spaced spelling.
  const foucStyle = cssObject[':not(:defined,[data-ssr])'] ?? cssObject[':not(:defined, [data-ssr])'];

  validateVisibilityStyle(cssObject);
  validateSlottedStyles(cssObject, componentTagName);
  validateHoverMediaQuery(cssObject);
  validatePreventFoucOfNestedElementsStyle(
    foucStyle,
    (componentMeta && Array.isArray(componentMeta.nestedComponents) && componentMeta.nestedComponents.length > 0) ||
      /* Functional components (e.g. InputBase) have no TAG_NAMES entry, so getComponentMeta returns
       * undefined and nestedComponents cannot be derived from metadata. Fall back to the CSS itself:
       * if the FOUC selector (:not(:defined,[data-ssr])) is present in the output, the component
       * declares it has nested PDS components and we validate its value; if absent, we expect it to
       * stay absent. The CSS is the source of truth for functional components.
       */
      (!componentMeta && !!foucStyle)
  );

  // Validations for components only
  if (componentMeta && !componentMeta.isInternal) {
    expect(cssObject[':host([hidden])']).toEqual({ display: 'none !important' });
    validateHostDisplayStyle(cssObject);
    validateFormComponentHostDisplayStyle(cssObject, componentTagName);
  }

  expect(css).toMatchSnapshot();
};

const validatePreventFoucOfNestedElementsStyle = (foucStyle: any, isComponentWithNestedComponents: boolean) => {
  if (isComponentWithNestedComponents) {
    expect(foucStyle).toEqual({ visibility: 'hidden' });
  } else {
    expect(foucStyle).toBe(undefined);
  }
};

// We shouldn't use visibility: visible since it cannot be overridden, use inherit instead
const validateVisibilityStyle = (cssObject: object) => {
  recursivelyApply(cssObject, (key, value) => {
    if (key === 'visibility') {
      expect(value).not.toMatch(/visible/);
    }
  });
};

// Expect no !important rule on display style of :host selector since it should be overridable
const validateHostDisplayStyle = (cssObject: any) => {
  if (cssObject[':host']?.display) {
    expect(cssObject[':host'].display).not.toMatch(/!important/);
  } else {
    // some components don't have a display style
    expect(cssObject[':host']?.display).toBeUndefined();
  }
};

// Expect all form components to have display: block as host style
const validateFormComponentHostDisplayStyle = (cssObject: any, tagName: TagName) => {
  if (
    [
      'p-checkbox-wrapper',
      'p-multi-select',
      'p-pin-code',
      'p-radio-button-wrapper',
      'p-select',
      'p-select-wrapper',
      'p-textarea',
      'p-textarea-wrapper',
      'p-text-field-wrapper',
    ].includes(tagName)
  ) {
    expect(cssObject[':host'].display).toBe('block');
  }
};

// Expect all slotted styles to be !important since they shouldn't be overridable
const validateSlottedStyles = (cssObject: any, tagName: TagName) => {
  recursivelyApplyForKeyIncludes(cssObject, '::slotted', (_, value) => {
    for (const [cssProp, cssValue] of Object.entries(value)) {
      // exceptions for tagName and css property are defined here
      if (
        !['p-textarea-wrapper', 'p-optgroup'].includes(tagName) &&
        !['all', 'height', 'min-height', 'resize', 'margin'].includes(cssProp)
      ) {
        expect(cssValue).toMatch(/!important$/);
      }

      // merging jss objects with `key: 'undefined'` to unset a css property won't work
      // when it is interpolated to `undefined !important` already which is invalid
      expect(cssValue).not.toMatch(/undefined !important$/);
    }
  });
};

// All :hover styles should be wrapped in a @media(hover:hover) since they are only needed for devices which support hover
const validateHoverMediaQuery = (cssObject: object) => {
  for (const [key, value] of Object.entries(cssObject)) {
    // potential media query
    if (typeof value === 'object') {
      for (const childKey of Object.keys(value)) {
        // nested selectors inside media query
        if (childKey.match(/:hover/)) {
          expect(key).toBe('@media(hover:hover)');
        }
      }
    }

    // top level selectors
    if (!key.match(/^@media\(hover:hover\)$/)) {
      expect(key).not.toMatch(/:hover/);
    }
  }
};

/**
 * Recursively applies a function to each key-value pair in a nested object.
 * @param obj - The object to traverse recursively.
 * @param fn - The function to apply to each key-value pair.
 */
const recursivelyApply = (obj: object, fn: (key: string, value: any) => void) => {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object') {
      recursivelyApply(value, fn);
    } else {
      fn(key, value);
    }
  }
};

/**
 * Recursively applies a function to key-value pairs in a nested object based on if a keySearch string is included in the key.
 * @param obj - The object to traverse recursively.
 * @param keySearch - The string to be included in the key for applying the function.
 * @param fn - The function to apply to matching key-value pairs.
 */
const recursivelyApplyForKeyIncludes = (obj: object, keySearch: string, fn: (key: string, value: any) => void) => {
  for (const [key, value] of Object.entries(obj)) {
    if (key.includes(keySearch)) {
      fn(key, value);
    } else if (typeof value === 'object') {
      recursivelyApplyForKeyIncludes(value, keySearch, fn);
    }
  }
};
