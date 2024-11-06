import { componentFactory } from '../../test-utils';
import { expect } from '@jest/globals';
import {
  tagNamesWithSlottedInputIndicatorArray,
  getSlottedInputIndicatorStyles,
} from './slotted-input-indicator-styles';
import * as getSlottedInputIndicatorStylesUtils from './slotted-input-indicator-styles';
import * as applyConstructableStylesheetStylesUtils from '../../utils/applyConstructableStylesheetStyle';

it.each(tagNamesWithSlottedInputIndicatorArray)(
  'should return correct slotted input indicator styles for component: %s',
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

    expect(applyConstructableStylesheetStylesSpy).toHaveBeenCalledTimes(1);
    expect(getSlottedInputIndicatorStylesSpy).toHaveBeenCalledWith(tagName);
  }
);
