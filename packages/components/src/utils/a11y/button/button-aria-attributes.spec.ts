import { BUTTON_ARIA_ATTRIBUTES } from './button-aria-attributes';

describe('BUTTON_ARIA_ATTRIBUTES', () => {
  it('should match snapshot', () => {
    expect(BUTTON_ARIA_ATTRIBUTES).toMatchSnapshot();
  });
});
