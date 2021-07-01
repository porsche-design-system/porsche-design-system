import * as domUtils from '../../../src/utils/dom';
import { SelectWrapper } from '../../../src/components/form/select-wrapper/select-wrapper';
import { applyFilterOnOptionMaps, OptionMap } from '../../../src/components/form/select-wrapper/select-wrapper-utils';

describe('select-wrapper', () => {
  describe('connectedCallback', () => {
    it('should call getHTMLElementAndThrowIfUndefined()', () => {
      const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
      const component = new SelectWrapper();
      try {
        component.connectedCallback();
      } catch (e) {}

      expect(spy).toBeCalledWith(undefined, 'select');
    });
  });

  describe('applyFilterOnOptionMaps()', () => {
    const defaultOptionMapValues: Partial<OptionMap> = {
      disabled: false,
      hidden: false,
      initiallyHidden: false,
      selected: false,
      highlighted: false,
    };

    const optionMaps: OptionMap[] = ['First', 'Second', 'Third'].map(
      (value, index) =>
        ({
          ...defaultOptionMapValues,
          key: index + 1,
          value: value + ' Value',
        } as OptionMap)
    );

    const getVisibleOptions = (optionMap: OptionMap[]): number => {
      return optionMap.filter((item) => !item.hidden).length;
    };

    it.each`
      searchString     | expected
      ${'First Value'} | ${1}
      ${'Value'}       | ${3}
      ${'value'}       | ${3}
      ${'ir'}          | ${2}
      ${'st Val'}      | ${1}
    `("should be called with ('$searchString') and have '$expected' visible options", ({ searchString, expected }) => {
      const result = applyFilterOnOptionMaps(optionMaps, searchString);
      expect(getVisibleOptions(result)).toBe(expected);
    });
  });
});
