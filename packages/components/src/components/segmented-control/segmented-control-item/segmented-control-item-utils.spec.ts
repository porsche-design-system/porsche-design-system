import {
  getButtonAttributes,
  isFirstElementChild,
  isSegmentedControlItemFocusable,
  parentHasValue,
} from './segmented-control-item-utils';
import * as segmentedControlItemUtils from './segmented-control-item-utils';

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

describe('isFirstElementChild()', () => {
  const parent = document.createElement('div');
  const child1 = document.createElement('span');
  const child2 = document.createElement('span');

  parent.appendChild(child1);
  parent.appendChild(child2);

  it('should return true if element is first child', () => {
    expect(isFirstElementChild(child1)).toBe(true);
  });

  it('should return false if element is not first child', () => {
    expect(isFirstElementChild(child2)).toBe(false);
  });
});

describe('parentHasValue()', () => {
  it('should return true if parent has value', () => {
    const parent = document.createElement('div');
    const child1 = document.createElement('span');
    parent.appendChild(child1);

    (parent as any).value = 'something';

    expect(parentHasValue(child1)).toBe(true);
  });

  it('should return false if parent value is undefined', () => {
    const parent = document.createElement('div');
    const child1 = document.createElement('span');
    parent.appendChild(child1);

    expect(parentHasValue(child1)).toBe(false);
  });
});

describe('isSegmentedControlItemFocusable()', () => {
  const host = document.createElement('p-segmented-control-item');

  it('should return true if isSelected is true', () => {
    expect(isSegmentedControlItemFocusable(host, true)).toBe(true);
  });

  it('should return true if parentHasValue() is false, isFirstElementChild() is true and isSelected is false', () => {
    const parentHasValueSpy = jest
      .spyOn(segmentedControlItemUtils, 'parentHasValue')
      .mockImplementationOnce(() => false);
    const isFirstElementChild = jest
      .spyOn(segmentedControlItemUtils, 'isFirstElementChild')
      .mockImplementationOnce(() => true);

    expect(isSegmentedControlItemFocusable(host, false)).toBe(true);
    expect(parentHasValueSpy).toBeCalledWith(host);
    expect(isFirstElementChild).toBeCalledWith(host);
  });

  it('should return false if parentHasValue() is true, isFirstElementChild() is true and isSelected is false', () => {
    jest.spyOn(segmentedControlItemUtils, 'parentHasValue').mockImplementationOnce(() => true);
    jest.spyOn(segmentedControlItemUtils, 'isFirstElementChild').mockImplementationOnce(() => true);

    expect(isSegmentedControlItemFocusable(host, false)).toBe(false);
  });

  it('should return false if parentHasValue() is false, isFirstElementChild() is false and isSelected is false', () => {
    jest.spyOn(segmentedControlItemUtils, 'parentHasValue').mockImplementationOnce(() => false);
    jest.spyOn(segmentedControlItemUtils, 'isFirstElementChild').mockImplementationOnce(() => false);

    expect(isSegmentedControlItemFocusable(host, false)).toBe(false);
  });
});
