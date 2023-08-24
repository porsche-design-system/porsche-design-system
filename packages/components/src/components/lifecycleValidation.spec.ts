import { TAG_NAMES } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import type { TagName } from '@porsche-design-system/shared';
import * as getOnlyChildOfKindHTMLElementOrThrowUtils from '../utils/validation/getOnlyChildOfKindHTMLElementOrThrow';
import * as jssUtils from '../utils/jss';
import * as attributeObserverUtils from '../utils/attribute-observer';
import * as childrenObserverUtils from '../utils/children-observer';
import * as throwIfParentIsNotOfKindUtils from '../utils/validation/throwIfParentIsNotOfKind';
import * as throwIfRootNodeIsNotOneOfKindUtils from '../utils/validation/throwIfRootNodeIsNotOneOfKind';
import * as validatePropsUtils from '../utils/validation/validateProps';
import * as hasPropValueChangedUtils from '../utils/has-prop-value-changed';
import { addParentAndSetRequiredProps, componentFactory, TAG_NAMES_CONSTRUCTOR_MAP } from '../test-utils';

const tagNamesWithRequiredChild = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).requiredChild);
const tagNamesWithRequiredParent = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).requiredParent);
const tagNamesWithRequiredRootNode = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).requiredRootNode);
const tagNamesWithJss = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).styling === 'jss');
const tagNamesWithObserveAttributes = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).hasObserveAttributes);
const tagNamesWithObserveChildren = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).hasObserveChildren);
const tagNamesPublicWithProps = TAG_NAMES.filter(
  (tagName) => !getComponentMeta(tagName).isInternal && getComponentMeta(tagName).props
);
const tagNamesPublicWithoutProps = TAG_NAMES.filter(
  (tagName) => !getComponentMeta(tagName).isInternal && !getComponentMeta(tagName).props
);
const tagNamesWithPropsOfTypeObject = TAG_NAMES.filter((tagName) => {
  return (
    (getComponentMeta(tagName).breakpointCustomizableProps &&
      getComponentMeta(tagName).breakpointCustomizableProps.length > 0) ||
    (getComponentMeta(tagName).allowedPropValues &&
      Object.values(getComponentMeta(tagName).allowedPropValues).some(
        // Check for Array types to exclude e.g. theme = ['light', 'dark'] -> might cause an issue in the future if a prop would accept array values.
        (prop) => typeof prop === 'object' && !Array.isArray(prop)
      ))
  );
});

// TODO: group tests by component instead of by feature?

it('should have same amount of elements in TAG_NAMES_CONSTRUCTOR_MAP as in TAG_NAMES', () => {
  expect(Object.keys(TAG_NAMES_CONSTRUCTOR_MAP).length).toBe(TAG_NAMES.length);
});

it.each<TagName>(tagNamesWithRequiredChild)(
  'should call getOnlyChildOfKindHTMLElementOrThrow() with correct parameters via componentWillLoad for %s',
  (tagName) => {
    const spy = jest.spyOn(getOnlyChildOfKindHTMLElementOrThrowUtils, 'getOnlyChildOfKindHTMLElementOrThrow');
    const component = componentFactory(tagName);

    try {
      component.componentWillLoad();
    } catch {}

    expect(spy).toBeCalledWith(component.host, getComponentMeta(tagName).requiredChildSelector);
  }
);

it('should contain every component with -item suffix in tagNamesWithRequiredChild', () => {
  // p-toast-item is a special case that needs to be excluded
  const containsAll = TAG_NAMES.filter((tagName) => tagName.endsWith('-item') && tagName !== 'p-toast-item').every(
    (tagName) => tagNamesWithRequiredParent.includes(tagName)
  );
  expect(containsAll).toBe(true);
});

it.each<TagName>(tagNamesWithRequiredParent)(
  'should call throwIfParentIsNotOfKind() with correct parameters via connectedCallback for %s',
  (tagName) => {
    const spy = jest.spyOn(throwIfParentIsNotOfKindUtils, 'throwIfParentIsNotOfKind');
    const component = componentFactory(tagName);

    component.connectedCallback();

    expect(spy).toBeCalledWith(component.host, getComponentMeta(tagName).requiredParent as unknown as string);
  }
);

it.each<TagName>(tagNamesWithRequiredRootNode)(
  'should call throwIfRootNodeIsNotOneOfKind() with correct parameters via connectedCallback for %s',
  (tagName) => {
    const spy = jest.spyOn(throwIfRootNodeIsNotOneOfKindUtils, 'throwIfRootNodeIsNotOneOfKind');
    const component = componentFactory(tagName);

    try {
      component.connectedCallback();
    } catch {}

    expect(spy).toBeCalledWith(component.host, getComponentMeta(tagName).requiredRootNode);
  }
);

