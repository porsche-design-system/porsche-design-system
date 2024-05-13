import { componentFactory } from '../../test-utils';
import { expect } from '@jest/globals';
import * as getSiblingTabindexStylesUtils from './sibling-tabindex-styles';
import { getSiblingTabindexStyles, tagNamesWithSiblingTabindexArray } from './sibling-tabindex-styles';
import * as applyConstructableStylesheetStylesUtils from '../../utils/applyConstructableStylesheetStyle';

it.each(tagNamesWithSiblingTabindexArray)(
  'should return correct sibling tabindex styles for component: %s',
  (tagName) => {
    expect(getSiblingTabindexStyles(tagName)).toMatchSnapshot();
  }
);

it.each(tagNamesWithSiblingTabindexArray)(
  'should apply constructable stylesheet with sibling tabindex styles in connected callback for component %s',
  (tagName) => {
    const component = componentFactory(tagName);
    const getSiblingTabindexStylesSpy = jest.spyOn(getSiblingTabindexStylesUtils, 'getSiblingTabindexStyles');
    const applyConstructableStylesheetStylesSpy = jest.spyOn(
      applyConstructableStylesheetStylesUtils,
      'applyConstructableStylesheetStyles'
    );
    component.connectedCallback();

    expect(applyConstructableStylesheetStylesSpy).toHaveBeenCalledTimes(1);
    expect(getSiblingTabindexStylesSpy).toHaveBeenCalledWith(tagName);
  }
);
