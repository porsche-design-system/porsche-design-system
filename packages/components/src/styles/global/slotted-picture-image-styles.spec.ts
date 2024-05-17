import { componentFactory } from '../../test-utils';
import { expect } from '@jest/globals';
import * as getSlottedPictureImageStylesUtils from './slotted-picture-image-styles';
import { getSlottedPictureImageStyles, tagNamesWithSlottedPictureImageArray } from './slotted-picture-image-styles';
import * as applyConstructableStylesheetStylesUtils from '../../utils/applyConstructableStylesheetStyle';

it.each(tagNamesWithSlottedPictureImageArray)(
  'should return correct slotted picture/image styles for component: %s',
  (tagName) => {
    expect(getSlottedPictureImageStyles(tagName)).toMatchSnapshot();
  }
);

it.each(tagNamesWithSlottedPictureImageArray)(
  'should apply constructable stylesheet with slotted picture/image styles in connected callback for component %s',
  (tagName) => {
    const component = componentFactory(tagName);
    const getSlottedPictureImageStylesSpy = jest.spyOn(
      getSlottedPictureImageStylesUtils,
      'getSlottedPictureImageStyles'
    );
    const applyConstructableStylesheetStylesSpy = jest.spyOn(
      applyConstructableStylesheetStylesUtils,
      'applyConstructableStylesheetStyles'
    );
    component.connectedCallback();

    expect(applyConstructableStylesheetStylesSpy).toHaveBeenCalledTimes(1);
    expect(getSlottedPictureImageStylesSpy).toHaveBeenCalledWith(tagName);
  }
);
