import { getSelectTextFieldWrapperSkeletonStyles } from './select-text-field-wrapper-skeleton-styles';
import { getCss } from '../../utils';

it('should return correct css', () => {
  expect(getCss(getSelectTextFieldWrapperSkeletonStyles())).toMatchSnapshot();
});
