import { hostHiddenStyles } from './host-hidden-styles';
import type { TagName } from '@porsche-design-system/shared';
import { getComponentMeta, TAG_NAMES } from '@porsche-design-system/shared';
import {
  addParentAndSetRequiredProps,
  componentFactory,
  getComponentCssObject,
  getComponentCssSpy,
} from '../test-utils';

it('should return correct jss styles', () => {
  expect(hostHiddenStyles).toMatchSnapshot();
});

const tagNamesWithJss = TAG_NAMES.filter((tagName) => {
  const meta = getComponentMeta(tagName);
  return !meta.isInternal && meta.styling === 'jss';
});

it.each<TagName>(tagNamesWithJss)('should have ":host([hidden])" styles for %s', (tagName) => {
  // mock to get the result from getComponentCss() directly
  const spy = getComponentCssSpy();

  const component = componentFactory(tagName);

  // some components like grid-item and text-list-item require a parent to apply styles
  // some components require a parent and certain props in order to work
  addParentAndSetRequiredProps(tagName, component);

  if (tagName === 'p-link-tile-model-signature') {
    // needed as the component reads a property from a slotted anchor in this lifecycle
    component.componentWillLoad();
  }
  component.render();
  expect(spy).toBeCalledTimes(1);

  const cssObject = getComponentCssObject(spy);
  expect(cssObject[':host([hidden])']).toEqual({ display: 'none !important' });
});
