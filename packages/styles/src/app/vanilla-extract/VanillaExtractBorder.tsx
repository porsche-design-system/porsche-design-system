import {
  VanillaExtractBorderRadiusLarge,
  VanillaExtractBorderRadiusMedium,
  VanillaExtractBorderRadiusSmall,
  VanillaExtractBorderSection,
  VanillaExtractBorderWidthRegular,
  VanillaExtractBorderWidthThin,
  VanillaExtractBorderWrapper,
} from './border.css.ts';

export const VanillaExtractBorder = () => {
  return (
    <div className={VanillaExtractBorderWrapper}>
      <div className={VanillaExtractBorderSection}>
        <div className={VanillaExtractBorderRadiusSmall}>Border Radius Small</div>
        <div className={VanillaExtractBorderRadiusMedium}>Border Radius Medium</div>
        <div className={VanillaExtractBorderRadiusLarge}>Border Radius Large</div>
      </div>
      <div className={VanillaExtractBorderSection}>
        <div className={VanillaExtractBorderWidthThin}>Border Width Thin</div>
        <div className={VanillaExtractBorderWidthRegular}>Border Width Regular</div>
      </div>
    </div>
  );
};
