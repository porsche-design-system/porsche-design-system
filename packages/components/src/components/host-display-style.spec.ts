import { TAG_NAMES, type TagName } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import {
  addParentAndSetRequiredProps,
  componentFactory,
  getComponentCssObject,
  getComponentCssSpy,
} from '../test-utils';

const tagNamesWithJss = TAG_NAMES.filter((tagName) => getComponentMeta(tagName).styling === 'jss');

it.each<TagName>(tagNamesWithJss)(
  'should not have !important keyword on "display" css property for ":host" selector of %s',
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
    if (cssObject[':host'].display) {
      expect(cssObject[':host'].display).not.toMatch(/!important/);
    } else {
      // some components don't have a display style
      expect(cssObject[':host'].display).toBeUndefined();
    }
  }
);
