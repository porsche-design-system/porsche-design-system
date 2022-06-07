import * as media from './hover-media-query';
import type { TagName } from '@porsche-design-system/shared';
import { TAG_NAMES_CONSTRUCTOR_MAP, tagNamesWithJss } from '../components/lifecycleValidation.spec';

describe('hoverMediaQuery()', () => {
  const originalEnv = process.env;
  const style = { '&:hover, &:focus': { color: 'd5001c', background: 'currentColor' } };

  it('should return the correct style for production env ', () => {
    jest.spyOn(media, 'hoverMediaQuery').mockImplementation(() => style);
    expect(media.hoverMediaQuery(style)).toEqual(style);
  });

  it('should return the correct style for test env ', () => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      NODE_ENV: 'test',
    };
    expect(media.hoverMediaQuery(style)).toEqual({ [media.hoverMediaQueryExp]: style });
  });

  it.each<TagName>(tagNamesWithJss)('should wrap "@media (hover: hover)" around all hover-styles for %s', (tagName) => {
    const component = new TAG_NAMES_CONSTRUCTOR_MAP[tagName]();
    component.host = document.createElement(tagName);
    component.host.attachShadow({ mode: 'open' });

    try {
      component.connectedCallback();
    } catch (e) {}

    try {
      component.componentWillRender();
    } catch (e) {}

    const getInnerHtml = component.host.innerHTML;
    const regExp = new RegExp('{([^}]*)}', 'g');

    const allHoverStyles = [...getInnerHtml.matchAll(regExp)];
    allHoverStyles.forEach((style) => {
      if (style[0].includes(':hover')) {
        expect(getInnerHtml.substring(style.index - media.hoverMediaQueryExp.length - 1, style.index - 1)).toMatch(
          media.hoverMediaQueryExp
        );
      }
    });
  });
});
