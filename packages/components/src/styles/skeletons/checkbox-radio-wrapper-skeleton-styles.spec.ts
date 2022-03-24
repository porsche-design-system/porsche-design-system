import { getCheckboxRadioWrapperSkeletonStyles } from './checkbox-radio-wrapper-skeleton-styles';
import { getCss } from '../../utils';

it('should return correct css', () => {
  expect(getCss(getCheckboxRadioWrapperSkeletonStyles())).toMatchSnapshot();
});
