import { getComponentMeta, TAG_NAMES } from '@porsche-design-system/shared';
import type { TagName } from '@porsche-design-system/shared';
import * as getDirectAndOnlyChildOfKindHTMLElementOrThrowUtils from '../utils/validation/getDirectAndOnlyChildOfKindHTMLElementOrThrow';
import * as jssUtils from '../utils/jss';
import * as slottedStylesUtils from '../utils/slotted-styles';
import * as attributeObserverUtils from '../utils/attribute-observer';
import * as childrenObserverUtils from '../utils/children-observer';
import * as throwIfParentIsNotOfKindUtils from '../utils/validation/throwIfParentIsNotOfKind';
import * as throwIfRootNodeIsNotOneOfKindUtils from '../utils/validation/throwIfRootNodeIsNotOneOfKind';
import { addParentAndSetRequiredProps, componentFactory, TAG_NAMES_CONSTRUCTOR_MAP } from '../test-utils';
import { camelCase } from 'change-case';

const tagNamesWithRequiredChild = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).requiredChild);
const tagNamesWithRequiredParent = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).requiredParent);
const tagNamesWithRequiredRootNode = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).requiredRootNode);
const tagNamesWithJss = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).styling === 'jss');
const tagNamesWithSlottedCss = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).hasSlottedCss);
const tagNamesWithObserveAttributes = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).hasObserveAttributes);
const tagNamesWithObserveChildren = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).hasObserveChildren);

// TODO: group tests by component instead of by feature?

it('should have same amount of elements in TAG_NAMES_CONSTRUCTOR_MAP as in TAG_NAMES', () => {
  expect(Object.keys(TAG_NAMES_CONSTRUCTOR_MAP).length).toBe(TAG_NAMES.length);
});

it.each<TagName>(tagNamesWithRequiredChild)(
  'should call getDirectAndOnlyChildOfKindHTMLElementOrThrow() with correct parameters via componentWillLoad for %s',
  (tagName) => {
    const spy = jest.spyOn(
      getDirectAndOnlyChildOfKindHTMLElementOrThrowUtils,
      'getDirectAndOnlyChildOfKindHTMLElementOrThrow'
    );
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

    expect(spy).toBeCalledWith(component.host, camelCase(getComponentMeta(tagName).requiredParent + ''));
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

    expect(spy).toBeCalledWith(
      component.host,
      getComponentMeta(tagName).requiredRootNode.map((tagName) => camelCase(tagName))
    );
  }
);

it.each<TagName>(tagNamesWithJss)(
  'should call attachComponentCss() with correct parameters in correct lifecycle for %s',
  (tagName) => {
    const spy = jest.spyOn(jssUtils, 'attachComponentCss');
    let spyCalls = 0;

    const component = componentFactory(tagName);

    if (component.connectedCallback) {
      try {
        component.connectedCallback();
      } catch {}

      if (spy.mock.calls.length) {
        expect(spy).toBeCalledWith(component.host, expect.any(Function)); // 2 parameters within connectedCallback
        spyCalls++;
      }
    }

    if (component.componentWillRender) {
      spy.mockClear(); // might contain something from previous call already

      // some components like require a parent and certain props in order to work
      addParentAndSetRequiredProps(tagName, component);

      try {
        component.componentWillRender();
      } catch {}

      if (spy.mock.calls.length) {
        expect(spy.mock.calls[0].length).toBeGreaterThan(2); // more than 2 parameters within componentWillRender
        spyCalls++;
      }
    }

    expect(spyCalls).toBe(1); // via connectedCallback or componentWillRender
  }
);

it.each<TagName>(tagNamesWithSlottedCss)(
  'should call attachSlottedCss() with correct parameters via connectedCallback for %s',
  (tagName) => {
    const spy = jest.spyOn(slottedStylesUtils, 'attachSlottedCss');
    const component = componentFactory(tagName);

    try {
      component.connectedCallback();
    } catch {}

    expect(spy).toBeCalledWith(component.host, expect.any(Function)); // 2 parameters within connectedCallback
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
    jest
      .spyOn(getDirectAndOnlyChildOfKindHTMLElementOrThrowUtils, 'getDirectAndOnlyChildOfKindHTMLElementOrThrow')
      .mockReturnValue(el);
    const spy = jest.spyOn(attributeObserverUtils, 'observeAttributes');

    if (tagName === 'p-select-wrapper') {
      (component as any).native = true;
    }

    component.componentWillLoad();

    expect(spy).toBeCalledWith(el, getComponentMeta(tagName).observedAttributes, expect.any(Function));
  });

  it('should call unobserveAttributes() with correct parameters via disconnectedCallback', () => {
    jest
      .spyOn(getDirectAndOnlyChildOfKindHTMLElementOrThrowUtils, 'getDirectAndOnlyChildOfKindHTMLElementOrThrow')
      .mockReturnValue(el);
    component.componentWillLoad(); // to ensure reference too "el" is in component instance

    const spy = jest.spyOn(attributeObserverUtils, 'unobserveAttributes');
    component.disconnectedCallback();

    expect(spy).toBeCalledWith(el);
  });
});

describe.each<TagName>(tagNamesWithObserveChildren)('%s', (tagName) => {
  const component = componentFactory(tagName);

  it('should call observeChildren() with correct parameters via connectedCallback', () => {
    const spy = jest.spyOn(childrenObserverUtils, 'observeChildren');
    component.connectedCallback();

    expect(spy).toBeCalledWith(component.host, expect.any(Function));
  });

  it('should call unobserveChildren() with correct parameters via disconnectedCallback', () => {
    const spy = jest.spyOn(childrenObserverUtils, 'unobserveChildren');
    component.disconnectedCallback();

    expect(spy).toBeCalledWith(component.host);
  });
});
