import { determineDropdownDirection } from './select-dropdown';

describe('determineDropdownDirection()', () => {
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
    expect(determineDropdownDirection(host, 4)).toBe('down');
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

    expect(determineDropdownDirection(host, 4)).toBe('up');
  });
});
