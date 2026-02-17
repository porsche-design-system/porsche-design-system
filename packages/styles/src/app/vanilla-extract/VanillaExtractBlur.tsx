import {
  vanillaExtractBackdropBlurFrosted,
  vanillaExtractBlurImage,
  vanillaExtractBlurP,
  vanillaExtractBlurWrapper,
} from './blur.css';

export const VanillaExtractBlur = () => {
  return (
    <div className={vanillaExtractBlurWrapper}>
      <img className={vanillaExtractBlurImage} src="/lights.jpg" alt="" />
      <div className={vanillaExtractBackdropBlurFrosted}>
        <p className={vanillaExtractBlurP}>Blur</p>
      </div>
    </div>
  );
};
