import {
  vanillaExtractSpacingFluid2Xl,
  vanillaExtractSpacingFluidLg,
  vanillaExtractSpacingFluidMd,
  vanillaExtractSpacingFluidSm,
  vanillaExtractSpacingFluidXl,
  vanillaExtractSpacingFluidXs,
  vanillaExtractSpacingRow,
  vanillaExtractSpacingStatic2Xl,
  vanillaExtractSpacingStaticLg,
  vanillaExtractSpacingStaticMd,
  vanillaExtractSpacingStaticSm,
  vanillaExtractSpacingStaticXl,
  vanillaExtractSpacingStaticXs,
  vanillaExtractSpacingWrapper,
} from './spacing.css';

export const VanillaExtractSpacing = () => {
  return (
    <div className={vanillaExtractSpacingWrapper}>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingFluidXs} />
        Fluid xs
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingFluidSm} />
        Fluid sm
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingFluidMd} />
        Fluid md
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingFluidLg} />
        Fluid lg
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingFluidXl} />
        Fluid xl
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingFluid2Xl} />
        Fluid 2xl
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingStaticXs} />
        Static xs
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingStaticSm} />
        Static sm
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingStaticMd} />
        Static md
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingStaticLg} />
        Static lg
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingStaticXl} />
        Static xl
      </div>
      <div className={vanillaExtractSpacingRow}>
        <div className={vanillaExtractSpacingStatic2Xl} />
        Static 2xl
      </div>
    </div>
  );
};
