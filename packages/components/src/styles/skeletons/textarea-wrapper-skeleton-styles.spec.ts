import { getTextareaWrapperSkeletonCss } from './textarea-wrapper-skeleton-styles';

it('should return correct css', () => {
  expect(getTextareaWrapperSkeletonCss()).toMatchSnapshot();
});
