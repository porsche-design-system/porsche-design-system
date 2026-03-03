import {
  vanillaExtractBorderSection,
  vanillaExtractBorderWrapper,
  vanillaExtractRadius2Xl,
  vanillaExtractRadius3Xl,
  vanillaExtractRadius4Xl,
  vanillaExtractRadiusFull,
  vanillaExtractRadiusLg,
  vanillaExtractRadiusMd,
  vanillaExtractRadiusSm,
  vanillaExtractRadiusXl,
  vanillaExtractRadiusXs,
} from './border.css';

export const VanillaExtractBorder = () => {
  return (
    <div className={vanillaExtractBorderWrapper}>
      <div className={vanillaExtractBorderSection}>
        <div className={vanillaExtractRadiusXs}>Border Radius X-Small</div>
        <div className={vanillaExtractRadiusSm}>Border Radius Small</div>
        <div className={vanillaExtractRadiusMd}>Border Radius Medium</div>
        <div className={vanillaExtractRadiusLg}>Border Radius Large</div>
        <div className={vanillaExtractRadiusXl}>Border Radius X-Large</div>
        <div className={vanillaExtractRadius2Xl}>Border Radius 2X-Large</div>
        <div className={vanillaExtractRadius3Xl}>Border Radius 3X-Large</div>
        <div className={vanillaExtractRadius4Xl}>Border Radius 4X-Large</div>
        <div className={vanillaExtractRadiusFull}>Border Radius Full</div>
      </div>
    </div>
  );
};
