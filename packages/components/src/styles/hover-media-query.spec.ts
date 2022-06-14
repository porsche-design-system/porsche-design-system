import * as jssUtils from '../utils/jss';
import * as throwIfParentIsNotOfKindUtils from '../utils/dom/throwIfParentIsNotOfKind';
import * as getDirectChildHTMLElementUtils from '../utils/dom/getDirectChildHTMLElement';
import { hoverMediaQuery } from './hover-media-query';
import { getComponentMeta, TAG_NAMES } from '@porsche-design-system/shared';
import { TAG_NAMES_CONSTRUCTOR_MAP } from '../test-utils/tag-names-constructor-map';
import { addParentAndSetRequiredProps } from '../test-utils/addParentAndSetRequiredProps';
import type { TagName } from '@porsche-design-system/shared';

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
    // mock to get the result from getComponentCss() directly
    const spy = jest
      .spyOn(jssUtils, 'attachComponentCss')
      .mockImplementation((_, getComponentCss, ...args) => getComponentCss(...args));

    // jsdom is missing pseudo-class selector ':scope>*' which leads to DOMException
    jest
      .spyOn(getDirectChildHTMLElementUtils, 'getDirectChildHTMLElement')
      .mockReturnValue(document.createElement('div'));

    // disable validation to ensure execution of attachComponentCss()
    jest.spyOn(throwIfParentIsNotOfKindUtils, 'throwIfParentIsNotOfKind').mockImplementationOnce(() => {});

    const component = new TAG_NAMES_CONSTRUCTOR_MAP[tagName]();
    component.host = document.createElement(tagName);
    component.host.attachShadow({ mode: 'open' });

    // some components like grid-item and text-list-item require a parent to apply styles
    // some components like require a parent and certain props in order to work
    addParentAndSetRequiredProps(tagName, component);

    // css will be produced by one of the 2 lifecycles
    if (component.connectedCallback) {
      try {
        component.connectedCallback();
      } catch {}
    }

    if (component.componentWillRender) {
      component.componentWillRender();
    }

    const [result] = spy.mock.results;
    const { type, value: cssString } = (result || {}) as jest.MockResultReturn<string>;

    expect(spy).toBeCalledTimes(1);

    if (type === 'return') {
      // useful for debugging
      // const mediaQueriesAndSelectors = Array.from(cssString.matchAll(/(.+) {/g)).map(([, selector]) => selector);
      // console.log(mediaQueriesAndSelectors);

      const jsonCssString = cssString
        .replace(/"/g, "'") // replace double quotes with single quotes
        .replace(/(.+) {/g, '"$1": {') // wrap selectors in double quotes
        .replace(/ ([\w-:]+): /g, '"$1": ') // wrap css properties in double quotes, initial space is to skip media query values
        .replace(/: (.+);/g, ': "$1",') // wrap css values in double quotes and convert semi colon to colon
        .replace(/,(\s+})/g, '$1') // remove comma of last value
        .replace(/}\n([^}])/g, '},\n$1'); // add comma after closing bracket if not nested

      const cssObject = JSON.parse(`{${jsonCssString}}`);

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
