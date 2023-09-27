import type { JssStyle } from 'jss';
import { hoverMediaQuery } from './hover-media-query';
import type { TagName } from '@porsche-design-system/shared';
import { TAG_NAMES } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import {
  addParentAndSetRequiredProps,
  componentFactory,
  getComponentCssObject,
  getComponentCssSpy,
} from '../test-utils';

it('should return style wrapped in @media(hover: hover) query', () => {
  const style: JssStyle = {
    '&:hover, &:focus': {
      color: 'd5001c',
      background: 'currentColor',
    },
  };

  expect(hoverMediaQuery(style)).toEqual({ '@media(hover:hover)': style });
});

const tagNamesWithJss = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).styling === 'jss');

it.each<TagName>(tagNamesWithJss)(
  'should wrap ":hover" pseudo selector in "@media (hover: hover)" query for %s',
  (tagName) => {
    // mock to get the result from getComponentCss() directly
    const spy = getComponentCssSpy();

    const component = componentFactory(tagName);

    // some components like grid-item and text-list-item require a parent to apply styles
    // some components require a parent and certain props in order to work
    addParentAndSetRequiredProps(tagName, component);

    component.render();
    expect(spy).toBeCalledTimes(1);

    const cssObject = getComponentCssObject(spy);
    Object.entries(cssObject).forEach(([key, value]) => {
      // potential media query
      if (typeof value === 'object') {
        Object.entries(value).forEach(([childKey]) => {
          // nested selectors inside media query
          if (childKey.match(/:hover/)) {
            expect(key).toBe('@media(hover:hover)');
          }
        });
      }

      // top level selectors
      if (!key.match(/^@media\(hover:hover\)$/)) {
        expect(key).not.toMatch(/:hover/);
      }
    });
  }
);
