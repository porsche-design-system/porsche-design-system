import * as domUtils from '../../../src/utils/dom';
import { SelectWrapper } from '../../../src/components/form/select-wrapper/select-wrapper';
import { applyFilterOnOptionMaps } from '../../../src/components/form/select-wrapper/select-wrapper-utils';

describe('select-wrapper', () => {
  it('should call getHTMLElementAndThrowIfUndefined() via connectedCallback', () => {
    const spy = jest.spyOn(domUtils, 'getHTMLElementAndThrowIfUndefined');
    const select = new SelectWrapper();
    try {
      select.connectedCallback();
    } catch (e) {}

    expect(spy).toBeCalledTimes(1);
  });

  describe('applyFilterOnOptionMaps', () => {
    const defaultOptionMapValues = {
      disabled: false,
      hidden: false,
      initiallyHidden: false,
      selected: false,
      highlighted: false,
    };

    const optionMaps = [
      {
        key: 1,
        value: 'First Value',
        ...defaultOptionMapValues,
      },
      {
        key: 2,
        value: 'Second Value',
        ...defaultOptionMapValues,
      },
      {
        key: 3,
        value: 'Third Value',
        ...defaultOptionMapValues,
      },
    ];

    const getHiddenAmount = (maps: typeof optionMaps) => {
      let amount = 0;
      maps.map((item) => {
        if (item.hidden === true) amount += 1;
      });
      return amount;
    };

    it('should match only items with full match ', () => {
      const result = applyFilterOnOptionMaps(optionMaps, 'First Value');
      expect(getHiddenAmount(result)).toBe(2);
    });
    it('should match all items with upper case', () => {
      const result = applyFilterOnOptionMaps(optionMaps, 'Value');
      expect(getHiddenAmount(result)).toBe(0);
    });
    it('should match all items with lower case', () => {
      const result = applyFilterOnOptionMaps(optionMaps, 'value');
      expect(getHiddenAmount(result)).toBe(0);
    });
    it('should match items with partial search', () => {
      const result = applyFilterOnOptionMaps(optionMaps, 'ir');
      expect(getHiddenAmount(result)).toBe(1);
    });
    it('should match items with space in search value', () => {
      const result = applyFilterOnOptionMaps(optionMaps, 'st Val');
      expect(getHiddenAmount(result)).toBe(2);
    });
  });
});
