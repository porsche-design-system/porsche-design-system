import { useTheme } from '../../hooks/useTheme';
import { vanillaExtractSkeletonItem, vanillaExtractSkeletonWrapper } from './skeleton.css';

export const VanillaExtractSkeleton = () => {
  const { theme } = useTheme();

  return (
    <div className={vanillaExtractSkeletonWrapper}>
      <span className={vanillaExtractSkeletonItem[theme]}>Skeleton</span>
    </div>
  );
};
