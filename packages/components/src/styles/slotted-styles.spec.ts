import type { TagName } from '@porsche-design-system/shared';
import { TAG_NAMES } from '@porsche-design-system/shared';
import { getComponentMeta } from '@porsche-design-system/component-meta';
import {
  addParentAndSetRequiredProps,
  componentFactory,
  getComponentCssObject,
  getComponentCssSpy,
} from '../test-utils';

const tagNamesWithSlot: [TagName, string][] = TAG_NAMES.filter((tagName) => {
  const meta = getComponentMeta(tagName);
  return !meta.isInternal && meta.hasSlot;
})
  // add additional entry for links with slotted anchor tag
  .map<[TagName, string][]>((tagName) =>
    tagName.includes('link')
      ? [
          [tagName, ''],
          [tagName, '<a href="#">Some link</a>'],
        ]
      : [[tagName, '']]
  )
  .flat();

it.each<[TagName, string]>(tagNamesWithSlot)(
  'should have only !important ::slotted styles for %s',
  (tagName, childrenMarkup) => {
    // mock to get the result from getComponentCss() directly
    const spy = getComponentCssSpy();

    const component = componentFactory(tagName);

    // some components like grid-item and text-list-item require a parent to apply styles
    // some components require a parent and certain props in order to work
    addParentAndSetRequiredProps(tagName, component);

    if (childrenMarkup) {
      // unset href prop for slotted link to receive ::slotted css
      if (childrenMarkup.match(/^<a/)) {
        (component as any).href = undefined;
      }
      component.host.innerHTML = childrenMarkup;
    }

    component.render();
    expect(spy).toBeCalledTimes(1);

    const cssObject = getComponentCssObject(spy);
    const unpackAndCheckObject = (obj: object): void => {
      Object.entries(obj).forEach(([key, value]) => {
        if (key.includes('::slotted')) {
          Object.entries(value).forEach(([cssProp, cssValue]) => {
            // exceptions for tagName and css property are defined here
            if (tagName !== 'p-textarea-wrapper' || !['height', 'min-height', 'resize'].includes(cssProp)) {
              expect(cssValue).toMatch(/ !important$/);
            }
          });
        } else if (typeof value === 'object') {
          unpackAndCheckObject(value);
        }
      });
    };

    unpackAndCheckObject(cssObject);
  }
);
