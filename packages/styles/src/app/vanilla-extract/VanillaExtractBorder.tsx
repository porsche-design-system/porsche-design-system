import {
  vanillaExtractBorderRadiusLarge,
  vanillaExtractBorderRadiusMedium,
  vanillaExtractBorderRadiusSmall,
  vanillaExtractBorderSection,
  vanillaExtractBorderWidthRegular,
  vanillaExtractBorderWidthThin,
  vanillaExtractBorderWrapper,
} from './border.css';

export const VanillaExtractBorder = () => {
  return (
    <div className={vanillaExtractBorderWrapper}>
      <div className={vanillaExtractBorderSection}>
        <div className={vanillaExtractBorderRadiusSmall}>Border Radius Small</div>
        <div className={vanillaExtractBorderRadiusMedium}>Border Radius Medium</div>
        <div className={vanillaExtractBorderRadiusLarge}>Border Radius Large</div>
      </div>
      <div className={vanillaExtractBorderSection}>
        <div className={vanillaExtractBorderWidthThin}>Border Width Thin</div>
        <div className={vanillaExtractBorderWidthRegular}>Border Width Regular</div>
      </div>
    </div>
  );
};
