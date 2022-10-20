import { getFieldsetWrapperSkeletonStyles } from './fieldset-wrapper-skeleton-styles';
import { getCss } from '../../utils';

it('should return correct css', () => {
  expect(getCss(getFieldsetWrapperSkeletonStyles())).toMatchSnapshot();
});
