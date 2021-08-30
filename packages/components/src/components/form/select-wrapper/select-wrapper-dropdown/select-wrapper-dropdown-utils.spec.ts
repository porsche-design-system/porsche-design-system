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

    Array.from(Array(20)).forEach((_, idx) => {
      const option = document.createElement('div');
      option.textContent = `Value ${idx + 1}`;
      option.classList.add('option');
      host.shadowRoot.appendChild(option);
    });

    return host;
  };

  it('should return down if there is enough space at the bottom', () => {
    const host = getHost();
    expect(determineDirection(host)).toBe('down');
  });

  xit('should return up if there is not enough space at the bottom', () => {
    const host = getHost();
    //
    // const div = document.createElement('div');
    // div.style.height = '1000px';
    //
    // document.body.prepend(div);

    jest.spyOn(window, 'window', 'get').mockImplementation(
      () =>
        ({
          innerHeight: 10,
        } as any)
    );

    expect(determineDirection(host)).toBe('up');
  });
});

describe('handleScroll()', () => {
  xit('todo', () => {});
});
