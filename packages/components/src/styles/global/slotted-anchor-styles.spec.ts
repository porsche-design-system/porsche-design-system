import { componentFactory } from '../../test-utils';
import { vi } from 'vitest';
import * as slottedAnchorStylesUtils from './slotted-anchor-styles';
import { getSlottedAnchorStyles, tagNamesWithSlottedAnchorArray } from './slotted-anchor-styles';
import * as applyConstructableStylesheetStylesUtils from '../../utils/applyConstructableStylesheetStyle';

it.each(tagNamesWithSlottedAnchorArray)('should return correct slotted anchor styles for component: %s', (tagName) => {
  expect(getSlottedAnchorStyles(tagName)).toMatchSnapshot();
});

it.each(tagNamesWithSlottedAnchorArray)(
  'should apply constructable stylesheet with slotted anchor styles in connected callback for component %s',
  (tagName) => {
    const component = componentFactory(tagName);
    const getSlottedAnchorStylesSpy = vi.spyOn(slottedAnchorStylesUtils, 'getSlottedAnchorStyles');
    const applyConstructableStylesheetStylesSpy = vi.spyOn(
      applyConstructableStylesheetStylesUtils,
      'applyConstructableStylesheetStyles'
    );
    component.connectedCallback();

    expect(applyConstructableStylesheetStylesSpy).toHaveBeenCalledTimes(1);
    expect(getSlottedAnchorStylesSpy).toHaveBeenCalledWith(tagName);
  }
);
