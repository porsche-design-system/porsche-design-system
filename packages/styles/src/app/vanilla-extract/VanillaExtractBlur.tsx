import {
  VanillaExtractBackdropBlurFrosted,
  VanillaExtractBlurImage,
  VanillaExtractBlurP,
  VanillaExtractBlurWrapper,
} from './blur.css';

export const VanillaExtractBlur = () => {
  return (
    <div className={VanillaExtractBlurWrapper}>
      <img className={VanillaExtractBlurImage} src="/lights.jpg" alt="" />
      <div className={VanillaExtractBackdropBlurFrosted}>
        <p className={VanillaExtractBlurP}>Blur</p>
      </div>
    </div>
  );
};