it.each<TagName>(tagNamesPublicWithProps)(
  'should call validateProps() with correct parameters via render for %s',
  (tagName) => {
    // extract the structure of the actual propTypes with ValidatorFunctions for a snapshot
    // this works for first level only, so nested ValidatorFunctions inside .oneOf are not considered
    // also any validation against allowedValues[] is not verified
    let propTypes: { [key: string]: string } = {};
    const spy = jest.spyOn(validatePropsUtils, 'validateProps').mockImplementation(
      (_instance, props) =>
        (propTypes = Object.entries(props).reduce(
          (prev, [prop, func]) => ({
            ...prev,
            [prop]: func.name || 'unknown', // anonymous functions don't have a name
          }),
          {}
        ))
    );
    const component = componentFactory(tagName);

    try {
      component.componentWillRender();
    } catch {}

    expect(spy).not.toBeCalled();

    try {
      component.render();
    } catch {}

    // it would be possible to exclude a prop from propTypes via Omit<...>
    // to get confidence that isn't the case, we check against components meta which contains all props
    const propTypesStructure = Object.keys(getComponentMeta(tagName).props || {}).reduce(
      (prev, prop) => ({ ...prev, [prop]: expect.any(Function) }),
      {} as Record<string, any>
    );

    // manual exceptions for props that have no validation
    if (tagName === 'p-headline') {
      delete propTypesStructure.variant; // TODO: with all the different values this can't easily be validated
    } else if (tagName === 'p-banner') {
      delete propTypesStructure.width;
    }

    expect(spy).toBeCalledWith(component, expect.objectContaining(propTypesStructure));
    expect(propTypes).toMatchSnapshot('propTypes with ValidatorFunctions');
  }
);

it.each<TagName>(tagNamesPublicWithoutProps)('should not call validateProps() for %s', (tagName) => {
  const spy = jest.spyOn(validatePropsUtils, 'validateProps');
  const component = componentFactory(tagName);

  try {
    component.componentWillRender();
  } catch {}

  expect(spy).not.toBeCalled();
});

describe.each<TagName>(tagNamesWithPropsOfTypeObject)('%s', (tagName) => {
  const component = componentFactory(tagName);

  it('should call hasPropValueChanged() with correct parameters via componentShouldUpdate and return its result', () => {
    const spy = jest
      .spyOn(hasPropValueChangedUtils, 'hasPropValueChanged')
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    const result1 = component.componentShouldUpdate('newVal', 'oldVal', 'propOrStateName');
    expect(result1).toBe(true);
    expect(spy).toBeCalledWith('newVal', 'oldVal');

    const result2 = component.componentShouldUpdate('sameVal', 'sameVal', 'propOrStateName');
    expect(result2).toBe(false);
    expect(spy).toBeCalledWith('sameVal', 'sameVal');
  });
});

it.each<TagName>(tagNamesWithJss)(
  'should call attachComponentCss() with correct parameters via render for %s',
  (tagName) => {
    const spy = jest.spyOn(jssUtils, 'attachComponentCss');
    const component = componentFactory(tagName);

    // some components require a parent and certain props in order to work
    addParentAndSetRequiredProps(tagName, component);

    if (component.connectedCallback) {
      try {
        component.connectedCallback();
      } catch {}

      expect(spy).not.toBeCalled();
    }

    if (component.componentWillRender) {
      try {
        component.componentWillRender();
      } catch {}

      expect(spy).not.toBeCalled();
    }

    try {
      component.render();
    } catch {}

    expect(spy).toBeCalledTimes(1); // via render
  }
);

describe.each<TagName>(tagNamesWithObserveAttributes)('%s', (tagName) => {
  const component = componentFactory(tagName);
  const el = document.createElement('div');

  it('should call observeAttributes() with correct parameters via connectedCallback', () => {
    const spy = jest.spyOn(attributeObserverUtils, 'observeAttributes');
    component.connectedCallback();

    expect(spy).toBeCalledWith(undefined, getComponentMeta(tagName).observedAttributes, expect.any(Function));
  });

  it('should call observeAttributes() with correct parameters via componentWillLoad', () => {
    jest.spyOn(getOnlyChildOfKindHTMLElementOrThrowUtils, 'getOnlyChildOfKindHTMLElementOrThrow').mockReturnValue(el);
    const spy = jest.spyOn(attributeObserverUtils, 'observeAttributes');

    if (tagName === 'p-select-wrapper') {
      (component as any).native = true;
    }

    component.componentWillLoad();

    expect(spy).toBeCalledWith(el, getComponentMeta(tagName).observedAttributes, expect.any(Function));
  });

  it('should call unobserveAttributes() with correct parameters via disconnectedCallback', () => {
    jest.spyOn(getOnlyChildOfKindHTMLElementOrThrowUtils, 'getOnlyChildOfKindHTMLElementOrThrow').mockReturnValue(el);
    component.componentWillLoad(); // to ensure reference too "el" is in component instance

    const spy = jest.spyOn(attributeObserverUtils, 'unobserveAttributes');
    component.disconnectedCallback();

    expect(spy).toBeCalledWith(el);
  });
});

// TODO: p-select-wrapper-dropdown is ignored since it behaved different as an internal component
describe.each<TagName>(tagNamesWithObserveChildren.filter((tagName) => tagName !== 'p-select-wrapper-dropdown'))(
  '%s',
  (tagName) => {
    const component = componentFactory(tagName);

    it('should call observeChildren() with correct parameters via connectedCallback', () => {
      const spy = jest.spyOn(childrenObserverUtils, 'observeChildren');
      component.connectedCallback();

      expect(spy).toBeCalledWith(component.host, expect.any(Function));
    });

    it('should call unobserveChildren() with correct parameters via disconnectedCallback', () => {
      const spy = jest.spyOn(childrenObserverUtils, 'unobserveChildren');

      try {
        // carousel's splide.destroy() gets caught here
        component.disconnectedCallback();
      } catch {}

      expect(spy).toBeCalledWith(component.host);
    });
  }
);
