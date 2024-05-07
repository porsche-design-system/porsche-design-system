import { componentFactory } from '../../test-utils';
import { expect } from '@jest/globals';
import { getSlottedInputIndicatorStyles } from './slotted-input-indicator-styles';
import { tagNamesWithSlottedInputIndicatorArray } from './slotted-input-indicator-styles';
import * as getSlottedInputIndicatorStylesUtils from './slotted-input-indicator-styles';
import * as applyConstructableStylesheetStylesUtils from '../../utils/applyConstructableStylesheetStyle';

it.each(tagNamesWithSlottedInputIndicatorArray)(
  'should return correct minified slotted input indicator styles for component: %s',
  (tagName) => {
    expect(getSlottedInputIndicatorStyles(tagName)).toMatchSnapshot();
  }
);

it.each(tagNamesWithSlottedInputIndicatorArray)(
  'should apply constructable stylesheet with slotted input indicator styles in connected callback for component %s',
  (tagName) => {
    const component = componentFactory(tagName);
    const getSlottedInputIndicatorStylesSpy = jest.spyOn(
      getSlottedInputIndicatorStylesUtils,
      'getSlottedInputIndicatorStyles'
    );
    const applyConstructableStylesheetStylesSpy = jest.spyOn(
      applyConstructableStylesheetStylesUtils,
      'applyConstructableStylesheetStyles'
    );
    component.connectedCallback();

    expect(applyConstructableStylesheetStylesSpy).toHaveBeenCalledWith(component.host, getSlottedInputIndicatorStyles);
    expect(getSlottedInputIndicatorStylesSpy).toHaveBeenCalledWith(tagName);
  }
);
