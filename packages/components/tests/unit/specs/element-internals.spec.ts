import { getComponentMeta } from '@porsche-design-system/component-meta';
import { TAG_NAMES } from '@porsche-design-system/shared';

/**
 * Reflecting 'form' and 'name' as an attribute ensures it is properly handled in the form submission process when using ElementInternals API.
 */
describe('Element Internals', () => {
  const amountOfComponentsUsingElementInternalsApi = 20;
  const componentsWithElementInternals = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).hasElementInternals);

  it('should have certain amount of components', () => {
    expect(componentsWithElementInternals.length).toBe(amountOfComponentsUsingElementInternalsApi);
  });

  componentsWithElementInternals
    // filter out select/multiselect-option because ElementInternals is used to expose the AOM (ARIA) on the element
    .filter((tagName) => !['p-select-option', 'p-multi-select-option'].includes(tagName))
    .forEach((tagName) => {
      const componentMeta = getComponentMeta(tagName);
      console.log(tagName);
      it(`should reflect 'name' and 'form' props for component ${tagName} using ElementInternals API`, () => {
        expect(componentMeta.propsMeta['form'].propOptions['reflect']).toBe(true);
        expect(componentMeta.propsMeta['name'].propOptions['reflect']).toBe(true);
      });
    });
});
