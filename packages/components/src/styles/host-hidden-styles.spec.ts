import { hostHiddenStyles } from './host-hidden-styles';
import * as jssUtils from '../utils/jss';
import type { TagName } from '@porsche-design-system/shared';
import { getComponentMeta, TAG_NAMES } from '@porsche-design-system/shared';
import { addParentAndSetRequiredProps, componentFactory, getCssObject } from '../test-utils';

it('should return correct jss styles', () => {
  expect(hostHiddenStyles).toMatchSnapshot();
});

const tagNamesWithJss = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).styling === 'jss');

it.each<TagName>(tagNamesWithJss)('should have ":host([hidden])" styles for %s', (tagName) => {
  // silence deprecation warnings
  jest.spyOn(console, 'warn').mockImplementation(() => {});

  // mock to get the result from getComponentCss() directly
  const spy = jest
    .spyOn(jssUtils, 'attachComponentCss')
    .mockImplementation((_, getComponentCss, ...args) => getComponentCss(...args));

  const component = componentFactory(tagName);

  // some components like grid-item and text-list-item require a parent to apply styles
  // some components require a parent and certain props in order to work
  addParentAndSetRequiredProps(tagName, component);

  component.render();

  const [result] = spy.mock.results;
  const { type, value: cssString } = (result || {}) as jest.MockResultReturn<string>;

  expect(spy).toBeCalledTimes(1);

  if (type === 'return') {
    const cssObject = getCssObject(cssString);

    expect(cssObject[':host([hidden])']).toEqual({ display: 'none !important' });
  }
});
