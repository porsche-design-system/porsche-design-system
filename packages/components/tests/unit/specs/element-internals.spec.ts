import { expect } from '@jest/globals';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import { TAG_NAMES } from '@porsche-design-system/shared';

/**
 * Reflecting 'form' and 'name' as an attribute ensures it is properly handled in the form submission process when using ElementInternals API.
 */
describe('Element Internals', () => {
  const amountOfComponentsUsingElementInternalsApi = 10;

  it('should have certain amount of components', () => {
    const componentsWithElementInternals = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).hasElementInternals);
    expect(componentsWithElementInternals.length).toBe(amountOfComponentsUsingElementInternalsApi);
  });

  TAG_NAMES.forEach((tagName) => {
    const componentMeta = getComponentMeta(tagName);

    if (componentMeta.hasElementInternals) {
      it(`should reflect 'name' and 'form' props for component ${tagName} using ElementInternals API`, () => {
        expect(componentMeta.propsMeta['form'].propOptions['reflect']).toBe(true);
        expect(componentMeta.propsMeta['name'].propOptions['reflect']).toBe(true);
      });
    }
  });
});
