import { getTextareaWrapperSkeletonStyles } from './textarea-wrapper-skeleton-styles';
import { getCss } from '../../utils';

it('should return correct css', () => {
  expect(getCss(getTextareaWrapperSkeletonStyles())).toMatchSnapshot();
});
