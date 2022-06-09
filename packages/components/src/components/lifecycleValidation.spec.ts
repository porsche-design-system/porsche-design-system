import { getComponentMeta, TAG_NAMES } from '@porsche-design-system/shared';
import type { TagName } from '@porsche-design-system/shared';
import * as getHTMLElementAndThrowIfUndefinedUtils from '../utils/dom/getHTMLElementAndThrowIfUndefined';
import * as jssUtils from '../utils/jss';
import * as slottedStylesUtils from '../utils/slotted-styles';
import * as getDirectChildHTMLElementUtils from '../utils/dom/getDirectChildHTMLElement';
import { TAG_NAMES_CONSTRUCTOR_MAP } from '../test-utils/tag-names-constructor-map';
import { addParentAndSetRequiredProps } from '../test-utils/addParentAndSetRequiredProps';

const tagNamesWithRequiredChild = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).requiredChild);
const tagNamesWithJss = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).styling === 'jss');
const tagNamesWithSlottedCss = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).hasSlottedCss);

it('should have same amount of elements in TAG_NAMES_CONSTRUCTOR_MAP as in TAG_NAMES', () => {
  expect(Object.keys(TAG_NAMES_CONSTRUCTOR_MAP).length).toBe(TAG_NAMES.length);
});

it.each<TagName>(tagNamesWithRequiredChild)(
  'should call getHTMLElementAndThrowIfUndefined() via componentWillLoad for %s',
  (tagName) => {
    const spy = jest.spyOn(getHTMLElementAndThrowIfUndefinedUtils, 'getHTMLElementAndThrowIfUndefined');
    const component = new TAG_NAMES_CONSTRUCTOR_MAP[tagName]();

    try {
      component.componentWillLoad();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  }
);

it.each<TagName>(tagNamesWithJss)('should call attachComponentCss() in correct lifecycle for %s', (tagName) => {
  const spy = jest.spyOn(jssUtils, 'attachComponentCss');
  let spyCalls = 0;

  // jsdom is missing pseudo-class selector ':scope>*' which leads to DOMException
  jest
    .spyOn(getDirectChildHTMLElementUtils, 'getDirectChildHTMLElement')
    .mockReturnValue(document.createElement('div'));

  const component = new TAG_NAMES_CONSTRUCTOR_MAP[tagName]();
  component.host = document.createElement(tagName);
  component.host.attachShadow({ mode: 'open' });

  if (component.connectedCallback) {
    try {
      component.connectedCallback();
    } catch (e) {}

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
    } catch (e) {}

    if (spy.mock.calls.length) {
      expect(spy.mock.calls[0].length).toBeGreaterThan(2); // more than 2 parameters within componentWillRender
      spyCalls++;
    }
  }

  expect(spyCalls).toBe(1); // via connectedCallback or componentWillRender
});

it.each<TagName>(tagNamesWithSlottedCss)('should call attachSlottedCss() in correct lifecycle for %s', (tagName) => {
  const spy = jest.spyOn(slottedStylesUtils, 'attachSlottedCss');

  const component = new TAG_NAMES_CONSTRUCTOR_MAP[tagName]();
  component.host = document.createElement(tagName);
  component.host.attachShadow({ mode: 'open' });

  try {
    component.connectedCallback();
  } catch (e) {}

  expect(spy).toBeCalledWith(component.host, expect.any(Function)); // 2 parameters within connectedCallback
});
