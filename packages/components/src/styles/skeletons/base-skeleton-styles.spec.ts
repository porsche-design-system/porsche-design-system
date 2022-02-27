import {
  getBaseSkeletonStyle,
  getElementBackgroundGradient,
  getSkeletonElementHeight,
  getThemedPseudoStyle,
} from './base-skeleton-styles';
import { getCss } from '../../utils';
import jss from 'jss';

it('should return correct style for getBaseSkeletonStyle()', () => {
  expect(getBaseSkeletonStyle()).toMatchSnapshot();
});

describe('getSkeletonElementHeight()', () => {
  it.each([
    [48, true, true, '6.25rem'],
    [48, true, false, '4.75rem'],
    [48, false, true, '4.5rem'],
    [48, false, false, '3rem'],
  ])(
    'should for parameters elHeight in px: %s, withLabel: %s and withDescription: %s return %s',
    (height, withLabel, withDescription, result) => {
      expect(getSkeletonElementHeight(height, withLabel, withDescription)).toBe(result);
    }
  );
});

describe('getElementBackgroundGradient()', () => {
  it.each([
    [
      36,
      4,
      false,
      'linear-gradient(transparent, transparent 4px, currentColor 4px, currentColor 32px, transparent 32px, transparent 36px)',
    ],
    [
      58,
      6,
      false,
      'linear-gradient(transparent, transparent 6px, currentColor 6px, currentColor 52px, transparent 52px, transparent 58px)',
    ],
    [
      52,
      4,
      true,
      'linear-gradient(transparent, transparent 4px, currentColor 4px, currentColor 20px, transparent 20px, transparent 28px, currentColor 28px, currentColor 40px, transparent 40px, transparent 52px)',
    ],
  ])(
    'should for parameters elHeight in px: %s, topGradientSpacing in px: %s and hasDescription: %s return %s',
    (elHeight, topGradientSpacing, hasDescription, result) => {
      expect(getElementBackgroundGradient(elHeight, topGradientSpacing, hasDescription)).toBe(result);
    }
  );
});
