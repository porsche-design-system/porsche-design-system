import {
  vanillaExtractShadowHigh,
  vanillaExtractShadowLow,
  vanillaExtractShadowMedium,
  vanillaExtractShadowWrapper,
} from './shadow.css';

export const VanillaExtractShadow = () => {
  return (
    <div className={vanillaExtractShadowWrapper}>
      <div className={vanillaExtractShadowLow}>Shadow Low</div>
      <div className={vanillaExtractShadowMedium}>Shadow Medium</div>
      <div className={vanillaExtractShadowHigh}>Shadow High</div>
    </div>
  );
};
