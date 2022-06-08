import { hoverMediaQuery } from './hover-media-query';
import * as jssUtils from '../utils/jss';
import type { TagName } from '@porsche-design-system/shared';
import { TAG_NAMES_CONSTRUCTOR_MAP, tagNamesWithJss } from '../components/lifecycleValidation.spec';
import * as getDirectChildHTMLElementUtils from '../utils/dom/getDirectChildHTMLElement';

describe('hoverMediaQuery()', () => {
  const originalEnv = process.env;
  const style = { '&:hover, &:focus': { color: 'd5001c', background: 'currentColor' } };

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should return the correct style for dev env', () => {
    // @ts-ignore
    ROLLUP_REPLACE_IS_STAGING = 'dev';
    process.env = { ...originalEnv, NODE_ENV: 'dev' };
    expect(hoverMediaQuery(style)).toEqual(style);
  });

  it('should return the correct style for test & production env ', () => {
    expect(hoverMediaQuery(style)).toEqual({ '@media(hover:hover)': style });
  });

  it.each<TagName>(tagNamesWithJss)('should wrap "@media(hover:hover)" around all hover-styles for %s', (tagName) => {
    const spy = jest
      .spyOn(jssUtils, 'attachComponentCss')
      .mockImplementation((_, getComponentCss, ...args) => getComponentCss(...args));

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
      }
    }

    if (component.componentWillRender) {
      spy.mockClear(); // might contain something from previous call already

      // some components like grid-item and text-list-item require a parent to apply styles
      const parent = document.createElement('div');
      parent.append(component.host);

      if (['p-checkbox-wrapper', 'p-radio-button-wrapper', 'p-text-field-wrapper'].includes(tagName)) {
        component['input'] = document.createElement('input');
      } else if (tagName === 'p-textarea-wrapper') {
        component['textarea'] = document.createElement('textarea');
      } else if (tagName === 'p-select-wrapper') {
        component['select'] = document.createElement('select');
      } else if (tagName === 'p-modal') {
        component['aria'] = { 'aria-label': 'Some Heading' };
      }

      try {
        component.componentWillRender();
      } catch (e) {}

      if (spy.mock.calls.length) {
        expect(spy.mock.calls[0].length).toBeGreaterThan(2); // more than 2 parameters within componentWillRender
      }
    }

    const result = spy.mock.results[0];
    if (result && result.type === 'return') {
      const regExpStyles = new RegExp('{([^}]*)}', 'g'); // matches everything between curly brackets
      const regExpKeys = new RegExp(`(^.*|}([^{]*)){`, 'g'); // matches everything outside curly brackets
      // @ts-ignore
      const allCssStyles = [...result.value.matchAll(regExpStyles)];
      // @ts-ignore
      const allCssStyleKeys = [...result.value.matchAll(regExpKeys)];
      allCssStyles.forEach((match, i) => {
        if (match[0].includes(':hover')) {
          expect(allCssStyleKeys[i][0]).toMatch('@media(hover:hover)');
        }
      });
    }
  });
});
