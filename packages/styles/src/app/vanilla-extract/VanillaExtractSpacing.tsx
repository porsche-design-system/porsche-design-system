import {
  vanillaExtractSpacingFluidLarge,
  vanillaExtractSpacingFluidMedium,
  vanillaExtractSpacingFluidSmall,
  vanillaExtractSpacingFluidXLarge,
  vanillaExtractSpacingFluidXSmall,
  vanillaExtractSpacingFluidXXLarge,
  vanillaExtractSpacingRow,
  vanillaExtractSpacingStaticLarge,
  vanillaExtractSpacingStaticMedium,
  vanillaExtractSpacingStaticSmall,
  vanillaExtractSpacingStaticXLarge,
  vanillaExtractSpacingStaticXSmall,
  vanillaExtractSpacingStaticXXLarge,
  vanillaExtractSpacingWrapper,
} from './spacing.css';

export const VanillaExtractSpacing = () => {
  return (
    <div className={vanillaExtractSpacingWrapper}>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingFluidXSmall} />
        Fluid xs
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingFluidSmall} />
        Fluid sm
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingFluidMedium} />
        Fluid md
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingFluidLarge} />
        Fluid lg
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingFluidXLarge} />
        Fluid xl
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingFluidXXLarge} />
        Fluid 2xl
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingStaticXSmall} />
        Static xs
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingStaticSmall} />
        Static sm
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingStaticMedium} />
        Static md
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingStaticLarge} />
        Static lg
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingStaticXLarge} />
        Static xl
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingStaticXXLarge} />
        Static 2xl
      </div>
    </div>
  );
};
