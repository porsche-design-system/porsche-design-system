import { getTextareaWrapperSkeletonStyles } from './textarea-wrapper-skeleton-styles';

it('should return correct css', () => {
  expect(getTextareaWrapperSkeletonStyles()).toMatchSnapshot();
});
