import {
  vanillaExtractShadowLarge,
  vanillaExtractShadowMedium,
  vanillaExtractShadowSmall,
  vanillaExtractShadowWrapper,
} from './shadow.css';

export const VanillaExtractShadow = () => {
  return (
    <div className={vanillaExtractShadowWrapper}>
      <div className={vanillaExtractShadowSmall}>Shadow Small</div>
      <div className={vanillaExtractShadowMedium}>Shadow Medium</div>
      <div className={vanillaExtractShadowLarge}>Shadow Large</div>
    </div>
  );
};
