import { getButtonAttributes } from './segmented-control-item-utils';

describe('getButtonAttributes()', () => {
  it.each<Parameters<typeof getButtonAttributes>>([
    [false, false],
    [true, true],
    [true, false],
    [false, true],
  ])('should return correct css for isSelected: %s and isDisabled: %s', (...args) => {
    expect(getButtonAttributes(...args)).toMatchSnapshot();
  });
});
