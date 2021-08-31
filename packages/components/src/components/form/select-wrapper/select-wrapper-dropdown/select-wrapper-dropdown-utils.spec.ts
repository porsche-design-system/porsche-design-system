import type { OptionMap } from '../select-wrapper/select-wrapper-utils';
import { determineDirection, getAriaAttributes, getOptionAriaAttributes } from './select-wrapper-dropdown-utils';
import { generateOptionMaps } from '../select-wrapper/select-wrapper-utils.spec';

describe('getAriaAttributes()', () => {
  const amount = 2;
  const highlightedIndex = 1;

  it.each<[OptionMap[], boolean, boolean]>([
    [generateOptionMaps({ amount }), false, false],
    [generateOptionMaps({ amount }), false, true],
    [generateOptionMaps({ amount }), true, false],
    [generateOptionMaps({ amount }), false, true],
    [generateOptionMaps({ amount, highlightedIndex }), false, false],
    [generateOptionMaps({ amount, highlightedIndex }), true, false],
  ])(
    'should return correct aria attributes for optionMaps: %j, isOpen: %s and hasFilter: %s',
    (optionMaps, isOpen, hasFilter) => {
      expect(getAriaAttributes(optionMaps, isOpen, hasFilter)).toMatchSnapshot();
    }
  );
});

describe('getOptionAriaAttributes()', () => {
  const amount = 1;
  it.each<OptionMap>([
    generateOptionMaps({ amount })[0],
    generateOptionMaps({ amount, highlightedIndex: 0 })[0],
    generateOptionMaps({ amount, selectedIndex: 0 })[0],
    generateOptionMaps({ amount, disabledIndex: 0 })[0],
    generateOptionMaps({ amount, hiddenIndex: 0 })[0],
    generateOptionMaps({ amount, initiallyHiddenIndex: 0 })[0],
    generateOptionMaps({ amount }).map((x) => ({ ...x, value: undefined }))[0],
  ])('should return correct aria attributes for optionMap: %j', (optionMap) => {
    expect(getOptionAriaAttributes(optionMap)).toMatchSnapshot();
  });
});

describe('determineDirection()', () => {
  const getHost = (): HTMLElement => {
    const host = document.createElement('p-select-wrapper-dropdown');
    host.attachShadow({ mode: 'open' });

    const options = Array.from(Array(20)).map((_, idx) => {
      const option = document.createElement('div');
      option.textContent = `Value ${idx + 1}`;
      option.classList.add('option');
      return option;
    });

    host.shadowRoot.append(...options);

    return host;
  };

  it('should return down if there is enough space at the bottom', () => {
    const host = getHost();
    expect(determineDirection(host)).toBe('down');
  });

  it('should return up if there is not enough space at the bottom', () => {
    const host = getHost();

    // we need to mock getBoundingClientRect since jsdom doesn't visually render it
    jest.spyOn(host, 'getBoundingClientRect').mockImplementation(
      () =>
        ({
          top: window.innerHeight - 200, // somewhere at the bottom
        } as DOMRect)
    );

    expect(determineDirection(host)).toBe('up');
  });
});

// handleScroll is not tested on purpose
// describe('handleScroll()', () => {});
