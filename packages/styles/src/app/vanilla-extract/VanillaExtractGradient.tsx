import {
  vanillaExtractGradientItemBottom,
  vanillaExtractGradientItemLeft,
  vanillaExtractGradientItemRight,
  vanillaExtractGradientItemTop,
  vanillaExtractGradientWrapper,
} from './gradient.css';

export const VanillaExtractGradient = () => {
  return (
    <div className={vanillaExtractGradientWrapper}>
      <div className={vanillaExtractGradientItemTop}>Gradient To Top</div>
      <div className={vanillaExtractGradientItemBottom}>Gradient To Bottom</div>
      <div className={vanillaExtractGradientItemLeft}>Gradient To Left</div>
      <div className={vanillaExtractGradientItemRight}>Gradient To Right</div>
    </div>
  );
};
