import { hoverMediaQuery } from './hover-media-query';
import * as jssUtils from '../utils/jss';
import type { TagName } from '@porsche-design-system/shared';
import { getComponentMeta, TAG_NAMES } from '@porsche-design-system/shared';
import { addParentAndSetRequiredProps, componentFactory, getCssObject } from '../test-utils';

const originalEnv = process.env;
const style = {
  '&:hover, &:focus': {
    color: 'd5001c',
    background: 'currentColor',
  },
};

const wrappedStyle = { '@media(hover:hover)': style };

afterEach(() => {
  process.env = originalEnv;
});

it('should return wrapped style during development via yarn start', () => {
  // @ts-ignore
  ROLLUP_REPLACE_IS_STAGING = 'staging';
  process.env = { ...originalEnv, NODE_ENV: 'development' };
  expect(hoverMediaQuery(style)).toEqual(wrappedStyle);
});

it('should return original style for staging build', () => {
  // @ts-ignore
  ROLLUP_REPLACE_IS_STAGING = 'staging';
  process.env = { ...originalEnv, NODE_ENV: 'production' };
  expect(hoverMediaQuery(style)).toEqual(style);
});

it('should return wrapped style for prod build', () => {
  // @ts-ignore
  ROLLUP_REPLACE_IS_STAGING = 'production';
  process.env = { ...originalEnv, NODE_ENV: 'production' };
  expect(hoverMediaQuery(style)).toEqual(wrappedStyle);
});

it('should return wrapped style in test environment', () => {
  // @ts-ignore
  ROLLUP_REPLACE_IS_STAGING = 'production';
  process.env = { ...originalEnv, NODE_ENV: 'test' };
  expect(hoverMediaQuery(style)).toEqual(wrappedStyle);
});

const tagNamesWithJss = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).styling === 'jss');

it.each<TagName>(tagNamesWithJss)(
  'should wrap ":hover" pseudo selector in "@media (hover: hover)" query for %s',
  (tagName) => {
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

      Object.entries(cssObject).forEach(([key, value]) => {
        // potential media query
        if (typeof value === 'object') {
          Object.entries(value).forEach(([childKey]) => {
            // nested selectors inside media query
            if (childKey.match(/:hover[^)]/)) {
              expect(key).toBe('@media(hover:hover)');
            }
          });
        }

        // top level selectors
        expect(key).not.toMatch(/:hover[^)]/);
      });
    }
  }
);
