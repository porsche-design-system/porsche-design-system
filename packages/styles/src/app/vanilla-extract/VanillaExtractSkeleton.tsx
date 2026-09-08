import { vanillaExtractSkeletonItem, vanillaExtractSkeletonWrapper } from './skeleton.css';

export const VanillaExtractSkeleton = () => {
  return (
    <div className={vanillaExtractSkeletonWrapper}>
      <span className={vanillaExtractSkeletonItem}>Skeleton</span>
    </div>
  );
};
