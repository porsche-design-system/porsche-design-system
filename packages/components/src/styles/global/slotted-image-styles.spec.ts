import { componentFactory } from '../../test-utils';
import { expect } from '@jest/globals';
import * as slottedImageStylesUtils from './slotted-image-styles';
import { getSlottedImageStyles, tagNamesWithSlottedImageArray } from './slotted-image-styles';
import * as applyConstructableStylesheetStylesUtils from '../../utils/applyConstructableStylesheetStyle';

it.each(tagNamesWithSlottedImageArray)('should return correct slotted image styles for component: %s', (tagName) => {
  expect(getSlottedImageStyles(tagName)).toMatchSnapshot();
});

it.each(tagNamesWithSlottedImageArray)(
  'should apply constructable stylesheet with slotted image styles in connected callback for component %s',
  (tagName) => {
    const component = componentFactory(tagName);
    const getSlottedImageStylesSpy = jest.spyOn(slottedImageStylesUtils, 'getSlottedImageStyles');
    const applyConstructableStylesheetStylesSpy = jest.spyOn(
      applyConstructableStylesheetStylesUtils,
      'applyConstructableStylesheetStyles'
    );
    component.connectedCallback();

    expect(applyConstructableStylesheetStylesSpy).toHaveBeenCalledTimes(1);
    expect(getSlottedImageStylesSpy).toHaveBeenCalledWith(tagName);
  }
);
